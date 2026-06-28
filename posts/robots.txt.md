---
layout: base.njk
title: robots.txt
tags: txt
---
#COMPSCI
file in dir structure of sites that specifies some things about web crawlers (where can they crawl, where they cant, etc)

## disallow
specifies which dirs in the structure are forbidden to crawlers
ex:
```
User-agent: *
Disallow: /s3cr3t/
```
all user agents are forbidden from fetching info from /s3cr3t

/