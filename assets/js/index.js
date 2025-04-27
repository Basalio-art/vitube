const clr_search_btn = document.querySelector(".feather-x");
const search_input = document.getElementById("search");
const search_btn = document.querySelector(".feather-search");

const encodeFormatData = (value) => {
    return encodeURIComponent(value).replace(/%20/g, "+")
}

clr_search_btn.addEventListener("click", () => {
    search_input.value = "";
});

search_input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const searchTerm = search_input.value.trim();
        if (searchTerm) {
            window.location.href = `results?search_query=${encodeFormatData(searchTerm)}`;
        }
    }
});

search_btn.addEventListener("click", () => {
    const searchTerm = search_input.value.trim();
    if (searchTerm) {
        window.location.href = `results?search_query=${encodeFormatData(searchTerm)}`;
    }
});

document.body.style.overflow = "hidden";

window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    document.body.style.overflow = "";
    loader.classList.add("loaderHidden");
    loader.addEventListener("transitionend", () => {
        document.body.removeChild(loader);
    });
});

const shorts = document.querySelectorAll(".shorts");

shorts.forEach((shorts) => {
    shorts.addEventListener("click", () => {
        window.location.href = "shorts";
    });
});

console.log("%c Made by basalio ", "font-size:50px;color:lime;");
