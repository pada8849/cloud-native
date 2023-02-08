#!/usr/bin/env bash
function read_dir_file(){
for file in `ls $1`
do
 if [ -d $1"/"$file ]
 then
	read_dir_file $1"/"$file
 else
  if [ "${file##*.}"x = "jar"x ];then
     	echo $1"/"$file
      cp -af $1"/"$file /app/jar/
  fi
 fi
done
}
read_dir_file code
