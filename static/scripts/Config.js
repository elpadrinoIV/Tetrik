Config = Class.extend({
    values: {},

    loadDefaults: function() {
        this.set("block_max_score", 50);
        this.set("block_min_score", 10);
        this.set("min_score_time", 15);

        this.setHash("completed_lines_score", 1, 50);
        this.setHash("completed_lines_score", 2, 120);
        this.setHash("completed_lines_score", 3, 200);
        this.setHash("completed_lines_score", 4, 400);
    },

    set: function(name, value) {
        this.values[name] = value;
    },

    setHash: function(name, key, value) {
        var h = this.get(name);
        if (!h) {
            h = {};
            this.values[name] = h;
        }

        h[key] = value;
    },

    get: function(name) {
        return this.values[name];
    },
});

gConfig = new Config();

