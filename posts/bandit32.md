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
---
#COMPSCI
from [[OverTheWire]], [[format string]], [[paremeter expansion]]


## solution

fatos sobre a uppershell

#### Functionamento provável da uppershell
- pega o texto da sua entrada como string
- para cada dígito, o deixa maiúsculo
- executa a string resultante com `sh -c '<string>'`

- tudo que você escreve fica em uppercase
```
>> teste1
sh: 1: TESTE1: Permission denied
>> oioioooi
sh: 1: OIOIOOOI: Permission denied
>> "oioiooi"
sh: 1: OIOIOOI: Permission denied
```

- EXCETO variáveis de ambiente definidas pelo sistema
```
>> $PATH; $USER; $PWD
sh: 1: /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin: not found
sh: 1: bandit32: Permission denied
sh: 1: /home/bandit32: Permission denied
>>
```


**é possível definir variáveis de ambiente efêmeras**. Podemos fazer coisas como
```
>> teste=/bin/teste; $teste
sh: 1: /BIN/TESTE: not found
```
mas se definirmos em uma linha e chamarmos em outra, nada acontece
```
sh: 1: /BIN/TESTE: not found
>> teste="oioi"
>> $teste
>>
```


os valores nas variáveis de ambiente também são passados para uppercase, não importando o tipo de string
```
>> t=a;$t;t1='a';$t1;t2="a";$t2
sh: 1: A: Permission denied
sh: 1: A: Permission denied
sh: 1: A: Permission denied
```

tentar definir a variável recursivamente também não funciona
```
>> a="a";b=$a;c=$b;$c
sh: 1: A: Permission denied
```

## solução
é possível realizar expansões de parâmetro nas variáveis do sistema. Assim, é possível fazer coisas como retirar um pedaço da string da variável.
a expansão `${PATH##*/}`, por exemplo, retira tudo fora o último "bin".

com isso, já estou conseguindo rodar executáveis (!), mas sem muito sucesso, já que os glob matches são meio gerais demais 

```
/${PATH##*/}/*
```
com esse comando, eu rodo TODOS os executáveis do bin, eu preciso conseguir rodar coisas mais específicas (idealmente um script em /tmp/dir)
ou quem sabe abrir um terminal vim ou more ou sla 

CARALHO CONSEGUI. Depois de muito tentar, consegui abrir o vim

basicamente, você pode fazer patern matching com qualquer caractere de uma string. Logo, o que queremos fazer é algo como 
```
/bin/[v][i][m]
```
para conseguir abrir o vim. O problema é que não temos acesso às letras individuais, porém, utilizando palavras guardadas nas variáveis de sistema do servidor, podemos fazer a seguinte macarronada
```
var1=${SSH_TTY#/}; dev=${var1%%/*}; bin=${path##*/}; var2=${pwd%/*}; home=${var2#/}; vim=/$bin/[$dev][$bin]["$home"]; $vim
```
difícil pra krl, mas eu estou muito feliz pqp

