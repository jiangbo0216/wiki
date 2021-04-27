## live-server 
live-server --port=3001

## [caporal](https://github.com/mattallty/Caporal.js)
制作命令行程序


## puppetteer
How to fix puppetteer error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory

Problem:
You are trying to run puppetteer on Ubuntu, but when it starts to run chrome, you are facing the following issue:

/home/user/erp/node_modules/puppeteer/.local-chromium/linux-555668/chrome-linux/chrome: error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory
Solution:
Install the missing packages using
```
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```