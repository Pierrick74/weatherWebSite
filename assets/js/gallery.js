const imgName = ['nuage0', 'nuage1', 'nuage2', 'nuage3', 'nuage4', 'nuage5'];
const gallery = document.getElementById("Gallery");
let isSelectionActive = false;
let pubIndex = 0;

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
            imgElement.addEventListener('click', () => {
                if (isSelectionActive) {
                    if(imgElement.classList.contains('selected')) {
                        imgElement.classList.remove('selected');
                    } else {
                        imgElement.classList.add('selected');
                    }
                }
            });
            gallery.appendChild(imgElement);
        },
        false,
    );
    
    if (file) {
        reader.readAsDataURL(file);
    }
}

document.getElementsByClassName("custom-file-input")[0].addEventListener("change", addImg);

//----------------delete img----------------
document.getElementById("selection").addEventListener("click", toggleSelection);

function toggleSelection() {
    isSelectionActive = !isSelectionActive;
    document.getElementById("selection").textContent = isSelectionActive ? "delete selection" : "selection";
    delSelectedImg();
}

function delSelectedImg() {
    const imgElements = gallery.querySelectorAll('.selected');
    imgElements.forEach((imgElement) => {
        gallery.removeChild(imgElement);
    });
}

//-----------------pub----------------

const carouselItems = document.querySelectorAll(".carousel_item");
let currentIndex = 0;
let direction = "forward"; 

setInterval(() => {
    carouselItems.forEach((item) => {
        item.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
    
    if (direction === "forward") {
        currentIndex++;
        if (currentIndex >= carouselItems.length - 1) {
            direction = "backward";
        }
    } else {
        currentIndex--;
        if (currentIndex <= 0) {
            direction = "forward";
        }
    }
}, 4000);
