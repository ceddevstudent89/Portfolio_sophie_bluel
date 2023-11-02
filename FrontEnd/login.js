const Form = document.getElementById("form");
const connect = document.getElementById("connect");
const email = document.getElementById("email");
const password = document.getElementById("mdp");

connect.addEventListener("click", (event) => {
  document.getElementById("password").select();
});

// Récupère le mail et le password
Form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const bodyJson = JSON.stringify({
    email: email.value,
    password: password.value,
  });

  const login = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJson,
  });

  const dataLogin = await login.json();
  console.log(dataLogin);

  if (dataLogin.token === null) {
    alert("User " + login.statusText);
  } else {
    window.sessionStorage.setItem("token", dataLogin.token);
    window.location.href = "./index.html";
  }
});
