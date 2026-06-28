---
layout: base.njk
title: chmod
tags: txt
---
#COMPSCI
comando [[Linux]] que determina as permissões relacionadas a um arquivo 

ex 
```
chmod 644 /home/foo.txt
```
determina que 
- owner lê e escreve
- group e outros só lêem
## estrutura

```
chmod [codigo] [arquivo/diretorio]
```
### codigo
determinado por 3 digitos, cada um sendo a representação decimal de um número em binário para indicar as permissões

em "chmod xyz file"

x -> dígito para as permissões do owner
y -> para as permissoes do group
z -> permissoes de outros usuários

000 -> não pode nada
100 -> read access
110-> read and write access
111 -> read, write and exec access

chmod 777 file.bin, por exemplo, indica que todos podem ler, alterar ou executar aquele binario 



