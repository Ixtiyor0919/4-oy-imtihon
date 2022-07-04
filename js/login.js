var loginForm = document.querySelector(".login-form")
var loginEmail = document.querySelector(".login-email")
var loginPassword = document.querySelector(".login-password")
var signUp = document.querySelector(".form-inner-bottom-link")
var elValid = loginForm.querySelector('.fa-check');
var elInvalid = loginForm.querySelector('.fa-circle-exclamation');
var showPassword = document.querySelector('.password-icon');

loginForm.addEventListener('submit', async event => {
    event.preventDefault()
    loginPassword.value.trim();
    // var passwordInput = loginPassword.value;

    // if(passwordInput <= 0 || isNaN(passwordInput)) {
    //     loginPassword.style.border = '3px solid red';
    //     elInvalid.style.display = 'block';
    //     elValid.style.display = 'none';
    // }else {
    //     loginPassword.style.border = '3px solid green';
    //     elValid.style.display = 'block';
    //     elInvalid.style.display = 'none';
    // }

    // showLoader()
    const credentials = {
        email: loginEmail.value,
        password: loginPassword.value
    }
    const result = await loginRequest(credentials)
    if(!result && loginPassword.value <= 0 || isNaN(loginPassword.value)) {
        password.style.border = '3px solid red';
        elValid.style.display = 'none';
        elInvalid.style.display = 'block';
        eye.style.display = 'none'
        alert("Parol yoki email xato");
    }else {
        password.style.border = '3px solid green';
        elInvalid.style.display = 'none';
        eye.style.display = 'none'
        elValid.style.display = 'block';

        showLoader()
        localStorage.setItem('token', result['Authorization'])
        hideLoader()
        window.location.href = "/post.html"
    }
})

showPassword.addEventListener('click', () => {
    if(loginPassword.type == 'password') {
        loginPassword.type = 'text';
        showPassword.classList.toggle('fa-eye-slash')
        showPassword.classList.toggle('fa-eye')
    }
    else {
        loginPassword.type = 'password'
        showPassword.classList.toggle('fa-eye')
        showPassword.classList.add('fa-eye-slash')
    }
})

signUp.addEventListener('click', () => {
    window.location.href = "/index.html"
})