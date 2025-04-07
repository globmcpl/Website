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

export const getMinecraftOnlinePlayers = async () => {
  try {
      const apiUrl = `https://api.mcsrvstat.us/2/globmc.pl`;
      let response = await fetch(apiUrl);
      let data = await response.json();

      return data.players.online;
  } catch (e) {
      console.log(e);
      return "";
  }
}

const setMinecraftOnlineUsers = async () => {
  minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayers()
}

async function getOnlineUsers() {
  const results = await Promise.allSettled([
    setMinecraftOnlineUsers(),
  ]);
}

getOnlineUsers();
