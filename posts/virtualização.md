---
layout: base.njk
title: virtualização
tags: txt
---
#COMPSCI
# hyper-v e wsl
Aparentemente o [[virtualbox]]  e outros enlouquecem quando o wsl está ativo, então, para usá-los em uma máquina windows, é preciso fazer os seguintes passos descritos [aqui](https://nicolaiarocci.com/troubles-with-virtualbox-and-the-windows-subsystem-for-linux/)

> If you don’t need to run WSL2 and your VMs simultaneously, one workaround is to disable WSL2 in the Windows Features. There, you have to disable Hyper-V, Virtual Machine Platform, and Windows Subsystem for Windows. Yes, I had to explicitly disable all three of them. When you eventually reactivate them, WSL2 will start working again, configurations included.

- abrir "ativar ou desativar recursos do windows"
- desabilitar wsl, 