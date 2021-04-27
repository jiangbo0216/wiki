## 项目中使用的入口函数名为 wmain
参考: https://docs.microsoft.com/zh-cn/cpp/build/reference/entry-entry-point-symbol?view=vs-2019
实验后发现使用 wmain -> main 也是可以的

| 功能名称Function name                                                                    | 默认值为Default for                                                                                                                                                                                 |
|--------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| mainCRTStartup \(或wmainCRTStartup\)mainCRTStartup \(or wmainCRTStartup\)             | 使用 /subsystem: console; 的应用程序调用main\(或wmain\)An application that uses /SUBSYSTEM:CONSOLE; calls main \(or wmain\)                                                                               |
| WinMainCRTStartup \(或wWinMainCRTStartup\)WinMainCRTStartup \(or wWinMainCRTStartup\) | 使用 /SUBSYSTEM 的应用程序：WINDOWS; 调用WinMain\(或wWinMain\)，必须对其进行定义以使用 \_\_stdcallAn application that uses /SUBSYSTEM:WINDOWS; calls WinMain \(or wWinMain\), which must be defined to use \_\_stdcall |
| \_DllMainCRTStartup\_DllMainCRTStartup                                               | DLL;调用DllMain如果存在，其必须进行定义以使用 \_\_stdcallA DLL; calls DllMain if it exists, which must be defined to use \_\_stdcall                                                                             |
