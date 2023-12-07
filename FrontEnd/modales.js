const reponse = await fetch("http://localhost:5678/api/works");
const projets = await reponse.json();
//
const token = localStorage.getItem("token");

// Gestion de la modale 1
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");
//
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
//
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
//
openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
//
overlay.addEventListener("click", closeModal);
//
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal2.classList.contains("hidden")) {
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
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal2.classList.remove("hidden");
  overlay2.classList.remove("hidden");
};

const closeModal2 = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  modal2.classList.add("hidden");
  overlay2.classList.add("hidden");
};

const closeModal3 = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal2.classList.add("hidden");
  overlay2.classList.add("hidden");
};

openModalBtn2.addEventListener("click", openModal2);
closeModalBtn2.addEventListener("click", closeModal2);
closeModalBtn3.addEventListener("click", closeModal3);
overlay2.addEventListener("click", closeModal3);
//
function genererProjets(projets) {
  for (let i = 0; i < projets.length; i++) {
    const gallery = projets[i];
    const id = gallery.id; // utiliser ce id pour supprimer la photo
    // console.log(id);
    // Récupération de l'élément du DOM qui accueillera les photos
    const divGallery = document.querySelector(".modal-gallery");
    // Création d’une balise dédiée à un projet
    const projetElement = document.createElement("figure");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = gallery.imageUrl;
    //
    const trashElement = document.createElement("i");
    trashElement.setAttribute("class", "fa-solid fa-trash-can btn__trash");
    // On rattache la balise à la div gallery
    divGallery?.appendChild(projetElement);
    projetElement.appendChild(imageElement);
    projetElement.appendChild(trashElement);

    trashElement.addEventListener("click", (event) => {
      console.log(event);
      deletePhoto(id);
    });
  }
}
// afficher les projets
genererProjets(projets);

async function deletePhoto(PhotoId) {
  // Ajouter une fonctionnalité de confirmation de suppression
  const confirmation = confirm(
    "Voulez-vous annuler la suppression ? Sinon confirmez la suppression avec bouton Annuler."
  );
  if (confirmation) {
    alert("La suppression a bien été annulée !");
  } else {
    const response = await fetch(`http://localhost:5678/api/works/${PhotoId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Vérification de la réponse
        if (response.ok) {
          alert("Suppression du projet 🚮");
          return response.json();
        } else {
          // Si erreur elle est rejetée et indique le status de l'erreur
          return Promise.reject(response.status);
        }
      })
      // Si erreur dans le code
      .catch((error) => {
        console.log(error);
      });
  }
}

// Afficher l'image
let chosenImage = document.getElementById("chosen-image");
let uploadButton = document.getElementById("form-image");

uploadButton?.addEventListener("change", function () {
  let reader = new FileReader();
  reader.readAsDataURL(uploadButton.files[0]);
  console.log(uploadButton.files[0]);
  reader.onload = function () {
    chosenImage.setAttribute("src", reader.result);
  };
  let iconNewPhoto = document.getElementById("photo-add-icon");
  iconNewPhoto.style.display = "none";
  let photoMaxSize = document.getElementById("photo-size");
  photoMaxSize.style.display = "none";
  let buttonNewPhoto = document.getElementById("new-image");
  buttonNewPhoto.style.display = "none";
  let modalEditPhoto = document.getElementById("modal-edit-new-photo");
  modalEditPhoto.style.padding = "0";
});

const postForm = document.querySelector("#modal-edit-project-form");
postForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const image = document.querySelector("#form-image").files[0];
  console.log(image);
  const title = document.querySelector("#form-title").value;
  console.log(title);
  const selectElement = document.querySelector("#form-category");
  console.log(selectElement.value);
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  console.log(selectedOption);
  const categoryId = selectedOption.dataset.id;

  if (title === "" || image === "" || selectElement.value === "") {
    alert("Veuillez remplir tous les champs du formulaire.");
  } else {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("category", categoryId);

    const myToken = localStorage.getItem("token");

    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Requête incorrecte !");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch(console.error);
  }
});
