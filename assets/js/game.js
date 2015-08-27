// level 1 - 3 x 3, 9 (2-4)
// level 2 - 4 x 4, 16 (5-8)
// level 3 - 5 x 5, 25 (9-12)
// level 4 - 6 x 6, 36 (13-18)
// level 5 - 7 x 7. 49 (19-24)

// features - display tiles in some order, user need to enter them in same order (get bonus points)

// todo - hover event to change alpha

// show  multi color tiles and ask to find one color at a time
// click on edge between 2/4 tiles will pick one if one is correct


// center the board and scale up as it grows

var self, tilesText, trialText, scoreText;

var tileBaseSize = 64;
var tileSize = 64;
var startY = 60;
var marginX = 32;

// game params
var displayTimeout = 2; // for how long to show tiles
var Game = {

    userTurn: false,
    updateScores: true,
    tiles:  {},
    tries: 0,
    score: 0,
    currentLevel: 0,
    foundTiles: 0,

    levels: MM.Config.levels,

    styles: {
        header: {
            height: 50,
            background_color: "0x555555"
        },
      levelAnnouncementText: { font: "bold 150px sans-serif", fill: "#ffffff", align: "center" }
    },


    preload : function() {
//        game.load.image('snake', './assets/images/snake.png');
        game.load.spritesheet('matrix', './assets/images/main.png', 64, 64, 8, 0, 0);
//        game.load.image("background", './assets/images/light-blue-wallpapers.jpg');
        game.load.image("background", './assets/images/woodpanels_1920x1200.jpg');
//        game.load.image("icons-check", './assets/images/icon-check.png');
        game.load.image("icons-cross", './assets/images/icons1/remove.png');
        game.load.image("icons-check", './assets/images/icons1/checkmark.png');
    },

    create : function() {
        self = this;

        game.add.tileSprite(0, 0, MM.Config.width, MM.Config.height, 'background');

//        game.stage.backgroundColor = '#061f27';

        this.createBoard();
        this.createHeader();

        var checkIcon = game.add.sprite(game.world.centerX, game.world.centerY, 'icons-cross');
        checkIcon.alpha = 0.8;
        checkIcon.anchor.setTo(0.5);

        this.startLevel();
    },

    createHeader: function() {
        var graphics = game.add.graphics(0, 0);

        graphics.beginFill(this.styles.header.background_color);
        graphics.drawRect(0, 0, MM.Config.width, this.styles.header.height);
        graphics.alpha = 0.6;
        graphics.endFill();

        var headerStyle = { font: "bold 17px sans-serif", fill: "#46c0f9", align: "center" };

        tilesText = game.add.text(marginX, 15, "Tiles", headerStyle);
        tilesText.anchor.setTo(0.5);
        trialText = game.add.text(220, 15, "Trials", headerStyle);
        scoreText = game.add.text(420, 15, "Score", headerStyle);
    },

    createBoard: function() {
        // set a fill and line style
        var i, j;

        for (i = 0; i < this.levels[self.currentLevel].gridSize; i++) {
            for (j = 0; j < this.levels[self.currentLevel].gridSize; j++) {
                this.addTile(i, j, MM.Config.baseTileSprite);
            }
        }
    },

    showTiles: function() {
        var i, j, colors = [];
        var gridSize = this.levels[self.currentLevel].gridSize;

        for (i = 0; i < gridSize * gridSize; i++) {
            if (i < this.levels[self.currentLevel].tiles) {
                colors.push(MM.Config.activeTileSprite)
            } else {
                colors.push(MM.Config.baseTileSprite)
            }
        }

        colors = _.shuffle(colors);

        for (var pos in self.tiles) {
            if (self.tiles.hasOwnProperty(pos)) {
                var color = colors.pop();
                self.tiles[pos].frame = color;
                self.tiles[pos].visibleTile = color === MM.Config.activeTileSprite;
            }
        }

        self.userTurn = false;
        self.foundTiles = 0;

        game.time.events.add(Phaser.Timer.SECOND * displayTimeout, self.hideTiles, self);
    },

    hideTiles: function() {
        for (var pos in self.tiles) {
            if (self.tiles.hasOwnProperty(pos)) {
                self.tiles[pos].frame = MM.Config.baseTileSprite;
            }
        }

        self.userTurn = true;
    },

    update: function() {

        if (self.updateScores) {
            var level = this.levels[self.currentLevel];
            tilesText.text = "Tiles: " + level.tiles + " ( " + self.foundTiles + " )";
            trialText.text = "Trials: " + self.tries + " of " + this.levels.length;
            scoreText.text = "Score: " + self.score;
            self.updateScores = false;
        }
    },

    render: function() {
    },

    addTile: function(x, y, color) {
        var leftMargin = (MM.Config.width - (6 * tileSize)) / 2;

        var spriteX = leftMargin + (x * tileSize);
        var spriteY = startY + (y * tileSize);
        var spriteScale = tileSize / tileBaseSize;

        var tile = new MM.Tile(this, spriteX, spriteY, color);
        tile.scale.setTo(spriteScale, spriteScale);
        self.tiles[x + ":" + y] = tile;

        game.add.existing(tile);
    },

    restartCurrentLevel: function() {
        self.userTurn = false;
        game.time.events.add(Phaser.Timer.SECOND, self.startLevel, self);
    },

    startNextLevel: function() {
        self.currentLevel++;
        self.userTurn = false;
        self.startLevel();
    },

    startLevel: function() {
        self.userTurn = false;
        self.foundTiles = 0;
        self.tries++;
        self.updateScores = true;

        var levelText = game.add.text(MM.Config.width / 2, MM.Config.height / 2, self.currentLevel, this.styles.levelAnnouncementText);
        levelText.anchor.set(0.5);
        levelText.alpha = 0.7;

        game.time.events.add(Phaser.Timer.SECOND,
            function() {
                game.world.remove(levelText);
                self.showTiles();
            }, self);

//        self.showTiles();
    }
};