---
layout: base.njk
title: Bandit21
tags: txt
---
#COMPSCI
## level 21 -> level 22

Key concepts: [[Cron]]

Scripts crontab não fazem muito por si só, eles referenciam outros scripts.

Encontre o Script no arquivo crontab e veja que ele lê a senha e o manda para um arquivo tmp, que é apagado depois de pouco tempo por um outro cron (cleanup)

uma vez encontrado o arquivo tmp, mesmo que não possa mais vê-lo, no proximo reboot ele estará lá de novo

