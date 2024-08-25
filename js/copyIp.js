
/*IP copy only works if you have HTTPS on your website*/
const copyIpButton = document.querySelector(".copy-ip");
const copyIpAlert = document.querySelector(".ip-copied");

copyIpButton.addEventListener("click", () => {
    try {
        navigator.clipboard.writeText('globmc.pl');

        copyIpAlert.classList.add("active");

        setTimeout(() => {
            copyIpAlert.classList.remove("active");
        }, 5000);
    } catch (e) {
        console.log(e);
        copyIpAlert.innerHTML = "An error has occurred!";
        copyIpAlert.classList.add("active");
        copyIpAlert.classList.add("error");

        setTimeout(() => {
            copyIpAlert.classList.remove("active");
            copyIpAlert.classList.remove("error");
        }, 5000);
    }
})
