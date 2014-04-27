var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;

buster.testCase("Rotaciones bloque", {
    "Vuelta completa vuelve al comienzo": function() {
        var bloques = [new IShape(),
                       new JShape(),
                       new LShape(),
                       new OShape(),
                       new SShape(),
                       new ZShape(),
                       new TShape()];
        for (var nroBloque = 0; nroBloque < bloques.length; nroBloque++) {
            var block = bloques[nroBloque];
            var originalShape = block.getShape();
            for (var nroRotacion = 0; nroRotacion < block.rotations.length; nroRotacion++) {
                block.rotate("counterclockwise");
            }
            assert.equals(block.getShape(), originalShape);
        }
    },

    "Vuelta incompleta NO vuelve al comienzo": function() {
        var bloques = [new IShape(),
                       new JShape(),
                       new LShape(),
                       new SShape(),
                       new ZShape(),
                       new TShape()];
        for (var nroBloque = 0; nroBloque < bloques.length; nroBloque++) {
            var block = bloques[nroBloque];
            var originalShape = block.getShape();
            block.rotate("counterclockwise");
            refute.equals(block.getShape(), originalShape);
        }
    },

    "rotar ccw y luego cw vuelve al mismo lugar": function() {
        var bloques = [new IShape(),
                       new JShape(),
                       new LShape(),
                       new OShape(),
                       new SShape(),
                       new ZShape(),
                       new TShape()];
        for (var nroBloque = 0; nroBloque < bloques.length; nroBloque++) {
            var block = bloques[nroBloque];
            var originalShape = block.getShape();
            block.rotate("counterclockwise");
            block.rotate("clockwise");

            assert.equals(block.getShape(), originalShape);
        }
    },
});
