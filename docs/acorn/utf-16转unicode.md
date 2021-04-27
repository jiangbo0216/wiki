### [Example – Decode UTF16 hexadecimal **\uD852\uDF62** (UTF16 Decode)](https://convertcodes.com/utf16-encode-decode-convert-string/)

1. Convert UTF16 hexadecimal to binary.

```
D852 : 1101 1000 0101 0010
DF62 : 1101 1111 0110 0010
```

 \2. Subtract high surrogate (0xD852) with 0xD800

```
D852 : 1101 1000 0101 0010
D800 : 1101 1000 0000 0000
     = 0000 0000 0101 0010
     = 52
```

Then multiply by 0x0400, which is **“0x14800”**

 \4. Subtract low surrogate (0xDF62) with 0xDC00

```
DF62 : 1101 1111 0110 0010
DC00 : 1101 1100 0000 0000
     = 0000 0011 0110 0010
     = 362
```

The result is **“0x362”**

 \5. Adding two value above (0x14800 + 0x362) and also add 0x10000 to get the final result of code points

```
0x14800 : 0001 0100 1000 0000 0000
0x362   : 0000 0000 0011 0110 0010
0x10000 : 0001 0000 0000 0000 0000
        = 0010 0100 1011 0110 0010
        = 24B62
```

The result of decoding UTF16 “\uD852\uDF62” is U+24B62
