GameEngine = Class.extend({
    entities: [],
    factory: {},

    //move_dir: new Vec2(0, 0),
    //dir_vec: new Vec2(0, 0),
    
    setup: function() {
    },

    spawnEntity: function (typename) {
        return new (this.factory[typename])();
    },

    update: function () {
        for (var i = 0; i < this.entities.length; i++) {
            var ent = this.entities[i];
            ent.update();
        }
    }
});

gGameEngine = new GameEngine();
