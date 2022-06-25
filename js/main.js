var posts = []

var postEl = document.querySelector('.posts')
var deleteEl = document.querySelector('.post-delete')
var editEl = document.querySelector('.post-edit')
var saveEl = document.querySelector('.post-save')

function createClonePosts(post) {
    let postTemplate = document.querySelector('#post-template');
    let postEl = postTemplate.content.cloneNode(true);
    postEl.querySelector('.post-item-title').textContent = post.title;
    postEl.querySelector('.post-item-description').textContent = post.body;

    let deleteEl = postEl.querySelector('.post-delete');
    deleteEl.dataset.todoId = post._id
    deleteEl.dataset.task = 'delete'
    let editEl = postEl.querySelector('.post-edit');
    editEl.dataset.todoId = post._id
    editEl.dataset.task = 'edit'
    let saveEl = postEl.querySelector('.post-save');
    saveEl.dataset.todoId = post._id
    saveEl.dataset.task = 'save'
    return postEl
}

postsRequest().then(result => {
    var posts = (result.posts)
    renderPosts(posts)
})

document.body.addEventListener("click", (event) => {
    let clicked = event.target
    
    if(clicked.dataset.task === 'delete') {
        console.log(clicked);
        posts = posts.filter(post => post._id = clicked.dataset.todoId)
        postsDelete(posts);
        renderPosts(posts)
    }
})