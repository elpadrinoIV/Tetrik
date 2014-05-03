function xhrGet(reqUri, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", reqUri, true);
    //xhr.onload = callback;
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4)
        {
            if (callback) {
                callback(xhr);
            }
        }
    }

    xhr.send();
}
