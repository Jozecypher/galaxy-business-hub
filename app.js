// Selections
let title = document.getElementById("mainTitle");
let description = document.getElementById("description");
let contactLink = document.querySelector("#contactLink");
let mainBtn = document.getElementById("mainBtn");
let serviceList = document.getElementById("serviceList");
let serviceItems = document.querySelectorAll(".service");
let removeBtn = document.getElementById("removeBtn");
let lastService = serviceList.lastElementChild;
let firstService = serviceList.firstElementChild;
let form = document.getElementById("contactForm");
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let messageInput = document.getElementById("messageInput");
let feedback = document.getElementById("feedback");
let serviceSelect = document.getElementById("serviceSelect"); 

title.textContent = "Galaxy Business Hub - Kampala, Uganda";
description.innerHTML = "<strong>Premium</strong> business solutions";
contactLink.setAttribute("href", "https://www.galaxybusinesshub.com/contact");
contactLink.setAttribute("target", "_blank");
mainBtn.classList.remove("disabled");
mainBtn.classList.add("active");

// Checkmarks
serviceItems.forEach(item => {
    item.textContent = item.textContent + " \u2713";
});

// Styles
title.style.color = "#2c3e50";
title.style.fontSize = "40px";
description.style.fontStyle = "italic";
description.style.color = "#7f8c8d";
mainBtn.style.cursor = "pointer";

// Alternating colors
serviceItems.forEach((item, index) => {
    item.style.backgroundColor = index % 2 === 0 ? "#f0f0f0" : "#ffffff";
});

// Hide contact link
contactLink.hidden = true;

// Event Listeners
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
        console.log("Selected: " + e.target.textContent);
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        title.textContent = "Galaxy Business Hub - Kampala, Uganda";
    }
});

contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("contact link clicked but page did not navigate");
});
function addService(serviceName) {
    if (!serviceName) return "service name required";
    let newService = document.createElement("li");
    newService.textContent = serviceName + "\u2713";
    newService.classList.add("service");
    newService.style.padding = "8px";
    serviceList.appendChild(newService);
}
mainBtn.addEventListener("click", () => {
    addService("Digital Marketing");
    addService("Branding");
    addService("consulting");
    addService("Networking");
})
function removeLastService() {
    let lastService = serviceList.lastElementChild;
    if(lastService){
        lastService.remove();
    }
    else{
         console.log("No Service to remove");
        }
    }
document.addEventListener("keydown", (e) => {
        if(e.key === "Del"){
            removeLastService(); 
        }
    });

removeBtn.addEventListener("click", () => {
    removeLastService();
});
console.log(serviceList.childElementCount);
firstService.style.borderLeft = "4px solid green";
lastService.style.borderLeft = "4px solid blue";
console.log(firstService.parentElement.id);
serviceList.addEventListener("click", (e) => {
   if (e.target.classList.contains("service")){
    Array.from(serviceList.children).forEach(child => {
        child.style.backgroundColor = "";
    });
       
       e.target.style.backgroundColor = "#d4edda";
       let next = e.nextElementSibling;
       if (next) next.style.backgroundColor = "#fff3cd";

       let prev = e.previousElementSibling;
       if(prev) prev.style.backgroundColor = "#fff3cd";
  }
});

nameInput.addEventListener("input", () => {
let value = nameInput.value.trim();
if(value.length===0){
    nameInput.style.borderColor = "red";
}else if(value.length <3){
    nameInput.style.borderColor = "orange";
}else{
    nameInput.style.borderColor = "green";
}
});
emailInput.addEventListener("input", () => {
    let value = emailInput.value.trim();
    if(value.includes("@")){
        emailInput.style.borderColor = "green";
    }else{
        emailInput.style.borderColor = "red";
    }
});
nameInput.addEventListener("focus", () => {
    nameInput.style.outLine = "2px solid #2c3e50";
});
nameInput.addEventListener("blur", () => {
    nameInput.style.outLine = "";
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let service = serviceSelect.value.trim();
    let message = messageInput.value.trim();
    
    if(!name){
        feedback.textContent = "Please name required";
        feedback.style.color = "red";
        nameInput.style.borderColor = "red";

        return;
    }
    if(!email.includes("@")){
        feedback.textContent = "Email must contain @";
        feedback.style.color = "red";
        emailInput.style.borderColor = "red";
        return;
    }
    if(!service){
        feedback.textContent = "Select a service";
        service.style.color = "red";
        return;
    }
    if(message.length < 10){
        feedback.textContent = "Message must be at least 10 characters";
        feedback.style.color = "red";
        messageInput.style.backgroundColor = "red";
        return;
    }
    feedback.textContent = "Thank you " + name + "! We will contact you at " + email + " shortly.";
    feedback.style.color = "green";

    form.reset();

    messageInput.style.borderColor = "";
    nameInput.style.borderColor = "";
    emailInput.style.borderColor = "";
  });








