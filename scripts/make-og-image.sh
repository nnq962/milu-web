#!/bin/bash
# Makes the link-preview picture (public/og-image.png, 1200 × 630): serves the project on
# localhost for a moment and photographs scripts/og-image.html in headless Chrome, so the card
# uses the app's own font and art. Run it again after changing the card:
#   scripts/make-og-image.sh
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-8791}"
PROFILE="$(mktemp -d)"

python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
trap 'kill "$SERVER" 2>/dev/null || true; rm -rf "$PROFILE"' EXIT
sleep 1

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --virtual-time-budget=6000 --user-data-dir="$PROFILE" \
  --screenshot="$PWD/public/og-image.png" \
  "http://127.0.0.1:$PORT/scripts/og-image.html" >/dev/null 2>&1

sips -g pixelWidth -g pixelHeight public/og-image.png | tail -2
ls -l public/og-image.png | awk '{print $5 " bytes"}'
