var loginForm = document.querySelector(".login-form")
var loginEmail = document.querySelector(".login-email")
var loginPassword = document.querySelector(".login-password")

loginForm.addEventListener('submit', async event => {
    event.preventDefault()

    const credentials = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    const result = await loginRequest(credentials)
    localStorage.setItem('token', result['Authorization'])
    window.location.href = "/index.html"
    console.log(result)
})