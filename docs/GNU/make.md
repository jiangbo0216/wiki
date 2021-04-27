[GNU Make](https://www.gnu.org/software/make/)

Make 的功能
* Make使最终用户能够构建和安装您的包，而不需要了解如何完成这些工作的细节——因为这些细节记录在您提供的makefile中。
* 根据已更改的源文件，自动确定需要更新哪些文件。如果一个非源文件依赖于另一个非源文件，它还会自动确定更新文件的正确顺序。因此，如果您更改了几个源文件，然后运行Make，则不需要重新编译所有程序。它只更新那些非源文件
* Make不限于任何特定的语言。对于程序中的每个非源文件，makefile指定用于计算它的shell命令。这些shell命令可以运行编译器来生成目标文件、链接器来生成可执行文件、ar来更新库、TeX或Makeinfo来格式化文档。
* Make并不局限于构建一个包。您还可以使用Make来控制一个包的安装或卸载，为它生成标记表，或其他任何您经常想要做的事情，以使它值得您写下如何去做。

## [manual](https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents)

