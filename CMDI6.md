---
layout: base.njk
title: CMDI6
tags: txt
---
#COMPSCI 
from [[pwn.college]]
key concepts: chaining, cmd injection, [[url encoding]]
## O que é possível
- request base 
```sh
curl --path-as-is http://challenge.localhost:80/puzzle?filedir=<path>
```
## caminho do request
![[Drawing 2025-07-16 00.25.43.excalidraw]]
## vetores de ataque no pipeline
- f-strings -> pesquisando, elas parecem ser [bastante seguras](https://security.stackexchange.com/questions/238338/are-there-any-security-concerns-to-using-python-f-strings-with-user-input). Não são tão liberais quanto o printf, por exemplo
- string.replace() -> talvez haja uma vulnerabilidade em casos limite, onde o replace tornaria a string vazia (?). mas também parece bem seguro
- variáveis de ambiente -> talvez brincar com o [[python os|os]], mas também não parece ter tanto futuro, já que as f-strigns são aparentemente a coisa mais segura do mundo
- arrumar \~~algum jeito\~~ de enfiar um dos caracteres especiais no exec. mas também não parece ser a coisa mais simples do mundo 
- agora estou olhando mais para a forma como o flask lida com o recebimento da string em args. Vou dar uma estudada para verificar a segurança disso 
-
## delayed url decoding?
impossível. A única parte do programa que lida com url decoding é justamente no recebimento do path <- eu tenho certeza disso?
## 
