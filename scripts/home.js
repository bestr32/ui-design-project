// Function in script.js

let music_player = document.querySelector('.music-player');

let music = document.getElementById('audio-player');
let thumbnail = document.getElementById('thumbnail');

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

	let track_details_yt = {};

	fetch(`http://localhost:3000/track?title=${e.target[0].value}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

	    music.setAttribute('src', `http://localhost:3000/audio?id=${data.id.videoId}&title=${data.title}`);
			document.getElementById('title-track').textContent = data.title;
			thumbnail.setAttribute('src', `${data.snippet.thumbnails.default.url}`);
	});


	// fetch_audio(e.target[0].value).then((data) => {
	// 	console.log(data);


	// });

	e.target.reset();

});
