fetch('https://raw.githubusercontent.com/Basalio-art/vitube/refs/heads/main/assets/json/videoData.json')
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
                    <video class="videoPlayback" muted poster="${video.thumbnail}">
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </div>
            `
            const videoReview = videoItem.querySelector('video')
            const videoThumbnail = videoItem.querySelector('img')

            let timeOutPlay
            let timeOutPause

            videoItem.addEventListener('mouseenter', () => {
                clearTimeout(timeOutPause)
                timeOutPlay = setTimeout(() => {
                    videoReview.play()
                    videoThumbnail.style.opacity = 0;
                }, 1000)
            })

            videoItem.addEventListener('mouseleave', () => {
                clearTimeout(timeOutPlay)
                videoReview.pause()
                videoThumbnail.style.opacity = 1
                timeOutPause = setTimeout(() => {
                    videoReview.pause()
                    videoReview.currentTime = 0
                    videoThumbnail.style.opacity = 1
                }, 1000)
            })

            videoContainer.appendChild(videoItem)

            videoDuration(videoItem)

            const videoElem = document.getElementById(uniqueId)
            videoElem.addEventListener('click', () => {
                window.location.href = `watch?v=${uniqueId}`
            })
        })
    })



fetch('https://raw.githubusercontent.com/Basalio-art/vitube/refs/heads/main/assets/json/shortsData.json')
    .then(res => res.json())
    .then(shortsData => {
        shortsData = [...shortsData].map((shorts, index) => ({ ...shorts, id: index }))

        const videoShortsContainer = document.querySelector('.video-shorts-container')
        const carousel = videoShortsContainer.querySelector('.carousel')

        const shuffledShorts = [...shortsData].sort(() => Math.random() - .6)

        shuffledShorts.forEach(shorts => {
            const uniqueid = `shorts-${shorts.id}`
            const shortsItem = document.createElement('div')
            shortsItem.classList.add('shortItem')
            shortsItem.id = uniqueid

            shortsItem.innerHTML = `
                <div class="shorts-wrapper">
                    <video muted poster="${shorts.thumbnail}">
                        <source src="${shorts.url}" type="video/mp4">
                    </video>
                    <img src="${shorts.thumbnail}">
                </div>
                <div class="info">
                <div class="title-wrapper">
                    <p class="title">
                        ${shorts.title}<br>
                        ${shorts.hashtags}
                    </p>
                    <p class="views">
                        ${shorts.views} views
                    </p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-more-vertical">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                </svg>
                </div>
            `

            const shortsReview = shortsItem.querySelector('video')
            const shortsThumbnail = shortsItem.querySelector('img')
            
            let timeoutShortPause

            shortsItem.addEventListener('mouseenter', () => {
                shortsReview.play()
                shortsReview.currentTime = 0
                shortsThumbnail.style.opacity = 0
                timeoutShortPause = setTimeout(() => {
                    shortsReview.pause()
                    shortsThumbnail.style.opacity = 1
                }, 5000)
            })

            shortsItem.addEventListener('mouseleave', () => {
                clearTimeout(timeoutShortPause)
                shortsReview.pause()
                shortsThumbnail.style.opacity = 1
                setTimeout(() => {
                    shortsReview.pause()
                    shortsThumbnail.style.opacity = 1
                })
            })

            carousel.appendChild(shortsItem)

            const shortsElem = document.getElementById(`${uniqueid}`)

            shortsElem.addEventListener('click', () => {
                window.location.href = `shorts?v=${uniqueid}`
            })
        })
    })




function videoDuration(videoItem) {
    const videoElement = videoItem.querySelector('.videoPlayback')
    const durationContainer = videoItem.querySelector('.duration')

    videoElement.addEventListener('loadedmetadata', () => {
        durationContainer.textContent = durationFormat(videoElement.duration)
    })

    videoElement.addEventListener('timeupdate', () => {
        const remainingTime = videoElement.duration - videoElement.currentTime
        durationContainer.textContent = durationFormat(remainingTime)
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

document.addEventListener('mouseenter', () => {
    const videoItem = document.querySelectorAll('.videoItem')

    videoItem.forEach(item => {
        const thumbnail = item.querySelector('img')

        item.addEventListener('mouseenter', () => {
            const canvas = document.createElement('canvas')
            const c = canvas.getContext('2d')
            const img = new Image()

            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                c.drawImage(img, 0, 0)
                const imageData = c.getImageData(0, 0, canvas.width, canvas.height).data

                let r = 0, g = 0, b = 0


                for (let i = 0; i < imageData.length; i += 4) {
                    r += imageData[i]
                    g += imageData[i + 1]
                    b += imageData[i + 2]
                }

                const avgR = Math.floor(r / (imageData.length / 4))
                const avgG = Math.floor(g / (imageData.length / 4))
                const avgB = Math.floor(b / (imageData.length / 4))

                item.style.backgroundColor = `rgb(${avgR}, ${avgG}, ${avgB}, .2)`
            }

            img.src = thumbnail.src
        })

        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = ''

            timeOutBg = setTimeout(() => {
                item.style.backgroundColor = ''
            })
        })
    })
})