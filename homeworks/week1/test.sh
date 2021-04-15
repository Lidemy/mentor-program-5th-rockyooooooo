#!/bin/bash
num=1
while [ $num -le $1 ]
do
	touch $num.js
	num=`expr $num + 1`
done
