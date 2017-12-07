$(document).ready(function() {

    // Global Variables
    // ==========================================================================

    var mascots = ["Eagles", "Tigers", "Seminoles", "Cardinals", "Wolfpack", "Panthers", "Orange", "Cavaliers", "Hokies", "Volunteers", "Bulldogs", "Commodores", "Aggies", "Razorbacks", "Gamecocks", "Rebels", "Gators", "Wildcats", "Longhorns", "Trojans", "Ducks", "Buckeyes", "Wolverines", "Sooners", "Huskers"];

    var schools = ["Boston College", "Clemson", "Florida State", "Louisville", "North Carolina State", "Pittsburgh", "Syracuse", "Virginia", "Virginia Tech", "Tennessee (boo)", "Georgia", "Vanderbilt", "Texas A&M", "Arkansas", "South Carolina", "Ole Miss", "Florida", "Kentucky", "Texas", "USC", "Oregon", "THE Ohio State", "Michigan", "Oklahoma", "Nebraska"];

    var wins = 0;

    $("#wins").append("<div id='winNumber'>0</div>");

    var numberOfGuesses = 0;

    var mysteryWord = "";

    var currentWord = "";

    var currentWordReg = "";

    var currentSchool = "";

    var charIndex = "";

    var currentChar = "";

    var audioElement = document.createElement("audio");

    var guessedLetters = [];

    function chooseWord() {

        var randomNumber = Math.floor(Math.random() * mascots.length);
        mysteryWord = "";
        guessedLetters = [];
        $("#letterGuesses").empty();
        currentWordReg = mascots[randomNumber];
        currentWord = currentWordReg.toUpperCase();
        currentSchool = schools[randomNumber];
        numberOfGuesses = currentWord.length + 5;
        $("#numberGuesses").text(numberOfGuesses);

        for (var i = 0; i < currentWord.length; i++) {
            mysteryWord = mysteryWord + "_";
        }

        $("#mysteryWord").text(mysteryWord);

    }

    function continueGame() {

        if (mysteryWord == currentWord) {
            chooseWord();
        }
    }


    chooseWord();
    continueGame();



    $(document).keyup(function(e) {

        // Saving the character index for the letter pressed. Will be -1 if not in currentWord

        console.log(currentWord);

        var charIndices = [];

        currentChar = String.fromCharCode(e.keyCode);
        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] == currentChar) {
                charIndices.push(i);
            }
        }

        function buttonPressed() {

            numberOfGuesses -= 1;
            $("#numberGuesses").text(numberOfGuesses);
            var newLetterGuess = $("<span>");
            guessedLetters.push(currentChar);
            newLetterGuess.text(currentChar);
            $("#letterGuesses").append(newLetterGuess);

        }

        if (guessedLetters.indexOf(currentChar) == -1) {

            if (charIndex > -1) {

                buttonPressed();

                for (var i = 0; i < charIndices.length; i++) {
                    if (charIndices[i] == 0) {

                        var newMysteryWord = currentChar + mysteryWord.substr(1);
                        mysteryWord = newMysteryWord;
                        $("#mysteryWord").text(newMysteryWord);

                    } else if (charIndices[i] == mysteryWord.length - 1) {

                        var newMysteryWord = mysteryWord.substr(0, mysteryWord.length - 1) + currentChar;
                        mysteryWord = newMysteryWord;
                        $("#mysteryWord").text(newMysteryWord);

                    } else {
                        var newMysteryWord = mysteryWord.substr(0, charIndices[i]) + currentChar + mysteryWord.substr(charIndices[i] + 1);
                        mysteryWord = newMysteryWord;
                        $("#mysteryWord").text(newMysteryWord);
                    }
                }



            } else {

                buttonPressed();


            }
        }

        // If all underspaces have been replaced with the correct letters, then you win

        if (mysteryWord == currentWord) {
            wins++;
            $("#schoolName").html("<h2>" + currentSchool + " " + currentWordReg + "</h2>");
            $("#displayPic").replaceWith("<img class='img-fluid' id='displayPic' src='../images/" + currentWord + ".jpg'>");
            $("#winNumber").text(wins);
            audioElement.setAttribute("src", "assets/images/audio/" + currentSchool + ".mp3");
            audioElement.play();
            chooseWord();
        }

        // If you number of guess reach 0, the game ends.
        else if (numberOfGuesses <= 0) {
            $("#mysteryWord").text(currentWord);
            $("#schoolName").html("<h2>" + currentSchool + " " + currentWordReg + "</h2>");
            audioElement.setAttribute("src", "assets/images/audio/loser.mp3");
            audioElement.play();
            chooseWord();
        }


    });

});