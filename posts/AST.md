---
layout: base.njk
title: AST
tags: txt
---
#COMPSCI 
Forma mais reduzida de representar árvores sintáticas, tentando preservar ao máximo a estrutura semântica da linguagem
## como construir?


originado da [[grammar|gramática]] 
```ebnf
Program ::= MainClass Classes -----------------
MainClass ::= "class" <IDENTIFIER> "{" "public static void main(String[] a) { System.out.println(); } }" ---------------
Classes ::= ClassDecl Classes | ϵ --------------
ClassDecl ::= "class" <IDENTIFIER> ClassA -------
ClassA ::= "extends" <IDENTIFIER> "{" ClassB | "{" ClassB -----
ClassB ::=  "}" ----- 
          | "static" VarDecl ClassB -----
          | VarDecl ClassB -----
          | "public" MethodDecl ClassC ----
ClassC ::=  "}" ------
          | "public" MethodDecl ClassC -----
VarDecl ::= Type <IDENTIFIER> ";" -----
MethodDecl ::= Type <IDENTIFIER> "(" MethodA ---
MethodA ::= ")" "{" "}" ----
          | Type <IDENTIFIER> MethodB ----
MethodB ::= ")" "{" "}" -----
          | "," Type <IDENTIFIER> MethodB -----
Type ::= SimpleType ArrayPart ------
SimpleType ::= "boolean" ----
          | "float" ----
          | "int" ----
          | <IDENTIFIER> ----
ArrayPart ::= ϵ ----
          | "[" "]" ArrayPart
```

```java
class Main {
    public static void main(String[] a) {
        System.out.println();
    }
}

class Point {
    int x;
    int y;
}

class vector {
	int x;
	int y;
}
```

- [x] Enviar arquivo de justificativa lopodo 📅 2025-07-18 ✅ 2025-07-17
