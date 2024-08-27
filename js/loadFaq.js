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

            // Toggle functionality
            faqHeader.addEventListener('click', () => {
                const isActive = faqItem.classList.contains('active');
                
                // Close all other items
                document.querySelectorAll('.accordion-item').forEach(item => {
                    item.classList.remove('active');
                    item.querySelector('.accordion-item-body').style.maxHeight = null;
                });

                if (!isActive) {
                    faqItem.classList.add('active');
                    faqBody.style.maxHeight = faqBody.scrollHeight + 'px';
                } else {
                    faqItem.classList.remove('active');
                    faqBody.style.maxHeight = null;
                }
            });
        });
    })
    .catch(error => console.error('Error loading FAQ:', error));
