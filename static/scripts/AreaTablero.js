AreaTablero = Class.extend({
    tiledMap: null,

    offsetTablero: null,

    init: function(specsFile) {
        this.tiledMap = new TiledMap();
        this.tiledMap.load(specsFile);
    },

    draw: function(context) {
        this.tiledMap.draw(context);
    },

    getOffsetTablero: function() {
        if (this.offsetTablero === null) {
            this.offsetTablero = this.tiledMap.getObjects().tablero;
        }

        return {"x": this.offsetTablero.x, "y": this.offsetTablero.y};
    }
});
