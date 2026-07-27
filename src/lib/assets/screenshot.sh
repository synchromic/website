#!/bin/bash

# Prompts to pick a file, give it a name, copy it to the blog folder, then convert it to webp.
SCREENSHOT_DIR='~/.local/share/PrismLauncher/instances/Star Technology/minecraft/screenshots/'
OUTPUT_DIR='./blog/star-technology/luv'

screenshotfile="$(zenity --file-selection)"
if [ -z "$screenshotfile" ]; then
	echo "No file provided"
	exit 1
fi
echo "Picked file: $screenshotfile"

originalname="$(basename -- "$screenshotfile")"
extension="${originalname##*.}"

echo "Original name: $originalname"
echo "Extension: $extension"
read -p 'Output filename: ' outputname
cp "$screenshotfile" "$OUTPUT_DIR"
mv "$OUTPUT_DIR/$originalname" "${OUTPUT_DIR}/${outputname}.${extension}"
./convert.sh "$OUTPUT_DIR/${outputname}.${extension}"
