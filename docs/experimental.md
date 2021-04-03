# Experimental Features
While this functions does work, it may have some bugs that I don't know yet.  
You also need to add the `--experimental` flag if you want to use experimental features in the Deno version.

___
## Functions
To declare a function, do:
```
GarudaLinux(funcname argument1 argument2...#number-of-lines-since-current)
```
Example:
```
GarudaLinux(sayhello name#1)
Linux(*Hello, <@name@>*)
```

To call a function, do:
```
GTK(functionname *argument1* *argument2...*)
```
Example:
```
GTK(sayhello *<!prompt What is your name?!>*)
```

___
## Fetching Data
Fetch data from a url. Do:
```
LinuxMint(*url*#callback-number-of-lines-since-current)
```
Example:
```
LinuxMint(*https://google.com*#5)
Linux(*Error: <@error@>*)
Linux(*Data: <@data@>*)
RedHat(2)
<@error@> returns true/false
<@data@> returns the fetched data.
```