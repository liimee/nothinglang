![Preview](dno.gif)

___

# Basic Functions
### Alert:
```
Linux(*Pizza*)
```

### Declare (and modify) a (global) variable:
```
Arch(*name*, *value*, *mutable?*)
```
```
Arch(*type*,*Pepperoni*, *true*)
```
Variables are mutable by default. You can omit the mutable? thing.

### While:
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

### If:
```
Elementary(expression#number-of-lines-to-skip-if-false)
```
```
Elementary(*<|type|>*=*Pepperoni*#1)
Linux(*That would be $5*)
```

### console.log:
```
Fedora(*string*)
```
```
Fedora(*Welcome!*)
```

### Loop:
```
Pop!_OS(number-of-occurences#number-of-lines-from-current)
```
```
Pop!_OS(10#1)
Fedora(*🍕*)

Pop!_OS(8#1)
Linux(*<@currentindex@>*) 
```

### (Multi-Line) Comment:
```
RedHat(number-of-lines-since-current)
```
```
RedHat(1)
this text will be ignored
this text will not be ignored
```

### Declare a Function (experimental)
```
GarudaLinux(functionname argument1 argument2...#number-of-lines-since-current)
```
```
GarudaLinux(sayHello name#1)
Linux(*Hello, <@name@>*)
```

### Call a function (experimental)
```
GTK(functionname *argument1* *argument2...*)
```
```
GTK(sayHello *<!prompt What is your name?!>*)
```

### Clear console
```
KDE()
```

### Import a file
```
Android(*URLorPath*)
```
```
Android(*file2.nothing*)
```

### Exit program
```
Snap()
```

### Run a JS/Deno file (not available yet)
```
Extend(*URLorPath*)

RedHat(1)
Also, the JS file, so far, can define functions, set variables, and run another nothinglang code.
```
___
## Almost every strings are parsed in nothinglang, so you can do these:
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

RedHat(1)
Encode Base64
Arch(*what*,*<!deepin.enc string!>*)
Arch(*what*,*<!deepin.enc lolllllll!>*)

RedHat(1)
Decode Base64
Arch(*what*,*<!deepin.dec base64!>*)
Arch(*what*,*<!deepin.dec bG9sbGxsbGxs!>*)

RedHat(1)
Execute a search for a match between a regular expression and a specified string
Arch(*what*,*<!tinycorelinux /regex/ string!>*)
Arch(*number*,*<!tinycorelinux /^[0-9]+$/ 7!>*)

RedHat(1)
Convert string to uppercase
Arch(*what*,*<!solus string!>*)
Arch(*what*,*<!solus hello!!>*)

RedHat(1)
Convert string to lowercase
Arch(*what*,*<!slackware string!>*)
Arch(*what*,*<!slackware SHRUG!>*)

RedHat(1)
Get current path (it's a variable anyway)
Arch(*path*, *<|>>path|>*)

RedHat(1)
Get argument at index
Arch(*pizzatype*, *<!flatpak index!>*)
```

___
# Filesystem-related functions  
### Read files
```
Arch(*file*,*<!opensuse filename.fileext!>*)
Arch(*file*,*<!opensuse thingy.txt!>*)
```
(files will be treated as UTF-8)  

### Write files (edit if file exist, create if not)
```
RaspberryPiOS(*filename*,*contents*)
RaspberryPiOS(*thingy.txt*,*🐧🦕*)
```
### Edit files
```
Manjaro(*filename*,*newcontent*)
Manjaro(*thingy.txt*,*😛*)
```
### Delete file/folder
```
Ubuntu(*filename*)
Ubuntu(*thingy.txt*)
```

### Create a new folder
```
ZorinOS(*dirname*)
ZorinOS(*Collections*)
```

___

# Running your code
To run your code, download a binary [here](https://github.com/liimee/nothinglang/releases), unzip, then do `./nothinglang file.nothing`. It doesn't have a built-in update function (yet.)  

You also need to add `--experimental` if you want to use experimental features.  
