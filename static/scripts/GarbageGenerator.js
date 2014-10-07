function shuffle(arr) {
    var counter = arr.length, temp, index;

    // While there are elements in the arr
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = arr[counter];
        arr[counter] = arr[index];
        arr[index] = temp;
    }

    return arr;
}

GarbageGenerator = Class.extend({
    fill : function(tablero, rows, blocksPerRow) {
        for (var r = 0; r < rows; r++) {
            // Check for posible positions and then randomly choose
            var posiblePositions = [];
            var posiblePos;
            for (var c = 0; c < tablero.size.width; c++) {
                posiblePos = this.posibleRowPosition(tablero, c);
                if (posiblePos != -1) {
                    posiblePositions.push({'x': c, 'y': posiblePos});
                }
            }

            posiblePositions = shuffle(posiblePositions);
            var nextBlock;
            var block = [ [1] ];
            for (var i = 0; i < blocksPerRow; i++) {
                var nextBlockPosition = posiblePositions.pop();
                if (nextBlockPosition) {
                    tablero.applyBlock(block, nextBlockPosition);
                }
            }
        }
    },

    posibleRowPosition : function (tablero, column) {
        // go from top to bottom until reaching a non-zero block
        // The posible row is the previous one as long as it doesn't
        // complete a line
        var row = -1;
        var block = [ [1] ];
        
        for (var current_row = 0; current_row <= tablero.size.height; current_row++) {
            if (tablero.blockFits(block, {'x': column, 'y': current_row})) {
                row = current_row;
            } else {
                break;
            }
        }

        if (row != -1) {
            var row_complete = true;
            for (var c = 0; c < tablero.tablero[row].length; c++) {
                if (tablero.tablero[row][c] === 0 && c != column) {
                    row_complete = false;
                    break;
                }
            }
            if (row_complete) {
                row = -1;
            }
        }

        return row;
    }
});
