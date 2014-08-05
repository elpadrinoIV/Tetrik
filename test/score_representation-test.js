var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;

buster.testCase("Score representation", {
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
    },

    "Position sencillo": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 5, "h": 1};

        score.setup(position, size, 5);
        score.add(12345);

        var imageRepresentation = score.getImageRepresentation();

        for (var i = 0; i < 5; i++) {
            assert.equals(imageRepresentation[i].position, {"x": i + 0.5, "y": 0.5});
        }
    },

    "Position sencillo menos numeros que el total": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 5, "h": 1};

        score.setup(position, size, 5);
        score.add(123);

        var imageRepresentation = score.getImageRepresentation();

        for (var i = 0; i < 3; i++) {
            assert.equals(imageRepresentation[i].position, {"x": i + 2 + 0.5, "y": 0.5});
        }
    },

    "Position offset en x": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 7, "h": 1};

        score.setup(position, size, 3);
        score.add(789);

        var imageRepresentation = score.getImageRepresentation();

        for (var i = 0; i < 3; i++) {
            var pos = 1 + i*2 + 0.5;
            assert.equals(imageRepresentation[i].position, {"x": pos, "y": 0.5});
        }
    },

    "Position offset en x width distinto de 1": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 14, "h": 2};

        score.setup(position, size, 3);
        score.add(789);

        var imageRepresentation = score.getImageRepresentation();

        for (var i = 0; i < 3; i++) {
            var pos = 3 + i*4 ;
            assert.equals(imageRepresentation[i].position, {"x": pos, "y": 1});
        }
    },

    "Position offset en x menos numeros que el total": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 7, "h": 1};

        score.setup(position, size, 3);
        score.add(54);

        var imageRepresentation = score.getImageRepresentation();

        assert.equals(imageRepresentation[0].position, {"x": 3.5, "y": 0.5});
        assert.equals(imageRepresentation[1].position, {"x": 5.5, "y": 0.5});
    },

    "Position offset en x menos numeros que el total width distinto de 1": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 14, "h": 2};

        score.setup(position, size, 3);
        score.add(54);

        var imageRepresentation = score.getImageRepresentation();

        assert.equals(imageRepresentation[0].position, {"x": 7, "y": 1});
        assert.equals(imageRepresentation[1].position, {"x": 11, "y": 1});
    },

    "Position offset en y": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 3, "h": 2};

        score.setup(position, size, 3);
        score.add(789);

        var imageRepresentation = score.getImageRepresentation();

        for (var i = 0; i < 3; i++) {
            assert.equals(imageRepresentation[i].position, {"x": i + 0.5, "y": 1});
        }
    },

    "Position offset en y width distinto de 1": function() {
        var score = new Score();
        var position = { "x": 0, "y": 0};
        var size = { "w": 4, "h": 3};

        score.setup(position, size, 2);
        score.add(78);

        var imageRepresentation = score.getImageRepresentation();

        assert.equals(imageRepresentation[0].position, {"x": 1, "y": 1.5});
        assert.equals(imageRepresentation[1].position, {"x": 3, "y": 1.5});
    },
});
