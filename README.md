# 精灵连连看 / Pokemon Link

一款复古风格的连连看游戏，提供网页版和 Android 版本。

A retro-style link-matching puzzle game available on Web and Android.

## 在线试玩 / Play Online

[https://intelkang.github.io/pokemon-link/](https://intelkang.github.io/pokemon-link/)

## Android 下载 / Android Download

最新 APK 可在 GitHub Releases 下载：

Download the latest APK from GitHub Releases:

[最新版本 / Latest Release](https://github.com/intelKANG/pokemon-link/releases/latest)

## 游戏特色 / Features

- 经典连连看规则：连接路径最多转两次，消除相同图标。
- 支持暂停、提示、洗牌、重新开始和下一关。
- 关卡包含不同的棋盘变化规则，难度逐步提升。
- 支持中文和 English，默认跟随系统语言。
- 网页版与 Android 版共享同一套核心玩法。

- Classic link-matching rules: connect identical tiles with a path that turns no more than twice.
- Includes pause, hint, shuffle, restart, and next-level controls.
- Levels use different board movement rules and gradually increase difficulty.
- Supports Chinese and English, following the system language by default.
- Web and Android versions share the same core gameplay.

## 关卡规则 / Level Rules

1. 不变化 / No Shift
2. 向下移动 / Shift Down
3. 向左移动 / Shift Left
4. 向右移动 / Shift Right
5. 向上移动 / Shift Up
6. 上下分离 / Split Up and Down
7. 左右分离 / Split Left and Right
8. 向中聚拢 / Gather Inward

## 版本 / Version

- Web: 2.2
- Android: 2.2

## 构建 / Build

安卓版本可通过以下脚本重新打包：

The Android version can be rebuilt with:

```bash
./android-apk/build_apk.sh
```

该脚本会将网页版游戏打包进 Android WebView，并生成 APK 文件。

The script packages the shared web game into an Android WebView APK.

## 声明 / Notice

这是一个用于个人学习和娱乐的非商业同人项目。

This is a non-commercial fan project for personal learning and entertainment.

Pokemon / 宝可梦相关名称、角色和图片归其权利方所有。本项目与 Nintendo、Game Freak、Creatures 或 The Pokemon Company 无关联，也未获得其赞助或背书。

Pokemon-related names, characters, and images belong to their respective rights holders. This project is not affiliated with, endorsed by, or sponsored by Nintendo, Game Freak, Creatures, or The Pokemon Company.
