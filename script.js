const API_KEY = 'd6fbdf3cca516a19cb282022dcafde33';
const BASE_LINK = `http://www.last.fm/api/auth/?api_key=${API_KEY}`;

const test = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Alice+in+Chains&api_key=${API_KEY}&format=json`

const fetch_artist = (artist_name) => {
  let link = `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist_name}&api_key=${API_KEY}&format=json`;

	return fetch(link).then((res) => {
		return res.json();
	});
}

// fetch(test).then((res) => {
// 	return res.json();
// }).then((data) => {
// 	console.log(data);

// 	let important_data = {
// 		name: data.artist.name,
// 		full_bio: data.artist.bio.content, 
// 		short_bio: data.artist.bio.summary, 
// 		genres: [...data.artist.tags.tag]
// 	};

// 	// document.getElementById('artist-name').textContent = important_data.name;
// 	// document.getElementById('test').textContent = important_data.short_bio;

// 	// important_data.genres.forEach((genre) => {
// 	// 	let gn = create_element('div', ['genre'], genre.name);

// 	// 	document.getElementById('genres').appendChild(gn);
// 	// });
// });

// Testing new function
fetch_artist("Starset").then((data) => {
	console.log(data);
})

// Helper function to create elements with less headache and typing.
const create_element = (type, classes, content) => {
	let temp = document.createElement(type);

	if (classes)
		for (let i = 0; i < classes.length; i++)
			temp.classList.add(classes[i]);

	temp.textContent = content;

	return temp;
}
