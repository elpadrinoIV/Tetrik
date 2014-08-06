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

        this.offset.x = (this.size.w - this.maxNumbers*numSize) / (this.maxNumbers + 1);
        this.offset.y = (this.size.h - 1) / (1 + 1);
    },

    add: function(points) {
        this.score += points;
    },

    blockDropped: function(time) {
        var minScore = gConfig.get("block_min_score");
        var maxScore = gConfig.get("block_max_score");
        var minScoreTime = gConfig.get("min_score_time");

        var m = (minScore - maxScore)/minScoreTime;

        var blockScore = Math.max(minScore, Math.round(m*time + maxScore));

        this.add(blockScore);
    },

    linesCompleted: function(lines) {
        var linesScore = gConfig.get("completed_lines_score")[lines];
        console.log("linesCompleted: " + lines);
        if (linesScore) {
            console.log("adding to score.. " + linesScore);
            this.add(linesScore);
        }
    },

    getScore: function() {
        return this.score;
    },

    getImageRepresentation: function() {
        var imageRepresentation = [];
        var stringScore = this.score.toString();
        var imageNumber = "";
        for (var i = 0; i < stringScore.length; i++) {
            imageNumber = stringScore[i] + ".png";
            var position = {
                "x": this.position.x + this.numberSize.w*0.5 + this.offset.x + (this.maxNumbers - stringScore.length + i)*(this.offset.x + this.numberSize.w),
                "y": this.position.y + this.size.h*0.5//this.offset.y
            };

            imageRepresentation.push({"img": imageNumber, "position": position});
        }
        return imageRepresentation;
    },

    draw: function() {
        var imageRepresentation = this.getImageRepresentation();
        for (var n = 0; n < imageRepresentation.length; n++) {
            drawSprite(imageRepresentation[n].img,
                       imageRepresentation[n].position.x,
                       imageRepresentation[n].position.y,
                       this.numberSize.w,
                       this.numberSize.h);
        }
    },
});
