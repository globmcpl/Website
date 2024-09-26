const createHeaders = (data, table) => {
  let thead = '<thead><tr><th scope="col">Prefiks</th>';
  data.forEach(rank => {
    thead += `<th scope="col"><p style="display: inline;">[</p><p style="display: inline; color: ${rank.color};">${rank.name}</p><p style="display: inline; color: gray;">]</p></th>`;
  })
  thead += '</tr></thead>';
  table.innerHTML = thead;
}

const createBody = (data, table) => {
  let tbody = '<tbody>';
  
  tbody = createGroups(tbody, data)

  tbody += '</tbody>';
  table.innerHTML += tbody;
}

const createGroups = (tbody, data) => {
  var group_id = 0

  data[0].groups.forEach(group => {
    tbody += `<tr style="background-color: ${group.color}"><th scope="row"><b>${group.name}</b></th>`;

    const ranks_len = data.length

    for (let i = 0; i < ranks_len; i++) {
      tbody += `<td></td>`;
    }
    tbody += '</tr>';

    attributes = group.attributes
    for (attribute in attributes) {
      tbody = createAttributeRow(data, tbody, attribute, group_id, group.color)
    }
    group_id += 1
  })

  return tbody
}

const createAttributeRow = (data, tbody, attribute, group_id, group_color) => {
  tbody += `<tr style="background-color:${group_color}"><th scope="row">${attribute}</th>`;
  
  data.forEach(rank => { 
    value = rank.groups[group_id].attributes[attribute]

    if (typeof value === 'boolean') {
      value = value ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>';
    }

    tbody += `<td>${value}</td>`;
  })

  return tbody
}

fetch('config/ranks.json')
  .then(response => response.json())
  .then(data => {
    const table = document.getElementById('ranks-table');

    createHeaders(data, table);
    createBody(data, table)
  });