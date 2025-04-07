/*FAQs*/
const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", () => {
        accordionItemHeader.classList.toggle("active");
        const accordionItemBody = accordionItemHeader.nextElementSibling;

        if(accordionItemHeader.classList.contains("active")) accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
        else accordionItemBody.style.maxHeight = "0px";
    });
});

/*Config navbar*/
const serverName = document.querySelector(".server-name");
const serverLogo = document.querySelector(".logo-img");

/*Config header*/
const serverIp = document.querySelector(".minecraft-server-ip");
const serverLogoHeader = document.querySelector(".logo-img-header");
const minecraftOnlinePlayers = document.querySelector(".online-count");

/*Config contact*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");


const setDataFromConfigToHtml = async () => {
    /*Set config data to navbar*/
    serverName.innerHTML = 'GlobMc';
    serverLogo.src = `images/` + 'logo.png';

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        //serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
    } else if(locationPathname.includes("contact")) {
            contactForm.action = 'https://formsubmit.co/glomc.pl';
            inputWithLocationAfterSubmit.value = location.href;
    }
}
setDataFromConfigToHtml();