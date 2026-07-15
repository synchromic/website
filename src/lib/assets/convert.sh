#!/bin/bash

for f in "$@"
do
		echo "$f"
		magick "$f" -filter box -resize 1280 -format webp -quality 75 "${f%.*}.webp"
done
