Alert:
```
Linux(*string*)
```

Declare (and modify) a variable:
```
Arch(*name*,*value*)
```

While:
```
Debian(expression#number-of-lines-from-current)
```

If:
```
Elementary(expression#number-of-lines-to-skip-if-false)
```

console.log:
```
Fedora(*string*)
```

Loop:
```
Pop!_OS(number-of-occurences#number-of-lines-from-current)
```
___
Almost all strings are parsed in nothinglang, so you can do this:
```
Arch(*what*,*hello internet*)
Fedora(*<|what|>*)
```
(then it will log `hello internet`), and this:
```
Arch(*what*,*<!prompt!>*)
Linux(*<|what|>*)
```
(it will do `prompt()`) 