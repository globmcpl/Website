const minecraftStatus = document.getElementById("minecraft-status");

const getMinecraftOnlinePlayers = async () => {
  try {
    const response = await fetch(
      "https://globmc-api.norr-bitt.workers.dev/",
      { cache: "no-store" }
    );

    if (!response.ok) {
      console.error("Worker HTTP error:", response.status);
      return "";
    }

    const data = await response.json();

    return typeof data.online === "number" ? data.online : 0;

  } catch (e) {
    console.error("Worker fetch error:", e);
    return "";
  }
};


const setMinecraftOnlineUsers = async () => {
  const online = await getMinecraftOnlinePlayers();

  console.log("online =", online);

  minecraftStatus.innerHTML =
    `<span class="status-dot"></span> Online: ${online} graczy`;
};

async function getOnlineUsers() {
  const results = await Promise.allSettled([
    setMinecraftOnlineUsers(),
  ]);
}

getOnlineUsers();
