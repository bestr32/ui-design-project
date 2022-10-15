const API_KEY = 'd6fbdf3cca516a19cb282022dcafde33';
const BASE_LINK = `http://www.last.fm/api/auth/?api_key=${API_KEY}`;

// Fetch artist by query_type (string: e.g. album, artist, etc.), query_subtype (string: e.g. addTags, getInfo, getTopAlbums, etc.), artist_name [optional] (string: name of artist).
// query_type:
// 0: "album"
//     addTags, getInfo, getTags, getTopTags, removeTag, search
// 1: "artist"
//     addTags, getCorrection, getInfo, getSimilar, getTags, getTopAlbums, getTopTags, getTopTracks, removeTag, search
// 2: "chart"
//     getTopArtists, getTopTags, getTopTracks
// 3: "geo"
// 4: "library"
// 5: "tag"
// 6: "track"
const fetch_music = (query_type, query_subtype, artist_name="") => {
	let link = `https://ws.audioscrobbler.com/2.0/?method=${query_type}.${query_subtype}&artist=${artist_name}&api_key=${API_KEY}&format=json`;

	return fetch(link).then((res) => {
		return res.json();
	});
}

const fetch_audio = (track_title) => {
	return fetch(`http://localhost:3000/track?title=${encodeURIComponent(track_title)}`).then((res) => res.json());
};

// Helper function to create elements with less headache and typing.
const create_element = (type, classes, content) => {
	let temp = document.createElement(type);

	if (classes)
		for (let i = 0; i < classes.length; i++)
			temp.classList.add(classes[i]);

	temp.textContent = content;

	return temp;
}
