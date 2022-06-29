const key = "savedPosts"

function getAllPosts() {
    const allString = localStorage.getItem(key) || "[]"
    return JSON.parse(allString)
}

function setAllPosts(posts) {
    localStorage.setItem(key, JSON.stringify(posts))
}

function addPosts(post) {
    const posts = getAllPosts()
    if(!posts.find(item => item._id == post._id)) {
        posts.push(post)
    }else {
        alert("Sizda bu post saqlangan")
    }
    setAllPosts(posts)
}

function deleteSavedPosts(id) {
    const posts = getAllPosts()
    const newPosts = posts.filter(item => item._id != id)
    setAllPosts(newPosts);
}
