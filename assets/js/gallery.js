const imgName = ['nuage0', 'nuage1', 'nuage2', 'nuage3', 'nuage4', 'nuage5'];
const gallery = document.getElementById("Gallery");

function showImg() {
    imgName.forEach((_img) => {
        const imgElement = document.createElement('img');
        imgElement.src = `assets/img/${_img}.webp`;
        imgElement.alt = 'Nuage';
        imgElement.classList.add('gallery_img');
        gallery.appendChild(imgElement);
    }
);
}

// lancer la fonction pour afficher les images a l'apparition de la page
document.addEventListener('DOMContentLoaded', () => {
    showImg();
});

document.getElementById("btn-grid").addEventListener("click", setGrids);
document.getElementById("btn-list").addEventListener("click", setList);

function setGrids() {
    if (!gallery.classList.contains("flex-direction-column")) {
        gallery.classList.remove("flex-direction-column");
    }

    const imgElements = gallery.querySelectorAll('img');
    imgElements.forEach((imgElement) => {
        if(imgElement.classList.contains('w-100')) {
            imgElement.classList.remove('w-100');
        }
    });
}

function setList() {
    if (gallery.classList.contains("flex-direction-column")) {
        gallery.classList.remove("flex-direction-column");
    }

    const imgElements = gallery.querySelectorAll('img');
    imgElements.forEach((imgElement) => {
        imgElement.classList.add('w-100');
    });
}

// ajout gallery_img dans le css
document.getElementById("btn-ajout").addEventListener("click", addImg);

function addImg() {
    var reader = new FileReader();
    const preview = document.createElement('img');
    const file = document.querySelector("input[type=file]").files[0];
    
    reader.addEventListener(
        "load",
        () => {
            preview.src = reader.result;
            const imgElement = document.createElement('img');
            imgElement.src = preview.src;
            imgElement.alt = 'Nuage';
            imgElement.classList.add('gallery_img');
            gallery.appendChild(imgElement);
        },
        false,
    );
    
    if (file) {
        reader.readAsDataURL(file);
    }
}