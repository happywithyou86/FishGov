#!usr/bin/env zsh

curl -XPUT 'http://localhost:9200/fishgov_v1' -d \
'{
  "mappings": {
    "data": {
      "properties": {
        "title": {
          "type": "string",
          "analyzer": "snowball_filter"
        },
        "description": {
          "type": "string",
          "analyzer": "snowball_filter"
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
            "stemmer",
            "trigrams"
          ],
          "type": "custom",
          "tokenizer": "standard"
        },
        "trigrams": {
          "filter":   [
            "standard",
            "lowercase",
            "trigrams"
          ],
          "type": "custom",
          "tokenizer": "standard"
        }
      },
      "filter": {
        "stemmer": {
          "type": "stemmer",
          "name": ["english", "light_english", "minimal_english", "possessive_english", "porter2"]
        },
        "trigrams": {
          "type": "ngram",
          "min_gram": 4,
          "max_gram": 4
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
