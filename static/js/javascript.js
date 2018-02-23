$(document).ready(function() {

	var app = app || { };

	(function(){

		app.controller = {
			init: function(){
                this.checkStart();
			},

            checkStart: function(){
                $( "section#startScreen" ).click(function() {
                    
                });

                setTimeout(function(){
                    app.animations.moveToQuestionScreen();
                }, 10000);
            }
		},

    app.vars = {

        pathToTxtFile: "podcatcher/",

        selectors: {
            questionTitle: $("section#questionScreen h1"),
            questionNL: $("section#questionScreen div#questions .question-NL"),
            questionEN: $("section#questionScreen div#questions .question-EN"),
            answers:$("section#questionScreen div#answers"),
            image:$("section#questionScreen div#questionImage")

        },

        //modifiers for debug
        disableTimer: 0, // 1 = disables the timer, 0 = default.
        questionNumber: 1, //start quiz on this question 
        time: 10, //time to answer question in seconds
        answerReset: 0, //resets user answers after every question
        resultScreenTime:20, //time un seconds until the result screen dissappears


        // actual variables
        questionHasImage:0,
        timerCountDown: 0, //1=yes, 0=no
        barWidth: $("section#questionScreen div#score .bar").width(),


        score:{
            team1: 0,
            team2: 0,
        },

        totalScore:{
            correctTeam1: 0,
            totalAnswersTeam1: 0,
            totalPercentageTeam1: 0,

            correctTeam2: 0,
            totalAnswersTeam2: 0,
            totalPercentageTeam2: 0,
        },

        percentages: {
            team1: 0,
            team2: 0,
        },

        //needs reset after each question
        correctTeam1: 0,
        correctTeam2: 0,

        //Modiefiers
        maxPoints: 500,
        maxPlayers: 6,


        userAnswers: [],

        answersTeam1: [],
        answersTeam2: [],


        question: [

            {
                questionType:"image",
                image: "url('static/img/hoge-bi.jpg')",
                NL:"Wanneer reedt deze fiets voor het eerst?",
                EN:"When did this bike first ride?",
                answersNL:[],
                answersEN:[],
                answers:["In 1780 ","In 1868", "In 1950"],
                differentLanguages: 0,
                rightAnswer:2,

            },

            {
                questionType:"normal",
                NL:"Wie mochten in 1942 niet meer met openbaar vervoer reizen?",
                EN:"Who were not allowed to travel by public transport in 1942?",
                answersNL:["Huisdieren","Duitsers","Joden"],
                answersEN:["Pets","Germans","Jews"],
                answers:[],
                differentLanguages: 1,
                rightAnswer:3,

            },

            {
                questionType:"normal",
                NL:"De VOC-vloot deed er 8 maanden over om van Amsterdam naar Oost Indie te gaan. Hoe lang duurde de terugreis?",
                EN:"The VOC fleet took 8 months to get from Amsterdam to East India. How long did the return journey last?",
                answersNL:["9 maanden","ook 8 maanden","7 maanden"],
                answersEN:["9 months","also 8 months","7 months"],
                answers:[],
                differentLanguages: 1,
                rightAnswer:3,

            },

            {
                questionType:"image",
                image: "url('static/img/oude-kerk.jpg')",
                NL:"De Oude Kerk's toren is hoog, maar dit is niet de hoogste van Nederland. Welke stad heeft de hoogste kerktoren?",
                EN:"The Old Church has a high tower, but it's not the highest in the Netherlands. Which city has the highest church tower?",
                answersNL:["Den Haag","Utrecht","Rotterdam"],
                answersEN:["The Hague","Utrecht","Rotterdam"],
                answers:[],
                differentLanguages: 1,
                rightAnswer:2,

            },

            {
                questionType:"normal",
                NL:"Welke tram rijdt niet in Amsterdam?",
                EN:"Which tram does not run in Amsterdam?",
                answersNL:[],
                answersEN:[],
                answers:["Tram 8", "Tram 16", "Tram 26"],
                differentLanguages: 0,
                rightAnswer:1,

            },

            {
                questionType:"normal",
                NL:"Het stadscentrum dat in 1655 gebouwd werd kreeg als bijnaam het [.....] Wereld Wonder ",
                EN:"The city center, which was built in 1655, was nicknamed the [.....] Wonder of the World",
                answersNL:["Grootste","Achtste","Zevende"],
                answersEN:["Biggest","Eighth","Seventh"],
                answers:[],
                differentLanguages: 1,
                rightAnswer:2,

            },

            {
                questionType:"image",
                image: "url('static/img/hijsmachine.jpg')",
                NL:"De hijsmachine om paarden uit de gracht te halen was uitgevonden door J.C. Sinck. Wat was zijn beroep?",
                EN:"The crane for retrieving horses from the canal was invented by J.C. Sinck. What was his profession?",
                answersNL:["Ingenieur","Timerman","Slager"],
                answersEN:["Engineer","Carpenter","Butcher"],
                answers:[],
                differentLanguages: 1,
                rightAnswer:3,

            },

            {
                questionType:"normal",
                NL:"Amsterdam telt vele nationaliteiten. Hoeveel zijn dat er vandaag de dag?",
                EN:"Amsterdam has many nationalities. How many are there nowadays?",
                answersNL:[],
                answersEN:[],
                answers:["54","178","253"],
                differentLanguages: 0,
                rightAnswer:2,

            },

        ],
   

    },

    app.animations = {
        init: function(){
            //this.showNormalQuestion(app.vars.question[app.vars.questionNumber]);
            this.checkQuestionType(app.vars.question[app.vars.questionNumber-1]);
        },

        checkQuestionType: function(question){
            if (question.questionType == "normal") {
                app.vars.questionHasImage = 0;
                this.showQuestion(question);
            } else if (question.questionType == "image") {
                app.vars.questionHasImage = 1;
                this.showImageQuestion(question);
            };
        },


        showImageQuestion: function(question){

            $("section#questionScreen div#answers").addClass("image");
            $("section#questionScreen div#questionImage").addClass("show");
            $("section#questionScreen div#percentages").addClass("image");
            $("section#questionScreen div#questionImage div.image").css("background-image",question.image);
            

            this.showQuestion(question);
        },

        showQuestion: function(question){
            //Set HTML for question, answers, etc.
            $("section#questionScreen h1").html("Vraag "+ app.vars.questionNumber + " / Question "+ app.vars.questionNumber);

            $("section#questionScreen div#questions .question-NL").html(question.NL);
            $("section#questionScreen div#questions .question-EN").html(question.EN);

            if (question.differentLanguages === 0) {
                $("section#questionScreen div#answers .answerBlock:nth-of-type(1) .answer .answer-Both").html(question.answers[0]);
                $("section#questionScreen div#answers .answerBlock:nth-of-type(2) .answer .answer-Both").html(question.answers[1]);
                $("section#questionScreen div#answers .answerBlock:nth-of-type(3) .answer .answer-Both").html(question.answers[2]);
                $("section#questionScreen div#answers .answerBlock .answer .answer-Both").addClass("show");
                $("section#questionScreen div#answers .answerBlock .answer .answer-NL").addClass("hide");
                $("section#questionScreen div#answers .answerBlock .answer .answer-EN").addClass("hide");

            } else{

                $("section#questionScreen div#answers .answerBlock:nth-of-type(1) .answer .answer-NL").html(question.answersNL[0]);
                $("section#questionScreen div#answers .answerBlock:nth-of-type(1) .answer .answer-EN").html(question.answersEN[0]);

                $("section#questionScreen div#answers .answerBlock:nth-of-type(2) .answer .answer-NL").html(question.answersNL[1]);
                $("section#questionScreen div#answers .answerBlock:nth-of-type(2) .answer .answer-EN").html(question.answersEN[1]);

                $("section#questionScreen div#answers .answerBlock:nth-of-type(3) .answer .answer-NL").html(question.answersNL[2]);
                $("section#questionScreen div#answers .answerBlock:nth-of-type(3) .answer .answer-EN").html(question.answersEN[2]);
                $("section#questionScreen div#answers .answerBlock .answer .answer-Both").removeClass("show");
                $("section#questionScreen div#answers .answerBlock .answer .answer-NL").removeClass("hide");
                $("section#questionScreen div#answers .answerBlock .answer .answer-EN").removeClass("hide");
            }

            




            //show title
            $("section#questionScreen h1").addClass("animateIn");

            //show questions
            $("section#questionScreen div#questions .question-NL").addClass("animateIn");
            setTimeout(function(){
                $("section#questionScreen div#questions .question-EN").addClass("animateIn");
            }, 500);

            //show Image

            if (app.vars.questionHasImage == 1) {
                setTimeout(function(){
                    $("section#questionScreen div#questionImage").addClass("animateIn");
                }, 500);
            };


            //Show multiple choice answers + time
            setTimeout(function(){
                $("section#questionScreen div#answers .answerBlock:nth-of-type(1)").addClass("animateIn");
            }, 7000);

            setTimeout(function(){
                $("section#questionScreen div#answers .answerBlock:nth-of-type(2)").addClass("animateIn");
            }, 7300);
            
            setTimeout(function(){
                $("section#questionScreen div#answers .answerBlock:nth-of-type(3)").addClass("animateIn");
                $("section#questionScreen div#time").addClass("animateIn");
                if (app.vars.disableTimer === 0) {
                    app.timer.init();
                };
                
            }, 7600);
            
        },

        showRightAnswer: function(question){
            //Selectnthoftype(app.vars.rightanswer)
            if (question.rightAnswer === 1) {
                $("section#questionScreen div#answers .answerBlock:nth-of-type(1)").addClass("rightAnswer");
                $("section#questionScreen div#answers .answerBlock:nth-of-type(2)").addClass("notRightAnswer");
                $("section#questionScreen div#answers .answerBlock:nth-of-type(3)").addClass("notRightAnswer");
            } else if (question.rightAnswer === 2) {
                $("section#questionScreen div#answers .answerBlock:nth-of-type(2)").addClass("rightAnswer");
                $("section#questionScreen div#answers .answerBlock:nth-of-type(1)").addClass("notRightAnswer");
                $("section#questionScreen div#answers .answerBlock:nth-of-type(3)").addClass("notRightAnswer");
            } else if (question.rightAnswer === 3){
                $("section#questionScreen div#answers .answerBlock:nth-of-type(3)").addClass("rightAnswer");
                $("section#questionScreen div#answers .answerBlock:nth-of-type(2)").addClass("notRightAnswer");
                $("section#questionScreen div#answers .answerBlock:nth-of-type(1)").addClass("notRightAnswer");
            };
            this.checkPercentages(question);
            

        },

        checkPercentages: function(question){

            if (question.rightAnswer === 1) {
                app.vars.rightAnswer = "A";
            } else if (question.rightAnswer === 2) {
                app.vars.rightAnswer = "B";
            } else if (question.rightAnswer === 3) {
                app.vars.rightAnswer = "C";
            };

            console.log("Right Answer is: "+app.vars.rightAnswer);

            //Check how many good answers from Team 1
            for (i = 0; i < app.vars.answersTeam1.length; i++) { 
                if (app.vars.answersTeam1[i] == app.vars.rightAnswer) {
                    app.vars.correctTeam1 += 1;
                };
            }
            console.log("Team 1 correct: "+app.vars.correctTeam1);

            app.vars.totalScore.correctTeam1 += app.vars.correctTeam1;
            app.vars.totalScore.totalAnswersTeam1 += app.vars.answersTeam1.length;

            console.log(app.vars.totalScore.correctTeam1);
            console.log(app.vars.totalScore.totalAnswersTeam1);



            //Check how many good answers from Team 2
            for (i = 0; i < app.vars.answersTeam2.length; i++) { 
                if (app.vars.answersTeam2[i] == app.vars.rightAnswer) {
                    app.vars.correctTeam2 += 1;
                };
            }

            console.log("Team 2 correct: "+app.vars.correctTeam2);

            app.vars.totalScore.correctTeam2 += app.vars.correctTeam2;
            app.vars.totalScore.totalAnswersTeam2 += app.vars.answersTeam2.length;

            console.log(app.vars.totalScore.correctTeam2);
            console.log(app.vars.totalScore.totalAnswersTeam2);

            app.vars.percentages.team1 = Math.round(app.vars.correctTeam1 / app.vars.answersTeam1.length * 100);
            app.vars.percentages.team2 = Math.round(app.vars.correctTeam2 / app.vars.answersTeam2.length * 100);

            this.showPercentages(app.vars.percentages.team1,app.vars.percentages.team2);
        },


        showPercentages: function(percentageTeam1, percentageTeam2){

            $("section#questionScreen div#percentages .rightanswer .team1 .percentage").html(percentageTeam1+"%");
            $("section#questionScreen div#percentages .rightanswer .team2 .percentage").html(percentageTeam2+"%");




            setTimeout(function(){
                $("section#questionScreen div#percentages .rightanswer .team1").addClass("animateIn");
            }, 2200);

            setTimeout(function(){
                $("section#questionScreen div#percentages .rightanswer .team2").addClass("animateIn");
            }, 2700);

            setTimeout(function(){
                app.animations.changePercentageIntoPoints();
            }, 3200);
        },


        changePercentageIntoPoints: function(){
            $("section#questionScreen div#percentages .rightanswer .team1 .percentage").addClass("animateChange");

            setTimeout(function(){
                $("section#questionScreen div#percentages .rightanswer .team1 .percentage").html("+"+app.vars.percentages.team1);
            }, 400);

            setTimeout(function(){
                $("section#questionScreen div#percentages .rightanswer .team2 .percentage").addClass("animateChange");
                setTimeout(function(){
                    $("section#questionScreen div#percentages .rightanswer .team2 .percentage").html("+"+app.vars.percentages.team2);
                    app.animations.movePoints();
                }, 400);
            }, 500);
        },

        movePoints:function(){
            setTimeout(function(){
                $("section#questionScreen div#percentages .rightanswer .team1 .percentage.animateChange").addClass("animateOut");
            }, 500);

            setTimeout(function(){
                $("section#questionScreen div#percentages .rightanswer .team2 .percentage.animateChange").addClass("animateOut");
            }, 1000);

            setTimeout(function(){
                $("section#questionScreen div#percentages .rightanswer div .title").addClass("animateOut");
                app.animations.clearQuestionScreen();
            }, 1300);

            this.givePoints();
        },

        givePoints: function(){
            setTimeout(function(){
                $("div#score .scoreTeam1 .bar .progress").css("width", $("div#score .scoreTeam1 .bar .progress").width() + app.vars.barWidth / app.vars.maxPoints * app.vars.percentages.team1);
            }, 800);

            setTimeout(function(){
                $("div#score .scoreTeam2 .bar .progress").css("width",$("div#score .scoreTeam2 .bar .progress").width() + app.vars.barWidth / app.vars.maxPoints * app.vars.percentages.team2);
            }, 1200);

            app.vars.score.team1 += app.vars.percentages.team1
            app.vars.score.team2 += app.vars.percentages.team2
            console.log(app.vars.score);
        },

        clearQuestionScreen: function(){
            app.vars.selectors.questionTitle.removeClass("animateIn");
            $("section#questionScreen div#percentages .rightAnswer .team1").removeClass("animateIn");

            $("section#questionScreen div#percentages .rightAnswer .team2").removeClass("animateIn");

            

            if (app.vars.questionHasImage == 1) {
                app.vars.selectors.image.addClass("animateOut");
            };

            app.vars.selectors.questionNL.addClass("animateOut");        
            app.vars.selectors.questionEN.addClass("animateOut");    
            app.vars.selectors.answers.addClass("animateOut");

            setTimeout(function(){
                app.vars.selectors.questionNL.addClass("reset");
                app.vars.selectors.questionNL.removeClass("animateIn");
                app.vars.selectors.questionNL.removeClass("animateOut");

                app.vars.selectors.questionEN.addClass("reset");
                app.vars.selectors.questionEN.removeClass("animateIn");
                app.vars.selectors.questionEN.removeClass("animateOut");

                app.vars.selectors.answers.addClass("reset");
                app.vars.selectors.answers.removeClass("animateIn");
                app.vars.selectors.answers.removeClass("animateOut");
                app.vars.selectors.answers.removeClass("image");

                $("section#questionScreen div#percentages").removeClass("image");



                $("section#questionScreen div#percentages .rightAnswer  .title").removeClass("animateOut");

                $("section#questionScreen div#answers .answerBlock").removeClass("rightAnswer");
                $("section#questionScreen div#answers .answerBlock").removeClass("notRightAnswer");
                $("section#questionScreen div#answers .answerBlock").removeClass("animateIn");
                $("section#questionScreen div#answers .answerBlock").addClass("reset");

                $("section#questionScreen div#percentages .rightAnswer .team1 .percentage").removeClass("animateChange");
                $("section#questionScreen div#percentages .rightAnswer .team1 .percentage").removeClass("animateOut");

                $("section#questionScreen div#percentages .rightAnswer .team2 .percentage").removeClass("animateChange");
                $("section#questionScreen div#percentages .rightAnswer .team2 .percentage").removeClass("animateOut");

                if (app.vars.questionHasImage == 1) {
                    app.vars.selectors.image.addClass("reset");
                    app.vars.selectors.image.removeClass("animateIn");
                    app.vars.selectors.image.removeClass("animateOut");
                    app.vars.selectors.image.removeClass("show");
                };
            }, 1100);
            

            setTimeout(function(){
                app.vars.selectors.questionNL.removeClass("reset");
                app.vars.selectors.questionEN.removeClass("reset");
                app.vars.selectors.answers.removeClass("reset");
                $("section#questionScreen div#answers .answerBlock").removeClass("reset");

                if (app.vars.questionHasImage == 1) {
                    app.vars.selectors.image.removeClass("reset");
                };

                app.vars.answersTeam1 = [];
                app.vars.answersTeam2 = [];

                app.animations.checkWinner();
            }, 1200);

            
        },

        checkWinner: function(){
            //app.vars.score.team1 = 330;
            //app.vars.score.team2 = 700;

            //Check for Winner or draw
            if (app.vars.score.team1 >= app.vars.maxPoints && app.vars.score.team2 < app.vars.maxPoints ) {

                //if Team 1 wins with max points
                console.log("team1 won with max points");
                this.goToWinnerScreen("team1", 1);


            } else if (app.vars.score.team2 >= app.vars.maxPoints && app.vars.score.team1 < app.vars.maxPoints ) {

                //if Team 2 wins with max points
                console.log("team 2 won with max points");
                this.goToWinnerScreen("team2", 1);


            } else if (app.vars.score.team2 >= app.vars.maxPoints && app.vars.score.team1 >= app.vars.maxPoints ) {

                //if both Teams win with Max Points
                console.log("draw and both teams have max points");
                this.goToWinnerScreen("draw", 1);


            } else if (app.vars.questionNumber == app.vars.question.length) {

                //if there are no more questions left
                if (app.vars.score.team1 > app.vars.score.team2) {

                    //if team 1 wins with higher score
                    console.log("team1 won");
                    this.goToWinnerScreen("team1", 0);


                } else if (app.vars.score.team2 > app.vars.score.team1) {

                    //if team 2 wins with higher score
                    console.log("team2 won");
                    this.goToWinnerScreen("team2", 0);


                } else {

                    //if both teams have same score
                    console.log("draw");
                    this.goToWinnerScreen("draw", 0);
                }

                console.log("quiz is over");
            } else{
                this.nextQuestion();
            }
        },

        nextQuestion: function(){
            app.vars.correctTeam1 = 0;
            app.vars.correctTeam2 = 0;

            app.vars.questionNumber += 1;

            //reset answers
            if (app.vars.answerReset === 1) {
                for (i = 0; i < app.vars.userAnswers.length; i++) { 

                    $.ajax({  
                        type: 'GET',  
                        url: "../AM Quiz/podcatcher/P"+ (i+1) +".php", 
                        data: { state: "" },
                        success: function(response) {
                            console.log("answers have been reset");
                        }
                    });
                }
            };

            app.animations.init();
        },

        goToWinnerScreen: function(winner,maxPoints){
            $("section#questionScreen div#score").addClass("animateOut");

            setTimeout(function(){
                $("section#questionScreen").removeClass("show");
                $("section#resultScreen").addClass("show");
            }, 410);

            setTimeout(function(){
                $("section#resultScreen").addClass("animateIn");
            }, 600);

            app.vars.totalScore.totalPercentageTeam1 = Math.round(app.vars.totalScore.correctTeam1 / app.vars.totalScore.totalAnswersTeam1 * 100);
            app.vars.totalScore.totalPercentageTeam2 = Math.round(app.vars.totalScore.correctTeam2 / app.vars.totalScore.totalAnswersTeam2 * 100);




            if (winner == "team1" && maxPoints == 1) {

                //if team 1 wins with max points
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .teamName").html("TEAM 1");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .score").html(app.vars.maxPoints +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam1+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam1 +"%");

                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .teamName").html("TEAM 2");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .score").html(app.vars.score.team2 +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam2+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam2 +"%");


            } else if (winner == "team2" && maxPoints == 1) {

                //if team 2 wins with max points
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .teamName").html("TEAM 2");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .score").html(app.vars.maxPoints +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam2+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam2 +"%");

                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .teamName").html("TEAM 1");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .score").html(app.vars.score.team1 +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam1+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam1 +"%");
                


            } else if (winner == "draw" && maxPoints == 1) {

                //if both teams end up with max points
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .teamName").html("TEAM 1");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .score").html(app.vars.maxPoints +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam1+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam1 +"%");

                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .teamName").html("TEAM 2");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .score").html(app.vars.maxPoints +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam2+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam2 +"%");
                $("section#resultScreen").addClass("draw");
                

            } else if (winner == "team1" && maxPoints == 0) {

                //if team 1 wins when there are no more questions left
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .teamName").html("TEAM 1");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .score").html(app.vars.score.team1 +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam1+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam1 +"%");

                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .teamName").html("TEAM 2");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .score").html(app.vars.score.team2 +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam2+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam2 +"%");


            } else if (winner == "team2" && maxPoints == 0) {

                //if team 2 wins when there are no more questions left
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .teamName").html("TEAM 2");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .score").html(app.vars.score.team2 +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam2+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam2 +"%");

                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .teamName").html("TEAM 1");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .score").html(app.vars.score.team1 +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam1+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam1 +"%");


            } else if (winner == "draw" && maxPoints == 0) {

                //if both teams have same score when there are no more questions left
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .teamName").html("TEAM 1");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .score").html(app.vars.score.team1 +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam1+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(2) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam1 +"%");

                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .teamName").html("TEAM 2");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .score").html(app.vars.score.team2 +" / "+ app.vars.maxPoints);
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageCorrect").html(app.vars.totalScore.totalPercentageTeam2+"%");
                $("section#resultScreen .points .scoreNumbers div:nth-of-type(3) .percentageIncorrect").html(100 - app.vars.totalScore.totalPercentageTeam2 +"%");
                $("section#resultScreen").addClass("draw");

            }

            setTimeout(function(){
                    app.animations.resetGame();
            }, app.vars.resultScreenTime * 1000);

        },

        resetGame:function(){
            $("section#questionScreen div#score").removeClass("animateOut");
            $("section#questionScreen").removeClass("animateIn");
            $("div#score .scoreTeam1 .bar .progress").css("width", "0");
            $("div#score .scoreTeam2 .bar .progress").css("width", "0");
            app.vars.totalScore.correctTeam1 = 0;
            app.vars.totalScore.totalAnswersTeam1 = 0;
            app.vars.totalScore.totalPercentageTeam1 = 0;

            app.vars.totalScore.correctTeam2 = 0;
            app.vars.totalScore.totalAnswersTeam2 = 0;
            app.vars.totalScore.totalPercentageTeam2 = 0;

            app.vars.score.team1 = 0;
            app.vars.score.team2 = 0;

            app.vars.correctTeam1 = 0;
            app.vars.correctTeam2 = 0;

            app.vars.questionNumber = 1;

            //reset answers
            if (app.vars.answerReset === 1) {
                for (i = 0; i < app.vars.userAnswers.length; i++) { 

                    $.ajax({  
                        type: 'GET',  
                        url: "../AM Quiz/podcatcher/P"+ (i+1) +".php", 
                        data: { state: "" },
                        success: function(response) {
                            console.log("answers have been reset");
                        }
                    });
                }
            };


            this.goToStartScreen();
        },

        moveToQuestionScreen: function(){
            $("section#startScreen").removeClass("animateIn");

            setTimeout(function(){
                $("section#startScreen").addClass("hide");
                $("section#questionScreen").addClass("show");
            }, 1010);

            setTimeout(function(){
                $("section#questionScreen").addClass("animateIn");
            }, 1020);

            setTimeout(function(){
                app.animations.init();
            }, 3000);
        },

        goToStartScreen: function(){

            $("section#resultScreen").removeClass("animateIn");

            setTimeout(function(){
                $("section#resultScreen").removeClass("show");
                $("section#startScreen").removeClass("hide");
            }, 1010);

            setTimeout(function(){
                $("section#startScreen").addClass("animateIn");
            }, 1020);

        },

    },

    app.checkUserAnswers = {
        init:function(){
            this.playerAnswers();

        },


        playerAnswers: function(){

            if (app.vars.timerCountDown == 1) {


                getAnswers = setInterval(function() {
                    app.checkUserAnswers.loopThroughPlayers(app.vars.pathToTxtFile);
                }, 300);


            } else {
                clearTimeout(getAnswers);

                console.log(app.vars.userAnswers);

                for (i = 0; i < app.vars.maxPlayers; i++) {

                    if(i % 2 === 0) { // index is even
                        app.vars.answersTeam1.push(app.vars.userAnswers[i]);
                    }

                    if(i % 2 === 1) { // index is uneven
                        app.vars.answersTeam2.push(app.vars.userAnswers[i]);
                    }
     
                }

                console.log(app.vars.answersTeam1);
                console.log(app.vars.answersTeam2);
            }

            /*function myStopFunction(){
                clearTimeout(answerP1);
            }*/

        },

        loopThroughPlayers: function(file){

            for (i = 0; i < app.vars.maxPlayers; i++) { 
                app.checkUserAnswers.readTextFile(file+"P"+(i+1)+".txt",i)
            }
        },

        readTextFile: function(file, player){
            var rawFile = new XMLHttpRequest();
            rawFile.open("GET", file, false);
            rawFile.onreadystatechange = function ()
            {
                if(rawFile.readyState === 4)
                {
                    if(rawFile.status === 200 || rawFile.status == 0)
                    {
                        var allText = rawFile.responseText;
                        //alert(allText);
                        //console.log("P"+player+": "+ allText);
                        app.vars.userAnswers[player] = allText;

                    }
                }
            }
            rawFile.send(null);
        }
    },

    app.timer = {
        init: function(){
            this.defineCircle();
            this.defineTimer();
            app.vars.timerCountDown = 1;
            app.checkUserAnswers.init();
        },

        defineCircle: function(){
            var ctx2 = document.getElementById('my_other_canvas').getContext('2d');
            var al2 = 100;
            var start2 = 4.72;
            var cw2 = ctx2.canvas.width;
            var ch2 = ctx2.canvas.height;
            var diff2;

            this.drawCircle(ctx2,al2,start2,cw2,ch2,diff2);

        },

        drawCircle: function(ctx,al,start,cw,ch,diff){
            diff = ((al / 100) * Math.PI*2*10).toFixed(2);
            ctx.clearRect(0, 0, cw, ch);
            ctx.lineWidth = 25;
            ctx.fillStyle = '#09F';
            ctx.strokeStyle = "#ffb800";
            ctx.textAlign = 'center';
            ctx.beginPath();
            ctx.arc(70, 70, 58, start, diff/10+start, false);
            ctx.stroke();
        },

        defineTimer: function(){
            var ctx = document.getElementById('my_canvas').getContext('2d');
            var al = 0;
            var start = 4.72;
            var cw = ctx.canvas.width;
            var ch = ctx.canvas.height; 
            var diff;
            var timer = app.vars.time * 1000;
            var timeLeft = app.vars.time * 1000;

            function progressSim(){
                diff = ((al / (app.vars.time * 1000)) * Math.PI*2*10).toFixed(2);
                ctx.clearRect(0, 0, cw, ch);
                ctx.lineWidth = 25;
                ctx.fillStyle = '#fff';
                ctx.strokeStyle = "#fff";
                ctx.textAlign = 'center';
                console.log(Math.ceil((timeLeft - al) /1000));

                $("section#questionScreen div#time div.timeLeft").html(Math.ceil((timeLeft - al) /1000));
                ctx.beginPath();
                ctx.arc(70, 70, 58, start, diff/10+start, false);
                ctx.stroke();

                //When timer is done
                if(al >= app.vars.time * 1000){
                    app.vars.timerCountDown = 0;
                    $("section#questionScreen div#time").removeClass("animateIn");
                    app.checkUserAnswers.init();
                    app.animations.showRightAnswer(app.vars.question[app.vars.questionNumber-1]);
                    clearTimeout(sim);
                }


                al+= (1000/30); //same as interval time (fps)
            }

            var sim = setInterval(progressSim, 1000/30);

        }
    }

		app.controller.init();

	}());
});