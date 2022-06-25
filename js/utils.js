function renderPosts(post) {
    postEl.innerHTML = null;
    let fragment = new DocumentFragment()
    post.forEach(item => {
        fragment.appendChild(createClonePosts(item))
    });
    postEl.appendChild(fragment);
}

function renderModal(modal) {
    let modalEl = document.querySelector('.modal-container');
    let modalContent = modalEl.querySelector('.modal-content');
    modalContent.innerHTML = null;
    modalContent.appendChild(modal);    
    return modalEl
}

function renderBookmarked(post) {
    bookmarked.innerHTML = null;
    let fragment = new DocumentFragment()
    post.forEach(item => {
        fragment.appendChild(createCloneBookmark(item))
    });
    bookmarked.appendChild(fragment);
}
