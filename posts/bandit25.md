---
layout: base.njk
title: bandit25
tags:
  - t
  - x
  - writeup
  - txt
  - bandit
  - overthewire
---
#COMPSCI
from [[OverTheWire]]
key concepts: Vulnerability search, privilege escalation


using the command
```
getent passwd bandit26
```
we find that the shell for bandit26 isnt actually the batch (bin/batch), but rather

```
#!/bin/sh

export TERM=linux

exec more ~/text.txt
exit 0
```

assim, sabemos que, ao nos conectarmos com o servidor, acabamos, na verdade, abrinod um exec more, que lê o texto e o fecha.

Portanto, se abrirmos o more com a menor janela possível (de forma que o texto em text.txt) não caiba, forçaremos o more a ser aberto no modo de janela, o que normalmente nos permitiria rodar comandos como, por exemplo

```
!ls
!cat /etc/bandit_pass/bandit26
...
```

Porém, perceba que, para executar comandos com !, o more utiliza a shell do usuário ( normalmente bash). Porém, o bandit26 **não tem shell**. Ela foi substituída pelo /usr/bin/showtext!. Assim, ainda não conseguimos executar comandos.

Porém, ainda conseguimos acessar o vim, apertando a tecla `v` dentro do `more`. E no vim, como no more, também temos a opção de executar comandos com 
`:!<comando>`, o que ainda não funciona, já que não temos uma shell. No entando, o vim nos da a opção de mudar as variáveis de ambiente utilizadas, dentre elas, a variável `shell`! . assim, podemos executar ```set shell=/bin/bash```. E agora podemos executar comandos arbitrários de dentro do vim!
