var posts = []

const Limit = 10;
const currentPage = 1;
var bookmarked = document.querySelector('.bookmarked')
var postEl = document.querySelector('.posts')
var deleteEl = document.querySelector('.post-delete')
var editEl = document.querySelector('.post-edit')
var saveEl = document.querySelector('.post-save')
var userLogout = document.querySelector('.user-out')
var userProfile = document.querySelector('.user-name')
var loaderEl = document.querySelector(".loader")
var cancelBtn = document.querySelector('.modal-reset-btn')
var saveBtn = document.querySelector('.modal-save-btn')
var modalEl = document.querySelector('.modal-container');
var modalForm = document.querySelector('.modal-form');
var modalFormTitle = document.querySelector('.modal-form-title');
var modalFormBody = document.querySelector('.modal-form-body');
cancelBtn.dataset.task = 'close'
// saveBtn.dataset.task = 'save'

profileRequest().then(result => {
    userProfile.textContent = result.name;
})

userLogout.addEventListener('click', () => {
    localStorage.clear()
    window.location.href = "/index.html"
})

function createClonePosts(post) {
    let postTemplate = document.querySelector('#post-template');
    let postEl = postTemplate.content.cloneNode(true);
    postEl.querySelector('.post-item-title').textContent = post.title;
    postEl.querySelector('.post-item-description').textContent = post.body;

    let deleteEl = postEl.querySelector('.post-delete');
    deleteEl.dataset.postId = post._id
    deleteEl.dataset.task = 'delete-post'

    let editEl = postEl.querySelector('.post-edit');
    editEl.dataset.postId = post._id
    editEl.dataset.task = 'edit'

    let saveEl = postEl.querySelector('.post-save');
    saveEl.dataset.postId = post._id
    saveEl.dataset.task = 'save-post'
    return postEl
} 
renderPosts()
renderSavedPosts()

function createCloneBookmark(post) {
    let postTemplate = document.querySelector('#bookmarked-template');
    let postEl = postTemplate.content.cloneNode(true);
    postEl.querySelector('.post-item-title').textContent = post.title;
    postEl.querySelector('.post-item-description').textContent = post.body;

    let deleteEl = postEl.querySelector('.post-delete');
    deleteEl.dataset.postId = post._id
    deleteEl.dataset.task = 'delete-saved-post'
    return postEl
}

postsRequest().then(result => {
    var posts = (result.posts)
    renderPosts(posts) 
})

document.body.addEventListener('click', async (event) => {
    clicked = event.target;
    
    if(clicked.dataset.task == 'delete-post') {
        showLoader()
        const result = await deletePosts(clicked.dataset.postId)
        if(!result) return
        renderPosts()
        hideLoader()
    }

    if(clicked.dataset.task === 'edit') {
        const post = await getSinglePostRequest(clicked.dataset.postId)
        showModal(post)
    }

    if(clicked.dataset.task === 'close') {
        closeModal()
    }
    
    // if(clicked.dataset.task === 'save') {
    //     let modalEl = document.querySelector('.modal-container');
    //     modalEl.classList.remove('modal--active');
    // }
    
    
    if(clicked.dataset.task === "save-post") {
        const post = await getSinglePostRequest(clicked.dataset.postId)
        addPosts(post)
        renderSavedPosts()
    }

    if(clicked.dataset.task === 'delete-saved-post') {
        deleteSavedPosts(clicked.dataset.postId)
        renderSavedPosts()
    }

    if(clicked.dataset.task === 'page') {
        renderPosts(clicked.dataset.pageId)
    }
})

modalEl.addEventListener('submit', async (event) => {
    event.preventDefault()
    showLoader()
    const data = {
        _id: event.target.dataset.formId,
        title: modalFormTitle.value,
        body: modalFormBody.value
    }
    const result = await updatedPosts(data)
    hideLoader()
    if (!result) return
    closeModal()
    alert("Post successfully updated")
    renderPosts()
})

// document.onload.addEventListener()