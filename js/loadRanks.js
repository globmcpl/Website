fetch('config/ranks.json')
  .then(response => response.json())
  .then(data => {
    const table = document.getElementById('ranks-table');
    
    // Create table header
    let thead = '<thead><tr><th scope="col">Prefiks</th>';
    data.ranks.forEach(rank => {
      thead += `<th scope="col"><p style="display: inline;">[</p><p style="display: inline; color: ${rank.color};">${rank.name}</p><p style="display: inline; color: gray;">]</p></th>`;
    });
    thead += '</tr></thead>';
    table.innerHTML = thead;

    // Create table body
    let tbody = '<tbody>';

    const attributes = [
      { key: 'validity', label: 'Ważność' },
      { key: 'price', label: 'Cena' },
      { key: 'expMultiplier', label: 'Mnożnik Exp`a' },
      { key: 'goCoinsMultiplier', label: 'Mnożnik GoCoins' },
      { key: 'extraKeys', label: 'Dodatkowe klucze przy zakupie rangi' },
      { key: 'weeklyKeys', label: 'Cotygodniowe darmowe klucze' },
      { key: 'slotReservation', label: 'Rezerwacja slota' },
      { key: 'visibility', label: 'Stała widoczność u innych graczy' },
      { key: 'welcomeMessage', label: 'Wiadomość powitalna' },
      { key: 'lobbyFly', label: 'Latanie na lobby' },
      { key: 'createClan', label: 'Możliwość stworzenia klanu' },
      { key: 'incognito', label: 'Incognito' },
      { key: 'earlyArenaStart', label: 'Możliwość wczesnego zaczęcia areny' },
      { key: 'freeBattlePass', label: 'Darmowy karnet bojowy' },
      { key: 'messageCooldown', label: 'Cooldown pisania wiadomości' },
      { key: 'freeLegendaryCosmetics', label: 'Darmowe legendarne kosmetyki' },
      { key: 'freeEpicCosmetics', label: 'Darmowe epickie kosmetyki' },
      { key: 'freeRareCosmetics', label: 'Darmowe rzadkie kosmetyki' },
      { key: 'freeCommonCosmetics', label: 'Darmowe zwyczajne kosmetyki' }
    ];

    attributes.forEach(attribute => {
      tbody += `<tr><th scope="row">${attribute.label}</th>`;
      data.ranks.forEach(rank => {
        let value = rank[attribute.key];
        if (typeof value === 'boolean') {
          value = value ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
        }
        tbody += `<td>${value}</td>`;
      });
      tbody += '</tr>';
    });

    tbody += '</tbody>';
    table.innerHTML += tbody;
  });