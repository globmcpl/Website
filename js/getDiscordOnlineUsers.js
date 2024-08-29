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

const setDiscordOnlineUsers = async () => {
    discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
}

setDiscordOnlineUsers();