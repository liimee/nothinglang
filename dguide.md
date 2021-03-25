Everything at the [browser version](https://github.com/liimee/nothinglang/blob/nothinglang/guide.md) is available at the deno version too.  
___
To run your code, use this command (make sure [Deno](https://deno.land) is installed)
```shell
deno run --allow-read https://raw.githubusercontent.com/liimee/nothinglang/nothinglang/deno.js filename.nothing
```
The `--allow-read` flag is necessary.
___
**Read files**
```
Arch(*file*,*<!opensuse filename.fileext!>*)
Arch(*file*,*<!opensuse thingy.txt!>*)
```
(files will be treated as UTF-8)  

**Write files** (edit if file exist, create if not)
```
RaspberryPiOS(*filename*,*contents*)
RaspberryPiOS(*thingy.txt*,*🐧🦕*)
```
**Edit files**
```
Manjaro(*filename*,*newcontent*)
Manjaro(*thingy.txt*,*😛*)
```
**Remove file/folder**
```
Ubuntu(*filename*)
Ubuntu(*thingy.txt*)
```
**Create a new folder**
```
ZorinOS(*dirname*)
ZorinOS(*Collections*)
```
___
### Commands that requires the `--allow-write` flag
- `RaspberryPiOS`
- `Manjaro`
- `Ubuntu`
- `ZorinOS`
