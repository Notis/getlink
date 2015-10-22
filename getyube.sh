#!/bin/bash

inname=( $line )
${inname[0]}

cat $1 | while read line
do
 echo "------------"
 inname=( $line )
  /usr/bin/youtube-dl -x --audio-quality 0 --audio-format mp3 "${inname[0]}"
done

