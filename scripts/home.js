// Function in script.js


window.onload = (event) => {
	fetch_music("chart", "getTopTracks").then((data) => {
		console.log(data);
		get_music_list(data);

		const event = new CustomEvent("my-event", { detail: data});
		document.querySelector(".music-player").dispatchEvent(event);
	});
}

document.getElementById('search-form').addEventListener('submit', (e) => {
	e.preventDefault();

	fetch_audio(e.target[0].value).then((data) => {
		console.log(data);
	});

	e.target.reset();

});
