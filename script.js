document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation and submission
    const form = document.getElementById('job-application-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            simulateFormSubmission();
        }
    });

    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
        }

        return isValid;
    }

    function simulateFormSubmission() {
        const submitButton = form.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';

        // submit form to https://sending.baqladempire.com
        fetch('https://sending.techydesktop.com/sendmail.php', {
            method: 'POST',
            body: new FormData(form)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });


        setTimeout(() => {
            alert('Thank you for your application! We will be in touch soon.');
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Submit Application';
        }, 2000);
    }
});

