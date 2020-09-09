module.exports = {
  "presets": [
    [
      "@babel/env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": "3",
      }
    ]
  ],
  "plugins": [
    // "external-helpers",
    "@babel/plugin-external-helpers",
    // "@babel/external-helpers",
  ]
}