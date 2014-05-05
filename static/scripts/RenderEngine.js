RenderEngine = Class.extend({
    canvas: null,
    context: null,

    blockSize: {
        "w": 23.8,
        "h": 23.8
    },

    setup: function() {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        //this.canvas.width = 22*this.mult;
        //this.canvas.height = 22*this.mult;
        this.canvas.width = 550;
        this.canvas.height = 550;
        this.canvas.style.border = "1px solid #000000";
    }
});

var gRenderEngine = new RenderEngine();
