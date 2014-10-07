function checkWait(conditionFunction, resultFunction) {
    var tev = setInterval(function() {
        if (conditionFunction()) {
            resultFunction();
            clearInterval(tev);
        }
    }, 100);
}

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Data().getTime();
}

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

