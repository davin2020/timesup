// Code courtesy of Craig Francis - https://github.com/craigfrancis

;(function(document, window, undefined) {

	'use strict';

	var end_icon_node,
		output_node,
		time_node,
		repeat_node,
		start_node,
		stop_node,
		interval_id,
		timer_value,
		timer_remaining,
		timer_repeat,
		audio_ref;

	if (!document.addEventListener || !document.querySelector) {
		return;
	}

	function interval_stop() {
		if (interval_id) {
			clearInterval(interval_id);
			interval_id = null;
		}
	}

	function interval_start() {
		if (interval_id) {
			interval_stop();
		}
		timer_value = Math.round(time_node.value * 60);
		timer_repeat = Math.round(repeat_node.value);
		start_timer();
	}

	function start_timer() {
		if (timer_repeat > 0) {
			timer_repeat -= 1;
			timer_remaining = timer_value;

			update_display();
			interval_id = setInterval(update_display, 1000);
		}
	}

	function update_display() {
		var output_minutes = Math.floor(timer_remaining / 60),
			output_seconds = (timer_remaining - (output_minutes * 60)),
			output_text;

		output_text = output_minutes.toString().padStart(2, '0');
		output_text += ':';
		output_text += output_seconds.toString().padStart(2, '0');

		if (timer_repeat > 0) {
			// output_text += ' (' + timer_repeat + ')'; // show repeat amount for debugging
			console.log("timer_repeat: " + timer_repeat)
		}

		output_node.textContent = output_text;
		end_icon_node.textContent = " ";

		if (timer_remaining > 0) {
			timer_remaining -= 1;
		} 
		else {
			interval_stop();
			audio_ref.play();
			end_icon_node.textContent = '⏰';
		}
	}

	function alarm_audio_end() {
		start_timer();
	}

	function init() {
		audio_ref = new Audio('sounds/soft-gong-sound-effect.mp3');
		audio_ref.addEventListener('ended', alarm_audio_end);

		output_node = document.getElementById('js-output');
		time_node = document.getElementById('js-time');
		repeat_node = document.getElementById('js-repeat');
		start_node = document.getElementById('js-start');
		stop_node = document.getElementById('js-stop');
		end_icon_node = document.getElementById('js-end-icon');
		

		if (output_node && time_node && repeat_node && start_node && stop_node) {
			start_node.addEventListener('click', interval_start);
			stop_node.addEventListener('click', interval_stop);
		}
	}

	if (document.readyState !== 'loading') {
		window.setTimeout(init); // Handle asynchronously
	} 
	else {
		document.addEventListener('DOMContentLoaded', init);
	}

})(document, window);
