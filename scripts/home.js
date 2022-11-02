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

let search_results_div = document.getElementById("video-search-results");

document.getElementById("search-form").addEventListener("submit", (e) => {
	e.preventDefault();

	let track_details_yt = {};

	fetch(`http://localhost:3000/track?title=${e.target[0].value}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			search_results_div.textContent = "";

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

				link_wrapper.addEventListener("click", async function (e) {
					e.preventDefault();

					const audio = await fetch(
						`http://localhost:3000/audio?id=${video.id.videoId}&title=${video.title}`,
						{ headers: { "Accept-Ranges": "bytes" } }
					);

					const blob = await audio.blob();

					if (blob) music.setAttribute("src", URL.createObjectURL(blob));

					// music.setAttribute(
					// 	"src",
					// 	`http://localhost:3000/audio?id=${video.id.videoId}&title=${video.title}`
					// );

					document.getElementById("title-track").textContent = video.title;

					music.onloadedmetadata = function () {
						document
							.getElementById("progress-bar")
							.addEventListener("click", (e) => {
								let rect = e.target.getBoundingClientRect();
								let x = e.clientX - rect.left;
								let length =
									document.getElementById("progress-bar").offsetWidth;

								console.log(x);

								document.getElementById("progress-line").style.width = `${
									(x / length) * 100
								}%`;

								console.log("Pressed:", (x / length) * music.duration);
								console.log("Full duration:", music.duration);

								music.currentTime = (x / length) * music.duration;
							});

						music.ontimeupdate = function () {
							document.getElementById("progress-line").style.width = `${
								(music.currentTime / music.duration) * 100
							}%`;

							document.getElementById(
								"title-duration-info"
							).textContent = `${convert_time(
								music.currentTime
							)} / ${convert_time(music.duration)}`;
						};
					};
				});

				link_wrapper.appendChild(video_data_div);

				document
					.getElementById("video-search-results")
					.appendChild(link_wrapper);
			}
		});

	e.target.reset();
});
