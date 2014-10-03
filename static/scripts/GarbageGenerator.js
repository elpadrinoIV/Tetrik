GarbageGenerator = Class.extend({
    fill : function(tablero, rows, blocksPerRow) {
    },

    posibleRowPosition : function (tablero, column) {
        // go from top to bottom until reaching a non-zero block
        // The posible row is the previous one as long as it doesn't
        // complete a line
        var row = -1;
        var block = [ [1] ];
        
        for (var current_row = 0; current_row <= tablero.size.height; current_row++) {
            if (tablero.blockFits
        }
        return 0;
    }
});
