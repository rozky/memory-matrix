var MM = {};

// event dispatcher
MM.events = _.extend({}, Backbone.Events);

MM.Config = {
    width: 600,
    height: 550,

    levels: null,

    baseTileSprite: 7,
    activeTileSprite: 2,
    errorTileSprite: 6,
    successTileSprite: 5
};

MM.GameLevel = function(gridSize, tiles, tileScore){
    this.gridSize = gridSize;
    this.tiles = tiles;
    this.tileScore = tileScore || 0;
};

MM.Config.levels = [
    new MM.GameLevel(6, 2, 10),
    new MM.GameLevel(6, 7, 50),
    new MM.GameLevel(6, 8, 150),
    new MM.GameLevel(6, 9, 500),
    new MM.GameLevel(6, 10, 1000),
    new MM.GameLevel(6, 11),
    new MM.GameLevel(6, 12),
    new MM.GameLevel(6, 13),
    new MM.GameLevel(6, 14),
    new MM.GameLevel(6, 15),
    new MM.GameLevel(6, 16),
    new MM.GameLevel(6, 17),
    new MM.GameLevel(6, 18),
    new MM.GameLevel(6, 19),
    new MM.GameLevel(6, 20)
];
