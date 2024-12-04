( async () => {
    const app = new PIXI.Application();

    await app.init({background: "#206b35" ,width: 1000, height: 900});

    document.getElementById("gameBox").appendChild(app.canvas);

    await PIXI.Assets.load("../Sprites/Backgrounds/pixel-art-dungeon-.jpg");
        let background = PIXI.Sprite.from("../Sprites/Backgrounds/pixel-art-dungeon-.jpg");
        app.stage.addChild(background);
        
        // Styling for fitting the background to the canvas.
        background.anchor.set(0.5);
        background.x = app.screen.width / 2;
        background.y = app.screen.height / 2;
        background.width = app.screen.width;
        background.height = app.screen.height;

    await PIXI.Assets.load('../sprites/FinishSprites/BatEyeEnemy.png');
        const bat = PIXI.Sprite.from('../sprites/FinishSprites/BatEyeEnemy.png');
        app.stage.addChild(bat);
        //center bat on load and fixes sprite center with anchor.
        bat.anchor.set(0.5);
        bat.x = app.screen.width / 2;
        bat.y = app.screen.height / 2;
        
    let elapsed = 0.0;
    app.ticker.add((ticker) => {elapsed += ticker.deltaTime;});
})();