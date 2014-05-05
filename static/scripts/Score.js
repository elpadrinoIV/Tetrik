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

    offset: {
        "x": 0,
        "y": 0
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

        this.offset.x = (this.size.w - this.maxNumbers) / (this.maxNumbers + 1);
        this.offset.y = (this.size.h - 1) / (1 + 1);
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
            var position = {
                "x": this.position.x + this.offset.x + (i + this.maxNumbers - stringScore.length)*(this.offset.x + 1),
                "y": this.position.y + this.offset.y
            };

            imageRepresentation.push({"img": imageNumber, "position": position});
        }
        return imageRepresentation;
    }
});
