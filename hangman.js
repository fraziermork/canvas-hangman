$(document).ready(function(){

var wordList = ['guavas']//, 'pizza', 'awkward', 'akimbo', 'fuchsia', 'glyph', 'pyramid', 'nostril', 'mnemonic']; //all letters lowercase

var letterList = [['a','b', 'c', 'd', 'e','f','g','h','i','j','k','l','m'],['n','o', 'p', 'q', 'r','s','t','u','v','w','x','y','z']];
var guessedLetters=[];
var myWordArray = [];
var lettersArray = [];
var myWord;
var guess;
var numWrongGuesses = 0;
var maxGuesses = 10;
var divcount = 0;
var counter = 0;

var canvasContainer = document.getElementById('canvasContainer');
var canvas = document.createElement('canvas');
canvas.id = 'canvas';
canvas.height = '600';
canvasContainer.appendChild(canvas);
var ctx = canvas.getContext('2d');
ctx.fillStyle = "rgb(100,100,100)";
ctx.strokeStyle = "rgb(100,100,100)";
ctx.beginPath();
ctx.moveTo(50, 550);
ctx.lineTo(50, 50);
ctx.lineTo(230, 50);
ctx.lineTo(230,100);
ctx.stroke();


function play() {
		//clear garbage from previous runs
		myReset();

    //set up the keyboard
    for (i=0; i < letterList[1].length; i++ ){
      $('#topRow').append('<div class="letterHolder clickable" id=' + letterList[0][i] + '><p class="letter">'+ letterList[0][i] +'</p></div>');
      $('#botRow').append('<div class="letterHolder clickable" id=' + letterList[1][i] + '><p class="letter">'+ letterList[1][i] +'</p></div>');
    }

    //initialize word to use, separate letters into an array
		myWord = wordList[Math.floor(Math.random()*wordList.length)];
		for (i=0; i<myWord.length; i++){
			myWordArray.push(myWord.slice(i,i+1));
		};
    console.log(myWordArray);

		//make divs for letters to go in
		for(var i = 0; i < myWordArray.length; i++){
			var newClass = "letter" + myWordArray[i];
			$("#wordDisplay").append("<div class='letterHolder " + newClass +"'></div>");
			divcount++;
			console.log(newClass);
      //set up lettersArray
      var inLettersArrayFlag = false;
      for (var j = 0; j < lettersArray.length; j++){
        if ( myWordArray[i] === lettersArray[j]){
          inLettersArrayFlag = true;
        }
      }
      if (inLettersArrayFlag === false){
        lettersArray.push(myWordArray[i]);
      }
		}

		//set width of answer display--50wide, 10padding, 1border
		var displayWidth = 42 * divcount + 20;
		displayWidth = displayWidth.toString() + "px";
		$(".wordDisplay").css("width", displayWidth);
    $('.clickable').on('click', checkLetter);
	};

  //reset the initial conditions to play again
  function myReset(){
    $('clickable').off('click', checkLetter);
    guessedLetters = [];
    myWordArray = [];
    numWrongGuesses = 0;
    lettersArray = [];
    divcount = 0;
    $('#topRow, #botRow, #wordDisplay').empty();
  }


  //check to see if a letter is correct
  function checkLetter(){
    //currentLetter is placeholder for the id of the letter the user guessed
    currentLetter = this.id;
    $(this).addClass('guessed');
    $(this).removeClass('clickable');

    //check to see whether the user has guessed that letter before
    var guessedFlag = false;
    for (var i = 0; i < guessedLetters.length; i++){
      if (currentLetter === guessedLetters[i]){
        guessedFlag = true;
      }
    }

    //check to see whether the letter is correct
    var correctFlag = false;
    if (guessedFlag === false){
      guessedLetters.push(currentLetter);
      //check and see if letter is correct
      for (var i = 0; i < lettersArray.length; i++){
        if( currentLetter === lettersArray[i]){
          correctFlag = true;
          console.log('The class to write to is .letter' + currentLetter);
          $('.letter' + currentLetter).append('<p class="letter">' + currentLetter + '</p>');
          lettersArray.splice(i,1);
        }
      }
      //if letter is wrong
      if (correctFlag === false){
				functionArray[numWrongGuesses]();
        numWrongGuesses++;
      }

      //win condition
      if(lettersArray.length === 0){
        if(confirm('You win! Play again?')){
          play();
        }
      //loss condition
      } else if (numWrongGuesses === maxGuesses){
        if (confirm('You lose! Play again?')){
          play();
        }
      }
    }
  }



  //runs game at page open
	play();




	function drawHead(){
		ctx.beginPath();
		// ctx.moveTo(230, 100);
		ctx.arc(230, 120, 20, 0, Math.PI*2);
		ctx.stroke();
	}
	function drawBody (){
		ctx.beginPath();
		ctx.moveTo(230,140);
		ctx.lineTo(230, 300);
		ctx.stroke();
	}
	function drawRightLeg (){
		ctx.beginPath();
		ctx.moveTo(230,300);
		ctx.lineTo(260, 420);
		ctx.stroke();
	}
	function drawLeftLeg (){
		ctx.beginPath();
		ctx.moveTo(230,300);
		ctx.lineTo(200, 420);
		ctx.stroke();
	}
	function drawRightArm (){
		ctx.beginPath();
		ctx.moveTo(230,160);
		ctx.lineTo(260, 280);
		ctx.stroke();
	}
	function drawLeftArm (){
		ctx.beginPath();
		ctx.moveTo(230,160);
		ctx.lineTo(200, 280);
		ctx.stroke();
	}
	function drawLeftEye(){
		ctx.fillRect(220, 110, 5, 5);
	}
	function drawRightEye(){
		ctx.fillRect(235, 110, 5, 5);
	}
	function drawNose(){
		ctx.beginPath();
		ctx.moveTo(230, 112);
		ctx.lineTo(225, 122);
		ctx.lineTo(230, 122);
		ctx.stroke();
	}
	function drawFrown(){
		ctx.beginPath();
		ctx.moveTo(220, 135);
		ctx.arc(230, 135, 10, 0, Math.PI, true);
		ctx.stroke();
	}
	var functionArray = [drawHead, drawBody, drawRightLeg, drawLeftLeg, drawRightArm, drawLeftArm, drawLeftEye, drawRightEye, drawNose ,drawFrown];


	// canvas.addEventListener('click', function(event){
	//
	// 	console.dir(event);
	// 	ctx.fillRect(event.offsetX, event.offsetY, 10, 10);
	// 	console.log('hello');
	//
	// 	functionArray[counter]();
	// 	counter++;
	// });

});






// function drawBox(event){
//
// }


//bug-- once play is called again, it regenerates the keyboard, but the keyboard can't be interacted with anymore, possibly because those keys weren't there at page load?
