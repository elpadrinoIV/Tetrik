var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;

buster.testCase("Score maths", {
    setUp: function() {
        gConfig.set("block_max_score", 50);
        gConfig.set("block_min_score", 10);
        gConfig.set("min_score_time", 1000);
    },
    
    "Puntos puntaje maximo": function() {
        var score = new Score();

        score.blockDropped(0);

        assert.equals(score.getScore(), 50);
    },

    "Puntos puntaje minimo justo": function() {
        var score = new Score();

        score.blockDropped(1000);

        assert.equals(score.getScore(), 10);
    },

    "Puntos puntaje minimo pasado": function() {
        var score = new Score();

        score.blockDropped(3000);

        assert.equals(score.getScore(), 10);
    },

    "Puntos puntaje interpolado": function() {
        var score = new Score();

        score.blockDropped(500);

        assert.equals(score.getScore(), 30);
    },
});
