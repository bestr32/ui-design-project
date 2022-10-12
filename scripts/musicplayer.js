let music_list = {};

const get_music_list = (info) => {
	music_list = info;
}

const print_info = () => {

}

document.querySelector(".music-player").addEventListener('my-event', (e) => {
	music_list = e.detail;
});
