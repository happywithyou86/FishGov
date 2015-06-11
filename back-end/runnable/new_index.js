#!usr/bin/env zsh

curl -XPUT 'http://localhost:9200/fishgov_v1' -d \
'{
  "mappings": {
    "data": {
      "properties": {
        "classification_id": {
          type: "string",
          "index": "not_analyzed"
        },
        "title": {
          "type": "string",
          "analyzer": "snowball_filter"
        },
        "description": {
          "type": "string",
          "analyzer": "snowball_filter"
        },
        "close_date_var": {
          "type": "date",
          "format": "basicDate"
        },
        "posted_date_var": {
          "type": "date",
          "format": "basicDate"
        },
        "last_date_var": {
          "type": "date",
          "format": "basicDate"
        },
        "archive_date_var": {
          "type": "date",
          "format": "basicDate"
        }
      }
    }
  },
  "settings": {
    "analysis": {
      "analyzer": {
        "snowball_filter": {
          "filter": [
            "standard",
            "lowercase",
            "stemmer"
          ],
          "type": "custom",
          "tokenizer": "standard"
        }
      },
      "filter": {
        "stemmer": {
          "type": "stemmer",
          "name": ["english", "light_english", "minimal_english", "possessive_english", "porter2"]
        }
      }
    }
  }
}'


sleep 3
curl -XPOST localhost:9200/_aliases -d \
'{
  "actions": [
    { "add": {
      "alias": "fishgov",
      "index": "fishgov_v1"
    }}
  ]
}'
