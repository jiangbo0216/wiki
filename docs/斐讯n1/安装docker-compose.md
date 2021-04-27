**引用一篇文章：HOW TO RUN DOCKER AND DOCKER-COMPOSE ON RASPBIAN**

> https://manre-universe.net/how-to-run-docker-and-docker-compose-on-raspbian/
>
> October 21, 2018
>
> # HOW TO RUN DOCKER AND DOCKER-COMPOSE ON RASPBIAN
>
> Since [taganga](http://ta-ganga.co/) v2 now uses multiple machines, I want to try if a RPi can help me save a few bucks monthly. So here are the steps to install docker and docker-compose into a RPi with Raspian > 9 (`cat /etc/os-release`).
>
> # INSTALLING DOCKER
>
> So here we go…
>
> ```
> curl -fsSL get.docker.com -o get-docker.sh && sh get-docker.sh
> ```
>
> After a looong time hopefully you will have installed docker, now let’s do some last tweaks.
>
> ### CREATE A DOCKER GROUP
>
> ```
> sudo groupadd docker
> ```
>
> ### ADD YOUR USER TO THE DOCKER GROUP YOU JUST CREATED
>
> ```
> sudo gpasswd -a pi docker
> ```
>
> And that’s it, you just have to restart and we’re done. To try it you should be able to run
>
> ```
> docker run hello-world
> ```
>
> # INSTALLING DOCKER-COMPOSE
>
> Update your packages
>
> ```
> sudo apt-get update
> ```
>
> Install almighty python and pip
>
> ```
> sudo apt-get install -y python python-pip
> ```
>
> And lastly…
>
> ```
> sudo pip install docker-compose
> ```
>
> And that’s it, you should now be able to run
>
> `docker-compose build` in your project.
>
> Have fun!
>
> **Main sources**:
>
> - https://medium.freecodecamp.org/the-easy-way-to-set-up-docker-on-a-raspberry-pi-7d24ced073ef
> - https://withblue.ink/2017/12/31/yes-you-can-run-docker-on-raspbian.html

**接下来进入实战**

查看docker版本，Python版本

```
root@aml:~# docker -v
Docker version 19.03.5, build 633a0ea
root@aml:~# whereis python
python: /usr/bin/python3.7m /usr/bin/python3.7 /usr/lib/python2.7 /usr/lib/python3.7 /etc/python3.7 /usr/local/lib/python3.7
root@aml:~# python3 -V
Python 3.7.3
```

安装docker-compose

> 若提示 `sudo: pip: command not found`
> 直接用包管理器安装 pip `sudo apt-get install python-pip`

```
root@aml:~# pip install docker-compose
The directory '/root/.cache/pip/http' or its parent directory is not owned by the current user and the cache has been disabled. Please check the permissions and owner of that directory. If executing pip with sudo, you may want sudo's -H flag.
The directory '/root/.cache/pip' or its parent directory is not owned by the current user and caching wheels has been disabled. check the permissions and owner of that directory. If executing pip with sudo, you may want sudo's -H flag.
Collecting docker-compose
  Downloading https://files.pythonhosted.org/packages/2e/93/b8fb6532487fcc40f5c607ac428a609e7f74bfb26a1c3c980a253c6e5a14/docker_compose-1.25.0-py2.py3-none-any.whl (137kB)
    100% |████████████████████████████████| 143kB 1.0MB/s 
Collecting websocket-client<1,>=0.32.0 (from docker-compose)
  Downloading https://files.pythonhosted.org/packages/29/19/44753eab1fdb50770ac69605527e8859468f3c0fd7dc5a76dd9c4dbd7906/websocket_client-0.56.0-py2.py3-none-any.whl (200kB)
    100% |████████████████████████████████| 204kB 979kB/s 
Collecting texttable<2,>=0.9.0 (from docker-compose)
  Downloading https://files.pythonhosted.org/packages/82/a8/60df592e3a100a1f83928795aca210414d72cebdc6e4e0c95a6d8ac632fe/texttable-1.6.2.tar.gz
    Complete output from command python setup.py egg_info:
    Traceback (most recent call last):
      File "<string>", line 1, in <module>
    ImportError: No module named setuptools
    
    ----------------------------------------
Command "python setup.py egg_info" failed with error code 1 in /tmp/pip-install-5xeTQL/texttable/
```

提示：`ImportError: No module named setuptools`

[![img](https://s1.ax1x.com/2020/06/09/t5qa60.png)](https://s1.ax1x.com/2020/06/09/t5qa60.png)

安装 `setuptools`：

```
Python 2.x:    sudo apt-get install python-setuptools
Python 3.x:    sudo apt-get install python3-setuptools
```

[![img](https://s1.ax1x.com/2020/06/09/t5qNpn.png)](https://s1.ax1x.com/2020/06/09/t5qNpn.png)

再次运行 `docker-compose`：

```
pip install docker-compose
```

[![img](https://s1.ax1x.com/2020/06/09/t5qdXV.png)](https://s1.ax1x.com/2020/06/09/t5qdXV.png)

报错 `error: command 'aarch64-linux-gnu-gcc' failed with exit status 1`

[![img](https://s1.ax1x.com/2020/06/09/t5qUlq.png)](https://s1.ax1x.com/2020/06/09/t5qUlq.png)

出现这个错误的原因可能是，python依赖没有装全。

```
root@aml:~# sudo apt-get install python-dev python-pip libxml2-dev libxslt1-dev zlib1g-dev libffi-dev libssl-dev
```

再次运行 `pip install docker-compose`：

[![img](https://s1.ax1x.com/2020/06/09/t5qYfs.png)](https://s1.ax1x.com/2020/06/09/t5qYfs.png)

> ps: 如果出现下面错误，耐心等待就行
>
> 
>
> [![img](https://s1.ax1x.com/2020/06/09/t5q0mT.png)](https://s1.ax1x.com/2020/06/09/t5q0mT.png)
>
> **记得会卡到这个位置**
>
> [![img](https://s1.ax1x.com/2020/06/09/t5qB0U.png)](https://s1.ax1x.com/2020/06/09/t5qB0U.png)
>
> **最终会安装完成的，应该还是有依赖包没装完整**
>
> [![img](https://s1.ax1x.com/2020/06/09/t5qD7F.png)](https://s1.ax1x.com/2020/06/09/t5qD7F.png)