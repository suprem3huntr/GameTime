class SceneManager
{
    constructor(game)
    {
        this.game = game;
        this.game.camera = this;
    }

    loadScene(level)
    {
        this.game.entities = [];
        this.x = 0;
    }
}