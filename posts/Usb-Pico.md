---
layout: base.njk
title: usb-pico
tags:
  - txt
  - writeup
  - google
date: 2026-06-28
---
challenge from [[Google Begginers quest]]
Topics covered: [[usb]], [[rev]]

![[Pasted image 20260628145702.png]]

app is a arm firmware file
![[Pasted image 20260628145732.png]]
the directory gives us a simulator for the app
![[Pasted image 20260628145815.png]]

we can connect to the remote instance using
```
sudo modprobe vhci_hcd; sudo usbip --tcp-port 1337 attach -r usb-pico.2025-bq.ctfcompetition.com -b 1-1
```
![[Pasted image 20260628145929.png]]
# understanding the output of lsusb

We can refer to [[USB]] to understand this better 

