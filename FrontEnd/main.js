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

/* Cette ligne sélectionne tous les éléments du DOM
(Document Object Model) qui ont la classe CSS "filtre__btn".
Ces éléments sont des boutons de filtre dans
la page web. */
const btnsFiltres = document.querySelectorAll(".filtre__btn");
/* Cette boucle for itère à travers tous les boutons de filtre
sélectionnés précédemment. */
for (let i = 0; i < btnsFiltres.length; i++) {
  /* Pour chaque bouton de filtre, un écouteur d’événements
  est ajouté pour détecter le clic
  (lorsque l’utilisateur clique sur le bouton). */
  btnsFiltres[i].addEventListener("click", function () {
    /* getElementsByClassName est utile lorsque vous souhaitez
     manipuler plusieurs éléments ayant la même classe dans votre page web */
    let current = document.getElementsByClassName("active");
    /* Cette ligne récupère tous les éléments du DOM qui ont
    la classe CSS "active".
    l’un de ces éléments est actuellement
    marqué comme actif. */
    // console.log(current);
    current[0].className = current[0].className.replace("active", "");
    /* Ici, la classe "active" est retirée de l’élément 
    actuellement actif. 
    Cela désactive visuellement le bouton précédemment actif */
    this.className += " active";
    /* Enfin, la classe "active" est ajoutée à l’élément 
    de bouton sur lequel l’utilisateur a cliqué. 
    Cela le marque comme actif. */
    /* this est un moyen de référencer dynamiquement l’élément sur lequel
     l’événement (au clique) a eu lieu, ce qui est utile lorsque
      vous manipulez plusieurs éléments similaires dans une page web */
  });
}

function regenerationPage(objets) {
  // ce code efface tout le contenu HTML de l’élément avec la classe CSS gallery
  // Donc , réinitialiser ou vider dynamiquement un élément du DOM.
  document.querySelector(".gallery").innerHTML = "";
  genererProjets(objets);
}

function fitresObjets(id) {
  //  projets => donnée de api "http://localhost:5678/api/works"
  const objetsFiltres = projets.filter(function (objet) {
    // categoryId est récupéré de l'API
    return objet.categoryId === id;
  });
  // réinitialiser ou vider dynamiquement un élément (classe : gallery) du DOM.
  regenerationPage(objetsFiltres);
}
// Filtrer les différentes catégories
const boutonAfficherTous = document.querySelector(".btn-tous");
boutonAfficherTous.addEventListener("click", function () {
  regenerationPage(projets);
});

const boutonFiltrerObjets = document.querySelector(".btn-objets");
boutonFiltrerObjets.addEventListener("click", function () {
  // appelle de la fonction fitresObjets(id qui correspond à la catégorie du projet)
  // id:1 correspond : Objets
  fitresObjets(1);
});

const boutonFiltrerAppartements = document.querySelector(".btn-apparts");
boutonFiltrerAppartements.addEventListener("click", function () {
  // id:2 à la catégorie Appartement
  fitresObjets(2);
});

const boutonFiltrerHotelsRestaurants = document.querySelector(".btn-hotels");
boutonFiltrerHotelsRestaurants.addEventListener("click", function () {
  // id:3 à la categorie Hôtels & restaurant
  fitresObjets(3);
});
