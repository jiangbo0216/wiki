## [dot Revisited](https://homepages.uc.edu/~thomam/Intro_Unix_Text/Shell_Prog.html#:~:text=A%20shell%20program%2C%20sometimes%20referred,single%20line%20at%20a%20time.)

We have seen the use of the dot character to be used as a reference to where we currently are in the file system hierarchy. There are additional uses for dot within the shell, with their meaning based upon the contextual usage as follows:

1. used to specify your current position in the filesystem hierarchy, for example, cp /home/mthomas/foo .

   

2. used to specify a file is a hidden file, when used as the first character of the file name, with no trailing space(s). For example,

   .profile

   

3. used as an internal part of the filename. This can be merely a part of the filename, as in rc.local, or an indicator as to what the file contains, for example, foo.cpp (a C++ source file) or a**.**out

   

4. used to specify that a program should be run in the current shell process rather than creating a child, for example, **.** user_setup. With white space following the dot, the commands in the program are interpreted as if they were entered into the current shell.

Thus given the following (hypothetical) example, try to identify the meaning of each dot:

![img](dot%E4%B8%8A%E4%B8%8B%E6%96%87-imgs/4dots.png)

From left to right, the first (leftmost) dot has whitespace on its right, and precedes a command, so this is context # 4, specifying that the program **.**setup**.**sh be run without spawning a child process. Note the name of this file is **.**setup**.**sh, that is dot-setup-dot-sh. The next dot precedes a / indicating this is a relative file specification referencing our current position in the file system, thus context # 1. The third dot has no whitespace following it, thus context # 2, i.e. specifying a hidden file. And the rightmost dot is in the middle of the filename, so this describes a file extension, context # 3.

It is noteworthy here to mention that identical characters, operators, or commands mean different things to different applications. For example, the dot character has a different meaning within the shell than it does to the vi editor application, or than it does to other applications. A user must always remember what application they are interacting with, and to use the language that application understands.