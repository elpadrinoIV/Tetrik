var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;


buster.testCase("Tablero", {
    "Aplicar block": function() {
        var tablero = new Tablero(5, 5);
        var f1 = [ [1, 1],
                   [1, 1] ];
        var pos1 = {x: 0, y: 0};
        
        var f2 = [ [2, 0],
                   [2, 2] ];

        var pos2 = {x: 4, y: -1};
        
        var f3 = [ [0, 3, 0],
                   [3, 3, 0],
                   [0, 3, 0]];

        var pos3 = {x: -1, y: 3};

        var f4 = [ [0, 4],
                   [4, 4] ];

        var pos4 = {x: 3, y: 3};

        var tableroEsperado = [ [1, 1, 0, 0, 2],
                                [1, 1, 0, 0, 0],
                                [0, 0, 0, 0, 0],
                                [3, 0, 0, 0, 4],
                                [3, 0, 0, 4, 4]];

        tablero.applyBlock(f1, pos1);
        tablero.applyBlock(f2, pos2);
        tablero.applyBlock(f3, pos3);
        tablero.applyBlock(f4, pos4);

        assert.equals(tablero.getTablero(), tableroEsperado);
    },

    "Entra block": function() {
        var tablero = new Tablero(3, 3);
        var formaTablero = [ [1, 0, 1],
                             [0, 0, 0],
                             [1, 1, 1] ];
        tablero.applyBlock(formaTablero, {x: 0, y: 0});

        var block = [ [0, 2, 0],
                      [2, 2, 2],
                      [0, 0, 0] ];

        assert(tablero.blockFits(block, {x: 0, y: 0}));
    },

    "No Entra block": function() {
        var tablero = new Tablero(3, 3);
        var formaTablero = [ [0, 0, 0],
                             [0, 1, 0],
                             [0, 0, 0] ];
        tablero.applyBlock(formaTablero, {x: 0, y: 0});

        var b1 = [ [1, 1],
                   [1, 1]];

        refute(tablero.blockFits(b1, {x: 0, y: 0}));
        refute(tablero.blockFits(b1, {x: 1, y: 1}));

        var b2 = [ [1, 0, 0],
                   [1, 1, 0],
                   [1, 0, 0]];

        refute(tablero.blockFits(b2, {x: 0, y: 0}));
        refute(tablero.blockFits(b2, {x: 1, y: 1}));
    },
});
