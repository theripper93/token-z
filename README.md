# Token Z
Easly manage the Z-Index of tokens

![Latest Release Download Count](https://img.shields.io/github/downloads/theripper93/Levels/latest/module.zip?color=2b82fc&label=DOWNLOADS&style=for-the-badge) [![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Flevels&colorB=03ff1c&style=for-the-badge)](https://forge-vtt.com/bazaar#package=levels) ![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftheripper93%2FLevels%2Fmain%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange&style=for-the-badge) [![alt-text](https://img.shields.io/badge/-Patreon-%23ff424d?style=for-the-badge)](https://www.patreon.com/theripper93) [![alt-text](https://img.shields.io/badge/-Discord-%235662f6?style=for-the-badge)](https://discord.gg/F53gBjR97G)

## How to use:

Simply input a z-index value in the new field in the token config.

![image](https://user-images.githubusercontent.com/1346839/132033189-ed914746-e67d-415e-82e9-7e9c0cfec7ed.png)

## Sorting:

Token-Z is opinionated and will auto sort based on some parameters:

- Elevation: With a weight of 10 (each 1 step in elevation means +10 in the zIndex)
- Size: with a weight of -1 (this means a token that is 2x2 will have a -4 zIndex to it)
- Selected: with a weight of 1 (a selected token will have a +1 zIndex applied)
- Defeated: with a weight of -1000
