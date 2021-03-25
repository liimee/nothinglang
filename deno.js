import {Parser} from 'https://jspm.dev/expr-eval';

var vars = {};
var ifs = {};

try {
  const decoder = new TextDecoder("utf-8");
  const data = Deno.readFileSync(Deno.args[0]);
  try {
    compile(decoder.decode(data));
  } catch(e) {
    console.log('Compile Error');
    console.log(e);
    Deno.exit(1);
  }
} catch(e) {
  console.log('Error');
  console.log(e);
  Deno.exit(1);
}

function replaceLast(a, b, c) {
  var pcs = a.split(b);
  var lastPc = pcs.pop();
  return pcs.join(b) + c + lastPc;
}

function compile(a) {
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
        alert(parseStr(replaceLast(b[1], ')', '')));
        break;
        case 'Arch':
        if (b[1].split('*')[1].split('*')[0].includes(',')) throw new Error(`Invalid variable name at line ${$+1}`);
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
            throw new Error('ERROR at line '+($+1));
          }
        }
        if (!e) {
          ifs[`${Object.keys(ifs).length}`] = Number(b[1].split('*')[4].replace('#', '').replace(')', ''));
        }
        break;
        case 'Fedora':
        console.log(parseStr(replaceLast(b[1], ')', '')));
        break;
        case 'Pop!_OS':
        var d = [];
        for (var c = 0; c < Number(b[1].split('#')[1].replace(')', '')); c++) {
          d.push(cd[$ + (c + 1)]);
        }
        for (var c = 1; c < Number(b[1].split('#')[0]); c++) {
          compile(d.join('\n'));
        }
        break;
        case 'Debian':
        var c = parseStr(`*${b[1].split('*')[1]}*`);
        var d = parseStr(`*${b[1].split('*')[3]}*`);
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
            throw new Error('ERROR at line '+($+1));
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
          Deno.writeFileSync(c, dat, {create: false});
        } catch(e) {
          throw new Error('Error at line '+($+1))
        }
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
    [...(a.matchAll(/\<\!prompt (.*?)\!\>/g))].forEach((v, i, r) => {
      a = a.replace(v[0], prompt('[INPUT] ' + v[1]));
    });
    [...(a.matchAll(/\<\!confirm (.*?)\!\>/g))].forEach((v, i, r) => {
      a = a.replace(v[0], confirm('[CONFIRM] ' + v[1]));
    });
    [...(a.matchAll(/\<\!opensuse (.*?)\!\>/g))].forEach((v, i, r) => {
      var decode = new TextDecoder("utf-8");
      var dat = Deno.readFileSync(v[1]);
      a = a.replace(v[0], decode.decode(dat));
    });
    return a;
  } else {
    return 'Oops.';
  }
}

function parseVars(a) {
  Object.keys(vars).forEach(v => {
    a = a.replaceAll(`<|${v}|>`, vars[v]);
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
  return a;
}
