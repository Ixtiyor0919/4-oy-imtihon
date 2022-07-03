const API = "https://fast-ravine-16741.herokuapp.com";

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
        alert(err.message)
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

async function deletePosts(postId) {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts/${postId}`,
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    })
    return result
}

async function updatedPosts({ _id, title, body }) {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts/${_id}`,
        method: "PUT",
        headers: {
            "Authorization": token
        },
        body: {
            title, 
            body
        }
    })
    return result
}

async function profileRequest() {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/users/me`,
        headers: {
            "Authorization": token
        },
    })
    return result
}

async function getSinglePostRequest(id) {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts/${id}`,
        headers: {
            "Authorization": token
        },
    })
    return result
}

async function getPostsRequest(page = 1) {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts?page=${page}`,
        headers: {
            "Authorization": token
        }
    })
    return result
}

async function addSinglePostRequest({title, body}) {
    const token = localStorage.getItem('token')
    const result = await fetchAPI({
        url: `${API}/api/posts`,
        method: "POST",
        headers: {
            "Authorization": token
        },
        body: {
            title, 
            body
        }
    })
    return result
}


// async function renderPostALL() {
//     const token = localStorage.getItem('token')
//     const result = await fetchAPI({
//         url: `${API}/api/posts`,
//         headers: {
//             "Authorization": token
//         }
//     })
//     return result
// }


// async function postsAllRequest (credentials) {
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "Post",
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(credentials)
//     })
//     const result = await response.json()
//     console.log(result)
//     return result
// }