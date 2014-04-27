Block = Class.extend({
    blockSize: {
        w: 25,
        h: 25
    },

    pos: {
        x: 0,
        y: 0
    },

    rotations: null,

    currentPosition: 0,

    shape: null,

    boundingBox: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    },

    init: function() {
        this.currentPosition = 0;
    },

    setPos: function(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    },

    rotate: function(direction) {
        if (direction === "clockwise") {
            this.currentPosition = (this.currentPosition - 1) % this.rotations.length
        } else if (direction == "counterclockwise") {
            this.currentPosition = (this.currentPosition + 1) % this.rotations.length
        }

        this.shape = this.rotations[this.currentPosition];
    },

    draw: function() {
        console.log("Dibujando");
        for (var rowNumber = 0; rowNumber < this.shape.length; rowNumber++) {
            var row = this.shape[rowNumber];
            for (var colNumber = 0; colNumber < row.length; colNumber++) {
                if (row[colNumber] !== 0) {
                    drawSprite(this.blockImg,
                               this.pos.x + colNumber*this.blockSize.w,
                               this.pos.y + rowNumber*this.blockSize.h,
                               this.blockSize.w,
                               this.blockSize.h);

                }
            }
        }
    },

    getShape: function() {
        return this.shape;
    },
});

IShape = Block.extend({
    blockImg: "c7.png",

    rotations: [
                [ [0, 7, 0, 0],
                  [0, 7, 0, 0],
                  [0, 7, 0, 0],
                  [0, 7, 0, 0]],

                [ [0, 0, 0, 0],
                  [7, 7, 7, 7],
                  [0, 0, 0, 0],
                  [0, 0, 0, 0]]
    ],

    boundingBox: {
        left: 1,
        right: 2,
        top: 0,
        bottom: 4,
    },

    init: function() {
        this.parent();
        this.shape = this.rotations[this.currentPosition];
    },
});

JShape = Block.extend({
    blockImg: "c6.png",

    rotations: [
                [ [6, 6, 6],
                  [0, 0, 6],
                  [0, 0, 0] ],

                [ [6, 6, 0],
                  [6, 0, 0],
                  [6, 0, 0] ],

                [ [6, 0, 0],
                  [6, 6, 6],
                  [0, 0, 0] ],

                [ [0, 6, 0],
                  [0, 6, 0],
                  [6, 6, 0] ]
    ],

    boundingBox: {
        left: 0,
        right: 3,
        top: 0,
        bottom: 2,
    },

    init: function() {
        this.parent();
        this.shape = this.rotations[this.currentPosition];
    },
});

LShape = Block.extend({
    blockImg: "c3.png",

    rotations: [
                [ [3, 3, 3],
                  [3, 0, 0],
                  [0, 0, 0] ],

                [ [3, 0, 0],
                  [3, 0, 0],
                  [3, 3, 0] ],

                [ [0, 0, 3],
                  [3, 3, 3],
                  [0, 0, 0] ],

                [ [3, 3, 0],
                  [0, 3, 0],
                  [0, 3, 0] ]
    ],

    boundingBox: {
        left: 0,
        right: 3,
        top: 0,
        bottom: 2
    },

    init: function() {
        this.parent();
        this.shape = this.rotations[this.currentPosition];
    },
});

OShape = Block.extend({
    blockImg: "c1.png",

    rotations: [
                [ [1, 1],
                  [1, 1] ]
    ],

    boundingBox: {
        left: 0,
        right: 2,
        top: 0,
        bottom: 2
    },

    init: function() {
        this.parent();
        this.shape = this.rotations[this.currentPosition];
    },
});

SShape = Block.extend({
    blockImg: "c5.png",

    rotations: [
                [ [0, 5, 5],
                  [5, 5, 0],
                  [0, 0, 0] ],

                [ [5, 0, 0],
                  [5, 5, 0],
                  [0, 5, 0] ]
    ],

    boundingBox: {
        left: 0,
        right: 3,
        top: 0,
        bottom: 2
    },

    init: function() {
        this.parent();
        this.shape = this.rotations[this.currentPosition];
    },
});

TShape = Block.extend({
    blockImg: "c4.png",

    rotations: [
                [ [4, 4, 4],
                  [0, 4, 0],
                  [0, 0, 0] ],

                [ [4, 0, 0],
                  [4, 4, 0],
                  [4, 0, 0] ],

                [ [0, 4, 0],
                  [4, 4, 4],
                  [0, 0, 0] ],

                [ [0, 4, 0],
                  [4, 4, 0],
                  [0, 4, 0] ]
    ],

    boundingBox: {
        left: 0*this.blockSize,
        right: 3*this.blockSize,
        top: 0,
        bottom: 2*this.blockSize
    },

    init: function() {
        this.parent();
        this.shape = this.rotations[this.currentPosition];
    },
});

ZShape = Block.extend({
    blockImg: "c2.png",

    rotations: [
                [ [2, 2, 0],
                  [0, 2, 2],
                  [0, 0, 0] ],

                [ [0, 2, 0],
                  [2, 2, 0],
                  [2, 0, 0] ]
    ],

    boundingBox: {
        left: 0*this.blockSize,
        right: 3*this.blockSize,
        top: 0,
        bottom: 2*this.blockSize
    },

    init: function() {
        this.parent();
        this.shape = this.rotations[this.currentPosition];
    },
});

gGameEngine.factory['IShape'] = IShape;
gGameEngine.factory['JShape'] = JShape;
gGameEngine.factory['LShape'] = LShape;
gGameEngine.factory['OShape'] = OShape;
gGameEngine.factory['SShape'] = SShape;
gGameEngine.factory['TShape'] = TShape;
gGameEngine.factory['ZShape'] = ZShape;
