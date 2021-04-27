## 由来
在使用Android Studio作为IDE开发Android的应用的时候，我们可以直接使用IDE集成的build工具对应用进行编译打包，也可以使用命令行的形式执行gradle命令来做同样的事情，也就是基于gradle来构建android应用的build系统。在需要用到gradle的时候，我们可以在我们的电脑上安装gradle，然后配置好环境变量后就可以使用了。但是当我们把项目分享给电脑上没有gradle的人时，问题就来了。或者我们在一个没有装gradle的server上build的时候也会出现同样的问题。

所以基于此，gradle系统引入了我们今天的主角-gralde wrapper: 一个gradle的封装体。有了gradle wrapper，即便你的机器上没有安装gradle，也可以执行gradle的构建工作了。

## 创建
想使用gradle wrapper，首先要在你的项目中创建。具体来说就是在build.gradle里面加入类似于下面的task：

// File: build.gradle
task createWrapper(type: Wrapper) {
    gradleVersion = '0.9-preview-1'
}
什么原理？ 其实很简单：在生成gradle wrapper的时候指定项目所需要用的gradle版本，这样当别人用gradle wrapper的时候，

然后执行该task： $ gradle createWrapper

就会在项目工程生成以下的文件：

Project-name/
  gradlew
  gradlew.bat
  gradle/wrapper/
    gradle-wrapper.jar
    gradle-wrapper.properties
这些文件构成了我们的gradle wrapper。

需要注意的是：这些文件需要上传到版本控制工具(例如git, svn)的server端。生成这些文件的操作只需要做一次即可。

## 使用
需要使用gradle wrapper的时候，我们就直接在项目根目录下直接执行gradlew(gradle wrapper的简写), 使用gradlew的方式和gradle一模一样, 例如通过gradlew tasks来查看所有的任务。事实上，执行gradlew命令的时候，gradlew会委托gradle命令来做相应的事情，所以gradlew真的只是一个壳而已。

当执行gradlew的时候，wrapper会检查当前机器是否已经安装了对应版本的gradle，如果安装了那么gradlew就会委托gradle执行用户输入的命令。如果还未安装的话，那么首先会自动帮我们从gradle repository下载安装。当然你也可以在配置文件中指定想要下载的server来替代默认的gradle repo。

不过需要说明的是，假如你是用android studio新建的项目，它会自动为新建的工程添加wrapper。也就是你就不必自己再去创建gradle wrapper了，直接在命令行或者你的编译脚本中使用就好了。

## 使用场景1
编写脚本，调用gradlew来进行项目的每日构建。或者当你想同时编译多个项目的时候，也可以通过此形式轻松实现，这一点上会比使用Android Studio方便不少。

## 使用场景2
用于编译第三方应用：当我们从github或者其他地方拿到一个其他人的Android应用的项目代码的时候，假如该项目也是基于Android studio或者gradle开发的，那么我们也可以借助gradlew进行编译从而生成apk。一般来说只需要两条命令就搞定了：

gradlew clean

gradlew build
怎么样，是不是很方便？免去了很多实用Android导入、编译带来的痛苦了。

## 调用gradlew的原理
对于window是平台，我们可以看到一个`bat`脚本，这个`bat`脚本完成了从`gradlew.bat`调用`gradle`命令的工作，我们的`gradle wrapper`是一个`jar`包，是一个可执行的`jar`包，通过本机的java环境来运行gradle，下面这个脚本文件通过设置java的环境完成了对android工程下`%APP_HOME%\gradle\wrapper\gradle-wrapper.jar`的调用。
```bat
@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  Gradle startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto init

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto init

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:init
@rem Get command-line arguments, handling Windows variants

if not "%OS%" == "Windows_NT" goto win9xME_args

:win9xME_args
@rem Slurp the command line arguments.
set CMD_LINE_ARGS=
set _SKIP=2

:win9xME_args_slurp
if "x%~1" == "x" goto execute

set CMD_LINE_ARGS=%*

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\gradle\wrapper\gradle-wrapper.jar

@rem Execute Gradle
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=%APP_BASE_NAME%" -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %CMD_LINE_ARGS%

:end
@rem End local scope for the variables with windows NT shell
if "%ERRORLEVEL%"=="0" goto mainEnd

:fail
rem Set variable GRADLE_EXIT_CONSOLE if you need the _script_ return code instead of
rem the _cmd.exe /c_ return code!
if  not "" == "%GRADLE_EXIT_CONSOLE%" exit 1
exit /b 1

:mainEnd
if "%OS%"=="Windows_NT" endlocal

:omega

```

## [依赖文件的位置](https://blog.csdn.net/T_yoo_csdn/article/details/80016601)

```
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    compile project(':social_sdk_library_project')
    compile 'com.android.support:appcompat-v7:22.2.0'
    compile 'com.github.chrisbanes.photoview:library:1.2.3'
    compile 'com.android.support:support-v4:22.2.0'
    compile 'com.jakewharton:butterknife:6.1.0'
    compile 'com.networkbench.newlens.agent.android:nbs.newlens.agent:2.2.5'
    compile 'com.google.zxing:core:3.2.0'
    compile 'com.joanzapata.android:android-iconify:1.0.9'
    compile 'com.loopj.android:android-async-http:1.4.8'
}

```
上面这些module下的依赖包存放位置。
在AndroidStudio中的"External Libraries"下有引用的library的列表, 选择某个library右键->"Library Properties ..."就可以看到你引用的库本地的存放路径了, 如下图:

![20191221182710.png](https://raw.githubusercontent.com/jiangbo0216/wiki/pic-bed/20191221182710.png)



1. 项目根目录下build.gradle文件的 dependencies

```
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:2.2.2'
        classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.7.1'
        classpath 'com.github.dcendents:android-maven-gradle-plugin:1.4.1'
    }
}
 
subprojects {
    repositories {
        jcenter()
    }
}


```
在windows上，上述三个依赖的保存路径分别是：

~\.gradle\caches\modules-2\files-2.1\com.android.tools.build\gradle\2.2.2

~\.gradle\caches\modules-2\files-2.1\com.jfrog.bintray.gradle\gradle-bintray-plugin\1.7.1

~\.gradle\caches\modules-2\files-2.1\com.github.dcendents\android-maven-gradle-plugin\1.4.1



2. module下的build.gradle文件的 dependencies


1). compile 'com.android.support:appcompat-v7:25.0.0'
是android自己的jar包，gradle构建时若发现本地没有该jar包则会去联网下载，放在SDK的目录下
D:\android\sdk\extras\android\m2repository\com\android\support\appcompat-v7\25.0.0\  
这个目录下; 若发现本地已经有了则直接使用。
2). compile 'com.jakewharton.rxbinding:rxbinding:0.4.0'
第三方jar包，gradle构建时若发现本地没有该jar包则会去联网到中央仓库下载rxbinding 0.4.0的jar包
~\.gradle\caches\modules-2\files-2.1\com.jakewharton.rxbinding\rxbinding\0.4.0 
这个目录下;  若发现本地已经有了则直接使用。


## [Gradle是什么？](https://www.jianshu.com/p/3c5ef7e8a8a5)
Gradle 是一个JVM平台上的自动化的构建工具，支持多项目构建,强有力依赖管理(本地或者远程依赖)，构建脚本使用Groovy语言编写。

在Android Studio的 project 视图下的 gradle/ wrapper/gradle-wrapper.properties 路径下声明了项目使用的Gradle版本号，这里使用的是 3.3版本

```
distributionUrl=https\://services.gradle.org/distributions/gradle-3.3-all.zip

```
## Gradle Android Plugin 是什么？
在项目根目录中的build.gradle文件中有如下设置：

```
dependencies {
        classpath 'com.android.tools.build:gradle:2.3.3'
    }

```    
这里声明的是项目对 Gradle Android Plugin 的依赖，其版本号为2.3.3。Gradle的Android插件提供了许多专为构建Android的操作项。
路径是~\.gradle\caches\modules-2\files-2.1\com.android.tools.build\gradle\2.3.3

可以看到，我们依赖的仅仅就是jar文件，build.gradle的脚本是使用Groovy语言编写的，Groovy编写的程序可以运行在JVM虚拟机中。而Android Plugin for Gradle是专门为构建Android项目提供库文件。

平时我们经常使用的比如 buildToolsVersion、compileSdkVersion，buildTypes{ }、sourceSets { }、defaultConfig{ }等方法函数(是的，就是方法，这是Groovy语言中的闭包和函数调用时的特性，现在无需关心，后面第三部分有讲到这个)，都是Gradle Android Plugin 这个库提供的方法。可不要以为Gradle仅仅是用来构建Android项目。

## 3.Android Studio中的compileSdkVersion、buildToolsVersion、minSdkVersion、targetSdkVersion这些配置项是什么？
compileSdkVersion 26 :编译项目使用的Android SDK的版本号为26,可以使用对应版本号提供的API进行编程
minSdkVersion 14 ：定义最小可以运行app的android系统版本号为14
targetSdkVersion 26 ：指定测试app的android系统版本号为26
buildToolsVersion "26.0.2" :指定Android Studio中 sdk 构建工具的版本号、命令行工具等构建工具，在使用Android plugin 3.0.0版本或以上时，该属性可以不用设置，插件会提供默认版本号。
在导入github上面的工程时，如果该工程所需要的Gradle版本、Android Plugin版本、buildToolsVersion版本，SDK 版本与你本地不符合时，往往会卡死，所以在导入之前可以更改为你本地的版本，在进行导入即可。

## 关于Android Studio 工程项目你需要知道的一些东西
Android Studio项目工程包含一个Application module,包含若干个Library module。 Library module可以是Android library，也可以是java library。
Android Library : 包含Android项目中的源代码、资源文件、manifest文件，被编译为AAR文件。AAR文件可做为Android 应用模块的依赖。
java library : 仅包含java源文件，编译的结果为JAR文件，可作为Android 应用模块的依赖或者java 项目的依赖。
每个module都可以被单独的构建，测试与调试，同时moudle可用来作为其他工程使用的library。
