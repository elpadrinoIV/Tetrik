GameEngine = Class.extend({
    requestId: undefined,

    tiledMap: null,

    entities: [],

    possibleBlocks: ["IShape", "JShape", "LShape", "OShape", "SShape", "TShape", "ZShape"],

    factory: {},

    numPlayers: 2,

    players: [],

    playersPositions: [
                        { 'x': 0, 'y': 0 },
                        {'x': 550, 'y': 0},
                        {'x': 0, 'y': 550},
                        {'x': 550, 'y': 550}
                      ],

    // downSpeed: 1,

    // tikzPerDownSpeed: 4,

    // accumulatedTikz: 0,

    // blockTime: 0,

    // totalTime: 0,

    // linesCompleted: 0,

    // currentBlock: null,

    // nextBlock: null,

    // tablero: null,
    
    // score: null,

    paused: false,

    gameOver: false,

    preloadComplete: false,

    requestId: 0,

    now: 0,
    
    dt: 0,

    last: 0,

    step: 1.0/60.0,

    loadDefaults: function() {
        this.requestId = undefined;
        this.tiledMap = null;
        this.entities = [];
        this.possibleBlocks = ["IShape", "JShape", "LShape", "OShape", "SShape", "TShape", "ZShape"];
        this.factory = {};
        // this.downSpeed = 1;
        // this.tikzPerDownSpeed = 4;
        // this.accumulatedTikz = 0;
        // this.blockTime = 0;
        // this.totalTime = 0;
        // this.linesCompleted = 0;
        // this.currentBlock = null;
        // this.nextBlock = null;
        // this.tablero = null;
        // this.score = null;
        this.paused = false;
        this.gameOver = false;
        this.preloadComplete = false;
        this.factory['IShape'] = IShape;
        this.factory['JShape'] = JShape;
        this.factory['LShape'] = LShape;
        this.factory['OShape'] = OShape;
        this.factory['SShape'] = SShape;
        this.factory['TShape'] = TShape;
        this.factory['ZShape'] = ZShape;
        this.requestId = 0;
        this.now = 0;
        this.dt = 0;
        this.last = 0;
        this.step = 1.0/60.0;
        this.players = [];
        this.numPlayers = 2;
        this.playersPositions = [{ 'x': 0, 'y': 0 }, {'x': 550, 'y': 0}, {'x': 0, 'y': 550}, {'x': 550, 'y': 550}];
    },


    preLoadAssets: function() {
        var assets = new Array();
        assets.push("static/images/mano/atlas.png");

        xhrGet("static/images/mano/atlas.json", function(data) {
            var sheet = new SpriteSheet();
            sheet.load("static/images/mano/atlas.png");
            sheet.parseAtlasDefinition(data.response);
            gGameEngine.preloadComplete = true;
        });
    },

    setup: function() {
        // cargar todo

        // this.tablero.loadSpecs('static/images/mano/tablero.json');

        this.tiledMap = new TiledMap();
        this.tiledMap.load('static/images/mano/tablero.json');

        this.preLoadAssets();

        gInputEngine.setup();

        gConfig.loadDefaults();

        for (var i = 1; i <= this.numPlayers; i++) {
            var player = new Player(i);
            player.setPosition(this.playersPositions[i-1].x, this.playersPositions[i-1].y);
            this.players.push(player);
        }
    },

    loadComplete: function() {
        return (gGameEngine.preloadComplete && gGameEngine.tiledMap.fullyLoaded);
    },

    spawnEntity: function (typename) {
        return new (this.factory[typename])();
    },

    tooglePause: function() {
        this.paused = !this.paused;
    },

    checkEndGame: function() {
        var all_have_lost = true;
        for (var playerNumber = 0; playerNumber < self.numPlayers; playerNumber++) {
            if (!this.players[playerNumber].gameOver) {
                all_have_lost = false;
                break;
            }
        }

        return all_have_lost;
    },

    update: function (step) {
        self = gGameEngine;

        if (gInputEngine.actions['pause']) {
            self.tooglePause();
            gInputEngine.actions['pause'] = false;
        }

        if (self.paused || self.gameOver) {
            return;
        }

        for (var playerNumber = 1; playerNumber <= self.numPlayers; playerNumber++) {
            var player = self.players[playerNumber - 1];

            if (player.gameOver) {
                continue;
            }

            player.blockTime += step;

            player.totalTime += step;

            if (player.nextBlock === null) {
                player.setNextBlock(self.generateNextBlock());
            }

            if (player.currentBlock === null) {
                player.changeToNextBlock();
                player.setNextBlock(self.generateNextBlock());
            }

            if (gInputEngine.actions['p' + playerNumber +'-move-left']) {
                var newPos = player.currentBlock.getPosition();
                newPos.x -= 1;
                if (player.tablero.blockFits(player.currentBlock.shape, newPos)) {
                    player.currentBlock.move({x:-1, y: 0});
                }
                gInputEngine.actions['p' + playerNumber + '-move-left'] = false;
            }

            if (gInputEngine.actions['p' + playerNumber + '-move-right']) {
                var newPos = player.currentBlock.getPosition();
                newPos.x += 1;
                if (player.tablero.blockFits(player.currentBlock.shape, newPos)) {
                    player.currentBlock.move({x: 1, y: 0});
                }

                gInputEngine.actions['p' + playerNumber + '-move-right'] = false;
            }

            if (gInputEngine.actions['p' + playerNumber + '-rotate']) {
                var newShape = player.currentBlock.rotations[player.currentBlock.nextRotation('counterclockwise')];
                if (player.tablero.blockFits(newShape, player.currentBlock.getPosition())) {
                    player.currentBlock.rotate('counterclockwise');
                }
                gInputEngine.actions['p' + playerNumber + '-rotate'] = false;
            }

            player.accumulatedTikz += player.downSpeed*player.tikzPerDownSpeed;

            if (gInputEngine.actions['p' + playerNumber + '-move-down']) {
                player.accumulatedTikz += 20;
            }

            if (player.accumulatedTikz >= 100) {
                var newPos = player.currentBlock.getPosition();
                newPos.y += 1;

                if (player.tablero.blockFits(player.currentBlock.shape, newPos)) {
                    player.currentBlock.move({x:0, y:1});
                } else {
                    if (!player.tablero.blockInsideTablero(player.currentBlock.shape, player.currentBlock.getPosition())) {
                        player.finishGame();
                        if (self.checkEndGame()) {
                            self.gameOver = true;
                            self.stop();
                        }
                        continue;
                    } else {
                        player.tablero.applyBlock(player.currentBlock.shape, player.currentBlock.getPosition());
                        player.currentBlock = null;
                        player.score.blockDropped(player.blockTime);
                        player.blockTime = 0;
                    }
                }

                player.accumulatedTikz = 0;
            }

            var completeRows = player.tablero.completeRows();
            if (completeRows.length > 0) {
                player.tablero.deleteRows(completeRows);
                player.score.linesCompleted(completeRows.length);
                player.linesCompleted += completeRows.length;
                player.downSpeed = Math.floor(player.linesCompleted / 10) + 1;
            }
        }
    },

    generateNextBlock: function() {
        var nextBlock = self.spawnEntity(this.possibleBlocks[Math.floor(Math.random() * this.possibleBlocks.length)]);

        nextBlock.setup({"x": 0, "y": 0}, gRenderEngine.blockSize);

        return nextBlock;
    },

    render: function() {
        gRenderEngine.context.clearRect(0, 0, gRenderEngine.canvas.width, gRenderEngine.canvas.height);
                
        self = gGameEngine;

        for (var playerNumber = 0; playerNumber < self.numPlayers; playerNumber++) {
            self.players[playerNumber].render();
        }
    },

    loop: function(time) {
        self = gGameEngine;
        self.now = timestamp();
        self.dt = self.dt + Math.min(1, (self.now - self.last) / 1000);

        while (self.dt > self.step) {
            self.dt = self.dt - self.step;
            self.update(self.step);
        }
        
        self.render(self.dt);
        self.last = self.now;

        if (self.gameOver) {
            self.stop();
        } else {
            self.requestId = window.requestAnimationFrame(self.loop);
        }
    },

    start: function() {
        this.now = 0;
        this.dt = 0;
        this.last = 0;

        this.setupComponents();
        this.requestId = window.requestAnimationFrame(this.loop);
    },

    stop: function() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
        }
        this.requestId = undefined;
    },

    setupComponents: function() {
        for (var playerNumber = 0; playerNumber < this.numPlayers; playerNumber++) {
            this.players[playerNumber].setup(this.tiledMap);
        }

    },
});

gGameEngine = new GameEngine();
