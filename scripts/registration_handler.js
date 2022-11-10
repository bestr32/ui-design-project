let register_form = document.getElementById("register-form");

register_form.addEventListener("submit", (e) => {
	e.preventDefault();

	let user_name = e.target[0].value;
	let email = e.target[1].value;
	let temp_pw = e.target[2].value;
	let password = e.target[3].value;

	if (temp_pw == password) {
		fetch("http://localhost:3000/users/create-user", {
			method: "POST",

			body: JSON.stringify({
				user_name,
				email,
				password,
			}),

			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((res) => res.json())
			.then((data) => console.log(data));
	}

	register_form.blur();
	e.target.reset();
});
