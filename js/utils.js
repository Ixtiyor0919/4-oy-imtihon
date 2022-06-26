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

function renderPagination(totalResults) {
    let paginationContainer = document.querySelector('.todo-pagination')
    paginationContainer.innerHTML = null;

    let templatePageItem = document.querySelector('#pagination-item');
    let paginationFragment = new DocumentFragment()
    for(let i=1; i<= Math.ceil(totalResults / itemPerpage); i++) {
        let pageItem = templatePageItem.content.cloneNode(true);
        let itemEl = pageItem.querySelector('.page-item');
        let linkEl = pageItem.querySelector('.page-link');

        if(i == currentPage) {
            itemEl.classList.add('active');
        }else{
            itemEl.classList.remove('active');
        }
        
        linkEl.textContent = i;
        linkEl.dataset.pageId = i;
        linkEl.dataset.task = 'page';

        paginationFragment.appendChild(pageItem);
    }
    paginationContainer.appendChild(paginationFragment)
}

function renderPosts(post, totalResults = 0) {
    document.querySelector(".results").textContent = totalResults
    renderPagination(totalResults)
    postEl.innerHTML = null;
    if (!post || post.length <= 0) {
        let Not = document.createElement('p')
        Not.textContent = 'Movies Not Found';
        Not.className = 'fs-1 text-light text-center fw-bold';
        moviesRow.appendChild(Not)
    } else {
        let fragment = new DocumentFragment()
        post.forEach(item => {
            fragment.appendChild(createClonePosts(item))
        });

        postEl.appendChild(fragment)
    }
}
function renderPosts(post) {
    postEl.innerHTML = null;
    let fragment = new DocumentFragment()
    post.forEach(item => {
        fragment.appendChild(createClonePosts(item))
    });
    postEl.appendChild(fragment);
}
