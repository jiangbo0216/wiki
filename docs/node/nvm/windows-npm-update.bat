# https://qiita.com/jay-es/items/cdbb67208c364b33e287
D:
cd %NVM_HOME%\nodejs\nodejs
del npm npx npm.cmd npx.cmd npm.ps1 npx.ps1
move node_modules\npm node_modules\npm2
node node_modules\npm2\bin\npm-cli.js i -g npm@latest
rd /S /Q node_modules\npm2
