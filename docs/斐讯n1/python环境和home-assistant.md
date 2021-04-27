# [树莓派/斐讯N1/ARMBIAN/安装HOME ASSISTANT](http://www.awccc.com/2849)

1.[树莓派](http://www.awccc.com/tag/树莓派/)更换国内apt源(可选，中国大陆必须)

```
sudo suecho 'deb http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ stretch main contrib non-free rpi' > /etc/apt/sources.listecho 'deb-src http://mirrors.tuna.tsinghua.edu.cn/raspbian/raspbian/ stretch main contrib non-free rpi' >> /etc/apt/sources.listecho 'deb http://mirror.tuna.tsinghua.edu.cn/raspberrypi/ stretch main ui' > /etc/apt/sources.list.d/raspi.listecho 'deb-src http://mirror.tuna.tsinghua.edu.cn/raspberrypi/ stretch main ui' >> /etc/apt/sources.list.d/raspi.listapt-get updateexit
```

[斐讯](http://www.awccc.com/tag/斐讯/)N1 ArmBian换apt源(可选，中国大陆必须)
``

```
sudo suecho 'deb http://mirrors.ustc.edu.cn/debian stretch main contrib non-free' > /etc/apt/sources.listecho 'deb http://mirrors.ustc.edu.cn/debian stretch-updates main contrib non-free' > /etc/apt/sources.listecho 'deb http://mirrors.ustc.edu.cn/debian stretch-backports main contrib non-free' > /etc/apt/sources.listecho 'deb http://mirrors.ustc.edu.cn/debian-security/ stretch/updates main contrib non-free' > /etc/apt/sources.listapt-get updateexit
```

``

2.安装依Python3运行环境
``

```
sudo apt-get -y install python3-pip build-essential libssl-dev libffi-dev python-dev openssl libssl-dev python3-cffi python3-setuptools python3-cryptography python3-bcrypt python-cryptography python-bcrypt python3-dev
```

``

3.修改阿里云pip源(可选，中国大陆必须)
``

```
sudo sumv /etc/pip.conf /etc/pip.conf.bakecho '[global]' > /etc/pip.confecho 'timeout = 6000' >> /etc/pip.confecho 'index-url = https://mirrors.aliyun.com/pypi/simple/' >> /etc/pip.confecho 'trusted-host = mirrors.aliyun.com' >> /etc/pip.confexit
```

``

4.安装python依赖包

```
pip3 install requestspip3 install sqlalchemypip3 install distropip3 install hass-nabucasapip3 install xmltodictpip3 install mutagenpip3 install netdiscopip3 install pynaclpip3 install pyotppip3 install pyqrcodepip3 install aiohttppip3 install aiohttp_corspip3 install cryptographypip3 install gtts-tokenpip3 install hass-nabucasasudo pip3 install pycryptodomesudo pip3 install --upgrade pip
```

5.安装Home Assistant

```
sudo pip3 install homeassistant
```

6.手动启动测试一下是否正常,启动过程中会自动安装一些依赖包，耐心等待。

```
hass
```

7.创建系统服务

```
sudo chown -R $USER /tmpecho $USER > /tmp/user.txtsudo suUSER1=`cat /tmp/user.txt`echo '[Unit]' > /etc/systemd/system/hass.serviceecho 'Description=Home Assistant Service' >> /etc/systemd/system/hass.serviceecho 'After=network.target' >> /etc/systemd/system/hass.serviceecho 'Wants=network.target' >> /etc/systemd/system/hass.serviceecho '[Service]' >> /etc/systemd/system/hass.serviceecho 'User='$USER1 >> /etc/systemd/system/hass.serviceecho 'Type=simple' >> /etc/systemd/system/hass.serviceecho 'ExecStartPre=/bin/sleep 3' >> /etc/systemd/system/hass.serviceecho 'ExecStart=/usr/local/bin/hass' >> /etc/systemd/system/hass.serviceecho 'Restart=always' >> /etc/systemd/system/hass.serviceecho '[Install]' >> /etc/systemd/system/hass.serviceecho 'WantedBy=multi-user.target' >> /etc/systemd/system/hass.serviceexit
```

8.添加开机启动并启动Home Assistant

```
sudo systemctl enable hasssudo systemctl start hass
```

打开Home Assistant 界面

http://xxx.xxx.xxx.xxx:8123