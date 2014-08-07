InputEngine = Class.extend({
    bindings: {},

    actions: {},

    setup: function() {
        this.bind(81, 'rotate');
        this.bind(68, 'move-left');
        this.bind(71, 'move-right');
        this.bind(70, 'move-down');
        this.bind(80, 'pause');
        //gRenderEngine.canvas.addEventListener("mousemove", this.onMouseMove);
        //gRenderEngine.canvas.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keydown", this.onKeyDown);
        window.addEventListener("keyup", this.onKeyUp);
        gRenderEngine.canvas.addEventListener("keyup", this.onKeyUp);
        console.log(gRenderEngine.canvas);
    },

    onKeyDown: function(event) {
        var action = gInputEngine.bindings[event.keyCode];
        if (action) {
            gInputEngine.actions[action] = true;
        }
    },

    onKeyUp: function(event) {
        var action = gInputEngine.bindings[event.keyCode];
        if (action) {
            gInputEngine.actions[action] = false;
        }
    },

    bind: function(key, action) {
        this.bindings[key] = action;
    },
});

var gInputEngine = new InputEngine();
