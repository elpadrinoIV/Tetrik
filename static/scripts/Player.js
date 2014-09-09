Player = Class.extend({
    id: 0,

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

    gameOver: false,

    topLeftCorner: {
        'x': 0,
        'y': 0
    },

    init: function(id) {
        this.id = id;
        this.tablero = new Tablero(20, 10);
        this.score = new Score();
    },

    setPosition: function(x_top_left_corner, y_top_left_corner) {
        this.topLeftCorner.x = x_top_left_corner;
        this.topLeftCorner.y = y_top_left_corner;
    },

    setup: function(tiledMap) {
        this.tablero.setup(tiledMap);
        var scorePosition = {
            "x": this.topLeftCorner.x + tiledMap.getObjects().score.x,
            "y": this.topLeftCorner.y + tiledMap.getObjects().score.y,
        };
        var scoreSize = {
            "w": tiledMap.getObjects().score.w,
            "h": tiledMap.getObjects().score.h,
        };

        this.score.setup(scorePosition, scoreSize, 7);
    },

    finishGame: function() {
        this.gameOver = true;
    },

    changeToNextBlock: function() {
        this.currentBlock = this.nextBlock;

        var offsetTablero = { 'x': this.topLeftCorner.x + this.tablero.areaTablero.getOffsetTablero().x,
                              'y': this.topLeftCorner.y + this.tablero.areaTablero.getOffsetTablero().y };
        this.currentBlock.setup(offsetTablero, gRenderEngine.blockSize);
        this.currentBlock.setPosition(4, -4);
    },

    setNextBlock: function(nextBlock) {
        var offset = this.tablero.areaTablero.getOffsetNextBlock();
        var position = {"x": 0, "y": 0};
        position.x = this.topLeftCorner.x + offset.x + offset.w/2 - (nextBlock.boundingBox.right - nextBlock.boundingBox.left)*gRenderEngine.blockSize.w/2 - nextBlock.boundingBox.left*gRenderEngine.blockSize.w;
        position.y = this.topLeftCorner.y + offset.y + offset.h/2 - (nextBlock.boundingBox.bottom - nextBlock.boundingBox.top)*gRenderEngine.blockSize.h/2 - nextBlock.boundingBox.top*gRenderEngine.blockSize.h;

        nextBlock.worldPosition = position;
        this.nextBlock = nextBlock;
    },

    render: function() {
        this.tablero.draw(this.topLeftCorner);
        if (this.currentBlock !== null) {
            this.currentBlock.draw();
        }

        if (this.nextBlock !== null) {
            this.nextBlock.draw();
        }

        this.score.draw();
    }

});

