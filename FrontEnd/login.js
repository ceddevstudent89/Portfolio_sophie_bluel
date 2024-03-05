const disconnected = document.querySelector(".disconnected");
loggingOutOfTheAdminPage();

function loggingOutOfTheAdminPage() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    const p = document.createElement("p");
    p.innerHTML = "<br>Déconnexion. Veuillez saisir les champs ci-dessous";
    p.setAttribute("style", "color: #f75252");
    p.classList.add("deconnection-msg");
    disconnected.appendChild(p);
    return;
  }
}

const validateIcons = document.querySelectorAll(".icone-verif");
const validateTests = document.querySelectorAll(".error-msg");

function showValidation({ index, validation }) {
  if (validation) {
    validateIcons[index].style.display = "inline";
    validateIcons[index].src = "assets/icons/check.svg";
    if (validateTests[index]) validateTests[index].style.display = "none";
  } else {
    validateIcons[index].style.display = "block";
    validateIcons[index].src = "assets/icons/error.svg";
    if (validateTests[index]) validateTests[index].style.display = "block";
  }
}

const mailInput = document.querySelector(".input-group:nth-child(1) input");

mailInput.addEventListener("blur", mailValidation);
mailInput.addEventListener("input", mailValidation);

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
function mailValidation() {
  // Vérification de l'email si l'email est conforme au regex === true
  if (regexEmail.test(mailInput.value)) {
    showValidation({
      index: 0,
      validation: true,
    });
  } else {
    showValidation({
      index: 0,
      validation: false,
    });
  }
}

const pswdInput = document.querySelector(".input-group:nth-child(2) input");

// la fonction passwordValidation() sera appelée, lorsque cet élément perd le focus.(blur)
pswdInput.addEventListener("blur", passwordValidation);
pswdInput.addEventListener("input", passwordValidation);

const passwordVerification = {
  length: false,
  number: false,
};

const regexList = {
  number: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@#?!@$%^&*-]{6,}$/,
};

let passwordValue;

function passwordValidation(event) {
  // Vérification du mot de passe
  const validateMdp = document.querySelector(".validate-mdp");
  passwordValue = pswdInput.value;
  // console.log(passwordValue);

  let validationResult = 0;
  for (const prop in passwordVerification) {
    // Si la longueur du mot de passe est inférieur à 6 caractères = false
    if (prop === "length") {
      if (passwordValue.length < 6) {
        passwordVerification.length = false;
      } else if (passwordValue === "S0phie") {
        passwordVerification.length = true;
        validationResult++;
      }
      continue;
    }

    // console.log(validateMdp);
    if (regexList[prop].test(passwordValue)) {
      passwordVerification[prop] = true;
      validationResult++;
    } else {
      passwordVerification[prop] = false;
    }
  }
  // Si validationResult === 2 validation = true
  validationResult !== 2
    ? showValidation({ index: 1, validation: false })
    : showValidation({ index: 1, validation: true });
}

// Création de la fonction de connexion
async function login() {
  // récupération des valeurs du formulaire
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

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

// Évènement submit du formulaire qui appelle la fonction login
const btnSubmit = document.querySelector('button[type="submit"]');
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  login();
});
