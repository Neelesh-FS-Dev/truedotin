#!/usr/bin/env bash
# Builds web-ready media from the original source files in the project root.
# Originals are never modified. Outputs go to site/public/media.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
SRC="$(cd "$HERE/../.." && pwd)"
OUT="$HERE/../public/media"
rm -rf "$OUT"
mkdir -p "$OUT/photos" "$OUT/video"

# Photos: p01..p48 follow the sorted order of the source JPGs (see docs/ASSET_INVENTORY.md).
# Exclusions are not exported at all:
#   p01-p05  premiere/event photos with a third-party film backdrop, sponsor logos and public figures
#   p47-p48  event posters with third-party celebrity names and reservation phone numbers
i=0
for f in $(cd "$SRC" && ls *.jpg); do
  i=$((i + 1))
  id=$(printf "p%02d" "$i")
  if [ "$i" -le 5 ] || [ "$i" -ge 47 ]; then continue; fi
  sips -Z 640 -s format avif -s formatOptions 60 "$SRC/$f" --out "$OUT/photos/$id-640.avif" >/dev/null
  sips -Z 1280 -s format avif -s formatOptions 60 "$SRC/$f" --out "$OUT/photos/$id-1280.avif" >/dev/null
  sips -Z 640 -s format jpeg -s formatOptions 80 "$SRC/$f" --out "$OUT/photos/$id-640.jpg" >/dev/null
  sips -Z 1280 -s format jpeg -s formatOptions 80 "$SRC/$f" --out "$OUT/photos/$id-1280.jpg" >/dev/null
done

# Videos: v01..v23 follow the sorted order of the source MP4s.
# Exports are muted, 540px wide, capped at 20 seconds. v17, v18 (celebrity event promos) and v23
# (brand showroom footage) are excluded until rights and roles are verified.
j=0
for f in $(cd "$SRC" && ls *.mp4); do
  j=$((j + 1))
  id=$(printf "v%02d" "$j")
  case "$j" in 17|18|23) continue;; esac
  ffmpeg -v error -y -i "$SRC/$f" -an -vf "scale=540:-2" -t 20 -c:v libx264 -preset slow -crf 30 \
    -pix_fmt yuv420p -movflags +faststart "$OUT/video/$id.mp4"
  dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SRC/$f")
  t=$(awk "BEGIN{print $dur*0.35}")
  ffmpeg -v error -y -ss "$t" -i "$SRC/$f" -frames:v 1 -vf "scale=540:-2" -q:v 4 "$OUT/video/$id-poster.jpg"
done

# Hero showreel: short cut-downs from the strongest venue and creator reels, muted, 720x1280.
# Each segment is trimmed to 3.2 s and joined with a hard cut. No copyrighted audio is included.
HERO_SEGMENTS=("v02:2" "v12:3" "v19:2" "v21:2" "v13:2" "v10:3" "v20:2" "v16:3")
args=(); filter=""; n=0
for seg in "${HERO_SEGMENTS[@]}"; do
  id="${seg%%:*}"; ss="${seg##*:}"
  num="${id#v}"; num=$((10#$num))
  file=$(cd "$SRC" && ls *.mp4 | sed -n "${num}p")
  args+=(-ss "$ss" -t 3.2 -i "$SRC/$file")
  filter+="[$n:v]scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280,setsar=1,fps=30[s$n];"
  n=$((n + 1))
done
concat=""; for k in $(seq 0 $((n - 1))); do concat+="[s$k]"; done
ffmpeg -v error -y "${args[@]}" -filter_complex "${filter}${concat}concat=n=$n:v=1:a=0[out]" \
  -map "[out]" -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -movflags +faststart "$OUT/video/hero-reel.mp4"
ffmpeg -v error -y -i "$OUT/video/hero-reel.mp4" -vf "scale=540:960" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart -an "$OUT/video/hero-reel-mobile.mp4"
ffmpeg -v error -y -ss 0.5 -i "$OUT/video/hero-reel-mobile.mp4" -frames:v 1 -vf "scale=540:960" -q:v 5 "$OUT/video/hero-poster.jpg"

echo "photos: $(ls "$OUT/photos" | wc -l) files, videos: $(ls "$OUT/video" | wc -l) files"
