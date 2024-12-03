( async () => {
    const app = new PIXI.Application();

    await app.init({background: "#206b35" ,width: 1000, height: 900});

    document.getElementById("gameBox").appendChild(app.canvas);

    // load the PNG asynchronously
    await PIXI.Assets.load('sprites/FinishSprites/pixel-art-dungeon-.jpg');
        let cave = PIXI.Sprite.from('sprites/FinishSprites/pixel-art-dungeon-.jpg');
        app.stage.addChild(cave);
        // center the sprite when it loads. also anchor fixes where to center of the sprites is
        cave.anchor.set(0.5);
        cave.x = app.screen.width / 2;
        cave.y = app.screen.height / 2;

    const textBox = new PIXI.Graphics();
    textBox.rect(app.screen.width / 6, 50, 800, 200);
    textBox.fill("#3477b3");
    app.stage.addChild(textBox);

    const bookBox = new PIXI.Graphics();
    bookBox.rect(app.screen.width / 6, 650, 800, 200);
    bookBox.fill("#3477b3");
    app.stage.addChild(bookBox);


    await PIXI.Assets.load('sprites/FinishSprites/BatEyeEnemy.png');
        const bat = PIXI.Sprite.from('sprites/FinishSprites/BatEyeEnemy.png');
        app.stage.addChild(bat);
        //center bat on load and fixes sprite center with anchor.
        bat.anchor.set(0.5);
        bat.x = app.screen.width / 2;
        bat.y = app.screen.height / 2;
    

    // Add a variable to count up the seconds our demo has been running
    let elapsed = 0.0;
    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    app.ticker.add((ticker) => {
        // Add the time to our total elapsed time
        elapsed += ticker.deltaTime;

        // Update the sprite's X position based on the cosine of our elapsed time.  We divide
        // by 50 to slow the animation down a bit...
        // bat now flys back and forth on the stage.
        bat.x = 500.0 + Math.cos(elapsed/50.0) * 100.0;
    });
})();