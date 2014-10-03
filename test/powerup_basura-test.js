var buster = require("buster");
var assert = buster.referee.assert;
var refute = buster.referee.refute;


buster.testCase("Power Up basura", {
    "Unique position": function() {
        var tablero = new Tablero(3, 3);
        var f =  [ [0, 0, 1],
                   [0, 1, 1],
                   [0, 1, 1] ];
        var pos = {x: 0, y: 0};
        

        var tableroEsperado = [ [0, 1, 1],
                                [0, 1, 1],
                                [0, 1, 1] ];

        tablero.applyBlock(f, pos);

        var powerup = new Basura();
        powerup.fill(tablero, 1, 1);

        assert.equals(tablero.getTablero(), tableroEsperado);
    },

    "Unique position and not enough space": function() {
        var tablero = new Tablero(3, 3);
        var f =  [ [0, 0, 1],
                   [0, 1, 1],
                   [0, 1, 1] ];
        var pos = {x: 0, y: 0};
        

        var tableroEsperado = [ [0, 1, 1],
                                [0, 1, 1],
                                [0, 1, 1] ];

        tablero.applyBlock(f, pos);

        var powerup = new Basura();
        powerup.fill(tablero, 1, 2);

        assert.equals(tablero.getTablero(), tableroEsperado);
    },

    "Unique position and not enough lines": function() {
        var tablero = new Tablero(3, 3);
        var f =  [ [0, 0, 1],
                   [0, 1, 1],
                   [0, 1, 1] ];
        var pos = {x: 0, y: 0};
        

        var tableroEsperado = [ [0, 1, 1],
                                [0, 1, 1],
                                [0, 1, 1] ];

        tablero.applyBlock(f, pos);

        var powerup = new Basura();
        powerup.fill(tablero, 2, 1);

        assert.equals(tablero.getTablero(), tableroEsperado);
    },

    "Unique position several blocks": function() {
        var tablero = new Tablero(4, 3);
        var f =  [ [0, 0, 0, 0],
                   [0, 1, 1, 1],
                   [0, 1, 1, 1] ];
        var pos = {x: 0, y: 0};
        

        var tableroEsperado = [ [0, 1, 1, 1],
                                [0, 1, 1, 1],
                                [0, 1, 1, 1] ];

        tablero.applyBlock(f, pos);

        var powerup = new Basura();
        powerup.fill(tablero, 1, 3);

        assert.equals(tablero.getTablero(), tableroEsperado);
    },

    "Several blocks": function() {
        var tablero = new Tablero(4, 3);
        var f =  [ [0, 0, 0, 0],
                   [0, 1, 1, 1],
                   [0, 1, 1, 1] ];
        var pos = {x: 0, y: 0};
        

        var tableroEsperado1 = [ [0, 1, 1, 0],
                                 [0, 1, 1, 1],
                                 [0, 1, 1, 1] ];

        var tableroEsperado2 = [ [0, 1, 0, 1],
                                 [0, 1, 1, 1],
                                 [0, 1, 1, 1] ];

        var tableroEsperado3 = [ [0, 0, 1, 1],
                                 [0, 1, 1, 1],
                                 [0, 1, 1, 1] ];

        tablero.applyBlock(f, pos);

        var powerup = new Basura();
        powerup.fill(tablero, 1, 3);

        assert(tablero.getTablero() == tableroEsperado1 ||
               tablero.getTablero() == tableroEsperado2 ||
               tablero.getTablero() == tableroEsperado3 );
    },

    "Uneven layout": function() {
        var tablero = new Tablero(4, 4);
        var f =  [ [0, 0, 0, 0],
                   [0, 1, 0, 0],
                   [0, 1, 1, 0],
                   [0, 1, 1, 1] ];
        var pos = {x: 0, y: 0};
        

        var tableroEsperado1 = [ [0, 1, 0, 0],
                                 [0, 1, 0, 0],
                                 [0, 1, 1, 0],
                                 [0, 1, 1, 1] ];

        var tableroEsperado2 = [ [0, 0, 0, 0],
                                 [0, 1, 1, 0],
                                 [0, 1, 1, 0],
                                 [0, 1, 1, 1] ];

        var tableroEsperado3 = [ [0, 0, 0, 0],
                                 [0, 1, 0, 0],
                                 [0, 1, 1, 1],
                                 [0, 1, 1, 1] ];


        tablero.applyBlock(f, pos);

        var powerup = new Basura();
        powerup.fill(tablero, 1, 1);

        assert(tablero.getTablero() == tableroEsperado1 ||
               tablero.getTablero() == tableroEsperado2 ||
               tablero.getTablero() == tableroEsperado3 );
    },

    "Uneven layout with holes": function() {
        var tablero = new Tablero(4, 4);
        var f =  [ [0, 0, 0, 0],
                   [0, 1, 0, 1],
                   [0, 1, 1, 0],
                   [0, 1, 1, 1] ];
        var pos = {x: 0, y: 0};
        

        var tableroEsperado1 = [ [0, 1, 0, 0],
                                 [0, 1, 0, 1],
                                 [0, 1, 1, 0],
                                 [0, 1, 1, 1] ];

        var tableroEsperado2 = [ [0, 0, 0, 0],
                                 [0, 1, 1, 1],
                                 [0, 1, 1, 0],
                                 [0, 1, 1, 1] ];

        var tableroEsperado3 = [ [0, 0, 0, 1],
                                 [0, 1, 0, 1],
                                 [0, 1, 1, 0],
                                 [0, 1, 1, 1] ];


        tablero.applyBlock(f, pos);

        var powerup = new Basura();
        powerup.fill(tablero, 1, 1);

        assert(tablero.getTablero() == tableroEsperado1 ||
               tablero.getTablero() == tableroEsperado2 ||
               tablero.getTablero() == tableroEsperado3 );
    },
});
