#!/bin/bash

for f in "$@"
do
		echo "$f"
		magick "$f" -filter CubicSpline -resize '1280>' -format webp -quality 75 "${f%.*}.webp"
		in_size=$(du -hA "$f" | cut -f -1)
		out_size=$(du -hA "${f%.*}.webp" | cut -f -1)
		echo "Size: $in_size -> $out_size"
done
