/*
Configuration
------------------------
If something doesn't work please contact me on discord (Astronawta#0012).
*/

const config = {
    serverInfo: {
        serverLogoImageFileName: "logo.png", /*This is a file name for logo in /images/ (If you upload new logo with other name, you must change this value)*/
        serverName: "SkyBlock.pl", /*Server name*/
        serverIp: "SkyBlock.pl", /*Server IP (if you want to add online user counter, you must have true the enable-status and enable-query of server.properties)*/
        discordServerID: "489529070913060867" /*Your server ID (if you want to add online user counter, you must have enabled Discord server widget)*/
    },

    /*Admin-Team
    ------------
    If you want to create new group, you must add this structure to adminTeamPage:
    <nameOfGroup>: [
        {
            inGameName: "Astronavta",
            rank: "Owner",
            skinUrlOrPathToFile: "",
            rankColor: ""
        },
    ]
    then you must add this group with same name to atGroupsDefaultColors and set the color you want for the group.
    You can also set a special color for a specific user, just put it in the rankColor of that user.

    All skins for original players are generate automaticaly. If you want to add skins to warez players, yout must add url for skin to skinUrlOrPathToFile
        {
            inGameName: "Astronavta",  <--- In-Game name
            rank: "Owner",  <-- rank
            skinUrlOrPathToFile: "",  <-- url or file path for skin image for warez players (if you have original minecraft leave it be empty)
            rankColor: "rgba(255, 3, 3, 1)"  <-- special rank color
        },

    If you want to change skin type replace userSKinTypeInAdminTeam with something you want from array in comments
    */
    userSKinTypeInAdminTeam: "bust", /*[full, bust, head, face, front, frontFull, skin]*/
    atGroupsDefaultColors: {
        leaders: "rgba(255, 124, 124, 0.5)",
        developers: "rgba(230, 83, 0, 0.5)",
        helpers: "rgba(11, 175, 255, 0.5)",
        builders: "rgba(247, 2, 176, 0.5)",
    },
    adminTeamPage: {
        zarząd: [
            {
                inGameName: "Norbit4",
                rank: "Właściciel",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(255, 3, 3, 1)"
            },
        ],
        moderacja: [
            {
                inGameName: "Astronavta",
                rank: "Moderator",
                skinUrlOrPathToFile: "",
                rankColor: "rgba(53, 173, 89, 1)"
            },
            {
                inGameName: "Astronavta",
                rank: "Pomocnik",
                skinUrlOrPathToFile: "",
                rankColor: "rgb(158, 72, 194)"
            }
        ],
        budowniczy: [
            {
                inGameName: "MisielHeaven",
                rank: "Budowniczy",
                skinUrlOrPathToFile: "./images/skin/default.png",
                rankColor: "rgb(243, 128, 58)"
            }
        ]
    },

    /*
    Contact form
    ------------
    To activate, you need to send the first email via the contact form and confirm it in the email.
    Emails are sent via https://formsubmit.co/
    */
    contactPage: {
        email: "astronavta@example.com"
    }
}

/*If you want to change website color go to /css/global.css and in :root {} is a color pallete (don't change names of variables, change only values)*/
















/*If you want everything to work as it should and you don't understand what is written here, don't touch it :D*/


/*Mobile navbar (open, close)*/
const navbar = document.querySelector(".navbar");
const navbarLinks = document.querySelector(".links");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");
    navbarLinks.classList.toggle("active");
})

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
const discordOnlineUsers = document.querySelector(".discord-online-users");
const minecraftOnlinePlayers = document.querySelector(".minecraft-online-players");
/*Config contact*/
const contactForm = document.querySelector(".contact-form");
const inputWithLocationAfterSubmit = document.querySelector(".location-after-submit");

const getDiscordOnlineUsers = async () => {
    try {
        const discordServerId = config.serverInfo.discordServerID;

        const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
        let response = await fetch(apiWidgetUrl);
        let data = await response.json();

        if(!data.presence_count) return "None";
        else return (await data.presence_count);
    } catch (e) {
        return "None";
    }
}

const getMinecraftOnlinePlayer = async () => {
    try {
        const serverIp = config.serverInfo.serverIp;

        const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
        let response = await fetch(apiUrl);
        let data = await response.json();

        return data.players.online;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

const getUuidByUsername = async (username) => {
    try {
        const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        return data.id;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

const getSkinByUuid = async (username) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/${await getUuidByUsername(username)}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/${config.userSKinTypeInAdminTeam}/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

/*IP copy only works if you have HTTPS on your website*/
const copyIp = () => {
    const copyIpButton = document.querySelector(".copy-ip");
    const copyIpAlert = document.querySelector(".ip-copied");

    copyIpButton.addEventListener("click", () => {
        try {
            navigator.clipboard.writeText(config.serverInfo.serverIp);
    
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
}

const setDataFromConfigToHtml = async () => {
    /*Set config data to navbar*/
    serverName.innerHTML = config.serverInfo.serverName;
    serverLogo.src = `images/` + config.serverInfo.serverLogoImageFileName;

    /*Set config data to header*/
    serverIp.innerHTML = config.serverInfo.serverIp;

    let locationPathname = location.pathname;

    if(locationPathname == "/" || locationPathname.includes("index")) {
        copyIp();
        /*Set config data to header*/
        serverLogoHeader.src = `images/` + config.serverInfo.serverLogoImageFileName;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        minecraftOnlinePlayers.innerHTML = await getMinecraftOnlinePlayer();
    } else if(locationPathname.includes("rules")) {
        copyIp();
    }
    else if(locationPathname.includes("admin-team")) {
        for (let team in config.adminTeamPage) {
            const atContent = document.querySelector(".at-content");
            
            const group = document.createElement("div");
            group.classList.add("group");
            group.classList.add(team);

            const groupSchema = `
                <h2 class="rank-title">${team.charAt(0).toUpperCase() + team.slice(1)}</h2>
                <div class="users">
                </div>
            `;

            group.innerHTML = groupSchema;

            atContent.appendChild(group);

            for (let j = 0; j < config.adminTeamPage[team].length; j++) {
                let user = config.adminTeamPage[team][j];
                const group = document.querySelector("." + team + " .users");

                const userDiv = document.createElement("div");
                userDiv.classList.add("user");

                let userSkin = config.adminTeamPage[team][j].skinUrlOrPathToFile;

                if(userSkin == "") userSkin = await getSkinByUuid(user.inGameName);
                let rankColor = config.atGroupsDefaultColors[team];

                if(user.rankColor != "") {
                    rankColor = user.rankColor;
                }

                const userDivSchema = `
                    <img src="${await (userSkin)}" alt="${user.inGameName}">
                    <h5 class="name">${user.inGameName}</h5>
                    <p class="rank ${team}" style="background: ${rankColor}">${user.rank}</p>  
                `;

                userDiv.innerHTML = userDivSchema;
                group.appendChild(userDiv);
            }
        }
    } else if(locationPathname.includes("contact")) {
        contactForm.action = `https://formsubmit.co/${config.contactPage.email}`;
        discordOnlineUsers.innerHTML = await getDiscordOnlineUsers();
        inputWithLocationAfterSubmit.value = location.href;
    }
}

setDataFromConfigToHtml();