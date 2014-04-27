var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "node",
    sources: [
        "static/scripts/core.js",
        "static/scripts/GameEngine.js",
        "static/scripts/Block.js",
        "static/scripts/Tablero.js"
        ],
    tests: [
        "test/*-test.js"
        ]
}
