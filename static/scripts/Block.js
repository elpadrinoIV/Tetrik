Block = Class.extend({
    blockSize: {
        w: 25,
        h: 25
    },

    pos: {
        x: 0,
        y: 0
    },

    shape: null,

    boundingBox: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },

    setPos: function(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    },

    rotate: function(direction) {},

    draw: function() {
        console.log("Dibujando");
        for (var rowNumber = 0; rowNumber < this.shape.length; rowNumber++) {
            var row = this.shape[rowNumber];
            for (var colNumber = 0; colNumber < row.length; colNumber++) {
                if (row[colNumber] !== 0) {
                    gRenderEngine.context.drawImage(this.blockImg,
                                      this.pos.x + colNumber*this.blockSize.w,
                                      this.pos.y + rowNumber*this.blockSize.h,
                                      this.blockSize.w,
                                      this.blockSize.h);

                }
            }
        }
    }
});

IShape = Block.extend({
    blockImg: null,

    shape: [ [ 1, 0, 0, 0],
             [ 1, 0, 0, 0],
             [ 1, 0, 0, 0],
             [ 1, 0, 0, 0]],

    boundingBox: {
        left: 0*this.blockSize,
        right: 1*this.blockSize,
        top: 0,
        bottom: 4*this.blockSize
    },
    rotate: function(direction) {
    },

});

JShape = Block.extend({
    blockImg: null,

    shape: [ [ 1, 0, 0],
             [ 1, 1, 1],
             [ 0, 0, 0]],

    boundingBox: {
        left: 0*this.blockSize,
        right: 3*this.blockSize,
        top: 0,
        bottom: 2*this.blockSize
    },
    rotate: function(direction) {
    },
});

LShape = Block.extend({
    blockImg: null,

    shape: [ [ 0, 0, 1],
             [ 1, 1, 1],
             [ 0, 0, 0]],

    boundingBox: {
        left: 0*this.blockSize,
        right: 3*this.blockSize,
        top: 0,
        bottom: 2*this.blockSize
    },
    rotate: function(direction) {
    },
});

OShape = Block.extend({
    blockImg: null,

    shape: [ [ 1, 1],
             [ 1, 1]],

    boundingBox: {
        left: 0*this.blockSize,
        right: 2*this.blockSize,
        top: 0,
        bottom: 2*this.blockSize
    },
    rotate: function(direction) {
    },
});

SShape = Block.extend({
    blockImg: null,

    shape: [ [ 0, 1, 1],
             [ 1, 1, 0],
             [ 0, 0, 0]],

    boundingBox: {
        left: 0*this.blockSize,
        right: 3*this.blockSize,
        top: 0,
        bottom: 2*this.blockSize
    },
    rotate: function(direction) {
    },
});

TShape = Block.extend({
    blockImg: null,

    shape: [ [ 1, 1, 1],
             [ 0, 1, 0],
             [ 0, 0, 0]],

    boundingBox: {
        left: 0*this.blockSize,
        right: 3*this.blockSize,
        top: 0,
        bottom: 2*this.blockSize
    },
    rotate: function(direction) {
    },
});

ZShape = Block.extend({
    blockImg: null,

    shape: [ [ 1, 1, 0],
             [ 0, 1, 1],
             [ 0, 0, 0]],

    boundingBox: {
        left: 0*this.blockSize,
        right: 3*this.blockSize,
        top: 0,
        bottom: 2*this.blockSize
    },
    rotate: function(direction) {
    },
});

gGameEngine.factory['IShape'] = IShape;
gGameEngine.factory['JShape'] = JShape;
gGameEngine.factory['LShape'] = LShape;
gGameEngine.factory['OShape'] = OShape;
gGameEngine.factory['SShape'] = SShape;
gGameEngine.factory['TShape'] = TShape;
gGameEngine.factory['ZShape'] = ZShape;
