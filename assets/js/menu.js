document.getElementById("Menu").addEventListener("click", updateMenu);


function updateMenu() {
    var MenuContent = document.getElementById("menuContent");
    MenuContent.style.display = (MenuContent.style.display === "none") ? "flex" : "none";
}