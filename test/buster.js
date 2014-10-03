var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "node",
    sources: [
        "static/scripts/core.js",
        "static/scripts/Config.js",
        "static/scripts/GameEngine.js",
        "static/scripts/Block.js",
        "static/scripts/Score.js",
        "static/scripts/Tablero.js",
        "static/scripts/GarbageGenerator.js"
        ],
    tests: [
        "test/*-test.js"
        ]
}
