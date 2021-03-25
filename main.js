var vars = {};
var funcs = {};
var ifs = {};

function compile(a, g) {
  var cd = a.split('\n'); // no, you can't minify stuff
  cd.forEach((v, $) => {
    var next = false;
    Object.keys(ifs).forEach(v => {
      if (ifs[v] == 0) {
        delete ifs[v];
      } else {
        ifs[v] -= 1;
        next = true;
      }
    });
    if (!next) {
      var b = v.split(/\((.+)/);
      switch (b[0]) {
        case 'Linux':
          alert(parseStr(replaceLast(b[1], ')', ''), g||{}));
          break;
        case 'Arch':
          if (b[1].split('*')[1].split('*')[0].includes(',')) throw new Error(`Invalid variable name`);
          vars[parseStr(b[1].split(',')[0], g||{})] = parseStr(replaceLast(b[1], ')', '').split(',')[1], g||{});
          break;
        case 'Elementary':
          var c = parseStr(`*${b[1].split('*')[1]}*`, g||{});
          var d = parseStr(`*${b[1].split('*')[3]}*`, g||{});
          var e = false;
          switch (b[1].split('*')[2].split('*')[0]) {
            case '=':
              e = c == d;
              break;
            case '=/':
              e = c != d;
              break;
            case '<~':
              try {
                c = +`${c}`;
                d = +`${d}`;
                e = c < d;
              } catch (m) {
                throw new Error('ERROR');
              }
          }
          if (!e) {
            ifs[`${Object.keys(ifs).length}`] = Number(b[1].split('*')[4].replace('#', '').replace(')', ''));
          }
          break;
        case 'Fedora':
          console.log(parseStr(replaceLast(b[1], ')', ''), g||{}));
          break;
        case 'Pop!_OS':
          var d = [];
          for (var c = 0; c < Number(b[1].split('#')[1].replace(')', '')); c++) {
            d.push(cd[$ + (c + 1)]);
          }
          for (var c = 0; c < Number(b[1].split('#')[0]); c++) {
            compile(d.join('\n'), { currentindex: c });
          }
          ifs[`${Object.keys(ifs).length}`] = Number(b[1].split('#')[1].replace(')', ''));
          break;
        case 'Debian':
          var c = parseStr(`*${b[1].split('*')[1]}*`, g||{});
          var d = parseStr(`*${b[1].split('*')[3]}*`, g||{});
          var e = false;
          var l = [];
          for (var x = 0; x < Number(b[1].split('#')[1].replace(')', '')); x++) {
            l.push(cd[$ + (x + 1)]);
          }
          switch (b[1].split('*')[2].split('*')[0]) {
            case '=':
              while (c == d) {
                compile(l.join('\n'));
              }
              break;
            case '=/':
              while (c != d) {
                compile(l.join('\n'));
              }
              break;
            case '<~':
              try {
                c = +`${c}`;
                d = +`${d}`;
                while (c < d) {
                  compile(l.join('\n'));
                }
              } catch (m) {
                throw new Error('ERROR');
              }
          }
          break;
      /*  case 'GTK':
          var c = b[1].split('*')[1];
          ifs[`${Object.keys(ifs).length}`] = Number(c);
          var l = [];
          for (var x = 0; x < Number(c); x++) {
            l.push(cd[$ + (x + 1)]);
          }
          break;
        case 'KDE':
          compile(`Linux(*<@a@>*)`, {
            a: '44'
          })*/
      }
    }
  })
}

function parseStr(a, b) {
  if (a.startsWith('*') && a.endsWith('*')) {
    a = a.replace('*', '');
    a = replaceLast(a, '*', '');
    a = parseVars(a, b);
    [...(a.matchAll(/\<\!prompt (.*?)\!\>/g))].forEach((v, i, r) => {
      a = a.replace(v[0], prompt(v[1]));
    });
    [...(a.matchAll(/\<\!confirm (.*?)\!\>/g))].forEach((v, i, r) => {
      a = a.replace(v[0], confirm(v[1]));
    });
    [...(a.matchAll(/\<\!deepin\.enc (.*?)\!\>/g))].forEach((v, i, r) => {
      a = a.replace(v[0], btoa(v[1]));
    });
    [...(a.matchAll(/\<\!deepin\.dec (.*?)\!\>/g))].forEach((v, i, r) => {
      a = a.replace(v[0], atob(v[1]));
    });
    return a;
  } else {
    return 'Oops.';
  }
}

function parseVars(a, b) {
  Object.keys(vars).forEach(v => {
    a = a.replaceAll(`<|${v}|>`, vars[v]);
  });
  Object.keys(b).forEach(v => {
    a = a.replaceAll(`<@${v}@>`, b[v]);
  })
  var parser = new exprEval.Parser({
    operators: {
      logical: false,
      comparison: false
    }
  });
  [...(a.matchAll(/\<\!math (.*?)\!\>/g))].forEach((v, i, r) => {
    a = a.replace(v[0], parser.parse(v[1]).evaluate());
  });
  return a;
}