GameEngine = Class.extend({
    entities: [],
    factory: {},

    downSpeed: 4,

    accumulatedTikz: 0,

    currentBlock: null,

    nextBlock: null,

    tablero: null,

    //fondo: null,

    preloadComplete: false,

    preLoadAssets: function() {
        console.log("preload called");
        var assets = new Array();
        assets.push("static/images/blocksAtlas.png");

        xhrGet("static/images/blocksAtlas.json", function(data) {
            var sheet = new SpriteSheet();
            sheet.load("static/images/blocksAtlas.png");
            sheet.parseAtlasDefinition(data.response);
            gGameEngine.preloadComplete = true;
        });
    },

    setup: function() {
        // cargar todo
        console.log("setup gameengine");

        this.tablero = new Tablero(20, 10);
        this.tablero.loadSpecs('static/images/tablerotetris.json');

        this.preLoadAssets();
    },

    loadComplete: function() {
        return (gGameEngine.preloadComplete && gGameEngine.tablero.loadComplete());
    },

    spawnEntity: function (typename) {
        return new (this.factory[typename])();
    },

    update: function () {
        self = gGameEngine;

        if (self.currentBlock === null) {
            self.currentBlock = self.spawnEntity('LShape');
            self.currentBlock.setup(self.tablero.areaTablero.getOffsetTablero(), {"w": 25, "h": 25});
            self.currentBlock.setPosition(4, -4);
        }

        self.accumulatedTikz += self.downSpeed;
        if (self.accumulatedTikz >= 100) {
            var newPos = self.currentBlock.getPosition();
            newPos.y += 1;
            
            if (self.tablero.blockFits(self.currentBlock.shape, newPos)) {
                self.currentBlock.move({x:0, y:1});
            } else {
                self.tablero.applyBlock(self.currentBlock.shape, self.currentBlock.getPosition());
                self.currentBlock = null;
            }
            
            self.accumulatedTikz = 0;
        }
    },

    render: function() {
        gRenderEngine.context.clearRect(0, 0, gRenderEngine.canvas.width, gRenderEngine.canvas.height);
                
        self = gGameEngine;

        gGameEngine.tablero.draw();
        if (self.currentBlock !== null) {
            self.currentBlock.draw();
        }
    },

    run: function(options) {
        var now,
            dt = 0,
            last = timestamp(),
            step = 1.0/options.fps,
            update = this.update,
            render = this.render;

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
});

gGameEngine = new GameEngine();
