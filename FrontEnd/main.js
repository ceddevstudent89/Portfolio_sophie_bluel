//  Récupération des projets de Sophie Bluel
const projets = await fetch("http://localhost:5678/api/works")
  .then((projets) => {
    return projets.json();
  })
  .catch((error) => {
    console.log(error);
  });

let token = localStorage.getItem("token");
const darkBar = document.getElementById("darkBar");
const divFilters = document.querySelector(".btns-filtres");
const iconEl = document.querySelector(".portfolio__icon");
const logoutEl = document.querySelector(".login-logout a");

if (token) {
  darkBar.style.display = "block";
  divFilters.style.display = "none";
  iconEl.style.display = "block";
  logoutEl.textContent = "logout";
} else {
  darkBar.style.display = "none";
  divFilters.style.display = "block";
  iconEl.style.display = "none";
  logoutEl.textContent = "login";
}

// Fonction qui génère toute la page web
function genererProjets(projets) {
  // Afficher touts les projets avec la boucle for
  for (let i = 0; i < projets.length; i++) {
    // Création des éléments
    const carteProjet = projets[i];
    const figureElementParentCarte = document.createElement("figure");
    const imageElement = document.createElement("img");
    imageElement.src = carteProjet.imageUrl;
    const figcaptionElement = document.createElement("figcaption");
    figcaptionElement.innerText = carteProjet.title;

    figureElementParentCarte.appendChild(imageElement);
    figureElementParentCarte.appendChild(figcaptionElement);

    // Recupération de la classe gallery
    const divGallerie = document.querySelector(".gallery");
    divGallerie?.appendChild(figureElementParentCarte);
  }
}
// Premier affichage de la page
genererProjets(projets);

// Gestion de la classe active des boutons filtres
const btnsFiltres = document.querySelectorAll(".filtre__btn");
for (let i = 0; i < btnsFiltres.length; i++) {
  btnsFiltres[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");
    // console.log(current);
    current[0].className = current[0].className.replace("active", "");
    this.className += " active";
  });
}

function regenerationPage(objets) {
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(objets);
}

function fitresObjets(id) {
  const objetsFiltres = projets.filter(function (objet) {
    return objet.categoryId === id;
  });
  regenerationPage(objetsFiltres);
}
// Filtrer les différentes catégories
const boutonAfficherTous = document.querySelector(".btn-tous");
boutonAfficherTous?.addEventListener("click", function () {
  regenerationPage(projets);
});

const boutonFiltrerObjets = document.querySelector(".btn-objets");
boutonFiltrerObjets?.addEventListener("click", function () {
  fitresObjets(1);
});

const boutonFiltrerAppartements = document.querySelector(".btn-apparts");
boutonFiltrerAppartements?.addEventListener("click", function () {
  fitresObjets(2);
});

const boutonFiltrerHotelsRestaurants = document.querySelector(".btn-hotels");
boutonFiltrerHotelsRestaurants?.addEventListener("click", function () {
  fitresObjets(3);
});
