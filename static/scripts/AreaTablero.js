AreaTablero = Class.extend({
    tiledMap: null,

    offsetTablero: null,

    offsetNextBlock: null,

    init: function(tiledMap) {
        this.tiledMap = tiledMap;
    },

    draw: function(context, offset) {
        this.tiledMap.draw(context, offset);
    },

    getOffsetTablero: function() {
        if (this.offsetTablero === null) {
            this.offsetTablero = this.tiledMap.getObjects().tablero;
        }

        return {"x": this.offsetTablero.x, "y": this.offsetTablero.y};
    },

    getOffsetNextBlock: function() {
        if (this.offsetNextBlock === null) {
            this.offsetNextBlock = this.tiledMap.getObjects().next;
        }

        return {"x": this.offsetNextBlock.x,
                "y": this.offsetNextBlock.y,
                "w": this.offsetNextBlock.w,
                "h": this.offsetNextBlock.h};
    },
});
