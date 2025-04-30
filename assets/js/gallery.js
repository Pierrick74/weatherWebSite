const imgName = ['nuage0', 'nuage1', 'nuage2', 'nuage3', 'nuage4', 'nuage5'];

function showImg() {
const gallery = document.querySelector('.gallery');

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

