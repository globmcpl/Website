const getDiscordOnlineUsers = async () => {
    try {
        const apiWidgetUrl = 'https://discord.com/api/guilds/733283797457698866/widget.json';
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "None";
        else return (await data.presence_count);
    } catch (e) {
        return "None";
    }
}

const setDiscordOnlineUsers = async () => {
    discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
}

setDiscordOnlineUsers();