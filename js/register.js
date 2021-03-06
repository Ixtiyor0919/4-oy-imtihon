var registerForm = document.querySelector(".register-form")
var registerName = document.querySelector(".register-name")
var registerEmail = document.querySelector(".register-email")
var registerPassword = document.querySelector(".register-password")
var showPassword = document.querySelector('.password-icon');

registerForm.addEventListener('submit', async event => {
    event.preventDefault()
    showLoader()
    const credentials = {
        email: registerEmail.value,
        password: registerPassword.value,
        name: registerName.value,
        isAdmin: true
    }
    const result = await registerRequest(credentials)
    if (result) {
        const { name, isAdmin, ...loginCreadentials } = credentials
        const result = await loginRequest(loginCreadentials)
        localStorage.setItem('token', result['Authorization'])
        hideLoader()
        window.location.href = "/post.html"
    }
})

showPassword.addEventListener('click', () => {
    if(password.type == 'password') {
        password.type = 'text';
        showPassword.classList.toggle('fa-eye-slash')
        showPassword.classList.toggle('fa-eye')
    }
    else {
        password.type = 'password'
        showPassword.classList.toggle('fa-eye')
        showPassword.classList.add('fa-eye-slash')
    }
})