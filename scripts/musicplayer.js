let music_list = {};

const get_music_list = (info) => {
	music_list = info;
};

const print_info = () => {};

const playing_icon = document.querySelector(".playing");
const paused_icons = document.querySelectorAll(".paused");

document.querySelector(".music-player").addEventListener("my-event", (e) => {
	music_list = e.detail;
});

const display_is_playing = () => {
	playing_icon.style.display = "inline";
	paused_icons.forEach((line) => {
		line.style.display = "none";
	});
};

const display_is_pausing = () => {
	playing_icon.style.display = "none";
	paused_icons.forEach((line) => {
		line.style.display = "inline";
	});
};

document.getElementById("play-button").addEventListener("click", () => {
	if (music.duration > 0 && !music.paused) {
		music.pause();

		display_is_playing();
	} else {
		music.play();

		display_is_pausing();
	}
});
