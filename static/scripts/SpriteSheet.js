// variable global donde está mapeado el nombre del atlas
// y los datos del atlas.
// Por ejemplo:
// gSpriteSheets['blocksAtlas.png'] devuelve el objeto 
// SpriteSheetClass asociado.
var gSpriteSheets = {};
ImageCache = {};

loadAtlasImage = function(imagename) {
    if (ImageCache[imagename] != null)
        return ImageCache[imagename];

    var img = new Image();
    img.src = imagename;
    ImageCache[imagename] = img;
    return img;
};

SpriteSheet = Class.extend({
    img: null,
    url: "",
    sprites: new Array(),

    init: function() {},

    load: function(imgName) {
        console.log("load spritesheet: " + imgName);
        this.url = imgName;

        var img = new Image();
        img.src = imgName;

        this.img = img;

        gSpriteSheets[imgName] = this;
    },

    // define sprite for this atlas
    defSprite: function (name, x, y, w, h, cx, cy) {
        var spt = {
            "id": name,
            "x": x,
            "y": y,
            "w": w,
            "h": h,
            "cx": cx == null? 0: cx,
            "cy": cy == null? 0: cy
        };

        this.sprites.push(spt);
    },

    parseAtlasDefinition: function(atlasJSON) {
        var atlas = JSON.parse(atlasJSON);
        for (var i = 0; i < atlas.frames.length; i++) {
            var img_data = atlas.frames[i];

            var cx = -img_data.frame.w * 0.5;
            var cy = -img_data.frame.h * 0.5;

            if (img_data.trimmed) {
                cx = img_data.spriteSourceSize.x - img_data.sourceSize.w*0.5;
                cy = img_data.spriteSourceSize.y - img_data.sourceSize.h*0.5;
            }

            this.defSprite(img_data.filename, 
                           img_data.frame.x,
                           img_data.frame.y,
                           img_data.frame.w,
                           img_data.frame.h,
                           cx,
                           cy);

        }
    },

    getSprite: function(name) {
        for (var i = 0; i < this.sprites.length; i++) {
            if (this.sprites[i].id === name) {
                return this.sprites[i];
            }
        }

        return null;
    }
});

function drawSprite(spriteName, posX, posY, width, height) {
    var sheet = "";
    for (var sheetName in gSpriteSheets) {
        sheet = gSpriteSheets[sheetName];
        sprite = sheet.getSprite(spriteName);

        if (sprite === null) continue;

        __drawSpriteInternal(sprite, sheet, posX, posY, width, height);
        return;
    }
}

function __drawSpriteInternal(sprite, sheet, posX, posY, width, height) {
    if (sprite === null || sheet === null) {
        return;
    }

    if (!(width && height)) {
        width = sprite.w;
        height = sprite.h;
    }

    gRenderEngine.context.drawImage(sheet.img,
                      sprite.x, sprite.y, sprite.w, sprite.h,
                      posX, posY, width, height);
}
