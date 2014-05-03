var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;

buster.testCase("Rotaciones bloque", {
    "Vuelta completa vuelve al comienzo": function() {
        var blocks = [new IShape(),
                       new JShape(),
                       new LShape(),
                       new OShape(),
                       new SShape(),
                       new ZShape(),
                       new TShape()];
        for (var nroBloque = 0; nroBloque < blocks.length; nroBloque++) {
            var block = blocks[nroBloque];
            var originalShape = block.getShape();
            for (var nroRotacion = 0; nroRotacion < block.rotations.length; nroRotacion++) {
                block.rotate("counterclockwise");
            }
            assert.equals(block.getShape(), originalShape);
        }
    },

    "Vuelta incompleta NO vuelve al comienzo": function() {
        var blocks = [new IShape(),
                       new JShape(),
                       new LShape(),
                       new SShape(),
                       new ZShape(),
                       new TShape()];
        for (var nroBloque = 0; nroBloque < blocks.length; nroBloque++) {
            var block = blocks[nroBloque];
            var originalShape = block.getShape();
            block.rotate("counterclockwise");
            refute.equals(block.getShape(), originalShape);
        }
    },

    "rotar ccw y luego cw vuelve al mismo lugar": function() {
        var blocks = [new IShape(),
                       new JShape(),
                       new LShape(),
                       new OShape(),
                       new SShape(),
                       new ZShape(),
                       new TShape()];
        for (var nroBloque = 0; nroBloque < blocks.length; nroBloque++) {
            var block = blocks[nroBloque];
            var originalShape = block.getShape();
            block.rotate("counterclockwise");
            block.rotate("clockwise");

            assert.equals(block.getShape(), originalShape);
        }
    },

    "posicion a dibujar es relativa": function() {
        var block = new LShape();
        var offset = {"x": 10, "y": 20};
        var blockSize = {"w": 5, "h": 2};
        
        block.setup(offset, blockSize);

        block.setPosition(0, 0);
        assert.equals(block.worldPosition, {"x": 10, "y": 20});

        block.setPosition(1, 0);
        assert.equals(block.worldPosition, {"x": 15, "y": 20});

        block.setPosition(0, 1);
        assert.equals(block.worldPosition, {"x": 10, "y": 22});

        block.setPosition(3, 5);
        assert.equals(block.worldPosition, {"x": 25, "y": 30});
    }
});
