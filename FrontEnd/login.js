const disconnected = document.querySelector(".disconnected");
const emailError = document.querySelector(".email__error");
const mdpError = document.querySelector(".mdp__error");

// Si l'utilisateur est déjà connecté, on supprime le token

loggingOutOfTheAdminPage();

function loggingOutOfTheAdminPage() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");

    const p = document.createElement("p");
    p.innerHTML = "<br>Déconnexion. Veuillez saisir les champs ci-dessous";
    p.setAttribute("style", "color: red");
    disconnected.appendChild(p);
    return;
  }
}

function validateEmail(email) {
  let emailRegExp = new RegExp(
    "[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-z0-9._-]+"
  );
  if (!emailRegExp.test(email)) {
    const p = document.createElement("p");
    p.innerHTML = "Veuillez entrer une addresse mail valide";
    emailError.appendChild(p);
    emailError.setAttribute("style", "color: red");
    throw new Error("Erreur, Veuillez entrer une adresse mail valide");
  }
}

function validateMdp(mdp) {
  let emailRegExp = new RegExp("[a-zA-Z0-9]+");
  if (!emailRegExp || mdp.length < 5) {
    const p = document.createElement("p");
    p.innerHTML = "Veuillez entrer un mot de passe valide";
    mdpError.appendChild(p);
    mdpError.setAttribute("style", "color: red");
    throw new Error("Erreur, Veuillez entrer un mot de passe valide");
  }
}

// Création de la fonction de connexion
async function login() {
  // récupération des valeurs du formulaire
  let email = document.getElementById("email").value;
  let password = document.getElementById("mdp").value;

  validateEmail(email);
  validateMdp(password);

  let data = {
    email: email,
    password: password,
  };

  // Appel de la fonction fetch qui contient les infos pour la connexion
  await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // Vérification de la réponse
      if (response.ok) {
        return response.json();
      } else {
        // Si erreur elle est rejetée et indique le status de l'erreur
        return Promise.reject(response.status);
      }
    })
    .then((data) => {
      console.log(data);
      // stokage du token dans le local Storage
      localStorage.setItem("token", data.token);
      // Redirection vers la page d'acceuil
      if (localStorage.getItem("token")) {
        window.location.href = "index.html";
      }
    })
    // Si erreur dans le code
    .catch((error) => {
      console.log(error.message);
    });
}

document.querySelector("#form").addEventListener("submit", function (event) {
  event.preventDefault();
  login();
});
