document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Register button modal
    const registerBtn = document.querySelector('.register-btn');
    const registerModal = document.createElement('div');
    registerModal.className = 'modal';
    registerModal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Register</h2>
            <form id="register-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
                
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>
                
                <button type="submit">Register</button>
            </form>
        </div>
    `;
    document.body.appendChild(registerModal);

    const closeRegisterBtn = registerModal.querySelector('.close-btn');

    registerBtn.addEventListener('click', (event) => {
        event.preventDefault();
        registerModal.style.display = 'block';
    });

    closeRegisterBtn.addEventListener('click', () => {
        registerModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Form validation and local storage
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = registerForm.name.value;
        const email = registerForm.email.value;
        const password = registerForm.password.value;

        if (name && email && password) {
            const user = { name, email, password };
            localStorage.setItem('user', JSON.stringify(user));
            alert('Registration successful!');
            registerModal.style.display = 'none';
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Login button modal
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.createElement('div');
    loginModal.className = 'modal';
    loginModal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h2>Login</h2>
            <form id="login-form">
                <label for="email">Email:</label>
                <input type="email" id="login-email" name="email" required>
                
                <label for="password">Password:</label>
                <input type="password" id="login-password" name="password" required>
                
                <button type="submit">Login</button>
            </form>
        </div>
    `;
    document.body.appendChild(loginModal);

    const closeLoginBtn = loginModal.querySelector('.close-btn');

    loginBtn.addEventListener('click', (event) => {
        event.preventDefault();
        loginModal.style.display = 'block';
    });

    closeLoginBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Login form validation
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = loginForm.email.value;
        const password = loginForm.password.value;
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && email === user.email && password === user.password) {
            alert('Login successful!');
            loginModal.style.display = 'none';
        } else {
            alert('Invalid email or password.');
        }
    });

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.innerHTML = 'Top';
    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
