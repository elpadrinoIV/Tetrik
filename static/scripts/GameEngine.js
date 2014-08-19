GameEngine = Class.extend({
    requestId: undefined,

    tiledMap: null,

    entities: [],

    possibleBlocks: ["IShape", "JShape", "LShape", "OShape", "SShape", "TShape", "ZShape"],

    factory: {},

    downSpeed: 1,

    tikzPerDownSpeed: 4,

    accumulatedTikz: 0,

    blockTime: 0,

    totalTime: 0,

    linesCompleted: 0,

    currentBlock: null,

    nextBlock: null,

    tablero: null,
    
    score: null,

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
        this.downSpeed = 1;
        this.tikzPerDownSpeed = 4;
        this.accumulatedTikz = 0;
        this.blockTime = 0;
        this.totalTime = 0;
        this.linesCompleted = 0;
        this.currentBlock = null;
        this.nextBlock = null;
        this.tablero = null;
        this.score = null;
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

        this.tablero = new Tablero(20, 10);
        // this.tablero.loadSpecs('static/images/mano/tablero.json');

        this.tiledMap = new TiledMap();
        this.tiledMap.load('static/images/mano/tablero.json');

        this.score = new Score();

        this.preLoadAssets();

        gInputEngine.setup();

        gConfig.loadDefaults();
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

    finishGame: function() {
        this.gameOver = true;
        stop();
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
        
        self.blockTime += step;

        self.totalTime += step;

        if (self.nextBlock === null) {
            self.nextBlock = self.generateNextBlock();
        }

        if (self.currentBlock === null) {
            self.currentBlock = self.nextBlock;
            self.currentBlock.setup(self.tablero.areaTablero.getOffsetTablero(), gRenderEngine.blockSize);
            self.currentBlock.setPosition(4, -4);

            self.nextBlock = self.generateNextBlock();
        }

        if (gInputEngine.actions['move-left']) {
            var newPos = self.currentBlock.getPosition();
            newPos.x -= 1;
            if (self.tablero.blockFits(self.currentBlock.shape, newPos)) {
                self.currentBlock.move({x:-1, y: 0});
            }
            gInputEngine.actions['move-left'] = false;
        }

        if (gInputEngine.actions['move-right']) {
            var newPos = self.currentBlock.getPosition();
            newPos.x += 1;
            if (self.tablero.blockFits(self.currentBlock.shape, newPos)) {
                self.currentBlock.move({x: 1, y: 0});
            }

            gInputEngine.actions['move-right'] = false;
        }

        if (gInputEngine.actions['rotate']) {
            var newShape = self.currentBlock.rotations[self.currentBlock.nextRotation('counterclockwise')];
            if (self.tablero.blockFits(newShape, self.currentBlock.getPosition())) {
                self.currentBlock.rotate('counterclockwise');
            }
            gInputEngine.actions['rotate'] = false;
        }

        self.accumulatedTikz += self.downSpeed*self.tikzPerDownSpeed;
        if (gInputEngine.actions['move-down']) {
            self.accumulatedTikz += 20;
        }

        if (self.accumulatedTikz >= 100) {
            var newPos = self.currentBlock.getPosition();
            newPos.y += 1;
            
            if (self.tablero.blockFits(self.currentBlock.shape, newPos)) {
                self.currentBlock.move({x:0, y:1});
            } else {
                if (!self.tablero.blockInsideTablero(self.currentBlock.shape, self.currentBlock.getPosition())) {
                    self.finishGame();
                    return;
                } else {
                    self.tablero.applyBlock(self.currentBlock.shape, self.currentBlock.getPosition());
                    self.currentBlock = null;
                    self.score.blockDropped(self.blockTime);
                    self.blockTime = 0;
                }
            }
            
            self.accumulatedTikz = 0;
        }

        var completeRows = self.tablero.completeRows();
        if (completeRows.length > 0) {
            self.tablero.deleteRows(completeRows);
            self.score.linesCompleted(completeRows.length);
            self.linesCompleted += completeRows.length;
            self.downSpeed = Math.floor(self.linesCompleted / 10) + 1;
        }
    },

    generateNextBlock: function() {
        var nextBlock = self.spawnEntity(this.possibleBlocks[Math.floor(Math.random() * this.possibleBlocks.length)]);
        var offset = this.tablero.areaTablero.getOffsetNextBlock();
        var position = {"x": 0, "y": 0};
        position.x = offset.x + offset.w/2 - (nextBlock.boundingBox.right - nextBlock.boundingBox.left)*gRenderEngine.blockSize.w/2 - nextBlock.boundingBox.left*gRenderEngine.blockSize.w;
        position.y = offset.y + offset.h/2 - (nextBlock.boundingBox.bottom - nextBlock.boundingBox.top)*gRenderEngine.blockSize.h/2 - nextBlock.boundingBox.top*gRenderEngine.blockSize.h;

        nextBlock.setup({"x": 0, "y": 0}, gRenderEngine.blockSize);

        nextBlock.worldPosition = position;
        return nextBlock;
    },

    render: function() {
        gRenderEngine.context.clearRect(0, 0, gRenderEngine.canvas.width, gRenderEngine.canvas.height);
                
        self = gGameEngine;

        gGameEngine.tablero.draw();
        if (self.currentBlock !== null) {
            self.currentBlock.draw();
        }

        if (self.nextBlock !== null) {
            self.nextBlock.draw();
        }

        gGameEngine.score.draw();
    },

    /*
    run: function(options) {
        var now,
            dt = 0,
            last = timestamp(),
            step = 1.0/options.fps,
            update = this.update,
            render = this.render;
            requestId = this.requestId;
        

        function loop() {
            now = timestamp();
            dt = dt + Math.min(1, (now - last) /1000);
            while (dt > step) {
                dt = dt - step;
                update(step);
            }

            render(dt);
            last = now;
            gGameEngine.requestId = requestAnimationFrame(loop, options.canvas);
        }

        if (!gGameEngine.requestId) {
            loop();
        }
        console.log(this);
    },

    stop: function() {
              console.log(this);
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    },
    */

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
        this.tablero.setup(this.tiledMap);
        var scorePosition = {
            "x": this.tiledMap.getObjects().score.x,
            "y": this.tiledMap.getObjects().score.y,
        };
        var scoreSize = {
            "w": this.tiledMap.getObjects().score.w,
            "h": this.tiledMap.getObjects().score.h,
        };

        this.score.setup(scorePosition, scoreSize, 7);
    },
});

gGameEngine = new GameEngine();
