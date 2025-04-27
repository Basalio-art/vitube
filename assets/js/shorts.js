const urlParams = new URLSearchParams(window.location.search);
const shortsId = urlParams.get("v");

const container = document.querySelector(".container");
const homeBTN = document.querySelectorAll(".home");
const commentContainer = document.querySelector(".commentContainer");
const isTyping = document.activeElement.tagName === 'INPUT'
commentContainer.style.right = "-100%";

let currentVideo = null
let userInteracted = false

fetch("https://raw.githubusercontent.com/Basalio-art/vitube/refs/heads/main/assets/json/shortsData.json")
    .then((res) => res.json())
    .then((shortsData) => {
        shortsData = shortsData.map((shorts, index) => ({ ...shorts, id: `shorts-${index}` }));

        const shortsShuffled = [...shortsData].sort(() => Math.random() - 0.6);
        const shortsList = document.querySelector(".shortsList");
        const commentMiddle = document.querySelector(".commentContainer .middle");

        let commentOffset = 0;
        const COMMENTS_PER_LOAD = 20;
        let commentObserver;

        const loadComment = () => {
            const commentData = commentMiddle.itemData;
            const nextComments = commentData.slice(commentOffset, commentOffset + COMMENTS_PER_LOAD);

            nextComments.forEach(comment => {
                const commentItem = document.createElement('div');
                commentItem.classList.add('commentItem');

                commentItem.innerHTML = `
                    <img src='${comment.author_thumbnail}' alt='author'>
                    <div>
                        <p class='author'>${comment.author} <span>${comment._time_text}</span></p>
                        <div class="textContainer">
                            <p class="text">${comment.text}</p>
                            <p class="clampBtn"></p>
                        </div>
                        <div class="likes">
                            <div class="like">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M8 21V9.282c0-.834.26-1.647.745-2.325L13 1l.551.331c1.153.691 1.705 2.065 1.351 3.362L14 8h5.192c.827 0 1.609.376 2.125 1.022.711.888.795 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H8ZM4.5 9C3.672 9 3 9.672 3 10.5v9c0 .828.672 1.5 1.5 1.5H7V9H4.5Z"></path></svg>
                                <p></p>
                            </div>
                            <div class="dislike">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M16 3v11.718c0 .834-.26 1.647-.745 2.325L11 23l-.551-.331c-1.153-.691-1.705-2.065-1.351-3.362L10 16H4.808c-.827 0-1.609-.376-2.125-1.022-.711-.888-.795-2.125-.209-3.101L3 11l-.165-.413c-.519-1.296-.324-2.769.514-3.885L3.5 6.5V6c0-1.657 1.343-3 3-3H16Zm3 12c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2h-2v12h2Z"></path></svg>
                            </div>
                            <p>Reply</p>
                        </div>
                        <div class="replies">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                            <p><span></span>replies</p>
                        </div>
                    </div>
                `;

                setTimeout(() => {
                    const commentText = commentItem.querySelector('.text')
                    const textHeight = commentText.clientHeight
                    const textContainer = commentItem.querySelector('.textContainer')
                    const clampBtn = textContainer.querySelector('.clampBtn')

                    if (textHeight > 92) {
                        commentText.classList.add('clamp')
                        clampBtn.innerHTML = 'Read more'
                        commentText.style.height = '92px'

                        clampBtn.addEventListener('click', () => {

                            if (clampBtn.textContent === 'Read less') {
                                clampBtn.innerHTML = 'Read more'
                                commentText.style.height = '92px'
                                setTimeout(() => {
                                    commentText.classList.add('clamp')
                                }, 1000)
                            } else {
                                clampBtn.innerHTML = 'Read less'
                                commentText.style.height = 'auto'
                                commentText.classList.remove('clamp')
                            }
                        })
                    }
                }, 500);
                const comLikeCount = commentItem.querySelector('.like p')

                if (comment.like_count === 0) {
                    comLikeCount.textContent = ''
                } else {
                    comLikeCount.textContent = `${likesFormatNum(comment.like_count)}`
                }

                const author_thumbnail = commentItem.querySelector('img');
                author_thumbnail.onerror = () => {
                    author_thumbnail.src = 'assets/image/unnamed.jpg';
                };

                commentMiddle.appendChild(commentItem);
            });

            commentOffset += nextComments.length;

            if (commentOffset < commentData.length) {
                commentObserver.observe(commentMiddle.lastChild);
            }
        };

        const likesFormatNum = (num) => {
            if (num >= 1e9) {
                return (num / 1e9).toFixed(1) + "B"
            } else if (num >= 1e6) {
                return (num / 1e6).toFixed(1) + "M"
            } else if (num >= 1e3) {
                return (num / 1e3).toFixed(1) + "K"
            } else {
                return num.toString()
            }
        }

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {
                const commentIndex = entry.target.querySelector(".commentIcon p").textContent;

                const video = entry.target.querySelector("video");
                const title = entry.target.querySelector(".title");
                const featherPlay = entry.target.querySelector('.vidTop .feather-play')
                const featherPause = entry.target.querySelector('.vidTop .feather-pause')
                const middlePlay = entry.target.querySelector('.vidMiddle .feather-play')
                const middlePause = entry.target.querySelector('.vidMiddle .feather-pause')
                const volumeSlider = entry.target.querySelector('.volumeSlider')
                const volumeContainer = entry.target.querySelector('.volumeContainer')
                const fullscreenBtn = entry.target.querySelector('.fullscreenBtn')
                const maximize = entry.target.querySelector('.feather-maximize')
                const minimize = entry.target.querySelector('.feather-minimize')
                const vidTop = entry.target.querySelector('.vidTop')

                let mouseTimeout

                if (entry.isIntersecting) {
                    video.play();
                    video.currentTime = 0;
                    document.title = `${title.innerHTML} - Vitube`;
                    document.querySelector(".comments-number").textContent = commentIndex;
                    commentMiddle.scrollTop = 0
                    currentVideo = video

                    fullscreenBtn.addEventListener('click', toggleFullscreen)


                    video.addEventListener('mousemove', () => {
                        vidTop.style.display = 'flex'
                        video.style.cursor = 'default'
                        vidTop.style.opacity = '1'
                        clearTimeout(mouseTimeout)

                        mouseTimeout = setTimeout(() => {
                            vidTop.style.display = 'flex'
                            video.style.cursor = 'none'
                            vidTop.style.opacity = '0'
                            setTimeout(() => {
                                vidTop.style.display = 'none'
                            }, 200)
                        }, 2000)
                    })

                    const vidTopChildren = vidTop.childNodes

                    vidTopChildren.forEach(child => {
                        child.addEventListener('mouseenter', () => {
                            clearTimeout(mouseTimeout)
                        })
                    })

                    container.addEventListener('fullscreenchange', () => {
                        container.classList.toggle('fullscreen', document.fullscreenElement)
                        maximize.classList.toggle('hide')
                        minimize.classList.toggle('hide')

                        if (document.fullscreenElement) {
                            container.style.paddingLeft = '0px'
                        } else {
                            container.style.paddingLeft = '250px'
                            document.getElementById('menu').checked = false
                        }
                    })

                    volumeSlider.addEventListener('input', (e) => {
                        video.volume = e.target.value
                        video.muted = e.target.value === 0
                    })

                    video.addEventListener('volumechange', () => {
                        volumeSlider.value = video.volume
                        console.log(video.volume)

                        let volumeLevel
                        if (video.muted || video.volume === 0) {
                            volumeSlider.value = 0
                            volumeLevel = 'muted'
                        } else if (video.volume >= .5) {
                            volumeLevel = 'high'
                        } else {
                            volumeLevel = 'low'
                        }

                        volumeContainer.dataset.volumeLevel = volumeLevel
                    })

                    video.addEventListener('play', () => {
                        featherPlay.classList.add('hidden')
                        featherPause.classList.remove('hidden')

                        if (userInteracted) {
                            middlePlay.classList.add('appear')
                            setTimeout(() => {
                                middlePlay.classList.remove('appear')
                            }, 1000)
                        }

                        userInteracted = false
                    })

                    video.addEventListener('pause', () => {
                        featherPause.classList.add('hidden')
                        featherPlay.classList.remove('hidden')

                        if (userInteracted) {
                            middlePause.classList.add('appear')
                            setTimeout(() => {
                                middlePause.classList.remove('appear')
                            }, 1000)
                        }

                        userInteracted = false
                    })

                    const commentData = entry.target.itemData.comments;
                    commentMiddle.innerHTML = '';
                    commentMiddle.itemData = commentData;
                    commentOffset = 0;
                    loadComment();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.6 });

        commentObserver = new IntersectionObserver(entries => {
            const lastComment = entries[0];
            if (!lastComment.isIntersecting) return;
            commentObserver.unobserve(lastComment.target);
            loadComment();
        }, { rootMargin: "500%" });

        const numberFormat = (number) => {
            return number.toLocaleString(number);
        };

        shortsShuffled.forEach((shorts) => {
            const shortsItem = document.createElement("div");
            shortsItem.classList.add("shortsItem");
            shortsItem.itemData = shorts;

            shortsItem.innerHTML = `                                                                                                                                
                <div>
                    <video loop poster="${shorts.thumbnail}">
                        <source src="${shorts.url}">
                    </video>
                    <div class="timeline-container">
                        <img class="thumbnail-preview">
                        <div class="timeline">
                            <img class="preview-img">
                            <div class="thumb-indicator"></div>
                        </div>
                    </div>
                    <div class="vidTop">
                        <button class="play-pause">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        </button>
                        <div class="volumeContainer" data-volume-level="high">
                            <button class="volume">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-1"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path style="fill: none;" d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                            </button>
                            <input type="range" min="0" max="1" step="any" value="1" class="volumeSlider">
                        </div>
                        <div class="gap"></div>
                        <button class="fullscreenBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-maximize"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-minimize hide"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>
                        </button>
                    </div>
                    <div class="vidMiddle">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                        </div>
                    <div class="info">
                        <div class="owner">                                                                                                                             
                            <img src="${shorts.profile}">
                            <p>@${shorts.owner}</p>
                            <button>Subscribe</button>
                        </div>
                        <p class="titleContainer">
                            <span class="title">${shorts.title}</span>${shorts.hashtags}
                        </p>
                    </div>
                </div>
                <div class="side">
                    <div class="like">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M8 21V9.282c0-.834.26-1.647.745-2.325L13 1l.551.331c1.153.691 1.705 2.065 1.351 3.362L14 8h5.192c.827 0 1.609.376 2.125 1.022.711.888.795 2.125.209 3.101L21 13l.165.413c.519 1.296.324 2.769-.514 3.885l-.151.202v.5c0 1.657-1.343 3-3 3H8ZM4.5 9C3.672 9 3 9.672 3 10.5v9c0 .828.672 1.5 1.5 1.5H7V9H4.5Z"></path></svg>                                                                                                                             
                        </div>
                        <p>Like</p>                                                                                                                             
                    </div>
                    <div class="dislike">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M16 3v11.718c0 .834-.26 1.647-.745 2.325L11 23l-.551-.331c-1.153-.691-1.705-2.065-1.351-3.362L10 16H4.808c-.827 0-1.609-.376-2.125-1.022-.711-.888-.795-2.125-.209-3.101L3 11l-.165-.413c-.519-1.296-.324-2.769.514-3.885L3.5 6.5V6c0-1.657 1.343-3 3-3H16Zm3 12c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2h-2v12h2Z"></path></svg>
                        </div>
                        <p>Dislike</p>
                    </div>
                    <div class="commentIcon">
                        <div class="commentBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path clip-rule="evenodd" d="M21 5c0-1.105-.895-2-2-2H5c-1.105 0-2 .895-2 2v12c0 1.105.895 2 2 2h12l3.146 3.146c.315.315.854.092.854-.353V5ZM7 9c0-.552.448-1 1-1h8c.552 0 1 .448 1 1s-.448 1-1 1H8c-.552 0-1-.448-1-1Zm1 3c-.552 0-1 .448-1 1s.448 1 1 1h5c.552 0 1-.448 1-1s-.448-1-1-1H8Z" fill-rule="evenodd"></path></svg>                                                                                                                             
                        </div>
                        <p>${numberFormat(shorts.comments.length)}</p>
                    </div>
                    <div class="share">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="m13.202 3.368 9.438 7.865c.48.4.48 1.137 0 1.537l-9.438 7.865c-.652.543-1.64.08-1.64-.768V16H9.957c-2.778 0-5.406 1.263-7.141 3.432-.304.38-.912.086-.803-.388l1.118-4.843C3.968 10.572 7.2 8 10.926 8h.636V4.137c0-.848.989-1.311 1.64-.769Z"></path></svg>
                        </div>
                        <p>Share</p>
                    </div>
                    <div class="more">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                        </div>
                    </div>
                    <div class="audioUse">
                        <img src="${shorts.profile}">
                    </div>
                </div>
            `;

            const vidlike = shortsItem.querySelectorAll('.side .like')
            const vidDislike = shortsItem.querySelectorAll('.side .dislike')
            const subBtn = shortsItem.querySelector('.info button')

            subBtn.addEventListener('click', () => {
                subBtn.classList.toggle('sub')
            })

            vidlike.forEach((like, index) => {
                const dislike = vidDislike[index]

                like.addEventListener('click', () => {
                    like.classList.toggle('liked')
                    dislike.classList.remove('disliked')
                })

                dislike.addEventListener('click', () => {
                    dislike.classList.toggle('disliked')
                    like.classList.remove('liked')
                })
            })



            if (shortsId === shorts.id) {
                shortsList.appendChild(shortsItem);
            } else {
                setTimeout(() => {
                    shortsList.appendChild(shortsItem);
                }, 100);
            }

            setTimeout(() => {
                observer.observe(shortsItem);
            }, 150);
        });

        setTimeout(() => {
            const videos = document.querySelectorAll('.shortsItem video')
            const playPauseBtn = document.querySelectorAll('.play-pause')
            const muteBtn = document.querySelectorAll('.vidTop .volume')

            muteBtn.forEach(btn => {
                btn.addEventListener('click', toggleMute)
            })

            playPauseBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    userInteracted = true
                    playPause(currentVideo)
                })
            })

            videos.forEach(video => {
                video.addEventListener('click', () => {
                    userInteracted = true
                    playPause(currentVideo)
                })
            })
        }, 500)

        setTimeout(() => {
            const arrows = document.querySelectorAll(".arrows svg");

            arrows.forEach((arrow) => {
                arrow.addEventListener("click", () => {
                    if (arrow.id == "arrow-up") {
                        container.scrollTop -= container.clientHeight;
                    } else {
                        container.scrollTop += container.clientHeight;
                    }
                });
            });

            const commentButtons = document.querySelectorAll(".commentBtn");
            const commentX = document.querySelector(".comment-x");

            commentX.addEventListener("click", () => {
                commentContainer.style.right = "-100%";
                container.style.paddingRight = "0px";
            });

            commentButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    commentContainer.style.right = "120px";
                    container.style.paddingRight = "620px";
                });
            });

            const shortsLength = container.scrollHeight - container.clientHeight;

            container.addEventListener("scroll", () => {
                const scrollPos = container.scrollTop;
                const arrowUp = document.getElementById("arrow-up");
                const arrowDown = document.getElementById("arrow-down");

                arrowUp.classList.toggle("onTop", scrollPos <= 0);
                arrowDown.classList.toggle("onBottom", shortsLength <= scrollPos);
            });
        }, 500);
    });

homeBTN.forEach((home) => {
    home.addEventListener("click", () => {
        window.location.href = "index";
    });
});

const menu = document.getElementById("menu");
container.style.paddingLeft = "250px";

menu.addEventListener("change", () => {
    container.style.paddingLeft = menu.checked ? "0px" : "250px";
});

const playPause = (video) => {
    if (!video) return
    video.paused ? video.play() : video.pause()
}

const toggleMute = () => {
    currentVideo.muted = !currentVideo.muted
}

window.addEventListener('keydown', (e) => {
    const isTyping = document.activeElement.tagName === 'INPUT'

    if (isTyping) return

    switch (e.key) {
        case 'Tab':
        case ' ':
            e.preventDefault()
            break
    }

    switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
            userInteracted = true
            playPause(currentVideo)
            break
        case 'm':
            toggleMute()
            break
        case 'f':
            toggleFullscreen()
            break
    }
})

const commentInput = document.getElementById('comment')
const commentCancelBtn = document.querySelector('.commentContainer .bottom .cancel')
const commentSendBtn = document.querySelector('.commentContainer .bottom .comment')

commentInput.addEventListener('input', () => {
    if (commentInput.value.trim() !== "") {
        commentSendBtn.classList.add('active')
    } else {
        commentSendBtn.classList.remove('active')
    }
})

commentCancelBtn.addEventListener('click', () => {
    commentInput.value = ""
    commentSendBtn.classList.remove('active')
})

const toggleFullscreen = () => {
    if (document.fullscreenElement == null) {
        container.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
