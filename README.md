# 精灵连连看 / Pokemon Link

复古连连看玩法的双端版本：网页版可以直接打开，安卓版已经打包成 APK。

A retro tile-matching link game for web and Android. The web version runs directly in the browser, and the Android version is packaged as an APK.

## 试玩 / Play

- 网页版 / Web: open `index.html`, or publish `web-release` with GitHub Pages.
- 安卓版 / Android: install `精灵连连看.apk` from the repository root.

## 当前版本 / Version

- Web: official release
- Android: 2.2

## 玩法 / Gameplay

- 经典连连看规则：连接路径最多转两次，消除相同小精灵。
- 支持暂停、提示、洗牌、重新开始、下一关。
- 关卡会逐步增加变化规则和难度，而不是只加快速度。
- 支持中文 / English，默认跟随系统语言，也可以在选项里直接切换。
- 网页端和安卓端共用同一套核心玩法。

- Classic link-matching rules: connect two identical tiles with a path that turns no more than twice.
- Includes pause, hint, shuffle, restart, and next-level controls.
- Levels add board movement rules and difficulty over time instead of only increasing speed.
- Supports Chinese and English, follows the system language by default, and can be switched in options.
- The web and Android versions share the same core gameplay.

## 关卡变化 / Level Rules

1. 不变化 / No Shift
2. 向下移动 / Shift Down
3. 向左移动 / Shift Left
4. 向右移动 / Shift Right
5. 向上移动 / Shift Up
6. 上下分离 / Split Up and Down
7. 左右分离 / Split Left and Right
8. 向中聚拢 / Gather Inward

## GitHub Pages 发布 / GitHub Pages

推荐设置 / Recommended settings:

- Branch: `main`
- Folder: `/web-release`

设置完成后，朋友打开 GitHub Pages 地址就能直接玩网页版。

After GitHub Pages is enabled, friends can open the published URL and play the web version directly.

## 重新打包 APK / Build APK

```bash
./android-apk/build_apk.sh
```

脚本会把根目录的网页文件复制进 Android WebView 工程，并在根目录生成新的 `精灵连连看.apk`。

The script copies the root web files into the Android WebView project and generates a new `精灵连连看.apk` in the repository root.

## 说明 / Notice

本项目使用的宝可梦相关图片素材仅用于个人学习、测试和非商业娱乐用途。Pokemon / 宝可梦相关名称和形象版权归其权利方所有。

Pokemon-related names and images are used only for personal learning, testing, and non-commercial entertainment. Pokemon and related characters belong to their respective rights holders.
