Everything at the [browser version](https://github.com/liimee/nothinglang/blob/nothinglang/guide.md) is supported at the deno version too.  
___
To run your code, use this command (make sure [Deno](https://deno.land) is installed)
```shell
deno run --allow-read https://raw.githubusercontent.com/liimee/nothinglang/nothinglang/deno.js filename.nothing
```
The `--allow-read` flag is necessary.
___
**Read files** ([Deno Docs](https://doc.deno.land/builtin/stable#Deno.readFileSync))
```
Arch(*file*,*<!opensuse filename.fileext!>*)
Arch(*file*,*<!opensuse thingy.txt!>*)
```
(files will be treated as UTF-8)  

**Write files** (edit if file exist, create if not) ([Deno Docs](https://doc.deno.land/builtin/stable#Deno.writeFileSync))
```
RaspberryPiOS(*filename*,*contents*)
RaspberryPiOS(*thingy.txt*,*🐧🦕*)
```
**Edit files** ([Deno Docs](https://doc.deno.land/builtin/stable#Deno.writeFileSync))
```
Manjaro(*filename*,*newcontent*)
Manjaro(*thingy.txt*,*😛*)
```
**Remove file/folder** ([Deno Docs](https://doc.deno.land/builtin/stable#Deno.removeSync))
```
Ubuntu(*filename*)
Ubuntu(*thingy.txt*)
```
**Create a new folder** ([Deno Docs](https://doc.deno.land/builtin/stable#Deno.removeSync))
```
ZorinOS(*dirname*)
ZorinOS(*Collections*)
```
___
### Commands that requires the `--allow-write` flag (see [this](https://deno.land/manual/getting_started/permissions#permissions-list))
- `RaspberryPiOS`
- `Manjaro`
- `Ubuntu`
- `ZorinOS`
