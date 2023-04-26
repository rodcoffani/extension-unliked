videos = [];

let testCurrentPage = () => {
    let urlSearchParam = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlSearchParam.entries());
    playlist = window.location.pathname === '/playlist' ? params.list : undefined;
}

let selectVideos = new Promise((resolve, reject) => {
    setTimeout(() => {
        videos = document.querySelectorAll('ytd-playlist-video-renderer');
        resolve();
    }, 2000);
});

let main = () => {
    if(playlist !== 'LL') {
        return;
    }
    selectVideos
        .then(() => {
            if(videos.length > 0) {
                videos[0].children.content.insertAdjacentHTML('afterend', 
                `<style>
                    .ytd-playlist-video-list-renderer:hover > .unlike-div {
                        display: flex;
                    }
                    .unlike-div {
                        cursor: pointer;
                        display: none;
                        align-items: center;
                        justify-content: center;
                        border-radius: 9999px;
                        transition: all 0.2s ease-out;
                    }
                    .unlike-div:active {
                        background-color: #3D3D3D;
                    }
                </style>`
                );
                videos.forEach((video, index) => {
                    video.children.content.insertAdjacentHTML('afterend', 
                        `<div class="unlike-div" id="unlike-div-${index}" style="height:40px; width:40px;">
                            <div id="unlike-btn" style="height:24px; width:24px;">
                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;">
                                <g class="style-scope yt-icon">
                                    <path fill="white" d="M12.7,12l6.6,6.6l-0.7,0.7L12,12.7l-6.6,6.6l-0.7-0.7l6.6-6.6L4.6,5.4l0.7-0.7l6.6,6.6l6.6-6.6l0.7,0.7L12.7,12z" class="style-scope yt-icon"></path>
                                </g>
                            </svg>
                            </div>
                        </div>
                        `
                    );
                    document.getElementById(`unlike-div-${index}`).addEventListener('click', () => {
                        // Simulates a click on menu button (twice to open and close the menu)
                        // This updates the context of the floating menu to the current video
                        video.children.menu.children[0].children.button.click();
                        video.children.menu.children[0].children.button.click();

                        // Simulates a click on the remove button in the floating menu
                        setTimeout(() => {
                            document.querySelectorAll('tp-yt-paper-listbox')[1].children[4].click();
                        }, 100);
                    });
                });
            }
        });
}

testCurrentPage();
main();
