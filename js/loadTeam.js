const updateTeam = async (team, teamName) => {
    const atContent = document.querySelector(".at-content");
    const group = document.createElement("div");
    
    group.classList.add("group");
    group.classList.add(teamName);
    
    const groupSchema = `
        <h2 class="rank-title">${teamName.charAt(0).toUpperCase() + teamName.slice(1)}</h2>
        <div class="users">
        </div>
    `;
    group.innerHTML = groupSchema;
    atContent.appendChild(group);
    
    for (const user in team) {
        await updateUser(team[user], team, teamName); 
    }
}

const updateUser = async (user, team, teamName) => {
    const group = document.querySelector("." + teamName + " .users");
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");

    let userSkin = user['skinUrlOrPathToFile'];
    const userName = user['inGameName']
    if(userSkin == "") userSkin = await getSkinByUuid(userName);

    let rankColor = team[0].rankColor;

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

const getSkinByUuid = async (username) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/bust/512/${await getUuidByUsername(username)}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/bust/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
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

executeLoad = async () => {
    fetch('config/admin_team.json').then(response => {
        return response.json();
    }).then(data => {
        const teamContent = data.adminTeam
        for (let team in teamContent) {
            updateTeam(teamContent[team], team);
        }
    })     
}

executeLoad();