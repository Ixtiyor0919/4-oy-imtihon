const API = "https://fast-ravine-16741.herokuapp.com"

async function fetchAPI(options = {
    url: "",
    headers: {},
    method: "GET",
    body: undefined
}) {
    try {
        const response = await fetch(options.url, {
            method: options.method,
            headers: {
                "Content-type": "application/json",
                ...options.headers
            },
            body: JSON.stringify(options.body)
        })
        const result = await response.json()
        if (response.status >= 300) throw new Error(result);
        return result
    }catch (err) {
        console.log(err)
    }


}

async function loginRequest(credentials) {
    const result = await fetchAPI({
        url: `${API}/api/auth`,
        method: "POST",
        body: credentials
    })
    return result
}

async function registerRequest(credentials) {
    const result = await fetchAPI({
        url: `${API}/api/users`,
        method: "POST",
        body: credentials
    })
    return result
}

async function postsRequest(credentials) {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts`,
        method: "GET",
        headers: {
            "Authorization": token
        },
        body: credentials
    })
    return result
}

async function postsDelete(id) {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts/${id}/`,
        method: "DELETE",
        headers: {
            "Authorization": token
        },
        // body: credentials
    })
    return result
}

async function updatedRequest(credentials, postId) {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}//api/posts/${postId}`,
        method: "PUT",
        headers: {
            "Authorization": token
        },
        body: credentials
    })
    return result
}