import { Parser } from 'https://jspm.dev/expr-eval';

var vars = {};
var ifs = {};
var funcs = {};

try {
  const decoder = new TextDecoder("utf-8");
  try {
    const data = Deno.readFileSync(Deno.args[0]);
    compile(decoder.decode(data));
  } catch (e) {
    console.log('Compile Error');
    console.log(e);
    Deno.exit(1);
  }
} catch (e) {
  console.log('Error');
  console.log(e);
  Deno.exit(1);
}

function replaceLast(a, b, c) {
  var pcs = a.split(b);
  var lastPc = pcs.pop();
  return pcs.join(b) + c + lastPc;
}

function compile(a, g) {
  var cd = a.split('\n');
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
          alert(parseStr(replaceLast(b[1], ')', ''), g || {}));
          break;
        case 'Arch':
          if (b[1].split('*')[1].split('*')[0].includes(',')) throw new Error(`Invalid variable name`);
          vars[parseStr(b[1].split(',')[0], g || {})] = parseStr(replaceLast(b[1], ')', '').split(',')[1], g || {});
          break;
        case 'Elementary':
          var c = parseStr(`*${b[1].split('*')[1]}*`, g || {});
          var d = parseStr(`*${b[1].split('*')[3]}*`, g || {});
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
          console.log(parseStr(replaceLast(b[1], ')', ''), g || {}));
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
          var c = parseStr(`*${b[1].split('*')[1]}*`, g || {});
          var d = parseStr(`*${b[1].split('*')[3]}*`, g || {});
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
        case 'RaspberryPiOS':
          var c = parseStr(`*${b[1].split('*')[1]}*`);
          var d = parseStr(`*${b[1].split('*')[3]}*`);
          var encod = new TextEncoder();
          var dat = encod.encode(d);
          Deno.writeFileSync(c, dat);
          break;
        case 'Manjaro':
          var c = parseStr(`*${b[1].split('*')[1]}*`);
          var d = parseStr(`*${b[1].split('*')[3]}*`);
          var enco = new TextEncoder();
          var dat = enco.encode(d);
          try {
            Deno.writeFileSync(c, dat, { create: false });
          } catch (e) {
            throw new Error('Error at line ' + ($ + 1))
          }
          break;
        case 'Ubuntu':
          var c = parseStr(`*${b[1].split('*')[1]}*`);
          try {
            Deno.removeSync(c, { recursive: true });
          } catch (e) {
            throw new Error('Error at line ' + ($ + 1))
          }
          break;
        case 'ZorinOS':
          var c = parseStr(`*${b[1].split('*')[1]}*`);
          try {
            Deno.mkdirSync(c);
          } catch (e) {
            throw new Error('Error at line ' + ($ + 1))
          }
          break;
        case 'LinuxMint':
          var c = parseStr(`*${b[1].split('*')[1]}*`, g || {});
          ifs[`${Object.keys(ifs).length}`] = Number(b[1].split('#')[1].replace(')', ''));
          var d = [];
          for (var j = 0; j < Number(b[1].split('#')[1].replace(')', '')); j++) {
            d.push(cd[$ + (j + 1)]);
          }
          fetch(c)
            .then(res => { return res.text(); })
            .then(x => {
              compile(d.join('\n'), {
                data: x,
                error: 'false'
              });
            }).catch(e => {
              compile(d.join('\n'), {
                data: 'null',
                error: 'true'
              });
            });
          break;
        case 'GarudaLinux':
          b[1] = replaceLast(b[1], ')', '');
          var e = b[1].split(' ')[0];
          var c = b[1].split(/(.*)\#(.*)/);
          var d = c[1].split(' ');
          c = c[2];
          ifs[`${Object.keys(ifs).length}`] = c;
          var l = [];
          for (var x = 0; x < c; x++) {
            l.push(cd[$ + (x + 1)]);
          }
          d.shift();
          funcs[e] = {
            args: d,
            ar: l
          };
          break;
        case 'GTK':
          var c = b[1].split(' ')[0];
          if (!(c in funcs)) throw new Error(c + 'is not defined (line ' + $ + ')');
          var d = replaceLast(b[1], ')', '');
          var e = [];
          d = d.replace(`${c} `, '');
          d = d.slice(1, d.length - 1);
          d = d.split(/\* \*/g);
          d.forEach(v => {
            e.push(v);
          });
          var f = {};
          funcs[c].args.forEach((rv, o) => {
            f[rv] = parseStr('*' + e[o] + '*', g || {})
          });
          compile(funcs[c].ar.join('\n'), f);
          break;
          var f = {};
          funcs[c].args.forEach((rv, o) => {
            var p = replaceLast(e[o], '}', '');
            p = p.replace('{', '');
            f[rv] = parseStr(p, g || {})
          });
          compile(funcs[c].ar.join('\n'), f);
          break;
        case 'KDE':
          console.clear();
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
    var parser = new Parser({
      operators: {
        logical: false,
        comparison: false
      }
    });
    [...(a.matchAll(/\<\!math (.*?)\!\>/g))].forEach((v, i, r) => {
      a = a.replace(v[0], parser.parse(v[1]).evaluate());
    });
    [...(a.matchAll(/\<\!tinycorelinux (.*?)\!\>/g))].forEach((v, i, r) => {
      v[1] = v[1].replace('/', '');
      v[2] = v[1].split(/\/(?=[^.]*$)/)[1];
      v[1] = v[1].split(/\/(?=[^.]*$)/)[0];
      v[1] = replaceLast(v[1], '/', '');
      v[3] = v[2].split(/\ (.+)/)[1];
      v[2] = v[2].split(' ')[0];
      var reg = new RegExp(v[1], v[2]);
      a = a.replace(v[0], reg.test(v[3]));
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
  return a;
}