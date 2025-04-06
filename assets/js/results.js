const urlParams = new URLSearchParams(window.location.search);
const searchRes = urlParams.get('search_query');
document.title = `${searchRes} - Vitube`;

const searchTerm = searchRes.toLowerCase();
const video_list = document.querySelector('.video-list');

const homeBTN = document.querySelector('.home')

if (!video_list) {
    console.error("Error: .video-list element not found.");
} else {
    fetch('https://basalio-art.github.io/vitube/assets/json/videoData.json')
        .then(res => res.json())
        .then(videoData => {

            videoData = videoData.map((video, index) => ({ ...video, id: index }))

            let foundVideos = false;

            videoData.forEach(video => {
                const found = video.title.toLowerCase().includes(searchTerm) ||
                    video.name.toLowerCase().includes(searchTerm);

                if (found) {
                    foundVideos = true;
                    createVideoCard(video);
                }
            });

            if (!foundVideos) {
                displaynores();
                displayvid(videoData);
            }
        })
}

function createVideoCard(video) {
    const uniqueId = `video-${video.id}`

    const videoItem = document.createElement('div');
    videoItem.classList.add('videoItem');
    videoItem.id = uniqueId

    videoItem.innerHTML = `
        <div class="video-wrapper">
            <video muted onmouseover="this.play();this.currentTime=0;" onmouseout="this.pause()" poster="${video.thumbnail}">
                <source src="${video.url}" type="video/mp4">
            </video>
            <img src="${video.thumbnail}">
            <p class="duration">Loading...</p> <!-- Placeholder duration -->
        </div>
        <div class="info">
            <div>    
                <h6 class="title">${video.title}</h6>
                <div>
                    <ul>
                        <li class="views">1.1M views</li>
                        <li class="date">1 hour ago</li>
                    </ul>
                    <div class="vid-owner">
                        <img src="${video.profile}">
                        <p class="name">${video.name}</p>
                    </div>
                    <div class="dis">
                        <p>Welcome to another exciting video! 🚀 Whether you stumbled upon this by accident or you’ve been waiting for it, you’re in for a treat. This video is packed with surprises, fun moments, and possibly a few things you never expected. What exactly is happening here? Well, that’s for you to find out! 🎥 We went all out to make sure this video is entertaining, engaging, and maybe even a little bit mind-blowing. From unexpected twists to creative edits, we guarantee you’ll be hooked until the very end. And if you think you’ve seen everything, think again! There’s always something new waiting around the corner. Make sure to watch closely—you might catch some hidden details that most people miss. If you spot something cool, drop a comment below! We love reading what you think and hearing your reactions. 💬 If you enjoy this video, don’t forget to hit that LIKE button 👍 and SUBSCRIBE for more awesome content! We post regularly, and trust us, you don’t want to miss what’s coming next. Turn on notifications 🔔 so you’ll be the first to know when we drop something new. Oh, and one more thing—SHARE this with your friends! You never know who might enjoy this just as much as you do. 🎉 Alright, enough talking. Sit back, relax, and enjoy the video! 🍿</p>
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
            </svg>
        </div>
    `;

    video_list.appendChild(videoItem);

    const videoElem = document.getElementById(uniqueId);
    videoElem.addEventListener('click', () => {
        window.location.href = `watch.html?v=${uniqueId}`;
    })

    const videoElement = videoItem.querySelector("video");
    const durationContainer = videoItem.querySelector(".duration");

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

function displayvid(videoData) {
    const shuffledVideos = [...videoData].sort(() => Math.random() - 0.5);
    shuffledVideos.forEach(video => {
        createVideoCard(video)
    });
}

function displaynores() {
    video_list.innerHTML += `<p class="nores">No result: <i>"${searchTerm}"</i></p>`


}

homeBTN.addEventListener('click', () => {
    window.location.href = 'https://basalio-art.github.io/vitube'
})

document.getElementById('search').value = searchRes
