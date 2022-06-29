async function renderPosts(current = 1) {
    const { posts, totalResults } = await getPostsRequest(current)
    // document.querySelector(" .results").textContent = totalResults
    renderPagination(totalResults)
    postEl.innerHTML = null;
    if (!posts || posts.length <= 0) {
        let Not = document.createElement('p')
        Not.textContent = 'Posts Not Found';
        Not.className = 'fs-1 text-light text-center fw-bold';
        postEl.appendChild(Not)
    } else {
        let fragment = new DocumentFragment()
        posts.forEach(item => {
            fragment.appendChild(createClonePosts(item))
        });

        postEl.appendChild(fragment)
    }
}

async function renderSavedPosts() {
    const postWithId = getAllPosts()
    bookmarked.innerHTML = null;
    let fragment = new DocumentFragment()
    if(postWithId && postWithId.length > 0) {
        postWithId.forEach(item => {
            fragment.appendChild(createCloneBookmark(item))
        });
        bookmarked.appendChild(fragment);
    }
    else {
        bookmarked.textContent = "Sizda saqlangan postlar yo'q"
    }
}

function renderPagination(totalResults) {
    let paginationContainer = document.querySelector('.todo-pagination')
    paginationContainer.innerHTML = null;

    let templatePageItem = document.querySelector('#pagination-item');
    let paginationFragment = new DocumentFragment()
    for(let i=1; i <= totalResults / Limit; i++) {
        let pageItem = templatePageItem.content.cloneNode(true);
        let itemEl = pageItem.querySelector('.page-item');
        let linkEl = pageItem.querySelector('.page-link');

        if(i == currentPage) {
            itemEl.classList.add('.page--active');
        }else{
            itemEl.classList.remove('.page--active');
        }
        
        linkEl.textContent = i;
        linkEl.dataset.pageId = i;
        linkEl.dataset.task = 'page';

        paginationFragment.appendChild(pageItem);
    }
    paginationContainer.appendChild(paginationFragment)
    // let paginationNextItemEl = templatePageItem.content.cloneNode(true)
    // let pageNextItem = paginationNextItemEl.querySelector('.page-item')
    // let linkEl = paginationNextItemEl.querySelector(".page-link")
    // if (Math.ceil(countTodos / itemsPerPage) == currentPage) {
    //     pageNextItem.classList.add("disabled")
    // } else {
    //     pageNextItem.classList.remove("disabled")
    // }
    // linkEl.textContent = "Next"
    // linkEl.dataset.task = 'next-page'
    // paginationContainer.appendChild(paginationNextItemEl)
}

function showLoader() {
    loaderEl.classList.remove("loader__hide")
    loaderEl.classList.add("showed")
}

function hideLoader() {
    loaderEl.classList.add("loader__hide")
    loaderEl.classList.remove("showed")
}

function renderModal(modal) {
    let modalEl = document.querySelector('.modal-container');
    let modalContent = modalEl.querySelector('.modal-content');
    modalContent.innerHTML = null;
    modalContent.appendChild(modal);    
    return modalEl
}

function showModal(post) {
    var modalEl = document.querySelector('.modal-container');
    modalEl.classList.add('show--modal')
    modalEl.querySelector('.modal-form-title').value = post.title
    modalEl.querySelector('.modal-form-body').value = post.body
    modalEl.querySelector('.modal-form').dataset.formId = post._id
}

function closeModal() {
    modalEl.classList.remove('show--modal')
    modalForm.reset()
}