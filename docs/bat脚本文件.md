```bat
:: 不要输出路径提示符
@if not defined DEBUG_HELPER @ECHO OFF

:: 获取第一参数,判断
if /i "%1"=="help" goto help
if /i "%1"=="--help" goto help
if /i "%1"=="-help" goto help
if /i "%1"=="/help" goto help
if /i "%1"=="?" goto help
if /i "%1"=="-?" goto help
if /i "%1"=="--?" goto help
if /i "%1"=="/?" goto help

:: setlocal和endlocal命令执行结果是让中间的程序对于系统变量的改变只在程序内起作用，不会影响整个系统级别。
:: Other scripts rely on the environment variables set in this script, so we
:: explicitly allow them to persist in the calling shell.
endlocal
:: 进入本路径
cd %~dp0 

echo "DISTTYPE is not release, custom, nightly or next-nightly"
:: 等待输入
set /p input=
echo %input%
goto :EOF
```

