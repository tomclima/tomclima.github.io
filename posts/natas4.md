---
layout: base.njk
title: natas4
tags:
  - t
  - x
  - natas
  - txt
  - writeup
  - overthewire
---
#COMPSCI
from: [[OverTheWire]]
key concepts: [[curl]], [[HTTP]]


## Solution
make a curl request specifying and referer header like

```
curl --user username:password <url> -H "Referer: natas5"
```
