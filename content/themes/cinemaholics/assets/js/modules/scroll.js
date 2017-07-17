let newsContainer = document.querySelector('#news'),
    postsContainer = document.querySelector('#content');


window.addEventListener('scroll', () => {
    if (newsContainer) {
        let newsBottom = newsContainer.getBoundingClientRect().bottom;

        if (newsBottom < 0) {
            postsContainer.classList.add('full');
        } else {
            postsContainer.classList.remove('full');
        }
    }
})