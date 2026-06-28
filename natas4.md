---
layout: base.njk
title: natas4
tags: txt
---
#COMPSCI
from: [[OverTheWire]]
key concepts: [[curl]], [[HTTP]]
## Password
```
QryZXc2e0zahULdHrtHxzyYkj59kUxLQ
```

## Solution
make a curl request specifying and referer header like

```
curl --user username:password <url> -H "Referer: natas5"
```
