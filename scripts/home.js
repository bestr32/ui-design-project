// Function in script.js


window.onload = (event) => {
	fetch_music("chart", "getTopTracks").then((data) => {
		console.log(data);
		get_music_list(data);

		const event = new CustomEvent("my-event", { detail: data});
		document.querySelector(".music-player").dispatchEvent(event);
	});
}

