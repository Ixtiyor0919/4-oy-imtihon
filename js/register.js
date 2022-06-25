var registerForm = document.querySelector(".register-form")
var registerName = document.querySelector(".register-name")
var registerEmail = document.querySelector(".register-email")
var registerPassword = document.querySelector(".register-password")

registerForm.addEventListener('submit', async event => {
    event.preventDefault()

    const credentials = {
        email: registerEmail.value,
        password: registerPassword.value,
        name: registerName.value,
        isAdmin: true
    }
    console.log(credentials);
    const result = await registerRequest(credentials)
    if (result) {
        const { name, isAdmin, ...loginCreadentials } = credentials
        const result = await loginRequest(loginCreadentials)
        localStorage.setItem('token', result['Authorization'])
        window.location.href = "/index.html"
    }
})