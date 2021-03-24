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
**Note:**  
`*val1*=*val2*` = `'val1' == 'val2'`  
`*val1*=/*val2*` = `'val1' != 'val2'`  
`*val1*<~*val2*` = `'val1' < 'val2'`  

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
Almost all strings are parsed in nothinglang, so you can do these:
```
RedHat(1)
Use a variable
Arch(*what*,*hello internet*)
Fedora(*<|what|>*)

RedHat(1)
Do window.prompt()
Arch(*what*,*<!prompt some custom text here!>*)
Arch(*what*,*<!prompt What is your name?!>*)

RedHat(1)
Do window.confirm()
Arch(*what*,*<!confirm some custom text here!>*)
Arch(*what*,*<!confirm 1 pepperoni pizza?!>*)

RedHat(1)
Evaluate math expression (thanks to expr-eval!)
Arch(*what*,*<!math some math expression here!>*)
Arch(*what*,*<!math 1+1+1+1!>*)
```
