var posts = []

var bookmarkedPost  = JSON.parse(localStorage.getItem("bookmarkedPost")) || [];
var bookmarked = document.querySelector('.bookmarked')
var postEl = document.querySelector('.posts')
var deleteEl = document.querySelector('.post-delete')
var editEl = document.querySelector('.post-edit')
var saveEl = document.querySelector('.post-save')
var userLogout = document.querySelector('.user-out')
var userProfile = document.querySelector('.user-name')

function createClonePosts(post) {
    let postTemplate = document.querySelector('#post-template');
    let postEl = postTemplate.content.cloneNode(true);
    postEl.querySelector('.post-item-title').textContent = post.title;
    postEl.querySelector('.post-item-description').textContent = post.body;

    let deleteEl = postEl.querySelector('.post-delete');
    deleteEl.dataset.todoId = post._id
    deleteEl.dataset.task = 'delete'
    deleteEl.addEventListener('click', (event) => {
        if(event.target.dataset.task === 'delete') {
            posts = posts.filter(item => item._id !== event.target.dataset.todoId)
            localStorage.setItem("posts", JSON.stringify(posts));
            renderPosts(posts, postEl)
            postsDelete(post._id)
        }
    })

    let editEl = postEl.querySelector('.post-edit');
    editEl.dataset.todoId = post._id
    editEl.dataset.task = 'edit'
    editEl.addEventListener('click', (event) => {
        let modalEl = document.querySelector('.modal-container');
        modalEl.classList.add('modal--active');

        if(event.target.dataset.todoId = post._id) { 
            id = post._id
            let modalEl = document.querySelector('.modal-container');
            modalEl.classList.add('modal--active');

            var modalForm = document.querySelector(".modal-form")
            var modalTitle = document.querySelector(".modal-form-title")
            var modalBody = document.querySelector(".modal-form-body")

            modalForm.addEventListener('submit', async event => {
                event.preventDefault()

                const credentials = {
                    title: modalTitle.value,
                    body: modalBody.value
                }
                const result = await updatedRequest(credentials, id)
                localStorage.setItem('token', result['Authorization'])
                // localStorage.setItem("token", JSON.parse(result`${Authorization}` ));
                renderPosts(posts)
            })
            modalForm.reset()
            let alert = document.querySelector('.alert')
            alert.classList.add('alerted')
        }
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
    deleteEl.dataset.task = 'deleted'
    return postEl
}
renderBookmarked(bookmarkedPost, bookmarked);

postsRequest().then(result => {
    var posts = (result.posts)
    renderPosts(posts)
    localStorage.setItem("posts", JSON.stringify(posts));
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

    if(clicked.dataset.task === 'deleted') {
        bookmarkedPost = bookmarkedPost.filter(item => item._id !== clicked.dataset.todoId)
        localStorage.setItem("bookmarkedPost", JSON.stringify(bookmarkedPost, bookmarked));
        renderBookmarked(bookmarkedPost, bookmarked);
    }

    // if(clicked.dataset.task === 'delete') {
    //     posts = posts.filter(item => item._id !== clicked.dataset.todoId)
    //     localStorage.getItem("posts", JSON.stringify(posts));
    //     postsDelete(posts)
    //     renderPosts(posts, postEl)
    // }
})

profileRequest().then(result => {
    userProfile.textContent = result.name;
})

userLogout.addEventListener('click', () => {
    localStorage.clear()
    window.location.href = "/index.html"
})
