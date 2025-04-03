const clr_search_btn = document.querySelector('.feather-x');
const search_input = document.getElementById('search');
const search_btn = document.querySelector('.feather-search');

clr_search_btn.addEventListener('click', () => {
    search_input.value = "";
});

search_input.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const searchTerm = search_input.value.trim();
        if (searchTerm) {
            window.location.href = `result.html?search_query=${encodeURIComponent(searchTerm)}`;
        }
    }
});

search_btn.addEventListener('click', () => {
    const searchTerm = search_input.value.trim();
    if (searchTerm) {
        window.location.href = `result.html?search_query=${encodeURIComponent(searchTerm)}`;
    }
})


console.log('%c Made by basalio ', 'font-size:50px;color:lime;');