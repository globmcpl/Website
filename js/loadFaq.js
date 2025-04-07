// faq.js
fetch('config/faq.json')
    .then(response => response.json())
    .then(faqs => {
        const faqList = document.querySelector('.faqList');

        faqs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.classList.add('accordion-item');

            const faqHeader = document.createElement('div');
            faqHeader.classList.add('accordion-item-header');
            faqHeader.textContent = faq.question;

            const faqBody = document.createElement('div');
            faqBody.classList.add('accordion-item-body');

            const faqContent = document.createElement('div');
            faqContent.classList.add('accordion-item-body-content');
            faqContent.innerHTML = faq.answer;

            faqBody.appendChild(faqContent);
            faqItem.appendChild(faqHeader);
            faqItem.appendChild(faqBody);

            faqList.appendChild(faqItem);

            faqHeader.addEventListener('click', () => {
                const isActive = faqHeader.classList.contains('active');
                
                document.querySelectorAll('.accordion-item-header').forEach(header => {
                    header.classList.remove('active');
                    header.nextElementSibling.style.maxHeight = null;
                });
            
                if (!isActive) {
                    faqHeader.classList.add('active');
                    faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
                } else {
                    faqHeader.classList.remove('active');
                    faqBody.style.maxHeight = null;
                }
            });
            
        });
    })
    .catch(error => console.error('Error loading FAQ:', error));
