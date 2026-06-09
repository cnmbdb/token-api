#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if command -v ffmpeg >/dev/null 2>&1; then
  FFMPEG_BIN="$(command -v ffmpeg)"
elif [ -x "$ROOT_DIR/node_modules/ffmpeg-static/ffmpeg" ]; then
  FFMPEG_BIN="$ROOT_DIR/node_modules/ffmpeg-static/ffmpeg"
else
  echo "ffmpeg not found. Install ffmpeg or add ffmpeg-static to node_modules." >&2
  exit 1
fi

mkdir -p public/web

"$FFMPEG_BIN" -y -i public/bg.mov \
  -an \
  -vf "scale='min(1600,iw)':-2:flags=lanczos,fps=24" \
  -c:v libx264 -preset slow -crf 23 -movflags +faststart \
  public/web/bg-web.mp4

"$FFMPEG_BIN" -y -i public/capabilities.mp4 \
  -an \
  -vf "scale='min(1280,iw)':-2:flags=lanczos,fps=24" \
  -c:v libx264 -preset slow -crf 24 -movflags +faststart \
  public/web/capabilities-web.mp4

"$FFMPEG_BIN" -y -i public/models-bg.mp4 \
  -an \
  -vf "scale='min(1280,iw)':-2:flags=lanczos,fps=24" \
  -c:v libx264 -preset slow -crf 24 -movflags +faststart \
  public/web/models-bg-web.mp4

echo "Compressed videos written to public/web"
