---
layout: base.njk
title: Bandit22
tags: txt
---
#COMPSCI
Key Concepts: [[Scripts]], [[Cron]]

Ler, alterar e inperpretar scripts escritos por outras pessoas é uma habilidade importantíssima de cybersegurança

aqui, temos esse exemplo de [[Bash]] script que é feito todo reboot

```.bash
#!/bin/bash

myname=$(whoami)
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)

echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"

cat /etc/bandit_pass/ $myname > /tmp/ $mytarget
```

alterando-o para

```.bash
#!/bin/bash

myname='bandit24'
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)

echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"
```

conseguimos encontrar o nosso diretório alvo e, portanto, a senha

senha final
```
0Zf11ioIjMVN551jX3CmStKLYqjk54Ga
```
