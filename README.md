# CCIP-Puzzle-Chocolate

Rafactoring project from CCIP-Puzzle-Bueno

## How to use it (Deploy Guide)

### Prepare configration file for puzzle game

There will be two way to prepare configration:

1. Manually create json file like following format

```json
{
  "confName": "OPass",
  "title": {
    "zh-TW": "大地集章",
    "en": "Rewards"
  },
  "bingoPattern": "",
  "booths": [
    {
      "isBonus": true,
      "significant": "c",
      "slug": "opass",
      "displayText": {
        "zh-TW": "OPass 快速通關",
        "en": "OPass Check-in"
      },
      "description": {
        "zh-TW": "OPass 快速通關開發團隊",
        "en": "Develop team of OPass app."
      },
      "imageUrl": "https://avatars0.githubusercontent.com/u/24525301?s=200&v=4",
      "point": 0
    }
  ]
}
```

2. Using google separeatesheet template and converting script writing on node.js

```
TBC
```

More detail see [Configuration file](#Configration-file)

### Set project configuration and build

Modify `config/project.json`, given values for `API_URL` with an base url for OPass server side and for `configURL` with an URL point to configuration file which generated on previous step.

Then run `yarn build` to build project and deploy everwhere you want to deploy

## Configration file

```
TBC
```

## Development

### Install dependency
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
