
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async function (event) {

    event.preventDefault();

    const formData = new FormData(contactForm);

    const contactData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        message: formData.get('message').trim()
    };

    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            contactForm.reset();
        } else {
            alert(result.message || 'Something went wrong.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Unable to connect to the server. Please try again.');
    }
});
