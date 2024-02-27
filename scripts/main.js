var SNAKERADIUS = 15;
var gameEngine = new GameEngine();
var UPDATES = 15;
var ASSET_MANAGER = new AssetManager();
var GRID ;
ASSET_MANAGER.downloadAll(function(){
    //put function here of actually starting the game 
    //it will run post all downloads
    GRID = Array(20).fill().map(() => Array(20).fill(0));

    var canvas = document.getElementById("snakeCanvas");
    var ctx = canvas.getContext("2d");
    gameEngine.init(ctx);
    //gameEngine.addEntity(new SceneManager(gameEngine));

    gameEngine.addEntity(new Head(gameEngine,SNAKERADIUS*5,SNAKERADIUS,0));
    gameEngine.addEntity(new Food(19*SNAKERADIUS,19*SNAKERADIUS,gameEngine));
;
    gameEngine.start();
})