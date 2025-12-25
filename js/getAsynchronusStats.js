const getDiscordOnlineUsers = async () => {
  try {
      const apiWidgetUrl = 'https://discord.com/api/guilds/1269259277613268993/widget.json';
      let response = await fetch(apiWidgetUrl);
      let data = await response.json();

      if(!data.presence_count) return "";
      else return (await data.presence_count);
  } catch (e) {
      return "";
  }
}

// export const getMinecraftOnlinePlayers = async () => {
//   try {
//       const apiUrl = `https://api.mcstatus.io/v2/status/java/globmc.pl`;
//       let response = await fetch(apiUrl);
//       let data = await response.json();

//         if (!data.online || !data.players) {
//             return "";
//         }

//       return data.players.online;
//   } catch (e) {
//       console.log(e);
//       return "";
//   }
// }

export const getMinecraftOnlinePlayers = async () => {
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
  minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayers()
}

async function getOnlineUsers() {
  const results = await Promise.allSettled([
    setMinecraftOnlineUsers(),
  ]);
}

getOnlineUsers();
