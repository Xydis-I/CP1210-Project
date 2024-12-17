"use strict";

import { questions as questionFile } from '../libraries/questions.js';

const $ = selector => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
    console.log("DomContentLoaded");
    let currentLevel = 1;
    let questionsAnswered = 0;
    let wrongAnswers = 0;
    let isLoading = false;
    let levelTime = 30.0;
    let levelInterval = setInterval(levelTimer, 1000);
    sessionStorage.setItem(`level_times`, "");
    sessionStorage.setItem(`wrong_answers`, "");

    let enemyHP = 2;

    const questions = questionFile;

    let questionNumber = Math.floor(Math.random() * questions.length);
    console.log(questionNumber);
    
    $("#question").textContent = questions[questionNumber].question;
    $("#answer1").textContent = questions[questionNumber].answer1;
    $("#answer2").textContent = questions[questionNumber].answer2;
    $("#answer3").textContent = questions[questionNumber].answer3;
    $("#answer4").textContent = questions[questionNumber].answer4;

    let correctAnswer = questions[questionNumber].correct;

    questions.splice(questionNumber, 1);

    ["#answer1", "#answer2", "#answer3", "#answer4"].forEach(element => {
        $(element).addEventListener("click", () => {
            if ($(element).textContent == correctAnswer) {
                console.log("Correct!");
                enemyHP--;
                if (enemyHP == 1) {
                    $("#hp").className = "hp1";
                    nextQuestion();
                }
                if (enemyHP == 0) {
                    $("#hp").className = "hp0";
                    nextLevel();
                }
            } else {
                console.log("Wrong!");
                levelTime-=10;
                if (levelTime < 0) {
                    levelTime = 0;
                }
                
                if (levelTime <= 0) {
                    $("#hourglass").className = "hourglass4";
                } else if (levelTime <= 7) {
                    $("#hourglass").className = "hourglass3";
                } else if (levelTime <= 14) {
                    $("#hourglass").className = "hourglass2";
                } else if (levelTime <= 22) {
                    $("#hourglass").className = "hourglass1";
                }
                
                $("#timer").textContent = levelTime;
                wrongAnswers++;
                $(element).className = "wrongAnswer";
                $(element).disabled = true;
            }
        });
    });

    function levelTimer() {
        if (levelTime >= 0) {
            $("#timer").textContent = levelTime;
            levelTime--;
            if (levelTime <= 0) {
                $("#hourglass").className = "hourglass4";
            } else if (levelTime <= 7) {
                $("#hourglass").className = "hourglass3";
            } else if (levelTime <= 14) {
                $("#hourglass").className = "hourglass2";
            } else if (levelTime <= 22) {
                $("#hourglass").className = "hourglass1";
            }
        } else {
            $("#timer").textContent = 0;
        }
    }

    function nextQuestion() {
        questionsAnswered++;

        if (levelTime < 0) {
            levelTime = 0;
        }

        let questionTimes = sessionStorage.getItem(`level_times`);
        if (questionTimes == "") {
            sessionStorage.setItem(`level_times`, levelTime);
        } else {
            sessionStorage.setItem(`level_times`, questionTimes + `,${levelTime}`);
        }

        let totalWrong = sessionStorage.getItem(`wrong_answers`);
        if (totalWrong == "") {
            sessionStorage.setItem(`wrong_answers`, wrongAnswers);
        } else {
            sessionStorage.setItem(`wrong_answers`, totalWrong + `,${wrongAnswers}`);
        }
        wrongAnswers = 0;

        questionNumber = Math.floor(Math.random() * questions.length);
        console.log(questionNumber);
        
        $("#question").textContent = questions[questionNumber].question;
        $("#answer1").textContent = questions[questionNumber].answer1;
        $("#answer2").textContent = questions[questionNumber].answer2;
        $("#answer3").textContent = questions[questionNumber].answer3;
        $("#answer4").textContent = questions[questionNumber].answer4;

        levelTime = 30.0 - ((currentLevel - 1) * 5);
        correctAnswer = questions[questionNumber].correct;

        questions.splice(questionNumber, 1);

        $("#hourglass").className = "hourglass0";

        ["#answer1", "#answer2", "#answer3", "#answer4"].forEach(element => {
            $("#timer").textContent = levelTime;
            $(element).className = "answer";
            $(element).disabled = false;
        });
    }

    function nextLevel() {
        ["#answer1", "#answer2", "#answer3", "#answer4"].forEach(element => {
            $(element).disabled = true;
        });
        clearTimeout(levelInterval);
        currentLevel++;

        setTimeout(() => {
            nextQuestion();
            if (currentLevel >= 6) {
                location.href = "../Screens/gameWinPage.html";
            }
            levelInterval = setInterval(levelTimer, 1000);
            $("#hp").className = "hp2";
            enemyHP = 2;
            $("#levelTracker").className = `levelTracker${currentLevel}F`;
            $("#gameBox").className = `level${currentLevel}`;
        }, 1500);
    }
});
