const urlParams = new URLSearchParams(window.location.search)
const videoId = urlParams.get('v')

const videoWrap = document.querySelector('.video-container')
const videoList = document.querySelector('.video-list')

const homeBTN = document.querySelector('.home')

fetch('assets/json/videoData.json')
    .then(response => response.json())
    .then(videoData => {

        videoData = [...videoData].map((video, index) => ({ ...video, id: index }));

        const shuffledVideos = videoData.sort(() => Math.random() - .5)

        shuffledVideos.forEach(video => {
            const uniqueId = `video-${video.id}`

            if (uniqueId !== videoId) {
                const videoItem = document.createElement('div')
                videoItem.classList.add('videoItem')
                videoItem.id = uniqueId

                videoItem.innerHTML = `
                    <div class="video-wrapper">
                        <video muted onmouseover="this.play();this.currentTime=0;" onmouseout="this.pause()" poster="${video.thumbnail}">
                            <source src="${video.url}" type="video/mp4">
                        </video>
                        <img src="${video.thumbnail}">
                        <p class="duration">Loading...</p>
                    </div>
                    <div class="info">
                        <div>    
                            <h6 class="title">${video.title}</h6>

                            <div>
                                <p class="name">${video.name}</p>
                                <ul>
                                    <li class="views">1.1M views</li>
                                    <li class="date">1 hour ago</li>
                                </ul>
                            </div>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                    </div>
                `
                videoList.appendChild(videoItem)

                videoDuration(videoItem)

                const videoElem = document.getElementById(uniqueId);
                videoElem.addEventListener('click', () => {
                    window.location.href = `watch.html?v=${uniqueId}`;
                })
            } else {
                document.title = `${video.title} - Vitube`

                videoWrap.innerHTML = `
                    <video controls autoplay poster="${video.thumbnail}">
                        <source src="${video.url}">
                    </video>

                    <div class="info">
                        <h3>${video.title}</h3>
                    
                        <div class="owner-part">
                            <img src="${video.profile}">

                            <div class="info">
                                <p class="name">${video.name}</p>

                                <p class="subs">1.05M subscribers</p>
                            </div>

                            <input type="checkbox" id="sub-btn">

                            <label for="sub-btn" class="sub-lbl-for">
                                Subscribe
                            </label>

                            <div class="gap"></div>

                            <div class="likes">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="like-btn"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>

                                <p>973K</p>
                                    
                                <hr>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dislike-btn"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
                            </div>

                            <div class="share">
                            <svg version="1.1"
                                id="share" xmlns:svg="http://www.w3.org/2000/svg" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" inkscape:version="1.4 (86a8ad7, 2024-10-11)"
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
                                style="enable-background:new 0 0 24 24;" xml:space="preserve">
                                <style type="text/css">
                                    .st0{fill:none;stroke:#000000;stroke-width:1.9994;stroke-linecap:round;stroke-linejoin:round;}
                                </style>
                                <path id="path4" sodipodi:nodetypes="ccccccc" class="st0" d="M13.3,8.1C6.7,9,2.8,14.9,1.9,22.1c6.3-6.8,7.5-6.3,11.4-6.4V22
                                    l8.8-9.9L13.3,1.9V8.1z"/>
                            </svg>

                                <p>Share</p>
                            </div>

                            <div class="download">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>

                                <p>Download</p>
                            </div>

                            <input type="checkbox" id="more">
                            <label for="more" class="more">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>

                                <div class="more-opt">
                                    <div class="save">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit;"><path d="M18 4v15.06l-5.42-3.87-.58-.42-.58.42L6 19.06V4h12m1-1H5v18l7-5 7 5V3z"></path></svg>

                                        <p>Save</p>
                                    </div>

                                    <div class="report">
                                            <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="22" viewBox="0 0 24 24" width="22" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit;"><path d="m13.18 4 .24 1.2.16.8H19v7h-5.18l-.24-1.2-.16-.8H6V4h7.18M14 3H5v18h1v-9h6.6l.4 2h7V5h-5.6L14 3z"></path></svg>

                                        <p>Report</p>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div class="discription">
                            <input type="checkbox" id="dis-check">
                            <label for="dis-check" class="blank"></label>

                            <div class="dis-info">
                                <p>1.1M views</p>
                                <p>1 hour ago</p>
                            </div>

                            <div class="main-dis">
                                <p>Welcome to another exciting video! 🚀 Whether you stumbled upon this by accident or you’ve been waiting for it, you’re in for a treat. This video is packed with surprises, fun moments, and possibly a few things you never expected. What exactly is happening here? Well, that’s for you to find out! 🎥 We went all out to make sure this video is entertaining, engaging, and maybe even a little bit mind-blowing. From unexpected twists to creative edits, we guarantee you’ll be hooked until the very end. And if you think you’ve seen everything, think again! There’s always something new waiting around the corner. Make sure to watch closely—you might catch some hidden details that most people miss. If you spot something cool, drop a comment below! We love reading what you think and hearing your reactions. 💬 If you enjoy this video, don’t forget to hit that LIKE button 👍 and SUBSCRIBE for more awesome content! We post regularly, and trust us, you don’t want to miss what’s coming next. Turn on notifications 🔔 so you’ll be the first to know when we drop something new. Oh, and one more thing—SHARE this with your friends! You never know who might enjoy this just as much as you do. 🎉 Alright, enough talking. Sit back, relax, and enjoy the video! 🍿</p>
                            </div>

                            <div class="dis-other"></div>

                            <p class="dis-more">more...</p>
                        </div>

                        <div class="comment-list">
                            <div class="sort">
                                <h2>6,908 Comments</h2>

                                <div class="sort-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit;"><path d="M21 6H3V5h18v1zm-6 5H3v1h12v-1zm-6 6H3v1h6v-1z"></path></svg>

                                    <p>Sort by</p>
                                </div>
                            </div>

                            <div class="user-comment">
                                <img src="assets/image/user.jpg">

                                <div class="input-part">
                                    <input type="text" placeholder="Add a comment..." required>
                                </div>

                            </div>
                            
                            <div class="input-btn">
                                <span class="cancel">Cancel</span>
                                <span class="comment">Comment</span>
                            </div>

                            <div class="comment-item">
                                <img src="assets/image/person(1).jpg">

                                <div>
                                    <div class="top-com">
                                        <p class="name">@Geico.car.insurance</p>
                                        <p class="time">10 minutes ago</p>
                                    </div>

                                    <p>Wow, this video was absolutely amazing! I had no idea what to expect, but it completely blew my mind. The editing, the pacing, and the overall vibe were just perfect. I couldn’t stop watching! Definitely one of the best things I’ve seen today. Keep up the great work!</p>

                                    <div class="like">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-like-btn"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>

                                        <p>143K</p>
                                            
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-dislike-btn"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>

                                        <p class="reply">Reply</p>
                                    </div>

                                    <div class="replies">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>

                                        <p>Replies</p>
                                    </div>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </div>

                            <div class="comment-item">
                                <img src="assets/image/person(2).jpg">

                                <div>    
                                    <div class="top-com">
                                        <p class="name">@arif5892</p>
                                        <p class="time">10 minutes ago</p>
                                    </div>

                                    <p>I don’t even know how I ended up here, but I’m so glad I did! This was such a rollercoaster of emotions—one moment I was laughing, the next I was genuinely impressed. You’ve got some serious talent, and I can’t wait to see what you upload next!</p>

                                    <div class="like">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-like-btn"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
    
                                        <p>143K</p>
                                            
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-dislike-btn"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>
    
                                        <p class="reply">Reply</p>
                                    </div>

                                    <div class="replies">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>

                                        <p>Replies</p>
                                    </div>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </div>

                            <div class="comment-item">
                                <img src="assets/image/person(3).jpg">

                                <div>
                                    <div class="top-com">
                                        <p class="name">@sh1I3uya</p>
                                        <p class="time">10 minutes ago</p>
                                    </div>

                                    <p>This video had me hooked from start to finish! The effort that went into it is so clear, and it really paid off. I found myself watching it multiple times just to catch all the little details. Amazing work, truly!</p>

                                    <div class="like">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-like-btn"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>

                                        <p>143K</p>
                                            
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-dislike-btn"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>

                                        <p class="reply">Reply</p>
                                    </div>

                                    <div class="replies">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>

                                        <p>Replies</p>
                                    </div>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </div>

                            <div class="comment-item">
                                <img src="assets/image/person(4).jpg">

                                <div>
                                    <div class="top-com">
                                        <p class="name">@josemx4lif3</p>
                                        <p class="time">10 minutes ago</p>
                                    </div>

                                    <p>Okay, I have to admit, I was skeptical at first. But wow, you really pulled it off! The twists and turns in this video were so unexpected. I love how you kept me guessing the whole time. You’ve got a real knack for storytelling!</p>

                                    <div class="like">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-like-btn"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>

                                        <p>143K</p>
                                            
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-dislike-btn"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>

                                        <p class="reply">Reply</p>
                                    </div>

                                    <div class="replies">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>

                                        <p>Replies</p>
                                    </div>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </div>

                            <div class="comment-item">
                                <img src="assets/image/person(5).jpg">

                                <div>
                                    <div class="top-com">
                                        <p class="name">@brodzi.i</p>
                                        <p class="time">10 minutes ago</p>
                                    </div>

                                    <p>This is the kind of content that makes YouTube worth watching! So unique, so entertaining, and so well put together. You deserve way more views and subscribers for this level of creativity. Keep it up!</p>

                                    <div class="like">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-like-btn"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>

                                        <p>143K</p>
                                            
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="com-dislike-btn"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>

                                        <p class="reply">Reply</p>
                                    </div>

                                    <div class="replies">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>

                                        <p>Replies</p>
                                    </div>
                                </div>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                            </div>
                        </div>
                    </div>
                `

                const subBTN = document.getElementById('sub-btn')
                const subLblFor = document.querySelector('.sub-lbl-for')
                const like_btn = document.querySelector('.like-btn')
                const dislike_btn = document.querySelector('.dislike-btn')
                const dis_check = document.getElementById('dis-check')
                const dis_blank = document.querySelector('.blank')
                const discription = document.querySelector('.discription')
                const com_like = document.querySelectorAll('.com-like-btn')
                const com_dislike = document.querySelectorAll('.com-dislike-btn')
                const input_com = document.querySelector('.input-part input')
                const comment_com = document.querySelector('.comment-list .comment')
                const cancel_com = document.querySelector('.comment-list .cancel')
                const input_btn = document.querySelector('.comment-list .input-btn')

                input_com.addEventListener('click', () => {
                    input_com.setAttribute("placeholder", " ")
                    input_btn.style.display = "block"
                })

                input_btn.style.display = "none"

                cancel_com.addEventListener('click', () => {
                    input_com.setAttribute("placeholder", "Add a comment...")
                    input_com.value = ""
                    input_btn.style.display = "none"
                    comment_com.style.backgroundColor = ""
                    comment_com.style.color = ""
                })

                input_com.addEventListener('input', () => {
                    if (input_com.value.trim() !== "") {
                        comment_com.style.backgroundColor = "#065fd4"
                        comment_com.style.color = "white"
                    } else {
                        comment_com.style.backgroundColor = ""
                        comment_com.style.color = ""
                    }
                })

                like_btn.addEventListener('click', () => {
                    like_btn.classList.toggle('liked')
                    dislike_btn.classList.remove('disliked')
                })

                dislike_btn.addEventListener('click', () => {
                    dislike_btn.classList.toggle('disliked')
                    like_btn.classList.remove('liked')
                })

                com_like.forEach((like, index) => {
                    const dislike = com_dislike[index]

                    like.addEventListener('click', () => {
                        like.classList.toggle('liked')
                        dislike.classList.remove('disliked')
                    })

                    dislike.addEventListener('click', () => {
                        dislike.classList.toggle('disliked')
                        like.classList.remove('liked')
                    })
                })

                subBTN.addEventListener('change', () => {
                    if (subBTN.checked) {

                        subLblFor.setAttribute("for", "")

                        subLblFor.style.cssText = "max-width: 22px; overflow: hidden;"

                        subLblFor.innerHTML = `
                            <input type="checkbox" id="bell-part">
                            <label for="bell-part" class="bell-part">
                                <div class="bell" style="display:flex; align-items:center;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sub-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                                </div>

                                <p>Subscribe</p>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </label>

                            <div class="sub-options">
                                <div class="all">
                                    <svg version="1.1" baseProfile="basic" id="svg2" xmlns:svg="http://www.w3.org/2000/svg"
	                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
	                                    xml:space="preserve">
                                        <path id="path1" fill="black" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M18,8
                                            c0-3.3-2.7-6-6-6S6,4.7,6,8c0,7-3,9-3,9h18C21,17,18,15,18,8"/>
                                        <path id="path2" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M13.7,21
                                            c-0.6,1-1.8,1.3-2.7,0.7c-0.3-0.2-0.6-0.4-0.7-0.7"/>
                                        <path id="path3" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19,1.7
                                            c1.2,1.2,2.2,2.6,2.3,5 M5,1.7c-1.2,1.2-2.2,2.6-2.3,5"/>
                                    </svg>

                                    <p>All</p>
                                </div>

                                <div class="personalized">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>

                                    <p>Personalized</p>
                                </div>

                                <div class="none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell-off"><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>

                                    <p>None</p>
                                </div>

                                <label for="sub-btn" class="unsub">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-minus"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="23" y1="11" x2="17" y2="11"></line></svg>

                                    <p>Unsubscribe</p>
                                </label>
                            </div>
                        `

                        const sub_bell = subLblFor.querySelector('.sub-bell')

                        sub_bell.addEventListener('animationend', () => {
                            subLblFor.style.cssText += "animation: sub-expand ease-in-out 1s forwards;"
                        })

                        const bell_part = document.getElementById('bell-part')

                        bell_part.addEventListener('change', () => {
                            if (bell_part.checked) {
                                subLblFor.style.overflow = ""
                            } else {
                                subLblFor.style.overflow = "hidden"
                            }
                        })

                        const bell_change = document.querySelector('.bell-part .bell')
                        const bell_all = document.querySelector('.sub-options .all')
                        const bell_per = document.querySelector('.sub-options .personalized')
                        const bell_none = document.querySelector('.sub-options .none')

                        bell_all.addEventListener('click', () => {
                            bell_change.innerHTML = `
                                <svg version="1.1" baseProfile="basic" id="svg2" xmlns:svg="http://www.w3.org/2000/svg"
                                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24"
                                    xml:space="preserve">
                                    <path id="path1" fill="black" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M18,8
                                        c0-3.3-2.7-6-6-6S6,4.7,6,8c0,7-3,9-3,9h18C21,17,18,15,18,8"/>
                                    <path id="path2" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M13.7,21
                                        c-0.6,1-1.8,1.3-2.7,0.7c-0.3-0.2-0.6-0.4-0.7-0.7"/>
                                    <path id="path3" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M19,1.7
                                        c1.2,1.2,2.2,2.6,2.3,5 M5,1.7c-1.2,1.2-2.2,2.6-2.3,5"/>
                                </svg>
                            `
                        })

                        bell_per.addEventListener('click', () => {
                            bell_change.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>`
                        })

                        bell_none.addEventListener('click', () => {
                            bell_change.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell-off"><path d="M13.73 21a2 2 0 0 1-3.46 0"></path><path d="M18.63 13A17.89 17.89 0 0 1 18 8"></path><path d="M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"></path><path d="M18 8a6 6 0 0 0-9.33-5"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
                        })
                    } else {
                        subLblFor.setAttribute("for", "sub-btn");

                        subLblFor.innerHTML = "Subscribe"

                        subLblFor.style.overflow = "hidden"
                    }
                })

                const dis_more = document.querySelector('.dis-more')
                const main_dis_p = document.querySelector('.main-dis p')
                const dis_other = document.querySelector('.dis-other')

                main_dis_p.style.cssText = `
                    -webkit-line-clamp: 1;  
                    line-clamp: 1;
                `

                dis_check.addEventListener("change", () => {
                    if (dis_check.checked) {

                        dis_blank.style.cssText = "pointer-events: none;"

                        dis_more.innerHTML = `<label for="dis-check" class="dis-less">Show less</label>`
                        main_dis_p.style.cssText = ""

                        dis_other.style.cssText = "margin-top: 30px; margin-bottom: 50px;"

                        dis_other.innerHTML = `
                            <div class="transcript">
                                <h3>Transcript</h3>

                                <p>Follow along using the transcript</p>

                                <span class="show">Show transcript</span>
                            </div>

                            <div class="owner-part">
                                <img src="${video.profile}">

                                <div class="info">
                                    <p class="name">${video.name}</p>

                                    <p class="subs">1.05M subscribers</p>
                                </div>
                            </div>

                            <div class="owner-btns">
                                <div class="videos">
                                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit;"><path d="m10 8 6 4-6 4V8zm11-5v18H3V3h18zm-1 1H4v16h16V4z"></path></svg>

                                    Videos
                                </div>

                                <div class="about">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" style="pointer-events: none; display: inherit;"><path d="M4 20h14v1H3V6h1v14zM6 3v15h15V3H6zm2.02 14c.36-2.13 1.93-4.1 5.48-4.1s5.12 1.97 5.48 4.1H8.02zM11 8.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0zm3.21 3.43A3.507 3.507 0 0017 8.5C17 6.57 15.43 5 13.5 5S10 6.57 10 8.5c0 1.69 1.2 3.1 2.79 3.43-3.48.26-5.4 2.42-5.78 5.07H7V4h13v13h-.01c-.38-2.65-2.31-4.81-5.78-5.07z"></path></svg>

                                    About
                                </div>
                            </div>
                        `
                    } else {

                        main_dis_p.style.cssText = `
                            -webkit-line-clamp: 1;
                            line-clamp: 1;
                        `

                        dis_blank.style.cssText = "pointer-events: fill;"
                        dis_more.innerHTML = "more..."

                        dis_other.innerHTML = ""

                        dis_other.style.cssText = ""
                    }
                })
            }
        })
    })

homeBTN.addEventListener('click', () => {
    window.location.href = 'index.html'
})

function videoDuration(videoItem) {
    const videoElement = videoItem.querySelector('.video-wrapper video')
    const durationContainer = videoItem.querySelector('.duration')

    videoElement.addEventListener('loadedmetadata', () => {
        durationContainer.textContent = durationFormat(videoElement.duration)
    })
}

const leadZero = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
})

function durationFormat(time) {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time / 60) % 60
    const hours = Math.floor(time / 3600)

    if (hours === 0) {
        return `${minutes}:${leadZero.format(seconds)}`
    } else {
        return `${hours}:${leadZero.format(minutes)}:${leadZero.format(seconds)}`
    }
}
