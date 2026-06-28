---
layout: base.njk
title: Bandit23
tags: txt
---
#COMPSCI
Key Concepts: [[Scripts]], [[chmod]]

## senha do server
```
0Zf11ioIjMVN551jX3CmStKLYqjk54Ga 
```
# Solução 

Semelhante ao [[Bandit22]], mas com um nível de complexidade a mais

encontramos esse script, executado pelo user bandit24 de tempos em tempos de acordo com o [[Cron]]

```.sh
myname=$(whoami)

cd /var/spool/$myname/foo
echo "Executing and deleting all scripts in /var/spool/$myname/foo:"
for i in * .*;
do
    if [ "$i" != "." -a "$i" != ".." ];
    then
        echo "Handling $i"
        owner="$(stat --format "%U" ./$i)"
        if [ "${owner}" = "bandit23" ]; then
            timeout -s 9 60 ./$i
        fi
        rm -f ./$i
    fi
done
```

Perceba que, na linha
```
 timeout -s 9 60 ./$i
```
o user bandit24 executa **com as permissões dele** o arquivo que o script que o bandit23 colocou antes de deletá-lo!
Assim, podemos colocar um script malicioso em */var/spool/bandit24/foo* e guardá-lo no nosso temp
```.sh
cat /etc/bandit_pass/bandit24 > /tmp/eu-sou/amor/pass
```

por algum motivo esse (e todas as variações de cat direcionando para tmp) não funciona. Uma outra alternativa é deixar uma porta escutando em com um nc para ver se mensagens podem ser trocadas

### Em uma screen
```.sh
nc -l 1234
```

### No foo
```.sh
nc localhost 1234
test
```

Esse método também não funciona. Talvez por serem dois users diferentes (?)

Eu preciso garantir que o bandit24 vai escrever em um local que o bandit23 TEM ACESSO e possa ler os documentos. talvez um chmod resolva 

chmod resolve!

## solução certa

primeito criamos o nosso script, aplicamos chmod 777 a ele (permitindo ao bandit24 a execução) e ta pronto o sorvetinho! o problema inicial é o script não estava nem sendo executado

