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
              readSection(sectionData, rulesContainer)
          }
      })
      .catch(error => console.error('Error loading rules:', error));
});

const readSection = (sectionData, rulesContainer) => {
    const sectionName = sectionData['name']

    const sectionDiv = document.createElement('div');
    const sectionTitle = document.createElement('h2');
    
    sectionDiv.classList.add('rules')
    sectionTitle.classList.add('rules-title')
    
    sectionTitle.textContent = sectionName;
    sectionDiv.appendChild(sectionTitle);
    
    subsections = sectionData['subsections']
    
    for (const subsection in subsections) {
        const subsectionData = subsections[subsection]
        readSubsection(subsectionData, sectionDiv)
    }

    rulesContainer.appendChild(sectionDiv);
}

const readSubsection = (subsectionData, sectionContainer) => {
    const subsectionName = subsectionData['name']
    
    const subsectionDiv = document.createElement('div');
    const subsectionTitle = document.createElement('h3');
    
    subsectionTitle.classList.add('rules-title')
    subsectionDiv.classList.add('rules')
    subsectionTitle.style.fontSize = '20px';
    subsectionDiv.style.paddingLeft = '12px'
    
    subsectionTitle.textContent = subsectionName;
    subsectionDiv.appendChild(subsectionTitle)
    
    const sections = subsectionData['subsubsections']
    
    for (const section in sections) {
        const sectionName = sections[section]['name']
        const sectionRules = sections[section]['rules']
        
        const rulesList = document.createElement('ol');
        const sectionTitle = document.createElement('h3');
        const sectionDiv = document.createElement('div');

        sectionTitle.textContent = sectionName;
        sectionTitle.classList.add('rules-title-lowest-section')
        sectionDiv.classList.add('rules')
        rulesList.classList.add('rules-list')
        
        sectionDiv.appendChild(sectionTitle)
        
        for (const rule in sectionRules) {
            const ruleText = sectionRules[rule]
            const ruleItem = document.createElement('li');
            ruleItem.classList.add('rule')
            
            ruleItem.classList.add('rule');
            ruleItem.textContent = ruleText;
            rulesList.appendChild(ruleItem);
        }
        sectionDiv.appendChild(rulesList)
        subsectionDiv.appendChild(sectionDiv)
    }

    sectionContainer.appendChild(subsectionDiv)
}
