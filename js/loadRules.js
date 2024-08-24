document.addEventListener('DOMContentLoaded', function() {
  fetch('config/rules.json')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => {
          const rulesContainer = document.getElementById('rules-container');

          for (const section in data) {
              const sectionData = data[section];

              const sectionDiv = document.createElement('div');
              sectionDiv.classList.add(`${section}-rules`, 'rules');

              const sectionTitle = document.createElement('h2');
              sectionTitle.classList.add(`${section}-rules-title`, 'rules-title');
              sectionTitle.textContent = sectionData.name;
              sectionDiv.appendChild(sectionTitle);

              const rulesList = document.createElement('ol');
              rulesList.classList.add('rules-list');

              sectionData.rules.forEach(rule => {
                  const ruleItem = document.createElement('li');
                  ruleItem.classList.add('rule');
                  ruleItem.textContent = rule;
                  rulesList.appendChild(ruleItem);
              });

              sectionDiv.appendChild(rulesList);
              rulesContainer.appendChild(sectionDiv);
          }
      })
      .catch(error => console.error('Error loading rules:', error));
});
