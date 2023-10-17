const soundData = [
    {
        imgUrl: 'images/birds.jpg',
        imgDescription: 'Morning Serenade: Backyard Birds at Play',
        soundUrl: 'https://audio.jukehost.co.uk/iHA1C4FAgkeCxt9DvGmBjgllP9ALocFf',
        soundTitle: 'Birds Chirping',
    },
    {
        imgUrl: 'images/calm-waves.jpg',
        imgDescription: 'A Day by the Ocean',
        soundUrl: 'https://audio.jukehost.co.uk/OgulFZmCpzhomsAsnaWAIJ02BtFnP3gI',
        soundTitle: 'Calm Waves',
    },
    {
        imgUrl: 'images/campfire.jpg',
        imgDescription: 'Finding Solace by the Campfire',
        soundUrl: 'https://audio.jukehost.co.uk/VQHB0H4Uz5SnJfnznuvGe7BWyLCBlQ07',
        soundTitle: 'Campfire',
    },
    {
        imgUrl: 'images/forest.jpg',
        imgDescription: 'Symphony of the Woods',
        soundUrl: 'https://audio.jukehost.co.uk/28zsHlunydp6wUgQahr8aTXcFyNa0dch',
        soundTitle: 'Forest',
    },
    {
        imgUrl: 'images/rain-and-thunder.jpg',
        imgDescription: 'Embracing the Storm',
        soundUrl: 'https://audio.jukehost.co.uk/OFAwwnonDnu0eNi6wbAFEF7C0ZHNTTxeh',
        soundTitle: 'Rain & Thunder',
    },
    {
        imgUrl: 'images/snowfall.jpg',
        imgDescription: 'Snowed In',
        soundUrl: 'https://audio.jukehost.co.uk/aRFcxDzq9wlEnYwx2GBVqquYob7ekWw7',
        soundTitle: 'Snowfall',
    },
    {
        imgUrl: 'images/soft-rain.jpg',
        imgDescription: 'Cozy Downpour',
        soundUrl: 'https://audio.jukehost.co.uk/xcb125pumHo2Lw4S9bEzfuSsWTToAmva',
        soundTitle: 'Soft Rain',
    },
];
let isMenuOpen = false;

function loadSoundsList() {
    const soundsList = document.querySelector('#sounds-list');
    for (let i = 0; i < soundData.length; i++) {
        const li = `<li data-sound-id=${i} class="list-sound-item" onclick="playSelectedSound(${i})">
                        <img class="list-sound-image" src="${soundData[i].imgUrl}">
                        <div>
                            <p class="list-sound-title">${soundData[i].soundTitle}</p>
                            <p class="list-image-description">${soundData[i].imgDescription}</p>
                        </div>
                    </li>`;
        soundsList.innerHTML += li;
    };
}

function openSoundsMenu() {
    const mobileSoundsMenu = document.getElementById('mobile-sounds-menu');
    mobileSoundsMenu.style.display = 'block';
    mobileSoundsMenu.style.width = "75%";
    document.getElementsByTagName('main')[0].classList.add('blur');
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
    const soundsList = document.querySelector('#mobile-sounds-list');
    if (soundsList && !soundsList.innerHTML) {
        for (let i = 0; i < soundData.length; i++) {
            // TODO: create separate function that populates sounds list; also used in loadSoundsList()
            const li = `<li data-sound-id=${i} class="list-sound-item" onclick="playSelectedSound(${i})">
                            <img class="list-sound-image" src="${soundData[i].imgUrl}">
                            <div>
                                <p class="list-sound-title">${soundData[i].soundTitle}</p>
                                <p class="list-image-description">${soundData[i].imgDescription}</p>
                            </div>
                        </li>`;
            soundsList.innerHTML += li;
        };
    }
    document.addEventListener('click', (e) => {
        const menuIcon = document.getElementById('menu-icon');
        const closeBtn = document.getElementsByClassName('closebtn')[0];
        if (isMenuOpen && e.target !== mobileSoundsMenu && e.target !== closeBtn && e.target !== menuIcon) {
            closeSoundsMenu();
        }
    });
    isMenuOpen = true;
}

function closeSoundsMenu() {
    document.getElementById('mobile-sounds-menu').style.display = 'none';
    document.getElementsByTagName('main')[0].classList.remove('blur');
    isMenuOpen = false;
}

function playPause(e) {
    const state = document.querySelector('#play-pause > span').innerHTML;
    const audio = document.querySelector('audio');
    if (state === 'play_arrow') {
        audio.play();
        document.querySelector('#play-pause > span').innerHTML = 'pause';
    } else if (state === 'pause') {
        audio.pause();
        document.querySelector('#play-pause > span').innerHTML = 'play_arrow';
    }
}

function updateSoundInfo(newSoundId) {
    document.querySelector('.sound-image').src = soundData[newSoundId].imgUrl;
    document.querySelector('.sound-image').alt = soundData[newSoundId].imgDescription;
    document.querySelector('.sound-title').innerHTML = soundData[newSoundId].soundTitle;
    document.querySelector('.image-description').innerHTML = soundData[newSoundId].imgDescription;
    document.querySelector('audio').src = soundData[newSoundId].soundUrl;
    document.querySelector('audio').dataset.soundId = newSoundId;
}

function playPrevious(e) {
    const soundId = Number(document.querySelector('audio').dataset.soundId);
    let newSoundId = soundId;
    if (soundId === 0) {
        newSoundId = soundData.length - 1;
    } else if (soundId === soundData.length - 1) {
        newSoundId = 0;
    } else {
        newSoundId += 1;
    }
    updateSoundInfo(newSoundId);
    changeBackgroundColors();
    document.querySelector('audio').play();
    document.querySelector('#playPause > i').innerHTML = 'pause';
}

function playNext(e) {
    const soundId = Number(document.querySelector('audio').dataset.soundId);
    let newSoundId = soundId;
    if (soundId === soundData.length - 1) {
        newSoundId = 0;
    } else {
        newSoundId += 1;
    }
    updateSoundInfo(newSoundId);
    changeBackgroundColors();
    document.querySelector('audio').play();
    document.querySelector('#play-pause > span').innerHTML = 'pause';
}

function playSelectedSound(id) {
    const mobileSoundsMenu = document.getElementById('mobile-sounds-menu');
    if (mobileSoundsMenu.style.display === 'block') {
        closeSoundsMenu();
    }
    updateSoundInfo(id);
    changeBackgroundColors();
    document.querySelector('audio').play();
    document.querySelector('#play-pause > span').innerHTML = 'pause';
}

function changeVolume(e) {
    const audio = document.querySelector('audio');
    audio.volume = this.value;
}

const playPauseButton = document.querySelector('#play-pause');
const previousButton = document.querySelector('#previous');
const nextButton = document.querySelector('#next');
const volumeInput = document.querySelector('#volume-input');
playPauseButton.addEventListener('click', playPause);
previousButton.addEventListener('click', playPrevious);
nextButton.addEventListener('click', playNext);
volumeInput.addEventListener('change', changeVolume);
loadSoundsList();