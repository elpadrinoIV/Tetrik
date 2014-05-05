var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;

buster.testCase("Score", {
    "Representacion en numeros 0": function() {
        var score = new Score();
        var imageRepresentation = score.getImageRepresentation();

        assert.equals(imageRepresentation.length, 1);
        assert.equals(imageRepresentation[0].img, "0.png");
    },

    "Representacion en numeros 351": function() {
        var score = new Score();
        score.add(300);
        score.add(51);
        var imageRepresentation = score.getImageRepresentation();

        assert.equals(imageRepresentation.length, 3);
        assert.equals(imageRepresentation[0].img, "3.png");
        assert.equals(imageRepresentation[1].img, "5.png");
        assert.equals(imageRepresentation[2].img, "1.png");
    },

    "Number size sencillo": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 7, "h": 1};

        score.setup(position, size, 7);

        assert.equals(score.numberSize, {"w": 1, "h": 1});
    },

    "Number size limita width": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 10, "h": 7};

        score.setup(position, size, 5);

        assert.equals(score.numberSize, {"w": 2, "h": 2});
    },


    "Number size limita height": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 10, "h": 0.5};

        score.setup(position, size, 5);

        assert.equals(score.numberSize, {"w": 0.5, "h": 0.5});
    }
});
