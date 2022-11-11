const login_form = document.getElementById("login-form");

login_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let user_name = e.target[0].value;
  let password = e.target[1].value;

  if (!user_name || !password) {
    let msg = "Please enter both fields";
    console.log(msg);

    return;
  }

  fetch("http://localhost:3000/users/login", {
    method: "POST",

    body: JSON.stringify({
      user_name,
      password,
    }),

    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },

    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
});
