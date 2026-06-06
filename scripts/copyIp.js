function copyIP() {
    const ip = document.getElementById("server-ip").textContent;

    navigator.clipboard.writeText(ip).then(() => {
        const oldToast = document.querySelector(".copy-toast");
        if (oldToast) oldToast.remove();

        const toast = document.createElement("div");
        toast.className = "copy-toast";
        toast.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            Skopiowano IP serwera!
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("show");
        }, 10);

        setTimeout(() => {
            toast.classList.remove("show");

            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 2500);
    });
}