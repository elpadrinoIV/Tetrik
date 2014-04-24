GameEngine = Class.extend({
    entities: [],
    factory: {},

    //move_dir: new Vec2(0, 0),
    //dir_vec: new Vec2(0, 0),
    

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
        var fondo = new Image();
        fondo.onload = function() {
            gRenderEngine.context.drawImage(fondo, 0, 0);
        };
        fondo.src = 'static/images/background.png';

        this.preLoadAssets();
    },


    spawnEntity: function (typename) {
        return new (this.factory[typename])();
    },

    update: function () {
        for (var i = 0; i < this.entities.length; i++) {
            var ent = this.entities[i];
            ent.update();
        }
    },

    loadComplete: function() {
        return this.preloadComplete;
    }
});

gGameEngine = new GameEngine();
