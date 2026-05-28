#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$ROOT/.." && pwd)"
SDK_ROOT="${ANDROID_HOME:-/opt/homebrew/share/android-commandlinetools}"
JAVA_HOME="${JAVA_HOME:-/opt/homebrew/opt/openjdk/libexec/openjdk.jdk/Contents/Home}"
JAVA_BIN="$JAVA_HOME/bin"
export JAVA_HOME
export PATH="$JAVA_BIN:$PATH"
BUILD_TOOLS="$SDK_ROOT/build-tools/35.0.1"
ANDROID_JAR="$SDK_ROOT/platforms/android-35/android.jar"
OUT="$ROOT/build"
ASSETS="$OUT/assets"
APK_NAME="精灵连连看.apk"

rm -rf "$OUT"
mkdir -p "$ASSETS" "$OUT/gen" "$OUT/classes" "$OUT/dex" "$OUT/compiled" "$OUT/outputs"

cp "$PROJECT_ROOT/index.html" "$ASSETS/index.html"
cp "$PROJECT_ROOT/styles.css" "$ASSETS/styles.css"
cp "$PROJECT_ROOT/app.js" "$ASSETS/app.js"
if [ -d "$PROJECT_ROOT/assets" ]; then
  cp -R "$PROJECT_ROOT/assets" "$ASSETS/assets"
fi

"$BUILD_TOOLS/aapt2" compile --dir "$ROOT/res" -o "$OUT/compiled/resources.zip"
"$BUILD_TOOLS/aapt2" link \
  -o "$OUT/unsigned-res.apk" \
  --manifest "$ROOT/AndroidManifest.xml" \
  -I "$ANDROID_JAR" \
  -A "$ASSETS" \
  --java "$OUT/gen" \
  --auto-add-overlay \
  "$OUT/compiled/resources.zip"

find "$ROOT/src" "$OUT/gen" -name "*.java" -print > "$OUT/java-files.txt"
"$JAVA_BIN/javac" --release 17 -encoding UTF-8 -classpath "$ANDROID_JAR" -d "$OUT/classes" @"$OUT/java-files.txt"
(cd "$OUT/classes" && "$JAVA_BIN/jar" cf "$OUT/classes.jar" .)
"$BUILD_TOOLS/d8" --lib "$ANDROID_JAR" --output "$OUT/dex" "$OUT/classes.jar"

cp "$OUT/unsigned-res.apk" "$OUT/unsigned.apk"
(cd "$OUT/dex" && zip -q -r "$OUT/unsigned.apk" classes.dex)

KEYSTORE="$ROOT/debug.keystore"
if [ ! -f "$KEYSTORE" ]; then
  "$JAVA_BIN/keytool" -genkeypair \
    -keystore "$KEYSTORE" \
    -storepass android \
    -keypass android \
    -alias debug \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -dname "CN=Bubble Battle Debug,O=Codex,C=CN"
fi

"$BUILD_TOOLS/zipalign" -f -p 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"
"$BUILD_TOOLS/apksigner" sign \
  --ks "$KEYSTORE" \
  --ks-pass pass:android \
  --key-pass pass:android \
  --out "$OUT/outputs/$APK_NAME" \
  "$OUT/aligned.apk"

"$BUILD_TOOLS/apksigner" verify "$OUT/outputs/$APK_NAME"
cp "$OUT/outputs/$APK_NAME" "$PROJECT_ROOT/$APK_NAME"

echo "$PROJECT_ROOT/$APK_NAME"
