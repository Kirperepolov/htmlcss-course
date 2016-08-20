#!/bin/bash
if [ $# -lt 1 ]
then
   echo 'Specify at least one file to fix.'
   exit 1
fi
tmp='tmp.fixed'
for file in "$@"
do
  # try to fix the file encoding ...
  iconv -f WINDOWS-1256 $file -t UTF-8 > $tmp
  # check the status of the command
  if [ $? -eq 0 ]; then
    echo "'"$file"' fixed."
    cat $tmp > $file
  else
    echo "Failed to fix '"$file"'."
  fi
done
rm $tmp
