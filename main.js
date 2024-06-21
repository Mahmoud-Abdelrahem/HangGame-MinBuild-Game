//First Section

//Generate Alphabets
var alphabets = []
for (let i = 97; i <= 122; i++) {
  alphabets.push(String.fromCharCode(i))
}

//Letters Buttons
var lettersContainer = document.querySelector(".alpha")
alphabets.forEach(letter => {
  var button = document.createElement("button")
  button.textContent = letter
  button.className = "letter"
  lettersContainer.appendChild(button)
})
//Words Object has Category and Values
var words = {
  Fruit: ["Apple", "Banana", "Cherry", "Durian", "Elderberry", "Fig", "Grape", "Honeydew", "Jackfruit", "Kiwi"],
  Animals: ["Bear", "Cat", "Dog", "Elephant", "Giraffe", "Kangaroo", "Dolphin", "Chameleon", "Penguin", "Hippopotamus", "Crocodile", "Ostrich", "Armadillo"],
  Country: ["Argentina", "Belgium", "Canada", "Denmark", "Egypt", "Finland", "Greece", "Hungary", "India", "Japan"],
  Movies: ["Inception", "Titanic", "The Matrix", "Avatar", "The Godfather", "Pulp Fiction", "The Dark Knight", "Forrest Gump", "Gladiator", "Jurassic Park"],
  Sport: ["Football", "Basketball", "Tennis", "Baseball", "Cricket", "Rugby", "Hockey", "Golf", "Boxing", "Swimming"]
}

//Get All Object Keys
var category = Object.keys(words)

//Get Random Category 
var randomCategory = Math.floor(Math.random() * category.length)
var randomCategoryName = category[randomCategory]

//Get Random Word 
var randomCategoryValue = words[randomCategoryName]
var randomValue = Math.floor(Math.random() * randomCategoryValue.length)
var randomCategoryValue = randomCategoryValue[randomValue]

//Set Category in Document
document.querySelector(".game-info .category span").innerHTML = randomCategoryName
/* ******************************************************************************************************* */
//Second Section 
var guessLetters = document.querySelector(".guess")

var letters = randomCategoryValue.toLowerCase().split("")

letters.forEach(letter => {
  var emptySpan = document.createElement("span")
  if (letter === " ") {
    emptySpan.className = "space"
  }
  guessLetters.appendChild(emptySpan)
})

//Select Guess Span
var guessSpan = document.querySelectorAll(".guess span")


var wrongAttempts = 0
var wrongs = document.querySelector("h3.wrong-attemp")
var draw = document.querySelector(".hangman-draw")

//Handel Clicked Button
var buttons = document.querySelectorAll("button")
buttons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    var status = false
    if (e.target.className === "letter") {
      e.target.classList.add("clicked")
      var clickedLetter = e.target.innerHTML
      letters.forEach(function (wordLetter, index) {
        if (clickedLetter == wordLetter) {
          status = true
          guessSpan[index].innerHTML = clickedLetter
        }
      })
    }
    if (status !== true) {
      wrongAttempts++
      draw.classList.add("wrong-" + wrongAttempts)
      wrongs.textContent = "Wrongs:" + wrongAttempts + "/7"
    }
    if (wrongAttempts === 7) {
      lettersContainer.classList.add("finished")
      endGame()
    } Winner()
  })
})
/******************************************************************************************/

//Third Section

//Sweet Alert
function endGame() {
  Swal.fire({
    icon: "error",
    title: "Game Over",
    text: "the Word is " + randomCategoryValue,
  })
}

function Winner() {
  var allLettersGuessed = true;

  guessSpan.forEach(function (span) {
    if (!span.classList.contains("space") && span.textContent === "") {
      allLettersGuessed = false;
    }
  });
  if (allLettersGuessed) {
    lettersContainer.classList.add("finished");
    Swal.fire({
      title: "Good job!",
      text: "You guessed it right!",
      icon: "success"
    });
  }
}

/***********************************************************************************************************/
//Forth Section

//Reseting the game
function resetGame() {
  guessLetters.innerHTML = "";
  wrongAttempts = 0;
  draw.className = "hangman-draw";
  wrongs.textContent = "Wrongs: 0/7";

  lettersContainer.className = "alpha"
  buttons.forEach(function (button) {
    button.classList.remove("clicked");
  });

  randomCategory = Math.floor(Math.random() * category.length);
  randomCategoryName = category[randomCategory];
  randomCategoryValue = words[randomCategoryName];
  randomValue = Math.floor(Math.random() * randomCategoryValue.length);
  randomCategoryValue = randomCategoryValue[randomValue].toLowerCase();

  document.querySelector(".game-info .category span").innerHTML = randomCategoryName;

  letters = randomCategoryValue.toLowerCase().split("");
  letters.forEach(letter => {
    var emptySpan = document.createElement("span");
    if (letter === " ") {
      emptySpan.className = "space";
    }
    guessLetters.appendChild(emptySpan);
  });
  guessSpan = document.querySelectorAll(".guess span");
  console.log(randomCategoryValue);
}
console.log(randomCategoryValue);
