var TiledMap = Class.extend({
    // full parsed JSON
    mapData: null,

    tilesets: [],

    // width and height of map in tiles (total width = numXTiles*tileSize.x
    numXTiles: 0,
    numYTiles: 0,

    // size of each individual tileset
    tileSize: {
        "w": 0,
        "h": 0
    },

    // size of entire map in pixels
    width: 0,
    height: 0,

    imgLoadCount: 0,

    fullyLoaded: false,

    load: function(map) {
        var self = this;
        xhrGet(map, function(data) {
            self.parseMapJson(data.responseText);
        });
    },

    parseMapJson: function(mapJSON) {
        this.mapData = JSON.parse(mapJSON);

        this.numXTiles = this.mapData.width;
        this.numYTiles = this.mapData.height;

        this.tileSize.w = this.mapData.tilewidth;
        this.tileSize.h = this.mapData.tileheight;

        this.width = this.numXTiles * this.tileSize.w;
        this.height = this.numYTiles * this.tileSize.h;

        var self = this;
        for (var i = 0; i < this.mapData.tilesets.length; i++) {
            var img = new Image();
            img.onload = function() {
                self.imgLoadCount++;
                if (self.imgLoadCount == self.mapData.tilesets.length) {
                    self.fullyLoaded = true;
                    console.log("fully loaded");
                }
            }

            img.src = this.mapData.tilesets[i].image;

            var tileset = this.mapData.tilesets[i];
            var ts = {
                "firstgid": tileset.firstgid,

                "image": img,

                // size of the image in pixels
                "imageheight": tileset.imageheight,
                "imagewidth": tileset.imagewidth,

                "tilewidth": tileset.tilewidth,
                "tileheight": tileset.tileheight,

                numXTiles: Math.ceil(tileset.imagewidth/tileset.tilewidth),
                numYTiles: Math.ceil(tileset.imageheight/tileset.tileheight),
            };

            this.tilesets.push(ts);

        }
    },

    getObjects: function() {
        var objects = {};
        for (var i = 0; i < this.mapData.layers.length; i++) {
            if (this.mapData.layers[i].type == "objectgroup") {
                var objectsLayer = this.mapData.layers[i];
                for (var numObject = 0; numObject < objectsLayer.objects.length; numObject++) {
                    var currentObject = objectsLayer.objects[numObject];
                    objects[currentObject.name] = {"h": currentObject.height,
                                                   "w": currentObject.width,
                                                   "x": currentObject.x,
                                                   "y": currentObject.y};
                }
            }
        }
        return objects;
    },

    // grabs the corresponding tile from the tileset
    // according to the tileIndex.
    getTilePacket: function(tileIndex) {
        var packet = {
            "img": null,
            "x": 0,
            "y": 0,
            "w": 0,
            "h": 0
        };

        // find appropiate tileset
        // tilesets have firstgid that goes sth like this:
        // tileset1: firstgid: 1 (and suppose it has one tile)
        // tileset2: firstgid: 2 (the previous one had only one
        //                        tile and started at 1. Supose 
        //                        this has 7 tiles)
        // tileset3: firstgid: 9 (the previous one had 7 tiles and
        //                        started at 2.)
        //
        // So. tileIndex 1 is in tileset1, tileIndexes 2-8 are in
        // tileset2 and gid >= 9 are (likely) in tileset3
        var ts = null;
        for (var i = this.tilesets.length - 1; i >= 0; i--) {
            if (this.tilesets[i].firstgid <= tileIndex) {
                // this is the tileset
                ts = this.tilesets[i];
                break;
            }
        }

        packet.img = ts["image"];

        // Inside this tileset, which tile (0 is first, etc).
        var localId = tileIndex - ts.firstgid;

        var column = Math.floor(localId % ts.numXTiles);
        var row = Math.floor(localId / ts.numXTiles);

        packet.x = column*ts.tilewidth;
        packet.y = row*ts.tileheight;
        packet.w = ts.tilewidth;
        packet.h = ts.tileheight;


        return packet;
    },

    draw: function(context, offset) {
        if (!this.fullyLoaded) {
            console.log("not fullyLoaded");
            return;
        }

        // Draw all layers
        for (var layerNumber = 0; layerNumber < this.mapData.layers.length; layerNumber++) {
            if (this.mapData.layers[layerNumber].type != "tilelayer") {
                continue;
            }

            var data = this.mapData.layers[layerNumber].data;

            for (var i = 0; i < data.length; i++) {
                if (data[i] === 0) {
                    continue;
                }

                var packet = this.getTilePacket(data[i]);

                var worldX = offset.x + Math.floor(i % this.numXTiles) * this.tileSize.w;
                var worldY = offset.y + Math.floor(i / this.numXTiles) * this.tileSize.h + this.tileSize.h - packet.h;

                context.drawImage(packet.img,
                                  packet.x,
                                  packet.y,
                                  packet.w,
                                  packet.h,
                                  worldX,
                                  worldY,
                                  packet.w,
                                  packet.h);

            }
        }
    }
});
