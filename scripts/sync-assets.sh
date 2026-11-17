#!/bin/bash
# Copies Milu's brand assets (font, skies, faces, Rive characters, emoji, app icon) from the iOS
# project into this one. Run it again when the app's art changes:
#   scripts/sync-assets.sh /path/to/Milu .
set -euo pipefail
SRC="$1"
DST="$2"

mkdir -p "$DST/app/fonts" "$DST/public/milu/sky" "$DST/public/milu/faces" "$DST/public/milu/rive" \
  "$DST/public/milu/emoji" "$DST/public/rive"

# Font (OFL)
cp "$SRC/Milu/Resources/Fonts/Nunito.ttf" "$DST/app/fonts/Nunito.ttf"
cp "$SRC/Milu/Resources/Fonts/OFL.txt" "$DST/app/fonts/Nunito-OFL.txt"

# The three tab skies, day and night
for s in tong-quan tai-khoan thu-chi; do
  for m in light dark; do
    cp "$SRC/output/01-backgrounds/$s/$m.svg" "$DST/public/milu/sky/$s-$m.svg"
  done
done

# Milu's 20 faces, as the app ships them
for d in "$SRC"/Milu/Assets.xcassets/MiluArt/milu-*.imageset; do
  name=$(basename "$d" .imageset)
  f="$d/$name.svg"
  [ -f "$f" ] && cp "$f" "$DST/public/milu/faces/${name#milu-}.svg"
done

# Rive characters, as the app ships them, and the runtime's wasm
for c in overview accounts transactions; do
  cp "$SRC/Milu/Resources/Rive/milu-$c.riv" "$DST/public/milu/rive/milu-$c.riv"
done
cp "$DST/node_modules/@rive-app/webgl2/rive.wasm" "$DST/public/rive/rive.wasm"
cp "$DST/node_modules/@rive-app/webgl2/rive_fallback.wasm" "$DST/public/rive/rive_fallback.wasm"

# Fluent Emoji 2D used on the page
for c in 2615 1f35a 1f697 1f9f3 1f4b0 1f4b5 1f3e6 1f4f1 1f4b3 1f91d 1f4ca 1f4dd 2728 1f512 1f451 1fad9 \
  1f3af 1f43e 1f3e0 1f6d2 1f4c5 1f6f5 1f381 1f4bc 1f35c 1f436 1f4c8 1f3a4 1f4b8 1f9fe 1f45d 1f5c2 1f9cb; do
  cp "$SRC/Milu/Assets.xcassets/MiluEmoji2D/milu-emoji-$c.imageset/milu-emoji-$c.svg" "$DST/public/milu/emoji/$c.svg"
done
cp "$SRC/Milu/Resources/FluentEmoji-LICENSE.txt" "$DST/public/milu/emoji/LICENSE.txt"

# App icon
ICON="$SRC/Milu/Assets.xcassets/AppIcon.appiconset"
sips -s format png -z 512 512 "$ICON/milu-icon-light.png" --out "$DST/app/icon.png" >/dev/null
sips -s format png -z 180 180 "$ICON/milu-icon-light.png" --out "$DST/app/apple-icon.png" >/dev/null
sips -s format png -z 384 384 "$ICON/milu-icon-light.png" --out "$DST/public/milu/app-icon-light.png" >/dev/null
sips -s format png -z 384 384 "$ICON/milu-icon-dark.png" --out "$DST/public/milu/app-icon-dark.png" >/dev/null

echo "faces: $(ls "$DST/public/milu/faces" | wc -l)  emoji: $(ls "$DST/public/milu/emoji" | wc -l)"
du -sh "$DST/public/milu" "$DST/public/rive" "$DST/app/fonts"
