// SHREK TRIVIA

var startScreen;
var gameHTML;
var counter = 30;

var questions = [
    "What does Donkey smell to make him think Shrek farted?", 
    "What is the name of the giant gingerbread man?",
    "What is the name of Lord Farquaad's executioner?",
    "What year did Shrek debut in theaters?",
    "Which band performed two hit songs in the movie Shrek?",
    "What did Shrek compare ogres to?",
    "What did Shrek garnish his drink with in the beginning of the movie?",
    "Which three princesses did the mirror show to Farquaad?",
    "What symbol is carved into the door of Shrek's outhouse?",
    "How many gumdrop buttons does the Gingerbread man have?",
    "Pick the two foods Donkey claims everyone loves:",
    "What does Fiona give Shrek to thank him for saving her?",
    "Pick the type of flower Fiona told Donkey to find:",
    "What actor originally played Shrek?",
    "What does Donkey want to make for breakfast when he invites himself into Shrek's swamp?",
];

var answers = [
    ["Onions", "The Sewer", "Brimstone", "The Swamp"],
    ["Bongo", "Mega Gingy", "Fred", "Mongo"],
    ["Thelonius", "Augustus", "Octavian", "Antonio"],
    ["1999", "2001", "2005", "2000"],
    ["Sugar Ray", "Sublime", "N*SYNC", "Smash Mouth"],
    ["Farts", "Onions", "Parfaits", "Waffles "],
    ["An eyeball", "A frog", "A lime twist", "A spider"],
    ["Belle, Anastasia and Rapunzel", "Princess Fiona, Ariel the Mermaid and Rapunzel", "Cinderella, Belle and Sleeping Beauty", "Princess Fiona, Cinderella and Snow White"],
    ["A moon", "A skull", "An eyeball", "Shrek's initials"],
    ["1", "2", "3", "4"],
    ["Cakes and waffles", "Bagels and banana bread", "Waffles and pizza", "Cakes and parfaits"],
    ["A rose", "A handkerchief", "A kiss", "A magic sword"],
    ["Red flower with blue thorns", "Purple flower with green thorns", "Blue flower with red thorns", "Green flower with purple thorns"],
    ["Mike Meyers", "Bill Murray", "Chris Farley", "Nichola Cage"],
    ["Pizza", "Parfaits", "Tacos", "Waffles"]
];

var correctAnswers = [
    "C. Brimstone",
    "D. Mongo",
    "A. Thelonius",
    "B. 2001",
    "D. Smash Mouth",
    "B. Onions",
    "A. An eyeball",
    "D. Princess Fiona, Cinderella and Snow White",
    "A. A moon",
    "B. 2",
    "D. Cakes and parfaits",
    "B. A handkerchief",
    "C. Blue flower with red thorns",
    "C. Chris Farley",
    "D. Waffles"
];

// keeps track of what # question we on
var questionCounter = 0;
// user's input
var selecterAnswer;

var theClock;

var correct = 0;
var incorrect = 0;
var unanswered = 0;

// HERE WE GO!!!
$(document).ready(function() {
    
// sets up start page with a big ol button  
    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();
    
    // start button
    $("body").on("click", ".start-button", function(event){  
        
        generateHTML();
    
        timer();
    
    }); 
    
    // on click event setup
    $("body").on("click", ".answer", function(event){
        event.preventDefault;

        selectedAnswer = $(this).text()

        // if else statement that checks user choice against questionCounter to keep track of where we at
        // also stops the clock from running
        if(selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(theClock);
            generateWin();
        }
        else {
            clearInterval(theClock);
            generateLoss();
        }
    }); 
    
    // resets clock back to 30 for the next question
    $("body").on("click", ".reset-button", function(event){
        
        resetGame();
        }); 
    }); 
    
    // if you run outta time
    function timeOut() {
        unanswered++;

        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + 
        "</span></p>" + "<p class='text-center'>GET OUT OF MY SWAMP!  The correct answer was: " + correctAnswers[questionCounter] + "</p>";
        
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  
    };
    
    // win function
    function generateWin() {
        correct++;
        
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter 
        + "</span></p>" + "<p class='text-center'>Yep! The answer is: " + correctAnswers[questionCounter] + "</p>";
        
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000);  
    };
    
    // lose function
    function generateLoss() {
        incorrect++;

        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter 
        + "</span></p>" + "<p class='text-center'>Nope... The correct answer is: "+ correctAnswers[questionCounter] + "</p>";
        
        $(".mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    };
    
    // html for the questions. 
    function generateHTML() {

        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" 
        + questions[questionCounter] 
        + "</p><p class='first-answer answer'>A. " + answers[questionCounter][0] 
        + "</p><p class='answer'>B. " + answers[questionCounter][1]
        + "</p><p class='answer'>C. " + answers[questionCounter][2]
        + "</p><p class='answer'>D. " + answers[questionCounter][3] + "</p>";
        
        $(".mainArea").html(gameHTML);
    };
    
    // wait function allows setInterval to pause for 4 seconds
    function wait() {
        if (questionCounter < 14) {
            questionCounter++;
            generateHTML();
            counter = 30;
            timer();
        }
        else {
            finalScreen();
        }
    };
    
    // 30 seconds for each question
    function timer() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeOut();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    };
    
    // displays user data and reset button
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" 
        + "<p class='text-center'>All done, here's how you did!" + "</p>" 
        + "<p class='summary-correct'>Correct Answers: " + correct + "</p>" 
        + "<p>Wrong Answers: " + incorrect + "</p>" 
        + "<p>Unanswered: " + unanswered + "</p>" 
        + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        
        $(".mainArea").html(gameHTML);
    };
    
    // reset
    function resetGame() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        counter = 30;

        generateHTML();
        timer();
    };






   