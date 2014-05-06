Tablero = Class.extend({
    areaTablero: null,

    offset: {
        "x": 0,
        "y": 0
    },

    init: function(rows, columns) {
        if (!rows) {
            rows = 20;
        }

        if (!columns) {
            columns = 10;
        }

        this.tablero = this.generarTableroVacio(rows, columns);
        this.size = {width: columns, height: rows};
    },

    setup: function(tiledMap) {
        this.areaTablero = new AreaTablero(tiledMap);
    },

    generarTableroVacio: function(filas, columnas) {
        var tableroVacio = new Array();
        for (var fila = 0; fila < filas; fila++) {
            var f = Array.apply(null, Array(columnas));
            f = f.map(function (x, i) {return 0});
            tableroVacio.push(f);
        }
        
        return tableroVacio;
    },

    applyBlock: function(block, position) {
        for (var f = 0; f < block.length; f++) {
            for (var c = 0; c < block[f].length; c++) {
                var x_final = position.x + c;
                var y_final = position.y + f;

                if (block[f][c] !== 0 && y_final >= 0 && y_final < this.size.height && x_final >= 0 && x_final < this.size.width) {
                    this.tablero[y_final][x_final] = block[f][c];
                }
            }
        }
    },

    blockFits: function(block, position) {
        var thereIsSpace = true;
        for (var f = 0; f < block.length; f++) {
            for (var c = 0; c < block[f].length; c++) {
                var x_final = position.x + c;
                var y_final = position.y + f;

                if (block[f][c] !== 0 && (y_final >= this.size.height || x_final < 0 || x_final >= this.size.width) ){
                    thereIsSpace = false;
                    break;
                }

                if (y_final >= 0 && y_final < this.size.height && x_final >= 0 && x_final < this.size.width) {
                    if (block[f][c] !== 0 && this.tablero[y_final][x_final] !== 0) {
                        thereIsSpace = false;
                        break;
                    }
                }
            }
        }
        return thereIsSpace;
    },

    completeRows: function() {
        var completeRows = [];
        for (var f = 0; f < this.tablero.length; f++) {
            var rowComplete = true;
            for (var c = 0; c < this.tablero[f].length; c++) {
                if (this.tablero[f][c] === 0) {
                    rowComplete = false;
                    break;
                }
            }
            if (rowComplete) {
                completeRows.push(f);
            }
        }
        return completeRows;
    },

    deleteRows: function(rowsToDelete) {
        rowsToDelete.sort();

        for (var r = 0; r < rowsToDelete.length; r++) {
            var rowToDelete = rowsToDelete[r];
            if (rowToDelete >= 0 && rowToDelete < this.tablero.length) {
                this.tablero.splice(rowToDelete, 1);

                var zeroRow = Array.apply(null, Array(this.size.width));
                zeroRow = zeroRow.map(function (x, i) {return 0});
                this.tablero.splice(0, 0, zeroRow);
            }
        }
    },

    getTablero: function() {
        return this.tablero;
    },

    draw: function() {
        this.areaTablero.draw(gRenderEngine.context);

        for (var row = 0; row < this.tablero.length; row++) {
            for (var column = 0; column < this.tablero[row].length; column++) {
                if (this.tablero[row][column] !== 0) {
                    xWorld = this.areaTablero.getOffsetTablero().x + column*gRenderEngine.blockSize.w;
                    yWorld = this.areaTablero.getOffsetTablero().y + row*gRenderEngine.blockSize.h;

                    var blockImg = "c" + this.tablero[row][column] + ".png";
 //                   console.log("(" + xWorld +", " + yWorld + ") - " + this.blockSize.w + "x" + this.blockSize.h);
                    drawSprite(blockImg,
                               xWorld,
                               yWorld,
                               gRenderEngine.blockSize.w,
                               gRenderEngine.blockSize.h);                           
                }
            }
        }
    },

});
