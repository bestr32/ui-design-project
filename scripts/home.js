// Function in script.js

let music_player = document.querySelector(".music-player");

let music = document.getElementById("audio-player");
let thumbnail = document.getElementById("thumbnail");

window.onload = (event) => {
	fetch_music("chart", "getTopTracks").then((data) => {
		console.log(data);
		get_music_list(data);

		const event = new CustomEvent("my-event", { detail: data });
		document.querySelector(".music-player").dispatchEvent(event);
	});
};

document.getElementById("search-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let track_details_yt = {};

	fetch(`http://localhost:3000/track?title=${e.target[0].value}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			for (const video of data) {
				console.log(video);

				const video_data_div = create_element("div", ["video-card"]);
				const video_title = create_element("h2", ["video-title"], video.title);
				const video_duration = create_element(
					"p",
					["video-duration"],
					video.duration_raw
				);

				const video_thumbnail = create_element("img", ["video-thumbnail"]);
				video_thumbnail.src = video.snippet.thumbnails.url;

				for (const video_data of [video_title, video_duration, video_thumbnail])
					video_data_div.appendChild(video_data);

				const link_wrapper = create_element("a", ["link-wrapper"]);
				link_wrapper.href = `http://localhost:3000/audio?id=${video.id.videoId}&title=${video.title}`;

				link_wrapper.addEventListener("click", (e) => {
					e.preventDefault();

					music.setAttribute(
						"src",
						`http://localhost:3000/audio?id=${video.id.videoId}&title=${video.title}`
					);
					document.getElementById("title-track").textContent = video.title;
					thumbnail.setAttribute(
						"src",
						`${video.snippet.thumbnails.default.url}`
					);
				});

				link_wrapper.appendChild(video_data_div);

				document
					.getElementById("video-search-results")
					.appendChild(link_wrapper);
			}
		});

	// fetch_audio(e.target[0].value).then((data) => {
	// 	console.log(data);

	// });

	e.target.reset();
});
