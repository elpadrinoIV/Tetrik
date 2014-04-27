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
