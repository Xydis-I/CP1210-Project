( async () => {
    const app = new PIXI.Application();

    await app.init({ width: window.innerWidth, height: window.innerHeight });

    document.body.appendChild(app.canvas);
    // load the PNG asynchronously
    await PIXI.Assets.load('sprites/FinishSprites/pixel-art-dungeon-.jpg');
        let sprite1 = PIXI.Sprite.from('sprites/FinishSprites/pixel-art-dungeon-.jpg');
        app.stage.addChild(sprite1);
    await PIXI.Assets.load('sprites/FinishSprites/BatEyeEnemy.png');
    let sprite = PIXI.Sprite.from('sprites/FinishSprites/BatEyeEnemy.png');
    app.stage.addChild(sprite);
    // Add a variable to count up the seconds our demo has been running
    let elapsed = 0.0;
    // Tell our application's ticker to run a new callback every frame, passing
    // in the amount of time that has passed since the last tick
    app.ticker.add((ticker) => {
        // Add the time to our total elapsed time
        elapsed += ticker.deltaTime;
        // Update the sprite's X position based on the cosine of our elapsed time.  We divide
        // by 50 to slow the animation down a bit...
        sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
    });
})();