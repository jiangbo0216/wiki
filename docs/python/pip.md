
## 安装
安装pip3
sudo apt install python3-pip

## 帮助文档
pip3 -h
pip install -h

## usage
```text
Usage:   
  pip install [options] <requirement specifier> [package-index-options] ...
  pip install [options] -r <requirements file> [package-index-options] ...
  pip install [options] [-e] <vcs project url> ...
  pip install [options] [-e] <local project path> ...
  pip install [options] <archive url/path> ...
```

## pip 与 sudo 
sudo pip3 install mkdocs
此命令会安装失败:
提示
``` text
The directory '/home/jiangbo/.cache/pip/http' or its parent directory is not owned by the current user and the cache has been disabled. Please check the permissions and owner of that directory. If executing pip with sudo, you may want sudo's -H flag.
The directory '/home/jiangbo/.cache/pip' or its parent directory is not owned by the current user and caching wheels has been disabled. check the permissions and owner of that directory. If executing pip with sudo, you may want sudo's -H flag.
```
```text
     -H, --set-home
                 Request that the security policy set the HOME environment variable
                 to the home directory specified by the target user's password data‐
                 base entry.  Depending on the policy, this may be the default
                 behavior.
```

使用命令
sudo -H pip3 install mkdocs