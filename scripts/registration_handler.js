let register_form = document.getElementById("register-form");

const generate_error = (error_element, message) => {
	error_element.textContent = message;

	register_form.appendChild(error_element);
};

register_form.addEventListener("submit", (e) => {
	e.preventDefault();

	let user_name = e.target[0].value;
	let email = e.target[1].value;
	let temp_pw = e.target[2].value;
	let password = e.target[3].value;

	let error_msg = create_element("div", ["error-msg"], "");
	error_msg.style.color = "red";

	if (temp_pw != password) {
		generate_error(error_msg, "The two passwords must match");

		return;
	}

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
		.then((data) => {
			console.log(data);
			if (data.status == 403) {
				generate_error(error_msg, data.message);
			}

			return;
		});

	register_form.blur();
	e.target.reset();
});
