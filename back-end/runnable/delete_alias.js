#!usr/bin/env zsh

curl -XPOST localhost:9200/_aliases -d \
'{
  "actions": [
    { "remove": {
        "alias": "fishgov",
        "index": "fishgov_v1"
    }}
  ]
}'
