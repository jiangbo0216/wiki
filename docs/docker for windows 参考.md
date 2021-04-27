[
    {
        "Id": "daabe8b2084b025952b283b5e7875f9c9d249d38dfc3dbde338ffa743c0bc5dc",
        "Created": "2019-10-12T06:44:23.6262279Z",
        "Path": "bash",
        "Args": [],
        "State": {
            "Status": "running",
            "Running": true,
            "Paused": false,
            "Restarting": false,
            "OOMKilled": false,
            "Dead": false,
            "Pid": 2899,
            "ExitCode": 0,
            "Error": "",
            "StartedAt": "2019-10-13T02:40:02.4809324Z",
            "FinishedAt": "2019-10-13T02:32:50.9750624Z"
        },
        "Image": "sha256:47639e2f9ed7c8062778202637371ec6c0b2e80b65f22352aec3f402f276ab87",
        "ResolvConfPath": "/var/lib/docker/containers/daabe8b2084b025952b283b5e7875f9c9d249d38dfc3dbde338ffa743c0bc5dc/resolv.conf",
        "HostnamePath": "/var/lib/docker/containers/daabe8b2084b025952b283b5e7875f9c9d249d38dfc3dbde338ffa743c0bc5dc/hostname",
        "HostsPath": "/var/lib/docker/containers/daabe8b2084b025952b283b5e7875f9c9d249d38dfc3dbde338ffa743c0bc5dc/hosts",
        "LogPath": "/var/lib/docker/containers/daabe8b2084b025952b283b5e7875f9c9d249d38dfc3dbde338ffa743c0bc5dc/daabe8b2084b025952b283b5e7875f9c9d249d38dfc3dbde338ffa743c0bc5dc-json.log",
        "Name": "/dev-env",
        "RestartCount": 0,
        "Driver": "overlay2",
        "Platform": "linux",
        "MountLabel": "",
        "ProcessLabel": "",
        "AppArmorProfile": "",
        "ExecIDs": [
            "170d2d5063e50400e5682a8be2ed6e8a62908bdcb1a706d6eb594fb0fa7778a7",
            "2fa254091808e504291d47f9f957690def5a47b0d71f53447267d1612cb54e98",
            "80de306f08fa37f12f343ae1b1b66fc796875a4939eb1b2f4e5a0d1375c11041"
        ],
        "HostConfig": {
            "Binds": [
                "docker_devcontainer_vscode_server:/root/.vscode-server:rw",
                "docker_devcontainer_workspace:/workspace:rw"
            ],
            "ContainerIDFile": "",
            "LogConfig": {
                "Type": "json-file",
                "Config": {}
            },
            "NetworkMode": "docker_devcontainer_default",
            "PortBindings": {
                "3000/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "3000"
                    }
                ],
                "3001/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "3001"
                    }
                ],
                "8000/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "8000"
                    }
                ],
                "8080/tcp": [
                    {
                        "HostIp": "",
                        "HostPort": "8080"
                    }
                ]
            },
            "RestartPolicy": {
                "Name": "",
                "MaximumRetryCount": 0
            },
            "AutoRemove": false,
            "VolumeDriver": "",
            "VolumesFrom": [],
            "CapAdd": null,
            "CapDrop": null,
            "Capabilities": null,
            "Dns": [],
            "DnsOptions": [],
            "DnsSearch": [],
            "ExtraHosts": null,
            "GroupAdd": null,
            "IpcMode": "shareable",
            "Cgroup": "",
            "Links": null,
            "OomScoreAdj": 0,
            "PidMode": "",
            "Privileged": false,
            "PublishAllPorts": false,
            "ReadonlyRootfs": false,
            "SecurityOpt": null,
            "UTSMode": "",
            "UsernsMode": "",
            "ShmSize": 67108864,
            "Runtime": "runc",
            "ConsoleSize": [
                0,
                0
            ],
            "Isolation": "",
            "CpuShares": 0,
            "Memory": 0,
            "NanoCpus": 0,
            "CgroupParent": "",
            "BlkioWeight": 0,
            "BlkioWeightDevice": null,
            "BlkioDeviceReadBps": null,
            "BlkioDeviceWriteBps": null,
            "BlkioDeviceReadIOps": null,
            "BlkioDeviceWriteIOps": null,
            "CpuPeriod": 0,
            "CpuQuota": 0,
            "CpuRealtimePeriod": 0,
            "CpuRealtimeRuntime": 0,
            "CpusetCpus": "",
            "CpusetMems": "",
            "Devices": null,
            "DeviceCgroupRules": null,
            "DeviceRequests": null,
            "KernelMemory": 0,
            "KernelMemoryTCP": 0,
            "MemoryReservation": 0,
            "MemorySwap": 0,
            "MemorySwappiness": null,
            "OomKillDisable": false,
            "PidsLimit": null,
            "Ulimits": null,
            "CpuCount": 0,
            "CpuPercent": 0,
            "IOMaximumIOps": 0,
            "IOMaximumBandwidth": 0,
            "MaskedPaths": [
                "/proc/asound",
                "/proc/acpi",
                "/proc/kcore",
                "/proc/keys",
                "/proc/latency_stats",
                "/proc/timer_list",
                "/proc/timer_stats",
                "/proc/sched_debug",
                "/proc/scsi",
                "/sys/firmware"
            ],
            "ReadonlyPaths": [
                "/proc/bus",
                "/proc/fs",
                "/proc/irq",
                "/proc/sys",
                "/proc/sysrq-trigger"
            ]
        },
        "GraphDriver": {
            "Data": {
                "LowerDir": "/var/lib/docker/overlay2/6f2abbe9a7895cc72d60f9b12194dcc929a0c6c9aecde6c0e826a100b7550f5a-init/diff:/var/lib/docker/overlay2/a5aa72a58a15d81968261d91d82b38887856843740ffbe0123a4a29cdaf7ecaf/diff:/var/lib/docker/overlay2/99abc2fff656f02edc6eadcfaef0f9699613c72161cdab6c682e749395d1d793/diff:/var/lib/docker/overlay2/1749c9319b6a3e73a4931daafc8eec65da5ad62fcc16655d38792e9a82ac35ed/diff:/var/lib/docker/overlay2/a2652038162c91925f07ad9bcd7b4c74989e51e3e3336d4de65dacf116634d19/diff:/var/lib/docker/overlay2/173f25c01ee656eff3288a08926fb6ecf281472f66d283d4324311db1c248138/diff:/var/lib/docker/overlay2/42345694ae86221ebd4a6bb2d91cee56c4cc4d6381bf22b7d938f373426c6f1f/diff:/var/lib/docker/overlay2/f182d14687518fe77bd51ec7dc3ee9a036ebebb0cbffa5cf3d003f0934a7422b/diff:/var/lib/docker/overlay2/a5d6fa73cb2de74296feb0a1ea055a9c46916f5ae39726994990422187e55e64/diff:/var/lib/docker/overlay2/a5f093fa27a822e6d8d69c17a517dfc3baabb38fe2368dc3eb3bc9a3b8a8c80f/diff:/var/lib/docker/overlay2/92e0e485355154ebefab0d19dbdfc08d0f3966e963897c1385931ac6ece90d16/diff:/var/lib/docker/overlay2/f863004895025ee28611ae4e0d7e283719b8aab86bdd9fb9a0e74fbd5439259b/diff:/var/lib/docker/overlay2/6457c2a6e8d02ebc4a621c79150f2b608455e5b5baf2967600c53ba67ba34e94/diff:/var/lib/docker/overlay2/0d71f9a26d34a2f5ab274c8d13309672f804754f1c2b94e8f96c517808811896/diff:/var/lib/docker/overlay2/f5c761527763d76274ac3a0b09fd4aac626e9b07a7378e9344950f0ebfcf64b9/diff",
                "MergedDir": "/var/lib/docker/overlay2/6f2abbe9a7895cc72d60f9b12194dcc929a0c6c9aecde6c0e826a100b7550f5a/merged",
                "UpperDir": "/var/lib/docker/overlay2/6f2abbe9a7895cc72d60f9b12194dcc929a0c6c9aecde6c0e826a100b7550f5a/diff",
                "WorkDir": "/var/lib/docker/overlay2/6f2abbe9a7895cc72d60f9b12194dcc929a0c6c9aecde6c0e826a100b7550f5a/work"
            },
            "Name": "overlay2"
        },
        "Mounts": [
            {
                "Type": "volume",
                "Name": "docker_devcontainer_workspace",
                "Source": "/var/lib/docker/volumes/docker_devcontainer_workspace/_data",
                "Destination": "/workspace",
                "Driver": "local",
                "Mode": "rw",
                "RW": true,
                "Propagation": ""
            },
            {
                "Type": "volume",
                "Name": "docker_devcontainer_vscode_server",
                "Source": "/var/lib/docker/volumes/docker_devcontainer_vscode_server/_data",
                "Destination": "/root/.vscode-server",
                "Driver": "local",
                "Mode": "rw",
                "RW": true,
                "Propagation": ""
            }
        ],
        "Config": {
            "Hostname": "daabe8b2084b",
            "Domainname": "",
            "User": "",
            "AttachStdin": false,
            "AttachStdout": false,
            "AttachStderr": false,
            "ExposedPorts": {
                "3000/tcp": {},
                "3001/tcp": {},
                "8000/tcp": {},
                "8080/tcp": {}
            },
            "Tty": true,
            "OpenStdin": false,
            "StdinOnce": false,
            "Env": [
                "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
                "NODE_VERSION=12.10.0",
                "TZ=Asia/Shanghai"
            ],
            "Cmd": [
                "bash"
            ],
            "Image": "docker_devcontainer_dev:latest",
            "Volumes": {
                "/root/.vscode-server": {},
                "/workspace": {}
            },
            "WorkingDir": "",
            "Entrypoint": null,
            "OnBuild": null,
            "Labels": {
                "com.docker.compose.config-hash": "5e1849c515a432b1eff13a12d7d9aac41b550bd49ed7f7fe959718065e15d7f5",
                "com.docker.compose.container-number": "1",
                "com.docker.compose.oneoff": "False",
                "com.docker.compose.project": "docker_devcontainer",
                "com.docker.compose.service": "dev",
                "com.docker.compose.version": "1.24.1"
            }
        },
        "NetworkSettings": {
            "Bridge": "",
            "SandboxID": "a63b16c0c8fb015dd588af640dcbcf096986b90704a3bc4ff4c606b390eb04f7",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "3000/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "3000"
                    }
                ],
                "3001/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "3001"
                    }
                ],
                "8000/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "8000"
                    }
                ],
                "8080/tcp": [
                    {
                        "HostIp": "0.0.0.0",
                        "HostPort": "8080"
                    }
                ]
            },
            "SandboxKey": "/var/run/docker/netns/a63b16c0c8fb",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "docker_devcontainer_default": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "daabe8b2084b",
                        "dev"
                    ],
                    "NetworkID": "13bf9ed3361cc9193786b9b95a8ea3e362f54118fc86f3a63c6eaeb38a3f16b4",
                    "EndpointID": "051459e2b54d9bf40dad3cdcde680335d9cd98cd366de3be5f45b68d2beaa7e5",
                    "Gateway": "172.18.0.1",
                    "IPAddress": "172.18.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:12:00:02",
                    "DriverOpts": null
                }
            }
        }
    }
]

在计算机网络中，路由表（routing table）或称路由择域信息库（RIB, Routing Information Base），是一个存储在路由器或者联网计算机中的电子表格（文件）或类数据库。路由表存储着指向特定网络地址的路径（在有些情况下，还记录有路径的路由度量值）。路由表中含有网络周边的拓扑信息。路由表建立的主要目标是为了实现路由协议和静态路由选择。（相对的还有**动态路由选择协议**）
在现代路由器构造中，路由表不直接参与数据包的传输，而是用于生成一个小型指向表，这个指向表仅仅包含由路由算法选择的数据包传输优先路径，这个表格通常为了优化硬件存储和查找而被压缩或提前编译。

## [windows 中的路由表](https://blog.csdn.net/zyboy2000/article/details/50528253)

Flags标志说明：
U Up表示此路由当前为启动状态
H Host，表示此网关为一主机
G Gateway，表示此网关为一路由器
R Reinstate Route，使用动态路由重新初始化的路由
D Dynamically,此路由是动态性地写入–》什么时候才会有动态的路由信息呢？
M Modified，此路由是由路由守护程序或导向器动态修改

每一个Windows系统中都具有IP路由表，它存储了本地计算机可以到达的网络目的地址范围和如何到达的路由信息。路由表是TCP/IP通信的基础，本地计算机上的任何TCP/IP通信都受到路由表的控制。

你可以运行 route print 或 netstat -r 显示本地计算机上的路由表，如下图所示：

IPv4 路由表
===========================================================================
活动路由:
网络目标        网络掩码          网关       接口   跃点数
          0.0.0.0          0.0.0.0      192.168.0.1    192.168.0.167     45
        10.0.75.0  255.255.255.240            在链路上         10.0.75.1    271
        10.0.75.1  255.255.255.255            在链路上         10.0.75.1    271
       10.0.75.15  255.255.255.255            在链路上         10.0.75.1    271
        127.0.0.0        255.0.0.0            在链路上         127.0.0.1    331
        127.0.0.1  255.255.255.255            在链路上         127.0.0.1    331
  127.255.255.255  255.255.255.255            在链路上         127.0.0.1    331
       172.18.0.0    255.255.255.0        10.0.75.2        10.0.75.1     16
      192.168.0.0    255.255.255.0            在链路上     192.168.0.167    301
    192.168.0.167  255.255.255.255            在链路上     192.168.0.167    301
    192.168.0.255  255.255.255.255            在链路上     192.168.0.167    301
   192.168.165.80  255.255.255.240            在链路上    192.168.165.81   5256
   192.168.165.81  255.255.255.255            在链路上    192.168.165.81   5256
   192.168.165.95  255.255.255.255            在链路上    192.168.165.81   5256
        224.0.0.0        240.0.0.0            在链路上         127.0.0.1    331
        224.0.0.0        240.0.0.0            在链路上     192.168.0.167    301
        224.0.0.0        240.0.0.0            在链路上         10.0.75.1    271
        224.0.0.0        240.0.0.0            在链路上    192.168.165.81   5256
  255.255.255.255  255.255.255.255            在链路上         127.0.0.1    331
  255.255.255.255  255.255.255.255            在链路上     192.168.0.167    301
  255.255.255.255  255.255.255.255            在链路上         10.0.75.1    271
  255.255.255.255  255.255.255.255            在链路上    192.168.165.81   5256

路由表中的每一个路由项具有五个属性，在此我将它们分为四个部分：
1. 网络地址：网络地址（Network Destination）、网络掩码（Netmask）：网络地址和网络掩码相与的结果用于定义本地计算机可以到达的网络目的地址范围。通常情况下，网络目的地址范围包含以下四种：
   1. 主机地址；某个特定主机的网络地址，网络掩码为255.255.255.255，
   2. 子网地址，某个特定子网的网络地址
   3. 网络地址；某个特定网络的网络地址，
   4. 默认路由；所有未在路由表中指定的网络地址，如上表中的1，在后文将详细描述；

  在添加路由时，Windows要求输入的网络地址和网络掩码相与后的结果必须等于网络地址，否则路由添加会失败。
2. 网关（Gateway，又称为下一跳服务器）：在发送IP数据包时，网关定义了针对特定的网络目的地址，数据包发送到的下一跳服务器。如果是本地计算机直接连接到的网络，网关通常是本地计算机对应的网络接口，但是此时接口必须和网关一致；如果是远程网络或默认路由，网关通常是本地计算机所连接到的网络上的某个服务器或路由器。
3. 接口（Interface）：接口定义了针对特定的网络目的地址，本地计算机用于发送数据包的网络接口。网关必须位于和接口相同的子网（默认网关除外），否则造成在使用此路由项时需调用其他路由项，从而可能会导致路由死锁。

4. 跃点数（Metric）：跃点数用于指出路由的成本，通常情况下代表到达目标地址所需要经过的跃点数量，一个跃点代表经过一个路由器。跃点数越低，代表路由成本越低；跃点数越高，代表路由成本越高。当具有多条到达相同目的网络的路由项时，TCP/IP会选择具有更低跃点数的路由项。


## docker 网络
这里先要来说一下docker网络的四种方式：

1. Host模式：

Host 模式并没有为容器创建一个隔离的网络环境。

该模式下的Docker 容器会和Host宿主机共享同一个网络namespace， Docker Container可以和宿主机一样，使用宿主机的eth0，实现和外界的通信。

Host模式特点包括：

容器没有隔离的 network namespace
容器的 IP 地址同 Docker host 的 IP 地址
注意：容器中服务端口号不能与Host宿主机上已经使用的端口号相冲突
host 模式能够和其它模式共存
2. Container模式

Container网络模式是 Docker 中一种较为特别的网络的模式。处于这个模式下的 Docker 容器会共享其他容器的网络环境，因此，至少这两个容器之间不存在网络隔离，而这两个容器又与宿主机以及除此之外其他的容器存在网络隔离。

3. None模式

None 网络就是什么都没有的网络。挂在这个网络下的容器除了 lo，没有其他任何网卡。需要我们自行去配置。

4. Bridge模式

Docker 容器默认使用Bridge模式的网络。

Docker的Bridge模式和VM虚拟机的Bridge模式不同，虽然也叫Bridge，但实质上类似于VM的NAT模式。

原理是在宿主机上虚出一块网卡bridge0，然后所有容器会桥接在这块网卡的网段上。默认情况下容器能访问外部网络，但外部网络无法访问容器，需要通过暴露容器端口的方式（docker run -p）让外部网络访问容器内的服务。

## 查看容器的 ip 地址
`docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)`

## route print
路由表

## 修改路由表
```
route add -p 172.18.0.0 mask 255.255.255.0 10.0.75.2
route delete  172.18.0.0
```


## ping
