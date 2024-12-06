(async () => {
  const app = new PIXI.Application();

  await app.init({ background: "#206b35", width: 1686, height: 1080 });

  document.getElementById("gameBox").appendChild(app.canvas);

  PIXI.Assets.addBundle("fonts", [
    { alias: "Daydream", src: "../Fonts/Daydream.ttf" },
  ]);

  await PIXI.Assets.loadBundle("fonts");

  let currentLevel = 1;
  let isLoading = false;
  let levelTime = 30.0;
  let levelInterval = setInterval(levelTimer, 1000);

  const questions = [
    {
      question: "What is the name of the latest Nintendo system?",
      answer1: "Playstation",
      answer2: "Switch",
      answer3: "Xbox",
      answer4: "Wii",
      correct: "Switch",
    },
    {
      question: "When did the first Super mario bros release?",
      answer1: "1985",
      answer2: "1984",
      answer3: "1986",
      answer4: "1987",
      correct: "1985",
    },
    {
      question: "What was the first Souls-like game Developed?",
      answer1: "Dark Soul's",
      answer2: "Bloodborne",
      answer3: "Elden Ring",
      answer4: "Demon Soul's",
      correct: "Demon Soul's",
    },
    {
      question: "Who is the main character of The Legend of Zelda series?",
      answer1: "Zelda",
      answer2: "Ganon",
      answer3: "Link",
      answer4: "Tingle",
      correct: "Link",
    },
    {
      question: "What company publised the Metal Gear Series?",
      answer1: "Konami",
      answer2: "Square Enix",
      answer3: "Nintendo",
      answer4: "Kojima",
      correct: "Konami",
    },
    {
      question: "What game's main character is named Chel?",
      answer1: "Half-Life",
      answer2: "TF2",
      answer3: "Portal",
      answer4: "Deadlock",
      correct: "Portal",
    },
    {
      question: "Who was the last 'Warchief of the Horde?'",
      answer1: "Thrall",
      answer2: "Rexxar",
      answer3: "Sylvanas",
      answer4: "BlackHand",
      correct: "Sylvanas",
    },
    {
      question: "What game series are the 'Blades of chaos from?'",
      answer1: "God of War",
      answer2: "Diablo",
      answer3: "Dark soul's",
      answer4: "Hades",
      correct: "God of War",
    },
    {
      question: "What is the 151 pokemon in the pokedex?",
      answer1: "Pikachu",
      answer2: "Mew",
      answer3: "Mewtwo",
      answer4: "Bulbsaur",
      correct: "Mew",
    },
    {
      question: "What elder Scrolls game was released in 2011?",
      answer1: "Daggerfall",
      answer2: "Oblivion",
      answer3: "Morrowind",
      answer4: "Skyrim",
      correct: "Skyrim",
    },
    {
      question: "What was Toby Fox's first game?",
      answer1: "EarthBound",
      answer2: "Deltarune",
      answer3: "Undertale",
      answer4: "Celeste",
      correct: "Undertale",
    },
    {
      question: "What game has a loonie tunes art style?",
      answer1: "Cuphead",
      answer2: "It takes Two",
      answer3: "Noita",
      answer4: "Pikmin",
      correct: "Cuphead",
    },
    {
      question: "what series does the Character 'Samus' come from?",
      answer1: "mass effect",
      answer2: "F-Zero",
      answer3: "Metroid",
      answer4: "StarFox",
      correct: "Metroid",
    },
    {
      question: "Cloud is the main character of what Final fantasy?",
      answer1: "VIII(8)",
      answer2: "VII(7)",
      answer3: "X(10)",
      answer4: "VI(6)",
      correct: "VII(7)",
    },
    {
      question: "Who is kirbys bandana wearing friend?",
      answer1: "King Deedee",
      answer2: "MetaKnight",
      answer3: "Waddle Dee",
      answer4: "Waddle Doo",
      correct: "Waddle Dee",
    },
  ];

  // add a test list of question objects and had the text object connected to the current level
  // possbly change to a ramdom question from the list after
  let questionNumber = Math.floor(Math.random() * questions.length);
  console.log(questionNumber);

  await PIXI.Assets.load("../Sprites/Backgrounds/Level1.png");
  let background = PIXI.Sprite.from("../Sprites/Backgrounds/Level1.png");
  app.stage.addChild(background);

  // Styling for fitting the background to the canvas.
  background.anchor.set(0.5);
  background.x = app.screen.width / 2;
  background.y = app.screen.height / 2;
  background.width = app.screen.width;
  background.height = app.screen.height;

  // Loads first enemy into default position.
  const slimeDefaultLocation = { x: 935, y: 700 };

  let enemyHealthValue = 2;

  await PIXI.Assets.load("../sprites/Enemies/PurpleSlime.png");
  const enemy = PIXI.Sprite.from("../sprites/Enemies/PurpleSlime.png");
  app.stage.addChild(enemy);
  enemy.anchor.set(0.5);
  enemy.x = slimeDefaultLocation["x"];
  enemy.y = slimeDefaultLocation["y"];

  await PIXI.Assets.load("../sprites/UI/2hp.png");
  const enemyHealth = PIXI.Sprite.from("../sprites/UI/2hp.png");
  enemy.addChild(enemyHealth);
  enemyHealth.anchor.set(0.5);
  enemyHealth.scale = 1.5;
  enemyHealth.x = 0;
  enemyHealth.y = -130;

  await PIXI.Assets.load("../sprites/UI/QuestionScroll.png");
  const scroll = PIXI.Sprite.from("../sprites/UI/QuestionScroll.png");
  app.stage.addChild(scroll);
  scroll.anchor.set(0.5);
  scroll.x = 928;
  scroll.y = 180;

  const defaultStyle = new PIXI.TextStyle({
    align: "center",
    fill: "#1b0401",
    fontSize: 45,
    fontFamily: "Daydream",
    wordWrap: true,
    wordWrapWidth: 900,
  });

  const question = new PIXI.Text({ text: "Question", style: defaultStyle });
  question.anchor.set(0.5);
  scroll.addChild(question);
  question.x = 0;
  question.y = 0;
  // changed for list testing
  // question.text = "What is the name of the latest Nintendo system?";
  question.text = questions[questionNumber].question;

  await PIXI.Assets.load("../sprites/UI/Spellbook.png");
  const spellbook = PIXI.Sprite.from("../sprites/UI/Spellbook.png");
  app.stage.addChild(spellbook);
  spellbook.anchor.set(0.5);
  spellbook.x = 928;
  spellbook.y = 940;

  const hoverStyle = new PIXI.TextStyle({
    fill: "#2660ff",
    fontSize: 45,
    fontFamily: "Daydream",
  });

  const wrongStyle = new PIXI.TextStyle({
    fill: "#b70000",
    fontSize: 45,
    fontFamily: "Daydream",
  });

  //https://pixijs.com/8.x/guides/components/interaction
  const answer1 = new PIXI.Text({ text: "Answer1", style: defaultStyle });
  answer1.anchor.set(0.5);
  spellbook.addChild(answer1);
  answer1.x = -290;
  answer1.y = -80;
  // Changed for list testing
  // answer1.text = "Playstation";
  answer1.text = questions[questionNumber].answer1;
  answer1.eventMode = "static";
  answer1.cursor = "pointer";
  answer1.on("pointerover", () => {
    answer1.style = hoverStyle;
    answer1.scale = 1.05;
  });
  answer1.on("pointerout", () => {
    answer1.style = defaultStyle;
    answer1.scale = 1;
  });
  answer1.on("click", () => {
    clickAnswer(answer1);
  });

  const answer2 = new PIXI.Text({ text: "Answer2", style: defaultStyle });
  answer2.anchor.set(0.5);
  spellbook.addChild(answer2);
  answer2.x = 290;
  answer2.y = -80;
  // Changed for list testing
  // answer2.text = "Switch";
  answer2.text = questions[questionNumber].answer2;
  answer2.eventMode = "static";
  answer2.cursor = "pointer";
  answer2.on("pointerover", () => {
    answer2.style = hoverStyle;
    answer2.scale = 1.05;
  });
  answer2.on("pointerout", () => {
    answer2.style = defaultStyle;
    answer2.scale = 1;
  });
  answer2.on("click", () => {
    clickAnswer(answer2);
  });

  const answer3 = new PIXI.Text({ text: "Answer3", style: defaultStyle });
  answer3.anchor.set(0.5);
  spellbook.addChild(answer3);
  answer3.x = -290;
  answer3.y = 20;
  // Changed for list testing
  // answer3.text = "Xbox";
  answer3.text = questions[questionNumber].answer3;
  answer3.eventMode = "static";
  answer3.cursor = "pointer";
  answer3.on("pointerover", () => {
    answer3.style = hoverStyle;
    answer3.scale = 1.05;
  });
  answer3.on("pointerout", () => {
    answer3.style = defaultStyle;
    answer3.scale = 1;
  });
  answer3.on("click", () => {
    clickAnswer(answer3);
  });

  const answer4 = new PIXI.Text({ text: "Answer4", style: defaultStyle });
  answer4.anchor.set(0.5);
  spellbook.addChild(answer4);
  answer4.x = 290;
  answer4.y = 20;
  // Changed for list testing
  // answer4.text = "Wii";
  answer4.text = questions[questionNumber].answer4;
  answer4.eventMode = "static";
  answer4.cursor = "pointer";
  answer4.on("pointerover", () => {
    answer4.style = hoverStyle;
    answer4.scale = 1.05;
  });
  answer4.on("pointerout", () => {
    answer4.style = defaultStyle;
    answer4.scale = 1;
  });
  answer4.on("click", () => {
    clickAnswer(answer4);
  });

  await PIXI.Assets.load("../sprites/UI/LevelMap.png");
  const levelmap = PIXI.Sprite.from("../sprites/UI/LevelMap.png");
  app.stage.addChild(levelmap);
  levelmap.anchor.set(0);
  levelmap.x = 40;
  levelmap.y = 40;

  const levelTrackerLocations = {
    level1: 547,
    level2: 423,
    level3: 300,
    level4: 177,
    level5: 54,
  };

  await PIXI.Assets.load("../sprites/UI/Hourglass/0.png");
  await PIXI.Assets.load("../sprites/UI/Hourglass/1.png");
  await PIXI.Assets.load("../sprites/UI/Hourglass/2.png");
  await PIXI.Assets.load("../sprites/UI/Hourglass/3.png");
  await PIXI.Assets.load("../sprites/UI/Hourglass/4.png");
  const hourglass = PIXI.Sprite.from("../sprites/UI/Hourglass/0.png");
  app.stage.addChild(hourglass);
  hourglass.anchor.set(0.5);
  hourglass.x = 94;
  hourglass.y = app.screen.height - 100;

  const timer = new PIXI.Text({
    text: "30",
    style: { fill: "#dead30", fontSize: 45, fontFamily: "Daydream" },
  });
  hourglass.addChild(timer);
  timer.anchor.set(0.5);
  timer.y = -125;

  await PIXI.Assets.load("../Sprites/Backgrounds/Level0.png");
  let loadingscreen = PIXI.Sprite.from("../Sprites/Backgrounds/Level0.png");
  app.stage.addChild(loadingscreen);

  // Styling for fitting the background to the canvas.
  loadingscreen.anchor.set(0.5);
  loadingscreen.x = app.screen.width / 2;
  loadingscreen.y = app.screen.height / 2;
  loadingscreen.alpha = 0;

  await PIXI.Assets.load("../sprites/UI/LevelTracker.png");
  const leveltracker = PIXI.Sprite.from("../sprites/UI/LevelTracker.png");
  levelmap.addChild(leveltracker);
  leveltracker.anchor.set(0.5);
  leveltracker.x = leveltracker.width / 2 + 3;
  leveltracker.y = levelTrackerLocations["level1"];



  function lerp(a, b, alpha) {
    return a + alpha * (b - a);
  }

  function levelTimer() {
    levelTime--;
    if (levelTime <= 0) {
      hourglass.texture = PIXI.Sprite.from("../sprites/UI/Hourglass/4.png").texture;
      clearInterval(levelInterval);
    } else if (levelTime <= 7) {
      hourglass.texture = PIXI.Sprite.from("../sprites/UI/Hourglass/3.png").texture;
    }else if (levelTime <= 14) {
      hourglass.texture = PIXI.Sprite.from("../sprites/UI/Hourglass/2.png").texture;
    }else if (levelTime <= 22) {
      hourglass.texture = PIXI.Sprite.from("../sprites/UI/Hourglass/1.png").texture;
    }
  }

  async function clickAnswer(answer) {
    if (answer.text == questions[questionNumber].correct) {
      console.log("correct");
      
      // Attack Spell Effect Logic
      const colors = ["Blue","Green","Orange","Purple"];
      let color = colors[Math.floor(4 * Math.random())];
      let spellnum = String(Math.floor(29 * Math.random()) + 1).padStart(2, '0');
      await PIXI.Assets.load(`../sprites/Spells/${color}/${color}Spell${spellnum}.json`);
      // Create an array to store the textures
      const spellTextures = [];
      let i;
    
      for (i = 0; i < 5; i++)
      {
        const texture = PIXI.Texture.from(`${color}Spell${spellnum}_${i}.png`);
        spellTextures.push(texture);
      }
    
      const spell = new PIXI.AnimatedSprite(spellTextures);
      spell.anchor.set(0.5);
      spell.x = 0;
      spell.y = 0;
      spell.scale = 7.5;
      spell.animationSpeed = 0.2;
      spell.loop = false;
      spell.play();
      spell.onComplete = () => {
        spell.destroy();
      };
      enemy.addChild(spell);


      // Damage Enemy
      enemyHealthValue--;
      if (enemyHealthValue == 1) {
        await PIXI.Assets.load("../sprites/UI/1hp.png");
        enemyHealth.texture = PIXI.Sprite.from("../sprites/UI/1hp.png").texture;
      }
      if (enemyHealthValue == 0) {
        isLoading = true;
        await PIXI.Assets.load("../sprites/UI/0hp.png");
        enemyHealth.texture = PIXI.Sprite.from("../sprites/UI/0hp.png").texture;

        answer1.eventMode = "passive";
        answer2.eventMode = "passive";
        answer3.eventMode = "passive";
        answer4.eventMode = "passive";

        let lerpTracker = 0;
        // let oldEnemyY = slimeDefaultLocation.y;
        const enemyTicker = new PIXI.Ticker();
        enemyTicker.add(async (ticker) => {
            // slimeDefaultLocation.y = lerp( oldEnemyY, oldEnemyY + 350, lerpTracker / 60 );
            enemy.scale = lerp( 1, 0, lerpTracker / 60 );
            loadingscreen.alpha = lerp( 0, 1, lerpTracker / 60 );
            lerpTracker += ticker.deltaTime;
            if (lerpTracker / 60 > 1) {
                // slimeDefaultLocation.y = oldEnemyY + 350;
                enemyTicker.destroy();
                currentLevel++;

                if (currentLevel < 6) {
                    console.log("Next Level");
                    clearInterval(levelInterval);
                    let lerpTracker = 0;
                    const levelTicker = new PIXI.Ticker();
                    levelTicker.add((ticker) => {
                      // console.log(lerpTracker);
                      leveltracker.y = lerp(
                        levelTrackerLocations[`level${currentLevel - 1}`],
                        levelTrackerLocations[`level${currentLevel}`],
                        lerpTracker / 60
                      );
                      lerpTracker += ticker.deltaTime;
                      if (lerpTracker / 60 > 1) {
                        leveltracker.y = levelTrackerLocations[`level${currentLevel}`];
                        levelTicker.destroy();
                      }
                    });
                    levelTicker.start();
                  }

                await PIXI.Assets.load(`../sprites/Backgrounds/Level${currentLevel}.png`);
                background.texture = PIXI.Sprite.from(`../sprites/Backgrounds/Level${currentLevel}.png`).texture;
                enemyHealth.texture = PIXI.Sprite.from("../sprites/UI/2hp.png").texture;
                enemyHealthValue = 2;
                enemy.scale = 1;
                isLoading = false;

                let loadinLerpTracker = 0;
                // let oldEnemyY = slimeDefaultLocation.y;
                const loadingTicker = new PIXI.Ticker();
                loadingTicker.add((ticker) => {
                    loadingscreen.alpha = lerp( 1, 0, loadinLerpTracker / 60 );
                    loadinLerpTracker += ticker.deltaTime;
                    if (loadinLerpTracker / 60 > 1) {
                        loadingTicker.destroy();
                    }
                });
                loadingTicker.start();
            }
        });
        enemyTicker.start();
      }

      // Change Question
      questions.splice(questionNumber, 1);
      console.log(questions);
      questionNumber = Math.floor(Math.random() * questions.length);
      console.log(questionNumber);
    } else if (answer.text != questions[questionNumber].correct) {
      console.log("incorrect");
      answer.style = wrongStyle;
      answer.eventMode = "passive";
      levelTime -= 10;
    }
  }

  let elapsed = 0.0;
  app.ticker.add((ticker) => {
    elapsed += ticker.deltaTime;

    leveltracker.scale = 1 + 0.1 * Math.abs(Math.cos(elapsed / 25.0));

    enemy.x = slimeDefaultLocation.x + 2 * Math.cos(elapsed / 15.0);
    enemy.y = slimeDefaultLocation.y + 15 * Math.cos(elapsed / 20.0);

    spellbook.x += 0.02 * Math.cos(elapsed / 25.0);
    spellbook.y += 0.075 * Math.cos(elapsed / 35.0);

    scroll.x -= (0.03 * Math.cos(elapsed / 65.0)) / 2;
    scroll.y -= (0.01 * Math.cos(elapsed / 65.0)) / 2;

    hourglass.rotation += 0.0005 * ((30 - levelTime) / 12) * Math.cos(elapsed / 20);

    console.log(levelTime);

    if (levelTime >= 0) {
      timer.text = Math.floor(levelTime);
    } else {
        timer.text = 0;
    }

    if ((questions[questionNumber].question != question.text) && !isLoading) {
      levelTime = 30.0;
      hourglass.rotation = 0;
      clearInterval(levelInterval);
      hourglass.texture = PIXI.Sprite.from("../sprites/UI/Hourglass/0.png").texture;
      levelInterval = setInterval(levelTimer, 1000);
      question.text = questions[questionNumber].question;
      answer1.text = questions[questionNumber].answer1;
      answer1.style = defaultStyle;
      answer1.eventMode = "static";
      answer2.text = questions[questionNumber].answer2;
      answer2.style = defaultStyle;
      answer2.eventMode = "static";
      answer3.text = questions[questionNumber].answer3;
      answer3.style = defaultStyle;
      answer3.eventMode = "static";
      answer4.text = questions[questionNumber].answer4;
      answer4.style = defaultStyle;
      answer4.eventMode = "static";
    }
  });
})();
