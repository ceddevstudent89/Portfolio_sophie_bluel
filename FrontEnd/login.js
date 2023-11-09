let url = `http:localhost:5678/api/users/login`; // /user/login

// Json
/* 

{
  "email": "string",
  "password": "string"
}

value
status : 200 / application/json
{
  "userId": 1,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
}

*/

function login() {
  let email = document.getElementById("email").value;
  console.log(email);
  let password = document.getElementById("mdp").value;
  console.log(password);

  let data = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response.status);
      }
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "../FrontEnd/index.html";
    })
    .catch((error) => {
      console.log(error);
    });
}

document.querySelector("#form").addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});
