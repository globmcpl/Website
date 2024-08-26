const getMinecraftOnlinePlayers = async () => {
    try {
        const apiUrl = `https://api.mcsrvstat.us/2/kokscraft.pl`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        return data.players.online;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

const setMinecraftOnlineUsers = async () => {
    minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayers()
}

setMinecraftOnlineUsers();