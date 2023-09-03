
const SOFT_GONG = 'sounds/soft-gong-sound-effect.mp3';
const DEEP_GONG = 'sounds/deep-gong-hit-sound-effect.mp3';
const PING = 'sounds/ping-sound-effect.mp3';


function addTimerX() {
	console.log("addTimerX()");
	// let newTask = document.getElementById("newTask");
	// let newTaskText = newTask.value;

	let newTimeValue = document.getElementById("newTime").value;
	let newFrequencyValue = document.getElementById("newFrequency").value;
	let timeAmount = newTimeValue * 1000;
	let repeatFreqSeconds = newFrequencyValue * 1000;
	console.log(newTimeValue);
	console.log(newFrequencyValue);
	console.log('timeAmount ' + timeAmount);
	console.log('repeatFreqSeconds ' + repeatFreqSeconds);
	let mSecondsToRunFor = timeAmount * newFrequencyValue ; // eg 5000 x 3 - x60 turn into minutes
	let mSecondsToRunForMinusOne = timeAmount * (newFrequencyValue -1) ; // eg 5000 x 3 - x60 turn into minutes
	console.log('mSecondsToRunFor ' + mSecondsToRunFor);
	console.log('mSecondsToRunForMinusOne ' + mSecondsToRunForMinusOne);

	let MinutesToRunFor = timeAmount * newFrequencyValue * 60; // eg 5000 x 3 - x60 turn into minutes
	let MinutesToRunForMinusOne = timeAmount * (newFrequencyValue -1) * 60 ; // eg 5000 x 3 - x60 turn into minutes
	console.log('MinutesToRunFor x60 ' + MinutesToRunFor);
	console.log('MinutesToRunForMinusOne x60 ' + MinutesToRunForMinusOne);

		//sat - another option  - totally not working, keeps on going and keeps on sounded alarm noise
		//pp.textContent = newTimeValue;
			// setTimeout(playSound, timeAmount, SOFT_GONG);
			// setInterval(countDown, count, SOFT_GONG);
		//setInterval(countDown, newTimeValue);

	let maxLoops = newFrequencyValue > 0 ? newFrequencyValue : 1;
	console.log('maxLoops: ' + maxLoops);
	// for (let i = 1; i <= maxLoops; i++) { 
	// 	console.log('loop i' + i);
	// 	//this makes them all play at the same time!
	// 	// how to combine starting the timer (adn rendering it on the webpage) and playing the sound, into 1 function call
	// 	// sat - this works, but tryin to refactor
	// 	finishSound = SOFT_GONG;
	// 	startTimer(newTimeValue, finishSound);
	// }

	//sat - another way of repeating stuff - new timer starts BEFORE old one has finished, need to pause btwen
	finishSound = SOFT_GONG;
	//this works ok and counts down from newTimeValue seconds, and repeats after 5secs, 
	// BUT thers is now a 5sec delay BEFORE the first call/execution - run 5 times, repeat every 5 secs
	// and the delay becomes 30secs if u want a 30 sec timer !!
	//start one timer straight away, since timerId has a delay of timeAmount BEFORE it will start
	//startTimer(newTimeValue, finishSound);

	//try and start timer with minute value not seconds value
	let minutesTimeValue = newTimeValue * 60;
	startTimer(minutesTimeValue, finishSound);



	let newTimeValueMinusOne = newTimeValue - 1;
	let timeAmountMinusOne = timeAmount - 1000;
	console.log('newTimeValueMinusOne ' + newTimeValueMinusOne);
	console.log('timeAmountMinusOne ' + timeAmountMinusOne);

	let timerId = setInterval(() => startTimer(newTimeValueMinusOne, finishSound), timeAmountMinusOne);
	// this is BAD as it repeasts every 3 seconds!
	// let timerId = setInterval(() => startTimer(newTimeValue, finishSound), repeatFreqSeconds);
	// after 15 seconds stop ie 5secs x 3 lots = seems to be out of sync w countdowm timer itself 
	setTimeout(() => { 
		clearInterval(timerId); console.log('stop clearInterval'); 
	}, mSecondsToRunForMinusOne);


	// how to combine starting the timer (adn rendering it on the webpage) and playing the sound, into 1 function call
	// sat - this works, but tryin to refactor
	//finishSound = SOFT_GONG;
	//startTimer(newTimeValue, finishSound);
	

	// setTimeout(playSound(SOFT_GONG), timeAmount);
	// setTimeout(playSound2, timeAmount);
	
	// this is correct format for passing arg of SOFT_GONG to playSound(), after waiting for timeAmount seconds
	// dont need to call this here as setInterval updates dom every second, and once finished can play a sound!
	//setTimeout(playSound, timeAmount, SOFT_GONG);

	// setTimeout();
	// playSound(DEEP_GONG);
	// playSound(SOFT_GONG);
	console.log("stopped function addTimerX()");
}

function startTimer3() {
	console.log("startTimer3");
}

// function playSound2() {
// 	console.log("playSound PING");
// 	let beat = new Audio(PING);
// 	// Play the beat
// 	beat.play();
// }

function playSound(soundFile) {
	console.log("playSound()");
	let beat = new Audio(soundFile);
	// Play the beat
	beat.play();

	// Pause/stop the beat
	// beat.pause();

	// Reload the beat (back to the start)
	// beat.load();
}

//whyis this being executed straight away, instead of when the button is clicked

// setTimeout(function(){
//     console.log("setTimeout Hello World");
//     playSound(SOFT_GONG);
//     console.log("... just played the sound");
// }, 2000);


document.querySelector('button').addEventListener('click', function() {
  var context = new AudioContext();
  // Setup all nodes
  // ...
  let state = context.state;
  console.log("state: " + state)
  context.resume();
  console.log("state: " + state)
});


// Now you may be thinking, "why not just pass the parameters directly to the function?"

// This is because if you pass the parameters directly like this:

// setTimeout(greeting("Nathan", "Software developer"), 3000);
// Then JavaScript will immediately execute the function without waiting, 
// because you're passing a function call and not a function reference as the first parameter.


// TIMER APP CODE - https://gomakethings.com/how-to-play-a-sound-with-javascript/

// Get the #app element
let app = document.querySelector('#app');

// Track the count
// let count = 5;


//refactor as coutndown method - totaly not working
function countDown(count) {
	console.log("countDown");
	// app.textContent = count;
	count--;

	// Update the UI
	if (count > 0) {
		app.textContent = count;
	} else {
		app.textContent = '⏰';
		clearInterval(countDown);
		playSound(PING);
		console.log('played countdown ping sound');
	}

}



// this function works wel lenough for now - count is really the number of seconds to run for eg 120 seconds, but i dont want to display ita s such!
function startTimer(count, sound) {
	console.log("startTimer(), count aka newTimeValueMinusOne " + count + ", sound " + sound);
	// console.log("newTimeValueMinusOne: " + newTimeValueMinusOne);

	app.textContent = count;

	// Run a callback function once every second, to update the count down timer by 1 second
	let timer = setInterval(function () {

		// Reduce count by 1
		count--;

		// Update the UI
		if (count > 0) {
			app.textContent = count;
			console.log("countdown: " + count)

			//new counter to render w mins & secs -  code stolen from here - https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
			// let minutes = count % 60;
			// maybe this doesnt have to be calculated every time??
			//this DOES work but isnt pretty
			var divisor_for_minutes = count % (60 * 60);
    		var minutes = Math.floor(divisor_for_minutes / 60);

    		var divisor_for_seconds = divisor_for_minutes % 60;
    		var seconds = Math.ceil(divisor_for_seconds);

			console.log("new minutes: " + minutes)
			// let seconds = count;
			document.getElementById("currentMins").innerHTML = minutes + "m " 
			document.getElementById("CurrentSecs").innerHTML = seconds + "s"
			
			
		} else {
			app.textContent = '⏰';
			clearInterval(timer);
			playSound(sound);
			console.log('played THE sound');
		}

	}, 1000);
	// playSound(PING);
}




//  new stuff abotu timesr is above here







let taskArray = [
]

function showExistingTaskList() {
	// if u DONT put quotes around the printed string  below, it wil literally print out the whole function!
	// console.log("showExistingTaskList");
	taskListString = "";
	for (let index = 0; index < taskArray.length; index++) {
		let nameId = 'getTask' + index;
		// taskListString += `<li name="${nameId}" id="${nameId}" >${taskArray[index]} </li>` ; 
		taskListString += `<li>${taskArray[index]}</li>` ; 
	}
	// console.log(taskListString);
	updateElementWithContent("taskList", taskListString);
}



function printTasks() {
	document.querySelector('#addTaskButton').disabled = true;
	let str =""
	// console.log("everyday im shuffling...")
	// console.log(taskArray.length);
	// 14 really gives us 15 square
	while (taskArray.length <= 14) {
		taskArray.push("[empty]");
	}
	shuffle(taskArray);
	for (let index = 0; index < taskArray.length; index++) {
			// console.log("..printTask")
		    // console.log(taskArray[index]);
		    let nameId = 'getTask' + index;
		    //should they say 'Blank'? could show index here, but hard to match on it to then show task text
		    str += `<button class="button_task" name="${nameId}" id="${nameId}" >?</button>` ; 
	}

	// cant update both sets as ids are unique and likely only first matching one is returned!
	// updateElementWithContent("allTasks", str)
	updateElementWithContent("allTasks2", str)
	//aboev sets value of string, only then can i add listeners!
	addListeners();
	//enable the add button again, but dont we want to stop ppl adding tasks?
	// document.querySelector('#addTaskButton').disabled = false;
}

// i dont want to hide the buttons, iwant to hide the words 
function addListeners() {
	for (let index = 0; index < taskArray.length; index++) {
		let nameId = 'getTask' + index;
		let item = document.getElementById(nameId);
		// print(item) - this turns on browsers printing feature
		item.addEventListener("click", function() {
			console.log('added listener - task  name id ');
			// on first click, show task text
			console.log("item.textContent " + item.textContent);
			if (item.textContent == "?") {
				// fyi adding content to empty-string button makes whole button  MOVE, so empty button has ? isntead
				item.textContent = taskArray[index];
				item.style.backgroundColor ="orange";
			}
			//otherwsie mark task as done using green color
			else {
				item.style.backgroundColor ="green";
			}

		});
	}
}


//  this is better but page keep on refreshing! adn x doesnt have value
// if input field is empty, dont add item to array
function addNewTask() {
	// console.log("addNewTask");
	let newTask = document.getElementById("newTask");
	// console.log(newTask);
	let newTaskText = newTask.value;
	if (newTaskText.length == 0) {
		window.alert("Looks like you're trying to enter an empty task...");
	}
	else {
		// console.log('ADD...found new task ' + newTaskText);
		taskArray.push(newTaskText)
		showExistingTaskList();
		newTask.value = "";
		// dont  let user add more than 15 tasks, so they can all fit in grid
		if (taskArray.length >= 15) {
			// refactor - use querySelector instead of getElementById
			document.querySelector('#addTaskButton').disabled = true;
		}
	}
}


// stole shuffling array from here - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
// why doenst JS have built in shuffle function?
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function updateElementWithContent(element, content) {
	document.getElementById(element).innerHTML = content;
}

