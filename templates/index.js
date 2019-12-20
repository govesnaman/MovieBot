var lastSentMessage = "";
var lastRecievedMessage = 1;
var ButtonClicked = false;
var DEFAULT_TIME_DELAY = 2000;
var context = {};
var type = 'text';
var msg = 'hello';

// Variable for the chatlogs div
var $chatlogs = $('.chatlogs');
	

$('document').ready(function(){
	send();
	// Hide the switch input type button initially
	$("#switchInputType").toggle();

	// If the switch input type button is pressed
	$("#switchInputType").click(function(event) {

		// Toggle which input type is shown
		/*if($('.buttonResponse').is(":visible")) {
			$("#switchInputType").attr("src", "Images/multipleChoice.png");
		}

		else {
			$("#switchInputType").attr("src", "Images/keyboard.png");
		}*/
		/*$('textarea').toggle();
		$('.buttonResponse').toggle();*/

	});
	//----------------------User Sends Message Methods--------------------------------//
	// Method which executes once the enter key on the keyboard is pressed
	// Primary function sends the text which the user typed
	$("textarea").keypress(function(event) {
		
		// If the enter key is pressed

		if(event.which === 13) {

			// Ignore the default function of the enter key(Dont go to a new line)
			event.preventDefault();

			ButtonClicked = false;

			// Call the method for sending a message, pass in the text from the user
			msg = this.value;
			send(this.value);
			
			// reset the size of the text area
			$(".input").attr("rows", "1");

			// Clear the text area
			this.value = "";
			this.placeholder = "Message";

			if($("#switchInputType").is(":visible")) {
				$("#switchInputType").toggle();
				$('.buttonResponse').remove();
			}

		}
	});

})


// Method which takes the users text and sends an AJAX post request to API.AI
// Creates a new Div with the users text, and recieves a response message from API.AI
var context;

function savecontext(text){
	context = text;
}

function send(text) {
	
	// Create a div with the text that the user typed in
	if(text){
	$chatlogs.append(
        $('<div/>', {'class': 'chat self'}).append(
            $('<p/>', {'class': 'chat-message', 'text': text})));
}

	baseUrl = 'http://localhost:5000/api'
		/*$.ajax({
			type: "POST",
			url: baseUrl ,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({ moviename:msg, context: context, type: type}),
			success: function(data) 
				{
			    	console.log(data);

				},
			error: function()
					{
					newRecievedMessage("Internal Server Error","neutral");
					}
			});*/
		$.ajax({
			type: "POST",
			url: baseUrl ,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: JSON.stringify({ moviename: msg, type: type}),
			success: function(data) 
				{
			    	//console.log(data);
					//savecontext(JSON.stringify(data.context,undefined,2));
						if(data.type == 'movie')
						{
							type = 'movie';
						}
						else if(data.type == 'text')
							type  = 'text';
						else
							type = 'text';

						m = data.name1
						//n = data.sentiment_user
						//o = data.sentiment_bot
						console.log(data)
						
					
						

						if(data.type == 'movie1')
						{	m = m.join('<br/>');
							newRecievedMessage(m);
							siframe = document.getElementById("siframe");
							siframe.contentWindow.postMessage(data.name1, '*');
						}
						else
							newRecievedMessage(m);

				},
			error: function()
					{
					newRecievedMessage("My servers are currently sleeping");
					}
			});

		
	
}


//----------------------User Receives Message Methods--------------------------------//




// Method called whenver there is a new recieved message
// This message comes from the AJAX request sent to API.AI
// This method tells which type of message is to be sent
// Splits between the button messages, multi messages and single message
function newRecievedMessage(messageText) {
	

		showLoading();

		// After 3 seconds call the createNewMessage function
		setTimeout(function() {
			createNewMessage(messageText);
		}, DEFAULT_TIME_DELAY);
	//}


}



function createNewMessage(message) {

	// Hide the typing indicator
	
	hideLoading();

	// take the message and say it back to the user.
	//speechResponse(message);

	// // Show the send button and the text area
	// $('#rec').css('visibility', 'visible');
	// $('textarea').css('visibility', 'visible');

	// Append a new div to the chatlogs body, with an image and the text from API.AI
	$chatlogs.append(
		$('<div/>', {'class': 'chat friend'}).append(
			$('<div/>', {'class': 'user-photo'}).append($('<img src="Images/ana.JPG" />')), 
			$('<p/>', {'class': 'chat-message'}).attr(("data-toggle"),"tooltip").append(message)));

	//$('.self').last().attr(("title"),usr); .attr(("title"),bot)

	
		/*console.log(message)*/
	// Find the last message  in the chatlogs
	var $newMessage = $(".chatlogs .chat").last();

	// Call the method to see if the message is visible
	checkVisibility($newMessage);
}


function showLoading()
{
	$chatlogs.append($('#loadingGif'));
	$("#loadingGif").show();

	// $('#rec').css('visibility', 'hidden');
	// $('textarea').css('visibility', 'hidden');

	//$('.chat-form').css(''visibility', 'hidden'');
 }



// Function which hides the typing indicator
function hideLoading()
{
	$('.chat-form').css('visibility', 'visible');
	$("#loadingGif").hide();

	// Clear the text area of text
	//$(".input").val("");

	// reset the size of the text area
	$(".input").attr("rows", "1");
	
}

// Method which checks to see if a message is in visible
function checkVisibility(message)
{
	// Scroll the view down a certain amount
	$chatlogs.stop().animate({scrollTop: $chatlogs[0].scrollHeight});
}


//----------------------Voice Message Methods--------------------------------//
//Voice stuff
/*var recognition;

function startRecognition() {

    console.log("Start")
	recognition = new webkitSpeechRecognition();

	recognition.onstart = function(event) {

        console.log("Update");
		updateRec();
	};
	
	recognition.onresult = function(event) {
	
		var text = "";
	
		for (var i = event.resultIndex; i < event.results.length; ++i) {
			text += event.results[i][0].transcript;
		}
	
		setInput(text);
		stopRecognition();
	
	};
	
	recognition.onend = function() {
		stopRecognition();
	};
	
	recognition.lang = "en-US";
	recognition.start();

}



function stopRecognition() {
	if (recognition) {
        console.log("Stop Recog");
		recognition.stop();
		recognition = null;
	}
	updateRec();
}



function switchRecognition() {
	if (recognition) {
        console.log(" Stop if");
		stopRecognition();
	} else {
		startRecognition();
	}
}
*/

/*function setInput(text) {
	$(".input").val(text);
	
    send(text);
	
    $(".input").val("");
    
}
*/
/*
function updateRec() {
	

	if (recognition) {
		$("#rec").attr("src", "Images/MicrophoneOff.png");
	} else {
		$("#rec").attr("src", "Images/microphone.png");

	}
}

function speechResponse(message)
{

	var msg = new SpeechSynthesisUtterance();

	// These lines list all of the voices which can be used in speechSynthesis
	//var voices = speechSynthesis.getVoices();
	//console.log(voices);
	
	
	msg.default = false;
 	msg.voiceURI = "Fiona";
	msg.name = "Fiona";
	msg.localService = true;
  	msg.text = message;
  	msg.lang = "en";
	msg.rate = .9;
	msg.volume = 1;
  	window.speechSynthesis.speak(msg);

}*/

$(document)
    .one('focus.input', 'textarea.input', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.input', 'textarea.input', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
	});
	
