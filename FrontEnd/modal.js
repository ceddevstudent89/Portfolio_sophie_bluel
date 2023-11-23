const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();
//

// Gestion de la modale 1
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
//
const openModal = function () {
  modal?.classList.remove("hidden");
  overlay?.classList.remove("hidden");
};
//
const closeModal = function () {
  modal?.classList.add("hidden");
  overlay?.classList.add("hidden");
};
//
openModalBtn?.addEventListener("click", openModal);
closeModalBtn?.addEventListener("click", closeModal);
//
overlay?.addEventListener("click", closeModal);
//
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal?.classList.contains("hidden")) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal2?.classList.contains("hidden")) {
    closeModal3();
  }
});
//  Gestion modale 2
const modal2 = document.querySelector(".modal2");
const openModalBtn2 = document.querySelector(".btn-open-modal2");
const closeModalBtn2 = document.querySelector(".btn-close2");
const closeModalBtn3 = document.querySelector(".btn-close3");
const overlay2 = document.querySelector(".overlay2");

const openModal2 = function () {
  modal?.classList.add("hidden");
  overlay?.classList.add("hidden");
  modal2?.classList.remove("hidden");
  overlay2?.classList.remove("hidden");
};

const closeModal2 = function () {
  modal?.classList.remove("hidden");
  overlay?.classList.remove("hidden");
  modal2?.classList.add("hidden");
  overlay2?.classList.add("hidden");
};

const closeModal3 = function () {
  modal?.classList.add("hidden");
  overlay?.classList.add("hidden");
  modal2?.classList.add("hidden");
  overlay2?.classList.add("hidden");
};

openModalBtn2?.addEventListener("click", openModal2);
closeModalBtn2?.addEventListener("click", closeModal2);
closeModalBtn3?.addEventListener("click", closeModal3);
overlay2?.addEventListener("click", closeModal3);
//
function genererProjets(projets) {
  for (let i = 0; i < projets.length; i++) {
    const gallery = projets[i];
    // Récupération de l'élément du DOM qui accueillera les photos
    const divGallery = document.querySelector(".modal-gallery");
    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = gallery.imageUrl;
    //
    const trashElement = document.createElement("i");
    trashElement.setAttribute("class", "fa-solid fa-trash-can btn__Trash");

    // On rattache la balise à la div gallery
    divGallery?.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(trashElement);
  }
}

// afficher les projets
genererProjets(projets);
