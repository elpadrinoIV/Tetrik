var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "node",
    libs: [ 
        "static/scripts/core.js",
        "static/scripts/utils.js"
        ],
    sources: [
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
