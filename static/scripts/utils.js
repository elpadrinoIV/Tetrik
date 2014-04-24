function checkWait(conditionFunction, resultFunction) {
    var tev = setInterval(function() {
        if (conditionFunction()) {
            resultFunction();
            clearInterval(tev);
        }
    }, 100);
}
