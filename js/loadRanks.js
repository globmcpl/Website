const createHeaders = (data, table) => {
  let thead = '<thead id="prefixes-row"><tr><th scope="col">Prefiks</th>';
  data.forEach(rank => {

    let rankRequired =
    `
      <br>
        <p
        class="rank-required"
        style="visibility: hidden"
        >
          invisible text
        </p>
    `

    // if (rank.name === 'MVIP'){
    //   rankRequired =
    //   `
    //     <br>
    //       <p class="rank-required">
    //         Wymaga rangi SVIP+
    //     </p>
    //   `
    // }

    thead +=
    `
    <th scope="col">
      <p
      class="header-row" style="
      background: linear-gradient${rank.gradient};
      color: transparent;
      background-clip: text;
      ">
        [${rank.name}]
      </p>
    </th>`;
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

    tbody += `
    <tr class="group-row" style="color:${group["text-color"]}"><th scope="row">
      <b>${group.name}</b>
    </th>
    `;

    const ranks_len = data.length

    for (let i = 0; i < ranks_len; i++) {
      tbody += `<td></td>`;
    }
    tbody += '</tr>';

    attributes = group.attributes
    for (attribute in attributes) {
      tbody = createAttributeRow(data, tbody, attribute, group_id, group)
    }
    group_id += 1
  })

  return tbody
}

const createAttributeRow = (data, tbody, attribute, group_id, group) => {
  tbody += `<tr style="color:${group["text-color"]}"; ><th scope="row">${attribute}</th>`;

  data.forEach(rank => {
    value = rank.groups[group_id].attributes[attribute]

    if (typeof value === 'boolean') {
      value = value ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-xmark"></i>';
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