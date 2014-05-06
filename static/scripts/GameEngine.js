GameEngine = Class.extend({
    tiledMap: null,

    entities: [],

    possibleBlocks: ["IShape", "JShape", "LShape", "OShape", "SShape", "TShape", "ZShape"],

    factory: {},

    downSpeed: 4,

    accumulatedTikz: 0,

    currentBlock: null,

    nextBlock: null,

    tablero: null,
    
    score: null,

    preloadComplete: false,

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
    },

    loadComplete: function() {
        return (gGameEngine.preloadComplete && gGameEngine.tiledMap.fullyLoaded);
    },

    spawnEntity: function (typename) {
        return new (this.factory[typename])();
    },

    update: function () {
        self = gGameEngine;

        if (self.nextBlock === null) {
            self.nextBlock = self.generateNextBlock();
        }

        if (self.currentBlock === null) {
            self.currentBlock = self.nextBlock;
            console.log(gRenderEngine.blockSize);
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
                self.currentBlock.move({x:1, y: 0});
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

        self.accumulatedTikz += self.downSpeed;
        if (gInputEngine.actions['move-down']) {
            self.accumulatedTikz += 20;
        }

        if (self.accumulatedTikz >= 100) {
            var newPos = self.currentBlock.getPosition();
            newPos.y += 1;
            
            if (self.tablero.blockFits(self.currentBlock.shape, newPos)) {
                self.currentBlock.move({x:0, y:1});
            } else {
                self.tablero.applyBlock(self.currentBlock.shape, self.currentBlock.getPosition());
                self.currentBlock = null;
                self.score.add(17);
            }
            
            self.accumulatedTikz = 0;
        }

        var completeRows = self.tablero.completeRows();
        if (completeRows.length > 0) {
            self.tablero.deleteRows(completeRows);
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

    run: function(options) {
        var now,
            dt = 0,
            last = timestamp(),
            step = 1.0/options.fps,
            update = this.update,
            render = this.render;
        
        this.setupComponents();

        function frame() {
            now = timestamp();
            dt = dt + Math.min(1, (now - last) /1000);
            while (dt > step) {
                dt = dt - step;
                update(step);
            }

            render(dt);
            last = now;
            requestAnimationFrame(frame, options.canvas);
        }

        requestAnimationFrame(frame);
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
