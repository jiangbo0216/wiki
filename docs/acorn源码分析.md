## 前置知识
* ascii码

### ascii码

#### ASCII Control Codes (0 - 31)

| **DEC** | **HEX** | **BIN**  | **Symbol** | **HTML Number** | **HTML Name** | **Description**                 |
|:-------:|:-------:|:--------:|:----------:|:---------------:|:-------------:|:-------------------------------:|
| 0       | 00      | 00000000 | NUL        | &\#000;         |               | Null char                       |
| 1       | 01      | 00000001 | SOH        | &\#001;         |               | Start of Heading                |
| 2       | 02      | 00000010 | STX        | &\#002;         |               | Start of Text                   |
| 3       | 03      | 00000011 | ETX        | &\#003;         |               | End of Text                     |
| 4       | 04      | 00000100 | EOT        | &\#004;         |               | End of Transmission             |
| 5       | 05      | 00000101 | ENQ        | &\#005;         |               | Enquiry                         |
| 6       | 06      | 00000110 | ACK        | &\#006;         |               | Acknowledgment                  |
| 7       | 07      | 00000111 | BEL        | &\#007;         |               | Bell                            |
| 8       | 08      | 00001000 |  BS        | &\#008;         |               | Back Space                      |
| 9       | 09      | 00001001 |  HT        | &\#009;         |               | Horizontal Tab                  |
| 10      | 0A      | 00001010 |  LF        | &\#010;         |               | Line Feed                       |
| 11      | 0B      | 00001011 |  VT        | &\#011;         |               | Vertical Tab                    |
| 12      | 0C      | 00001100 |  FF        | &\#012;         |               | Form Feed                       |
| 13      | 0D      | 00001101 |  CR        | &\#013;         |               | Carriage Return                 |
| 14      | 0E      | 00001110 |  SO        | &\#014;         |               | Shift Out / X\-On               |
| 15      | 0F      | 00001111 |  SI        | &\#015;         |               | Shift In / X\-Off               |
| 16      | 10      | 00010000 | DLE        | &\#016;         |               | Data Line Escape                |
| 17      | 11      | 00010001 | DC1        | &\#017;         |               | Device Control 1 \(oft\. XON\)  |
| 18      | 12      | 00010010 | DC2        | &\#018;         |               | Device Control 2                |
| 19      | 13      | 00010011 | DC3        | &\#019;         |               | Device Control 3 \(oft\. XOFF\) |
| 20      | 14      | 00010100 | DC4        | &\#020;         |               | Device Control 4                |
| 21      | 15      | 00010101 | NAK        | &\#021;         |               | Negative Acknowledgement        |
| 22      | 16      | 00010110 | SYN        | &\#022;         |               | Synchronous Idle                |
| 23      | 17      | 00010111 | ETB        | &\#023;         |               | End of Transmit Block           |
| 24      | 18      | 00011000 | CAN        | &\#024;         |               | Cancel                          |
| 25      | 19      | 00011001 |  EM        | &\#025;         |               | End of Medium                   |
| 26      | 1A      | 00011010 | SUB        | &\#026;         |               | Substitute                      |
| 27      | 1B      | 00011011 | ESC        | &\#027;         |               | Escape                          |
| 28      | 1C      | 00011100 |  FS        | &\#028;         |               | File Separator                  |
| 29      | 1D      | 00011101 |  GS        | &\#029;         |               | Group Separator                 |
| 30      | 1E      | 00011110 |  RS        | &\#030;         |               | Record Separator                |
| 31      | 1F      | 00011111 |  US        | &\#031;         |               | Unit Separator                  |


#### ASCII printable characters (character code 32-127)

| **DEC** | **HEX** | **BIN**  | **Symbol** | **HTML Number** | **HTML Name** | **Description**                          |
|:-------:|:-------:|:--------:|:----------:|:---------------:|:-------------:|:----------------------------------------:|
| 32      | 20      | 00100000 |            | &\#32;          |               | Space                                    |
| 33      | 21      | 00100001 | \!         | &\#33;          |               | Exclamation mark                         |
| 34      | 22      | 00100010 | "          | &\#34;          | &quot;        | Double quotes \(or speech marks\)        |
| 35      | 23      | 00100011 | \#         | &\#35;          |               | Number                                   |
| 36      | 24      | 00100100 | $          | &\#36;          |               | Dollar                                   |
| 37      | 25      | 00100101 | %          | &\#37;          |               | Procenttecken                            |
| 38      | 26      | 00100110 | &          | &\#38;          | &amp;         | Ampersand                                |
| 39      | 27      | 00100111 | '          | &\#39;          |               | Single quote                             |
| 40      | 28      | 00101000 | \(         | &\#40;          |               | Open parenthesis \(or open bracket\)     |
| 41      | 29      | 00101001 | \)         | &\#41;          |               | Close parenthesis \(or close bracket\)   |
| 42      | 2A      | 00101010 | \*         | &\#42;          |               | Asterisk                                 |
| 43      | 2B      | 00101011 | \+         | &\#43;          |               | Plus                                     |
| 44      | 2C      | 00101100 | ,          | &\#44;          |               | Comma                                    |
| 45      | 2D      | 00101101 | \-         | &\#45;          |               | Hyphen                                   |
| 46      | 2E      | 00101110 | \.         | &\#46;          |               | Period, dot or full stop                 |
| 47      | 2F      | 00101111 | /          | &\#47;          |               | Slash or divide                          |
| 48      | 30      | 00110000 | 0          | &\#48;          |               | Zero                                     |
| 49      | 31      | 00110001 | 1          | &\#49;          |               | One                                      |
| 50      | 32      | 00110010 | 2          | &\#50;          |               | Two                                      |
| 51      | 33      | 00110011 | 3          | &\#51;          |               | Three                                    |
| 52      | 34      | 00110100 | 4          | &\#52;          |               | Four                                     |
| 53      | 35      | 00110101 | 5          | &\#53;          |               | Five                                     |
| 54      | 36      | 00110110 | 6          | &\#54;          |               | Six                                      |
| 55      | 37      | 00110111 | 7          | &\#55;          |               | Seven                                    |
| 56      | 38      | 00111000 | 8          | &\#56;          |               | Eight                                    |
| 57      | 39      | 00111001 | 9          | &\#57;          |               | Nine                                     |
| 58      | 3A      | 00111010 | :          | &\#58;          |               | Colon                                    |
| 59      | 3B      | 00111011 | ;          | &\#59;          |               | Semicolon                                |
| 60      | 3C      | 00111100 | <          | &\#60;          | &lt;          | Less than \(or open angled bracket\)     |
| 61      | 3D      | 00111101 | =          | &\#61;          |               | Equals                                   |
| 62      | 3E      | 00111110 | >          | &\#62;          | &gt;          | Greater than \(or close angled bracket\) |
| 63      | 3F      | 00111111 | ?          | &\#63;          |               | Question mark                            |
| 64      | 40      | 01000000 | @          | &\#64;          |               | At symbol                                |
| 65      | 41      | 01000001 | A          | &\#65;          |               | Uppercase A                              |
| 66      | 42      | 01000010 | B          | &\#66;          |               | Uppercase B                              |
| 67      | 43      | 01000011 | C          | &\#67;          |               | Uppercase C                              |
| 68      | 44      | 01000100 | D          | &\#68;          |               | Uppercase D                              |
| 69      | 45      | 01000101 | E          | &\#69;          |               | Uppercase E                              |
| 70      | 46      | 01000110 | F          | &\#70;          |               | Uppercase F                              |
| 71      | 47      | 01000111 | G          | &\#71;          |               | Uppercase G                              |
| 72      | 48      | 01001000 | H          | &\#72;          |               | Uppercase H                              |
| 73      | 49      | 01001001 | I          | &\#73;          |               | Uppercase I                              |
| 74      | 4A      | 01001010 | J          | &\#74;          |               | Uppercase J                              |
| 75      | 4B      | 01001011 | K          | &\#75;          |               | Uppercase K                              |
| 76      | 4C      | 01001100 | L          | &\#76;          |               | Uppercase L                              |
| 77      | 4D      | 01001101 | M          | &\#77;          |               | Uppercase M                              |
| 78      | 4E      | 01001110 | N          | &\#78;          |               | Uppercase N                              |
| 79      | 4F      | 01001111 | O          | &\#79;          |               | Uppercase O                              |
| 80      | 50      | 01010000 | P          | &\#80;          |               | Uppercase P                              |
| 81      | 51      | 01010001 | Q          | &\#81;          |               | Uppercase Q                              |
| 82      | 52      | 01010010 | R          | &\#82;          |               | Uppercase R                              |
| 83      | 53      | 01010011 | S          | &\#83;          |               | Uppercase S                              |
| 84      | 54      | 01010100 | T          | &\#84;          |               | Uppercase T                              |
| 85      | 55      | 01010101 | U          | &\#85;          |               | Uppercase U                              |
| 86      | 56      | 01010110 | V          | &\#86;          |               | Uppercase V                              |
| 87      | 57      | 01010111 | W          | &\#87;          |               | Uppercase W                              |
| 88      | 58      | 01011000 | X          | &\#88;          |               | Uppercase X                              |
| 89      | 59      | 01011001 | Y          | &\#89;          |               | Uppercase Y                              |
| 90      | 5A      | 01011010 | Z          | &\#90;          |               | Uppercase Z                              |
| 91      | 5B      | 01011011 | \[         | &\#91;          |               | Opening bracket                          |
| 92      | 5C      | 01011100 | \\         | &\#92;          |               | Backslash                                |
| 93      | 5D      | 01011101 | \]         | &\#93;          |               | Closing bracket                          |
| 94      | 5E      | 01011110 | ^          | &\#94;          |               | Caret \- circumflex                      |
| 95      | 5F      | 01011111 | \_         | &\#95;          |               | Underscore                               |
| 96      | 60      | 01100000 | \`         | &\#96;          |               | Grave accent                             |
| 97      | 61      | 01100001 | a          | &\#97;          |               | Lowercase a                              |
| 98      | 62      | 01100010 | b          | &\#98;          |               | Lowercase b                              |
| 99      | 63      | 01100011 | c          | &\#99;          |               | Lowercase c                              |
| 100     | 64      | 01100100 | d          | &\#100;         |               | Lowercase d                              |
| 101     | 65      | 01100101 | e          | &\#101;         |               | Lowercase e                              |
| 102     | 66      | 01100110 | f          | &\#102;         |               | Lowercase f                              |
| 103     | 67      | 01100111 | g          | &\#103;         |               | Lowercase g                              |
| 104     | 68      | 01101000 | h          | &\#104;         |               | Lowercase h                              |
| 105     | 69      | 01101001 | i          | &\#105;         |               | Lowercase i                              |
| 106     | 6A      | 01101010 | j          | &\#106;         |               | Lowercase j                              |
| 107     | 6B      | 01101011 | k          | &\#107;         |               | Lowercase k                              |
| 108     | 6C      | 01101100 | l          | &\#108;         |               | Lowercase l                              |
| 109     | 6D      | 01101101 | m          | &\#109;         |               | Lowercase m                              |
| 110     | 6E      | 01101110 | n          | &\#110;         |               | Lowercase n                              |
| 111     | 6F      | 01101111 | o          | &\#111;         |               | Lowercase o                              |
| 112     | 70      | 01110000 | p          | &\#112;         |               | Lowercase p                              |
| 113     | 71      | 01110001 | q          | &\#113;         |               | Lowercase q                              |
| 114     | 72      | 01110010 | r          | &\#114;         |               | Lowercase r                              |
| 115     | 73      | 01110011 | s          | &\#115;         |               | Lowercase s                              |
| 116     | 74      | 01110100 | t          | &\#116;         |               | Lowercase t                              |
| 117     | 75      | 01110101 | u          | &\#117;         |               | Lowercase u                              |
| 118     | 76      | 01110110 | v          | &\#118;         |               | Lowercase v                              |
| 119     | 77      | 01110111 | w          | &\#119;         |               | Lowercase w                              |
| 120     | 78      | 01111000 | x          | &\#120;         |               | Lowercase x                              |
| 121     | 79      | 01111001 | y          | &\#121;         |               | Lowercase y                              |
| 122     | 7A      | 01111010 | z          | &\#122;         |               | Lowercase z                              |
| 123     | 7B      | 01111011 | \{         | &\#123;         |               | Opening brace                            |
| 124     | 7C      | 01111100 | \|         | &\#124;         |               | Vertical bar                             |
| 125     | 7D      | 01111101 | \}         | &\#125;         |               | Closing brace                            |
| 126     | 7E      | 01111110 | ~          | &\#126;         |               | Equivalency sign \- tilde                |
| 127     | 7F      | 01111111 |            | &\#127;         |               | Delete                                   |

#### The extended ASCII codes (character code 128-255)

| **DEC** | **HEX** | **BIN**  | **Symbol** | **HTML Num** | **HTML Name** | **Description**                             |
|:-------:|:-------:|:--------:|:----------:|:------------:|:-------------:|:-------------------------------------------:|
| 128     | 80      | 10000000 | €          | &\#128;      | &euro;        | Euro sign                                   |
| 129     | 81      | 10000001 |            |              |               |                                             |
| 130     | 82      | 10000010 | ‚          | &\#130;      | &sbquo;       | Single low\-9 quotation mark                |
| 131     | 83      | 10000011 | ƒ          | &\#131;      | &fnof;        | Latin small letter f with hook              |
| 132     | 84      | 10000100 | „          | &\#132;      | &bdquo;       | Double low\-9 quotation mark                |
| 133     | 85      | 10000101 | …          | &\#133;      | &hellip;      | Horizontal ellipsis                         |
| 134     | 86      | 10000110 | †          | &\#134;      | &dagger;      | Dagger                                      |
| 135     | 87      | 10000111 | ‡          | &\#135;      | &Dagger;      | Double dagger                               |
| 136     | 88      | 10001000 | ˆ          | &\#136;      | &circ;        | Modifier letter circumflex accent           |
| 137     | 89      | 10001001 | ‰          | &\#137;      | &permil;      | Per mille sign                              |
| 138     | 8A      | 10001010 | Š          | &\#138;      | &Scaron;      | Latin capital letter S with caron           |
| 139     | 8B      | 10001011 | ‹          | &\#139;      | &lsaquo;      | Single left\-pointing angle quotation       |
| 140     | 8C      | 10001100 | Œ          | &\#140;      | &OElig;       | Latin capital ligature OE                   |
| 141     | 8D      | 10001101 |            |              |               |                                             |
| 142     | 8E      | 10001110 | Ž          | &\#142;      |               | Latin captial letter Z with caron           |
| 143     | 8F      | 10001111 |            |              |               |                                             |
| 144     | 90      | 10010000 |            |              |               |                                             |
| 145     | 91      | 10010001 | ‘          | &\#145;      | &lsquo;       | Left single quotation mark                  |
| 146     | 92      | 10010010 | ’          | &\#146;      | &rsquo;       | Right single quotation mark                 |
| 147     | 93      | 10010011 | “          | &\#147;      | &ldquo;       | Left double quotation mark                  |
| 148     | 94      | 10010100 | ”          | &\#148;      | &rdquo;       | Right double quotation mark                 |
| 149     | 95      | 10010101 | •          | &\#149;      | &bull;        | Bullet                                      |
| 150     | 96      | 10010110 | –          | &\#150;      | &ndash;       | En dash                                     |
| 151     | 97      | 10010111 | —          | &\#151;      | &mdash;       | Em dash                                     |
| 152     | 98      | 10011000 | ˜          | &\#152;      | &tilde;       | Small tilde                                 |
| 153     | 99      | 10011001 | ™          | &\#153;      | &trade;       | Trade mark sign                             |
| 154     | 9A      | 10011010 | š          | &\#154;      | &scaron;      | Latin small letter S with caron             |
| 155     | 9B      | 10011011 | ›          | &\#155;      | &rsaquo;      | Single right\-pointing angle quotation mark |
| 156     | 9C      | 10011100 | œ          | &\#156;      | &oelig;       | Latin small ligature oe                     |
| 157     | 9D      | 10011101 |            |              |               |                                             |
| 158     | 9E      | 10011110 | ž          | &\#158;      |               | Latin small letter z with caron             |
| 159     | 9F      | 10011111 | Ÿ          | &\#159;      | &Yuml;        | Latin capital letter Y with diaeresis       |
| 160     | A0      | 10100000 |            | &\#160;      | &nbsp;        | Non\-breaking space                         |
| 161     | A1      | 10100001 | ¡          | &\#161;      | &iexcl;       | Inverted exclamation mark                   |
| 162     | A2      | 10100010 | ¢          | &\#162;      | &cent;        | Cent sign                                   |
| 163     | A3      | 10100011 | £          | &\#163;      | &pound;       | Pound sign                                  |
| 164     | A4      | 10100100 | ¤          | &\#164;      | &curren;      | Currency sign                               |
| 165     | A5      | 10100101 | ¥          | &\#165;      | &yen;         | Yen sign                                    |
| 166     | A6      | 10100110 | ¦          | &\#166;      | &brvbar;      | Pipe, Broken vertical bar                   |
| 167     | A7      | 10100111 | §          | &\#167;      | &sect;        | Section sign                                |
| 168     | A8      | 10101000 | ¨          | &\#168;      | &uml;         | Spacing diaeresis \- umlaut                 |
| 169     | A9      | 10101001 | ©          | &\#169;      | &copy;        | Copyright sign                              |
| 170     | AA      | 10101010 | ª          | &\#170;      | &ordf;        | Feminine ordinal indicator                  |
| 171     | AB      | 10101011 | «          | &\#171;      | &laquo;       | Left double angle quotes                    |
| 172     | AC      | 10101100 | ¬          | &\#172;      | &not;         | Not sign                                    |
| 173     | AD      | 10101101 | ­          | &\#173;      | &shy;         | Soft hyphen                                 |
| 174     | AE      | 10101110 | ®          | &\#174;      | &reg;         | Registered trade mark sign                  |
| 175     | AF      | 10101111 | ¯          | &\#175;      | &macr;        | Spacing macron \- overline                  |
| 176     | B0      | 10110000 | °          | &\#176;      | &deg;         | Degree sign                                 |
| 177     | B1      | 10110001 | ±          | &\#177;      | &plusmn;      | Plus\-or\-minus sign                        |
| 178     | B2      | 10110010 | ²          | &\#178;      | &sup2;        | Superscript two \- squared                  |
| 179     | B3      | 10110011 | ³          | &\#179;      | &sup3;        | Superscript three \- cubed                  |
| 180     | B4      | 10110100 | ´          | &\#180;      | &acute;       | Acute accent \- spacing acute               |
| 181     | B5      | 10110101 | µ          | &\#181;      | &micro;       | Micro sign                                  |
| 182     | B6      | 10110110 | ¶          | &\#182;      | &para;        | Pilcrow sign \- paragraph sign              |
| 183     | B7      | 10110111 | ·          | &\#183;      | &middot;      | Middle dot \- Georgian comma                |
| 184     | B8      | 10111000 | ¸          | &\#184;      | &cedil;       | Spacing cedilla                             |
| 185     | B9      | 10111001 | ¹          | &\#185;      | &sup1;        | Superscript one                             |
| 186     | BA      | 10111010 | º          | &\#186;      | &ordm;        | Masculine ordinal indicator                 |
| 187     | BB      | 10111011 | »          | &\#187;      | &raquo;       | Right double angle quotes                   |
| 188     | BC      | 10111100 | ¼          | &\#188;      | &frac14;      | Fraction one quarter                        |
| 189     | BD      | 10111101 | ½          | &\#189;      | &frac12;      | Fraction one half                           |
| 190     | BE      | 10111110 | ¾          | &\#190;      | &frac34;      | Fraction three quarters                     |
| 191     | BF      | 10111111 | ¿          | &\#191;      | &iquest;      | Inverted question mark                      |
| 192     | C0      | 11000000 | À          | &\#192;      | &Agrave;      | Latin capital letter A with grave           |
| 193     | C1      | 11000001 | Á          | &\#193;      | &Aacute;      | Latin capital letter A with acute           |
| 194     | C2      | 11000010 | Â          | &\#194;      | &Acirc;       | Latin capital letter A with circumflex      |
| 195     | C3      | 11000011 | Ã          | &\#195;      | &Atilde;      | Latin capital letter A with tilde           |
| 196     | C4      | 11000100 | Ä          | &\#196;      | &Auml;        | Latin capital letter A with diaeresis       |
| 197     | C5      | 11000101 | Å          | &\#197;      | &Aring;       | Latin capital letter A with ring above      |
| 198     | C6      | 11000110 | Æ          | &\#198;      | &AElig;       | Latin capital letter AE                     |
| 199     | C7      | 11000111 | Ç          | &\#199;      | &Ccedil;      | Latin capital letter C with cedilla         |
| 200     | C8      | 11001000 | È          | &\#200;      | &Egrave;      | Latin capital letter E with grave           |
| 201     | C9      | 11001001 | É          | &\#201;      | &Eacute;      | Latin capital letter E with acute           |
| 202     | CA      | 11001010 | Ê          | &\#202;      | &Ecirc;       | Latin capital letter E with circumflex      |
| 203     | CB      | 11001011 | Ë          | &\#203;      | &Euml;        | Latin capital letter E with diaeresis       |
| 204     | CC      | 11001100 | Ì          | &\#204;      | &Igrave;      | Latin capital letter I with grave           |
| 205     | CD      | 11001101 | Í          | &\#205;      | &Iacute;      | Latin capital letter I with acute           |
| 206     | CE      | 11001110 | Î          | &\#206;      | &Icirc;       | Latin capital letter I with circumflex      |
| 207     | CF      | 11001111 | Ï          | &\#207;      | &Iuml;        | Latin capital letter I with diaeresis       |
| 208     | D0      | 11010000 | Ð          | &\#208;      | &ETH;         | Latin capital letter ETH                    |
| 209     | D1      | 11010001 | Ñ          | &\#209;      | &Ntilde;      | Latin capital letter N with tilde           |
| 210     | D2      | 11010010 | Ò          | &\#210;      | &Ograve;      | Latin capital letter O with grave           |
| 211     | D3      | 11010011 | Ó          | &\#211;      | &Oacute;      | Latin capital letter O with acute           |
| 212     | D4      | 11010100 | Ô          | &\#212;      | &Ocirc;       | Latin capital letter O with circumflex      |
| 213     | D5      | 11010101 | Õ          | &\#213;      | &Otilde;      | Latin capital letter O with tilde           |
| 214     | D6      | 11010110 | Ö          | &\#214;      | &Ouml;        | Latin capital letter O with diaeresis       |
| 215     | D7      | 11010111 | ×          | &\#215;      | &times;       | Multiplication sign                         |
| 216     | D8      | 11011000 | Ø          | &\#216;      | &Oslash;      | Latin capital letter O with slash           |
| 217     | D9      | 11011001 | Ù          | &\#217;      | &Ugrave;      | Latin capital letter U with grave           |
| 218     | DA      | 11011010 | Ú          | &\#218;      | &Uacute;      | Latin capital letter U with acute           |
| 219     | DB      | 11011011 | Û          | &\#219;      | &Ucirc;       | Latin capital letter U with circumflex      |
| 220     | DC      | 11011100 | Ü          | &\#220;      | &Uuml;        | Latin capital letter U with diaeresis       |
| 221     | DD      | 11011101 | Ý          | &\#221;      | &Yacute;      | Latin capital letter Y with acute           |
| 222     | DE      | 11011110 | Þ          | &\#222;      | &THORN;       | Latin capital letter THORN                  |
| 223     | DF      | 11011111 | ß          | &\#223;      | &szlig;       | Latin small letter sharp s \- ess\-zed      |
| 224     | E0      | 11100000 | à          | &\#224;      | &agrave;      | Latin small letter a with grave             |
| 225     | E1      | 11100001 | á          | &\#225;      | &aacute;      | Latin small letter a with acute             |
| 226     | E2      | 11100010 | â          | &\#226;      | &acirc;       | Latin small letter a with circumflex        |
| 227     | E3      | 11100011 | ã          | &\#227;      | &atilde;      | Latin small letter a with tilde             |
| 228     | E4      | 11100100 | ä          | &\#228;      | &auml;        | Latin small letter a with diaeresis         |
| 229     | E5      | 11100101 | å          | &\#229;      | &aring;       | Latin small letter a with ring above        |
| 230     | E6      | 11100110 | æ          | &\#230;      | &aelig;       | Latin small letter ae                       |
| 231     | E7      | 11100111 | ç          | &\#231;      | &ccedil;      | Latin small letter c with cedilla           |
| 232     | E8      | 11101000 | è          | &\#232;      | &egrave;      | Latin small letter e with grave             |
| 233     | E9      | 11101001 | é          | &\#233;      | &eacute;      | Latin small letter e with acute             |
| 234     | EA      | 11101010 | ê          | &\#234;      | &ecirc;       | Latin small letter e with circumflex        |
| 235     | EB      | 11101011 | ë          | &\#235;      | &euml;        | Latin small letter e with diaeresis         |
| 236     | EC      | 11101100 | ì          | &\#236;      | &igrave;      | Latin small letter i with grave             |
| 237     | ED      | 11101101 | í          | &\#237;      | &iacute;      | Latin small letter i with acute             |
| 238     | EE      | 11101110 | î          | &\#238;      | &icirc;       | Latin small letter i with circumflex        |
| 239     | EF      | 11101111 | ï          | &\#239;      | &iuml;        | Latin small letter i with diaeresis         |
| 240     | F0      | 11110000 | ð          | &\#240;      | &eth;         | Latin small letter eth                      |
| 241     | F1      | 11110001 | ñ          | &\#241;      | &ntilde;      | Latin small letter n with tilde             |
| 242     | F2      | 11110010 | ò          | &\#242;      | &ograve;      | Latin small letter o with grave             |
| 243     | F3      | 11110011 | ó          | &\#243;      | &oacute;      | Latin small letter o with acute             |
| 244     | F4      | 11110100 | ô          | &\#244;      | &ocirc;       | Latin small letter o with circumflex        |
| 245     | F5      | 11110101 | õ          | &\#245;      | &otilde;      | Latin small letter o with tilde             |
| 246     | F6      | 11110110 | ö          | &\#246;      | &ouml;        | Latin small letter o with diaeresis         |
| 247     | F7      | 11110111 | ÷          | &\#247;      | &divide;      | Division sign                               |
| 248     | F8      | 11111000 | ø          | &\#248;      | &oslash;      | Latin small letter o with slash             |
| 249     | F9      | 11111001 | ù          | &\#249;      | &ugrave;      | Latin small letter u with grave             |
| 250     | FA      | 11111010 | ú          | &\#250;      | &uacute;      | Latin small letter u with acute             |
| 251     | FB      | 11111011 | û          | &\#251;      | &ucirc;       | Latin small letter u with circumflex        |
| 252     | FC      | 11111100 | ü          | &\#252;      | &uuml;        | Latin small letter u with diaeresis         |
| 253     | FD      | 11111101 | ý          | &\#253;      | &yacute;      | Latin small letter y with acute             |
| 254     | FE      | 11111110 | þ          | &\#254;      | &thorn;       | Latin small letter thorn                    |
| 255     | FF      | 11111111 | ÿ          | &\#255;      | &yuml;        | Latin small letter y with diaeresis         |


CR意思是carriage return，回车，\r，ASCII码为13

LF意思是linefeed，换行，\n，ASCII码为10


## 判断是不是标识符的一部分
```js
  // Test whether a given character is part of an identifier.

  function isIdentifierChar(code, astral) {
    if (code < 48) { return code === 36 }
    if (code < 58) { return true }
    if (code < 65) { return false }
    if (code < 91) { return true }
    if (code < 97) { return code === 95 }
    if (code < 123) { return true }
    if (code <= 0xffff) { return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code)) }
    if (astral === false) { return false }
    return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes)
  }
```

```js
  // Called at the end of every token. Sets `end`, `val`, and
  // maintains `context` and `exprAllowed`, and skips the space after
  // the token, so that the next one's `start` will point at the
  // right position.

  pp$9.finishToken = function(type, val) {
    this.end = this.pos;
    if (this.options.locations) { this.endLoc = this.curPosition(); }
    var prevType = this.type;
    this.type = type;
    this.value = val;

    this.updateContext(prevType);
  };
```

