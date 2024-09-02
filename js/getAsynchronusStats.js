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

const setDiscordOnlineUsers = async () => {
  discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
}

async function getOnlineUsers() {
  const results = await Promise.allSettled([
    setMinecraftOnlineUsers(),
    setDiscordOnlineUsers(),
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      if (index === 0) {
        console.log('Discord Users:', result.value);
      } else {
        console.log('Minecraft Players:', result.value);
      }
    } else {
      console.error('Error in fetching data:', result.reason);
    }
  });
}

getOnlineUsers();
