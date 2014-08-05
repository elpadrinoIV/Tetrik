Config = Class.extend({
    values: {},

    set: function(name, value) {
        this.values[name] = value;
    },

    get: function(name) {
        return this.values[name];
    }
});

gConfig = new Config();

