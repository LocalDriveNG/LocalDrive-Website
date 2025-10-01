#!/bin/bash
# build.sh
max_retries=3
count=0

while [ $count -lt $max_retries ]
do
    npm install --legacy-peer-deps && break
    count=$((count+1))
    echo "Installation failed. Retry $count of $max_retries..."
    sleep 5
done

npm run build