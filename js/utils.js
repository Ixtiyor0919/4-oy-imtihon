function renderPosts(post) {
    postEl.innerHTML = null;
    let fragment = new DocumentFragment()
    post.forEach(item => {
        fragment.appendChild(createClonePosts(item))
    });
    postEl.appendChild(fragment);
}
