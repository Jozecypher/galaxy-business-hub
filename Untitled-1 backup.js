let title = document.getElementById("mainTitle")
title.textContent = "Galaxy Business Hub - Kampala, Uganda";
let description = document.getElementById("description");
description.innerHTML = "<strong>Premium</strong> business solutions";
let contactLink = document.querySelector("#contactLink");
contactLink.setAttribute("href", "https://www.galaxybusinesshub.com/contact");
contactLink.setAttribute("target", "_blank");
let mainBtn = document.getElementById("mainBtn");
mainBtn.classList.remove("disabled");
mainBtn.classList.add("active");
let serviceItems = document.querySelectorAll(".service");
serviceItems.forEach(item=> {
    item.textContent = item.textContent + "\u2713";
});
title.style.color = "#2c3e50";
title.style.fontSize = "40px";
description.style.fontStyle = "italic";
description.style.color = "#7f8c8d";
mainBtn.style.cursor = "pointer";
serviceItems.forEach(item, index => {
    item.style.backgroundColor = index % 2 === 0 ? "#f0f0f0" : "#ffffff";
});
contactLink.hidden = true;
let computedStyle = getComputedStyle(contactLink);
console.log("contactLink Display:", computedStyle.display);
let serviceList = document.getElementById("serviceList");
mainBtn.addEventListener("click", () => {
mainBtn.textContent = "Thanks for clicking!";
mainBtn.style.backgroundColor = "green";
mainBtn.style.color = "white";
});
mainBtn.addEventListener("mouseenter", () => {
    mainBtn.style.opacity = "0.7";
});
mainBtn.addEventListener("mouseleave", () => {
    mainBtn.style.opacity = "1";
});
serviceList.addEventListener("click", (e) => {
    if (e.target.classList.contains("service")) {
        e.target.style.backgroundColor = "#d4edda";
        e.target.style.color = "green";
        console.log("selected service:", e.target.textContent);
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {title.textContent = "Galaxy Business Hub - Kampala, Uganda";}
});   
contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("contact link clicked but page did not navigate");
}); 







