if (!localStorage.getItem('token')) {
    window.location.href = "/index.html"
}
async function getProfile() {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `https://fast-ravine-16741.herokuapp.com/api/users/me`,
        headers: {
            "Authorization": token
        }
    })
    return result
}

getProfile().then(result => {
    console.log(result)
})