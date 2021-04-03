# Variables  
ok, honestly this is pretty simple.

___
## Declaring a global variable  
To declare (and modify) a global variable, use the `Arch` function.
```
Arch(*name*,*value*)
```

___
## Get (global) variable value
This one's simple: use `<|name|>`. Example:  
```
Fedora(*Your Money: <|money|>*)
```

___
## Get local variable value
First off, you can't declare a local variable. Local variables are declared automatically, f.e. function arguments, repeat index, etc. This may change though.  
To get a local variable value, use `<@name@>`. Example:  
```
GarudaLinux(func arg#1)
Linux(*<@arg@>*)
```
