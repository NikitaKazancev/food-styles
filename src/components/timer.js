import { getData, addZero } from "./functions";

export default function timer() {
	const days = document.querySelector("#days"),
		hours = document.querySelector("#hours"),
		minutes = document.querySelector("#minutes"),
		secs = document.querySelector("#seconds");

	getData("timer-deadline").then((arr) => {
		const deadline = new Date(arr[0], arr[1], arr[2]);

		let interval = setTimeout(updateTimer, 1000);

		function updateTimer() {
			const timer = new Date(deadline - new Date());
			if (timer >= 0) {
				days.textContent = addZero(timer.getUTCDate() - 1);
				hours.textContent = addZero(timer.getUTCHours());
				minutes.textContent = addZero(timer.getUTCMinutes());
				secs.textContent = addZero(timer.getUTCSeconds());
				interval = setTimeout(updateTimer, 1000);
			} else clearTimeout(interval);
		}

		updateTimer();
	});
}
