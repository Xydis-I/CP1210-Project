( async () => {
    const app = new PIXI.Application();

    await app.init({background: "#206b35" ,width: 1686, height: 1080});

    document.getElementById("gameBox").appendChild(app.canvas);

    PIXI.Assets.addBundle('fonts', [
        { alias: 'Daydream', src: '../Fonts/Daydream.ttf' },
    ]);

    await PIXI.Assets.loadBundle('fonts');

    let currentLevel = "Level1";

    await PIXI.Assets.load("../Sprites/Backgrounds/Level1.png");
        let background = PIXI.Sprite.from("../Sprites/Backgrounds/Level1.png");
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
    
    await PIXI.Assets.load('../sprites/UI/QuestionScroll.png');
        const scroll = PIXI.Sprite.from('../sprites/UI/QuestionScroll.png');
        app.stage.addChild(scroll);
        scroll.anchor.set(0.5);
        scroll.x = 928;
        scroll.y = 180;

        const defaultStyle = new PIXI.TextStyle({ align: "center", fill: "#1b0401", fontSize: 45, fontFamily: "Daydream", wordWrap: true, wordWrapWidth: 900 });

        const question = new PIXI.Text({ text: 'Question', style: defaultStyle });
        question.anchor.set(0.5);
        scroll.addChild(question);
        question.x = 0;
        question.y = 0;
        question.text = "What is the name of the latest Nintendo system?";


    await PIXI.Assets.load('../sprites/UI/Spellbook.png');
        const spellbook = PIXI.Sprite.from('../sprites/UI/Spellbook.png');
        app.stage.addChild(spellbook);
        spellbook.anchor.set(0.5);
        spellbook.x = 928;
        spellbook.y = 940;
        
        const defaultHoverStyle = new PIXI.TextStyle({ fill: "#2660ff", fontSize: 45, fontFamily: "Daydream" });

        //https://pixijs.com/8.x/guides/components/interaction
        const answer1 = new PIXI.Text({ text: 'Answer1', style: defaultStyle });
        answer1.anchor.set(0.5);
        spellbook.addChild(answer1);
        answer1.x = -300;
        answer1.y = -80;
        answer1.text = "Playstation";
        answer1.eventMode = 'static';
        answer1.cursor = 'pointer';
        answer1.on('pointerover', () => { answer1.style = defaultHoverStyle });
        answer1.on('pointerout', () => { answer1.style = defaultStyle });

        const answer2 = new PIXI.Text({ text: 'Answer2', style: defaultStyle });
        answer2.anchor.set(0.5);
        spellbook.addChild(answer2);
        answer2.x = 300;
        answer2.y = -80;
        answer2.text = "Switch";
        answer2.eventMode = 'static';
        answer2.cursor = 'pointer';
        answer2.on('pointerover', () => { answer2.style = defaultHoverStyle });
        answer2.on('pointerout', () => { answer2.style = defaultStyle });

        const answer3 = new PIXI.Text({ text: 'Answer3', style: defaultStyle });
        answer3.anchor.set(0.5);
        spellbook.addChild(answer3);
        answer3.x = -300;
        answer3.y = 20;
        answer3.text = "Xbox";
        answer3.eventMode = 'static';
        answer3.cursor = 'pointer';
        answer3.on('pointerover', () => { answer3.style = defaultHoverStyle });
        answer3.on('pointerout', () => { answer3.style = defaultStyle });

        const answer4 = new PIXI.Text({ text: 'Answer4', style: defaultStyle });
        answer4.anchor.set(0.5);
        spellbook.addChild(answer4);
        answer4.x = 300;
        answer4.y = 20;
        answer4.text = "Wii";
        answer4.eventMode = 'static';
        answer4.cursor = 'pointer';
        answer4.on('pointerover', () => { answer4.style = defaultHoverStyle });
        answer4.on('pointerout', () => { answer4.style = defaultStyle });

    await PIXI.Assets.load('../sprites/UI/LevelMap.png');
        const levelmap = PIXI.Sprite.from('../sprites/UI/LevelMap.png');
        app.stage.addChild(levelmap);
        levelmap.anchor.set(0);
        levelmap.x = 40;
        levelmap.y = 40;
    
    const levelTrackerLocations = {"level1":547, "level2":423, "level3":300, "level4":177, "level5":54}

    await PIXI.Assets.load('../sprites/UI/LevelTracker.png');
        const leveltracker = PIXI.Sprite.from('../sprites/UI/LevelTracker.png');
        levelmap.addChild(leveltracker);
        leveltracker.anchor.set(0.5);
        leveltracker.x = leveltracker.width / 2 + 3;
        leveltracker.y = levelTrackerLocations["level1"];
        



    let elapsed = 0.0;
    app.ticker.add((ticker) => {
        elapsed += ticker.deltaTime;

        leveltracker.scale = 1 + (0.1 * Math.abs(Math.cos(elapsed/25.0)));
    });
})();