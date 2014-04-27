Tablero = Class.extend({
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

                if (y_final >= 0 && y_final < this.size.height && x_final >= 0 && x_final < this.size.width) {
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

    getTablero: function() {
        return this.tablero;
    }
});
