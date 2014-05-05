Score = Class.extend({
    position : {
        "x": 0,
        "y": 0
    },

    size: {
        "w": 0,
        "h": 0
    },

    numberSize: {
        "w": 0,
        "h": 0
    },

    maxNumbers: 7,

    score: 0,

    setup: function(position, size, maxNumbers) {
        this.position = position;
        this.size = size;

        if (maxNumbers !== null) {
            this.maxNumbers = maxNumbers;
        }

        var numSize = Math.min(this.size.w/this.maxNumbers, this.size.h);
        this.numberSize.w = numSize;
        this.numberSize.h = numSize;
    },

    add: function(points) {
        this.score += points;
    },

    getImageRepresentation: function() {
        var imageRepresentation = [];
        var stringScore = this.score.toString();
        var imageNumber = "";
        for (var i = 0; i < stringScore.length; i++) {
            imageNumber = stringScore[i] + ".png";
            imageRepresentation.push({"img": imageNumber});
        }
        return imageRepresentation;
    }
});
