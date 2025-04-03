fetch('https://basalio-art.github.io/Vitube/videoData.json')
    .then(response => response.json())
    .then(videoData => {

        videoData = [...videoData].map((video, index) => ({ ...video, id: index }))

        const videoContainer = document.querySelector('.videoLists')

        const shuffledVideos = [...videoData].sort(() => Math.random() - .6)

        shuffledVideos.forEach(video => {
            const uniqueId = `video-${video.id}`

            const videoItem = document.createElement('div')
            videoItem.classList.add('videoItem')
            videoItem.id = uniqueId
            videoItem.innerHTML = `
                <div class="video-wrapper">
                    <video class="videoPlayback" muted onmouseover="this.play(); this.currentTime=0;" onmouseout="this.pause()" poster="${video.thumbnail}">
                        <source src="${video.url}" type="video/mp4">
                    </video>
                    <img src="${video.thumbnail}">
                    <p class="duration">Loading...</p>
                </div>
                <div class="info">
                    <img class="profile" src="${video.profile}">
                    <div class="details">
                        <h5>${video.title}</h5>
                        <div>
                            <p class="name">${video.name}</p>
                            <ul>
                                <li class="views">1.1M views</li>
                                <li class="date">1 hour ago</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `

            videoContainer.appendChild(videoItem)

            videoDuration(videoItem)

            const videoElem = document.getElementById(uniqueId)
            videoElem.addEventListener('click', () => {
                window.location.href = `watch?v=${uniqueId}`
            })
        })
    })

function videoDuration(videoItem) {
    const videoElement = videoItem.querySelector('.videoPlayback')
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
