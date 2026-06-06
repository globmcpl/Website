const teamMembers = [];

window.addEventListener("DOMContentLoaded", () => {

    document.getElementById("team-prev").addEventListener("click", () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = teamMembers.length - 1;
        }

        selectMember(currentIndex);
    });

    document.getElementById("team-next").addEventListener("click", () => {

        currentIndex++;

        if (currentIndex >= teamMembers.length) {
            currentIndex = 0;
        }

        selectMember(currentIndex);
    });
});

let currentIndex = 0;

function selectMember(index) {

    currentIndex = index;

    const member = teamMembers[index];

    document
        .querySelectorAll(".team-avatar")
        .forEach((e, i) => {
            e.classList.toggle("active", i === index);
        });

    document.getElementById("selected-member").innerHTML = `
        <div class="team-member-info">
            <div class="team-member-header">
                <span class="member-name">${member.name}</span>

                <span
                    class="member-rank"
                    style="background:${member.rankColor}"
                >
                    ${member.rank}
                </span>
            </div>

            <p class="member-description">
                ${member.description}
            </p>
        </div>
    `;

    document.getElementById("selected-skin").src = member.skin;
}

const updateTeam = async (team, teamName) => {

    for (const user of team) {

        let skin = user.skinUrlOrPathToFile;

        if (!skin) {
            playerUUID = await getUuidByUsername(user.inGameName);
            skin = await getSkinByUuid(playerUUID);
            head = await getFaceByUuid(playerUUID);
        }

        teamMembers.push({
            name: user.inGameName,
            rank: user.rank,
            rankColor: user.rankColor,
            team: teamName,
            head: head,
            skin: skin,
            description: user.description || `${user.rank} w zespole ${teamName}`
        });
    }
}

const getSkinByUuid = async (playerUUIID) => {
    try {
        const skinByUuidApi = `https://visage.surgeplay.com/bust/512/${playerUUIID}`;
        let response = await fetch(skinByUuidApi);

        if(response.status === 400) return `https://visage.surgeplay.com/bust/512/ec561538f3fd461daff5086b22154bce`;
        else return skinByUuidApi;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

const getFaceByUuid = async (playerUUIID) => {
    try {
        const faceApi = `https://visage.surgeplay.com/face/100/${playerUUIID}`;
        let response = await fetch(faceApi);

        if (response.status === 400) {
            return `https://visage.surgeplay.com/face/100/ec561538f3fd461daff5086b22154bce`;
        }

        return faceApi;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

function renderTeam() {
    const randomIndex = Math.floor(Math.random() * teamMembers.length);

    const selectedUser = document.getElementById("selected-member");
    const selectedSkin = document.getElementById("selected-skin");
    const teamUsers = document.getElementById("team-members");

    function selectUser(member) {

        selectedUser.innerHTML = `
            <div class="team-member-info">

                <div class="team-member-header">
                    <span class="member-name">
                        ${member.name}
                    </span>

                    <span
                        class="member-rank"
                        style="background:${member.rankColor}"
                    >
                        ${member.rank}
                    </span>
                </div>

                <p class="member-description">
                    ${member.description}
                </p>

            </div>
        `;

        selectedSkin.src = member.skin;
    }

    teamMembers.forEach((member, index) => {

        const div = document.createElement("div");

        div.classList.add("team-avatar");

        div.innerHTML = `
            <img src="${member.head}" alt="${member.name}">
        `;

        div.addEventListener("click", () => {
            selectMember(index);
        });

        if (index === randomIndex) {
            currentIndex = randomIndex;
            div.classList.add("active");
            selectUser(member);
        }

        teamUsers.appendChild(div);
    });
}

const getUuidByUsername = async (username) => {
    try {
        // const usernameToUuidApi = `https://api.minetools.eu/uuid/${username}`;
        const usernameToUuidApi = `https://playerdb.co/api/player/minecraft/${username}`;
        let response = await fetch(usernameToUuidApi);
        let data = await response.json();

        return data.data.player.raw_id;
    } catch (e) {
        console.log(e);
        return "None";
    }
}

const executeLoad = async () => {
    const response = await fetch('config/team.json');
    const data = await response.json();

    for (const teamKey in data) {

        const teamContent = data[teamKey];

        for (const teamName in teamContent) {

            await updateTeam(
                teamContent[teamName],
                teamName
            );
        }
    }

    renderTeam();
}

executeLoad();