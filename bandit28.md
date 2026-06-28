---
layout: base.njk
title: bandit28
tags: txt
---
#COMPSCI
from [[OverTheWire]] 
key concepts: [[git]], [[git exploits]]



## solution
clone repo `ssh://bandit28-git@localhost/home/bandit28-git/repo`

You will se that the readme is in the form

```md
# Bandit Notes

Some notes for level29 of bandit.

## credentials  

- username: bandit29

- password: xxxxxxxxxx
```

this looks like the password for bandit29 has been redacted! But the maintainers for this repo forgot to rewrite history, so we can recover the password before its redaction with git log. 


