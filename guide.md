Alert:
```
Linux(*string*)
```
```
Linux(*Pizza*)
```

Declare (and modify) a variable:
```
Arch(*name*,*value*)
```
```
Arch(*type*,*Pepperoni*)
```

While:
```
Debian(expression#number-of-lines-from-current)
```
```
Debian(*<|customerpaid|>*=/*true*#1)
Linux(*PAY!!*)
```

If:
```
Elementary(expression#number-of-lines-to-skip-if-false)
```
```
Elementary(*<|type|>*=*Pepperoni*#1)
Linux(*That would be $5*)
```

console.log:
```
Fedora(*string*)
```
```
Fedora(*Welcome!*)
```

Loop:
```
Pop!_OS(number-of-occurences#number-of-lines-from-current)
```
```
Pop!_OS(10#1)
Fedora(*🍕*)
```

(Multi-Line) Comment:
```
RedHat(number-of-lines-since-current)
```
```
RedHat(1)
this text will be ignored
```
___
Almost all strings are parsed in nothinglang, so you can do this:
```
Arch(*what*,*hello internet*)
Fedora(*<|what|>*)
```
(then it will log `hello internet`), and this:
```
Arch(*what*,*<!prompt some custom text here, you can just put space if you just want blank!>*)
Linux(*<|what|>*)
```
(it will do `prompt()`)  
`<!confirm text!>` also work :)
