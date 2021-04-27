wsl --set-default-version 2

cd %homepath%


del .npmrcp
mklink .\.npmrc .\OneDrive\.npmrc

del .gitconfig
mklink .\.gitconfig .\OneDrive\.gitconfig

mklink .\.czrc .\OneDrive\.czrc
mklink .\.wslconfig .\OneDrive\.wslconfig

mklink /j C:\"Program Files"\Git D:\Application\Scoop\apps\git\current
mklink /j C:\"Program Files"\nodejs ~\scoop\apps\nvm\current\nodejs\nodejs

mklink .\.wakatime.cfg .\OneDrive\.wakatime.cfg

mklink /h .\AppData\Roaming\Code\User\settings.json .\OneDrive\settings.json

mklink /j D:\Application\Scoop\apps\scoop-backup\0.2019.10.27\backups .\OneDrive\backups
