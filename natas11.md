---
layout: base.njk
title: natas11
tags: txt
---
#COMPSCI
from: [[OverTheWire]]
key concepts: [[xor#reversibilidade]]

## Solution

### pipeline
If we enter a valid cookie header in the http request, the site will perform the following operations

![[Pasted image 20250714130539.png]] 
Json decoding and base64 decoding are public, and its inverses (base64_encoding and json_encoding) are easily accessible in the [[php]] language , the main problem is the xor encryption, which is a custom function that uses a secret key for encoding. 

reviewing the code for the xor_encrypt step, we find the following
```.php
function xor_encrypt($in, $key) {

    $text = $in;

    $outText = '';

    // Iterate through each character

    for($i=0;$i<strlen($text);$i++) {

    $outText .= $text[$i] ^ $key[$i % strlen($key)];

    }
    return $outText;
};
```
the main step is taking the original texting and xoring it with the key. Using the [[xor#reversibilidade|reversability]] of the xor operator. Using this, we can use the default cookie the site gives us, **url decode it**, and xor it with the defualt array that originated it. 
![[Pasted image 20250714132454.png]]

That way, we can construct a valid cookie that will show us the password reversing the original pipeline with the array `array("showpassword"=>"yes", "bgcolor"=>"#ffffff")` 


