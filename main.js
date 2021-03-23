var vars = {};
var ifs = {};

function compile(a) {
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
      var b = v.split('(');
      switch (b[0]) {
        case 'Linux':
          alert(parseStr(replaceLast(b[1], ')', '')));
          break;
        case 'Arch':
          if (b[1].split('*')[1].split('*')[0].includes(',')) throw new Error(`Invalid variable name`);
          vars[parseStr(b[1].split(',')[0])] = parseStr(replaceLast(b[1], ')', '').split(',')[1]);
          break;
        case 'Elementary':
          var c = parseStr(`*${b[1].split('*')[1]}*`);
          var d = parseStr(`*${b[1].split('*')[3]}*`);
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
          if(!e) {
            ifs[`${Object.keys(ifs).length}`] = Number(b[1].split('*')[4].replace('#', '').replace(')', ''));
          }
          break;
        case 'Fedora':
          console.log(parseStr(replaceLast(b[1], ')', '')));
          break;
      }
    }
  })
}

function parseStr(a) {
  if (a.startsWith('*') && a.endsWith('*')) {
    a = a.replace('*', '');
    a = replaceLast(a, '*', '');
    a = parseVars(a);
    return a;
  } else {
    return 'Oops.';
  }
}

function parseVars(a) {
  Object.keys(vars).forEach(v => {
    a = a.replaceAll(`<|${v}|>`, vars[v]);
  });
  return a;
}