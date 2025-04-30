document.getElementById("Menu").addEventListener("click", updateMenu);


function updateMenu() {
    var MenuContent = document.getElementById("menuContent");
    hidden(MenuContent);
}

function hidden(element) {
    if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
    } else {
        element.classList.add("hidden");
    }
}