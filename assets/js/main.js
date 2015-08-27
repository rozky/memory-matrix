var game;

game = new Phaser.Game(MM.Config.width, MM.Config.height, Phaser.AUTO, '');

game.state.add('Menu', Menu);
game.state.add('Game', Game);
game.state.add('Game_Over', Game_Over);


game.state.start('Menu');
