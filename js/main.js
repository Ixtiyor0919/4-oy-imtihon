var posts = []

var bookmarkedPost  = JSON.parse(localStorage.getItem("bookmarkedPost")) || [];
var bookmarked = document.querySelector('.bookmarked')
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
    deleteEl.addEventListener('click', (event) => {
        if(event.target.dataset.todoId = post._id) {
            renderPosts(posts)
            postsDelete(post._id); 
        }
    })
    renderPosts(posts)

    let editEl = postEl.querySelector('.post-edit');
    editEl.dataset.todoId = post._id
    editEl.dataset.task = 'edit'
    editEl.addEventListener('click', (event) => {
        if(event.target.dataset.task = 'edit') {
            updatedRequest(post._id)
        }
        let modalEl = document.querySelector('.modal-container');
        modalEl.classList.add('modal--active');
        console.log(event.target);
        var modalForm = document.querySelector(".modal-form")
        var modalTitle = document.querySelector(".modal-form-title")
        var modalBody = document.querySelector(".modal-form-body")
        if(event.target.dataset.todoId == post._id) { 
            id = post._id
        }
        modalForm.addEventListener('submit', async event => {
            event.preventDefault()

            const credentials = {
                title: modalTitle.value,
                body: modalBody.value
            }
            const result = await updatedRequest(credentials, id)
            localStorage.setItem('token', result['Authorization'])
            // const data = await loginRequest(credentials)
            // const { token } = result
            localStorage.setItem("token", token);
            renderPosts()
        })
    })

    let saveEl = postEl.querySelector('.post-save');
    saveEl.dataset.todoId = post._id
    saveEl.dataset.task = 'save'
    saveEl.addEventListener("click", (event) => {
        // if(!bookmarkedPost.find(item => item._id == event.target.dataset.todoId)) {
        //     const post = posts.find((post) => post._id == event.target.dataset.todoId);
        //     bookmarkedPost.push(post);
        //     event.target.disabled = true
        if(event.target.dataset.todoId = post._id) {
            bookmarkedPost.push(post);
            renderBookmarked(bookmarkedPost, bookmarked);
        }
        localStorage.setItem("bookmarkedPost", JSON.stringify(bookmarkedPost));
        renderBookmarked(bookmarkedPost, bookmarked);
    })
    return postEl
}

function createCloneBookmark(post) {
    let postTemplate = document.querySelector('#bookmarked-template');
    let postEl = postTemplate.content.cloneNode(true);
    postEl.querySelector('.post-item-title').textContent = post.title;
    postEl.querySelector('.post-item-description').textContent = post.body;

    let deleteEl = postEl.querySelector('.post-delete');
    deleteEl.dataset.todoId = post._id
    deleteEl.dataset.task = 'delete'
    return postEl
}
renderBookmarked(bookmarkedPost, bookmarked);

postsRequest().then(result => {
    var posts = (result.posts)
    renderPosts(posts)
})

var cancelBtn = document.querySelector('.modal-reset-btn')
var saveBtn = document.querySelector('.modal-save-btn')
cancelBtn.dataset.task = 'cancel'
saveBtn.dataset.task = 'save'

document.body.addEventListener('click', (event) => {
    clicked = event.target;

    if(clicked.dataset.task === 'cancel') {
        let modalEl = document.querySelector('.modal-container');
        modalEl.classList.remove('modal--active');
    }

    if(clicked.dataset.task === 'save') {
        let modalEl = document.querySelector('.modal-container');
        modalEl.classList.remove('modal--active');
    }

    if(clicked.dataset.task === 'delete') {
        bookmarkedPost = bookmarkedPost.filter(item => item._id !== clicked.dataset.todoId)
        localStorage.setItem("bookmarkedPost", JSON.stringify(bookmarkedPost, bookmarked));
        renderBookmarked(bookmarkedPost, bookmarked);
    }
})