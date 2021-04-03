# Strings  
Everything is a string in nothinglang (well mostly). And in nothinglang, every string is parsed. So, you can do these...

___
## Get variable value
```
Linux(*<|variablename|>*)
```
(you can learn more about variables [here](variables.md))

## Ask for input
(yes, you do this directly in a string)
```
Linux(*<!prompt custom text!>*)
```

## Confirm
(yes, you do this directly in a string too)
```
Linux(*<!confirm custom text!>*)
```

## Base64 Encode
```
Linux(*<!deepin.enc text!>*)
```

## Base64 Decode
```
Linux(*<!deepin.dec base64 text!>*)
```

## Evaluate math expression
```
Linux(*<!math mathexpression!>*)
```

## "Execute a search for a match between a regular expression and a specified string"
Returns true/false
{: .label .label-purple }
```
Linux(*<!tinycorelinux /regex/ string!>*)
```