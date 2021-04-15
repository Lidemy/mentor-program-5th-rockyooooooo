#!/bin/bash
for query in name bio location blog
do
	curl -H "Accept: application/vnd.github.v3+json" https://api.github.com/users/$1 | grep $query | cut -d '"' -f 4
done

