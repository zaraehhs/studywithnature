const soundData = [
    {
        imgUrl: 'images/soft-rain.jpg',
        imgDescription: 'A scene of light rain during the day in a residential neighborhood and a distant figure ahead is walking with an umbrella.',
        soundUrl: 'https://audio.jukehost.co.uk/xcb125pumHo2Lw4S9bEzfuSsWTToAmva',
        soundTitle: 'Soft Rain',
        soundSubtitle: 'Cozy Downpour',
    },
    {
        imgUrl: 'images/rain-and-thunder.jpg',
        imgDescription: 'A close up scene of a window with raindrops on the window pane overlooking a dark and gloomy sky with dense clouds.',
        soundUrl: 'https://audio.jukehost.co.uk/OFAwwnonDnu0eNi6wbAFEF7C0ZHNTTxeh',
        soundTitle: 'Rain & Thunder',
        soundSubtitle: 'Embracing the Storm',
    },
    {
        imgUrl: 'images/calm-waves.jpg',
        imgDescription: 'A closeup scene of the beach and calm beach waves during the day.',
        soundUrl: 'https://audio.jukehost.co.uk/OgulFZmCpzhomsAsnaWAIJ02BtFnP3gI',
        soundTitle: 'Calm Waves',
        soundSubtitle: 'A Day by the Ocean',
    },
    {
        imgUrl: 'images/campfire.jpg',
        imgDescription: 'A closeup of a campfire burning during the day surrounded by dense forest trees in the background.',
        soundUrl: 'https://audio.jukehost.co.uk/VQHB0H4Uz5SnJfnznuvGe7BWyLCBlQ07',
        soundTitle: 'Campfire',
        soundSubtitle: 'Finding Solace by the Campfire',
    },
    {
        imgUrl: 'images/forest.jpg',
        imgDescription: 'A scene of an enchanting forest with sunlight peeking through the trees and fluffy green and yellow grass.',
        soundUrl: 'https://audio.jukehost.co.uk/28zsHlunydp6wUgQahr8aTXcFyNa0dch',
        soundTitle: 'Forest',
        soundSubtitle: 'Symphony of the Woods',
    },
    {
        imgUrl: 'images/birds.jpg',
        imgDescription: 'A closeup of a bird in mid-flight with its wings open eating from a group of hanging berries. The background is pink.',
        soundUrl: 'https://audio.jukehost.co.uk/iHA1C4FAgkeCxt9DvGmBjgllP9ALocFf',
        soundTitle: 'Birds Chirping',
        soundSubtitle: 'Morning Serenade: Birds at Play',
    },
    {
        imgUrl: 'images/snowfall.jpg',
        imgDescription: 'In the midst of a snowstorm stands a long and blue cylinder shaped house with three floors surrounded by inches of snow and forest trees.',
        soundUrl: 'https://audio.jukehost.co.uk/aRFcxDzq9wlEnYwx2GBVqquYob7ekWw7',
        soundTitle: 'Snowfall',
        soundSubtitle: 'Snowed In',
    },
];
let isMenuOpen = false;

function generateSoundsList(soundsListElementId) {
    const soundsList = document.querySelector(`#${soundsListElementId}`);
    if (soundsList && !soundsList.innerHTML) {
        for (let i = 0; i < soundData.length; i++) {
            const li = `<li data-sound-id=${i} class="list-sound-item" onclick="playSelectedSound(${i})">
                            <img class="list-sound-image box-shadow" src="${soundData[i].imgUrl}" alt="${soundData[i].imgDescription}">
                            <div>
                                <p class="margin-none padding-none">${soundData[i].soundTitle}</p>
                                <p class="list-sound-subtitle text-subtitle margin-none text-opacity">${soundData[i].soundSubtitle}</p>
                            </div>
                        </li>`;
            soundsList.innerHTML += li;
        };
        selectMenuItem(0);
    }
}

function createDesktopMenu() {
    generateSoundsList('desktop-sounds-list');
}

function selectMenuItem(id) {
    document.querySelectorAll('li').forEach(li => {
        if (Number(li.dataset.soundId) === id) {
            li.classList.add('active');
            // scroll selected sound into view within desktop menu without entire page scrolling down
            let soundsList = document.querySelector('#desktop-sounds-list');
            soundsList.scrollTop = li.offsetTop - soundsList.offsetTop;
        } else {
            li.classList.remove('active');
        }
    });
}

function openMobileMenu() {
    const mobileSoundsMenu = document.getElementById('mobile-sounds-menu');
    mobileSoundsMenu.style.display = 'block';
    mobileSoundsMenu.style.width = "75%";
    document.getElementsByTagName('main')[0].classList.add('blur');
    document.getElementsByTagName('body')[0].style.overflow = "hidden";
    generateSoundsList('mobile-sounds-list');
    document.addEventListener('click', (e) => {
        const menuIcon = document.getElementById('menu-icon');
        const closeBtn = document.getElementsByClassName('closebtn')[0];
        if (isMenuOpen && e.target !== mobileSoundsMenu && e.target !== closeBtn && e.target !== menuIcon) {
            closeMobileMenu();
        }
    });
    isMenuOpen = true;
}

function closeMobileMenu() {
    document.getElementById('mobile-sounds-menu').style.display = 'none';
    document.getElementsByTagName('main')[0].classList.remove('blur');
    isMenuOpen = false;
}

function playPause(e) {
    const state = document.querySelector('#play-pause > span').innerHTML;
    const audio = document.querySelector('#sound-audio');
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
    document.querySelector('.sound-subtitle').innerHTML = soundData[newSoundId].soundSubtitle;
    document.querySelector('#sound-audio').src = soundData[newSoundId].soundUrl;
    document.querySelector('#sound-audio').dataset.soundId = newSoundId;
}

function playPrevious(e) {
    const soundId = Number(document.querySelector('#sound-audio').dataset.soundId);
    let newSoundId = soundId;
    if (soundId === 0) {
        newSoundId = soundData.length - 1;
    } else {
        newSoundId -= 1;
    }
    updateSoundInfo(newSoundId);
    changeBackgroundColors();
    selectMenuItem(newSoundId);
    document.querySelector('#sound-audio').play();
    document.querySelector('#play-pause > span').innerHTML = 'pause';
}

function playNext(e) {
    const soundId = Number(document.querySelector('#sound-audio').dataset.soundId);
    let newSoundId = soundId;
    if (soundId === soundData.length - 1) {
        newSoundId = 0;
    } else {
        newSoundId += 1;
    }
    updateSoundInfo(newSoundId);
    changeBackgroundColors();
    selectMenuItem(newSoundId);
    document.querySelector('#sound-audio').play();
    document.querySelector('#play-pause > span').innerHTML = 'pause';
}

function playSelectedSound(id) {
    const mobileSoundsMenu = document.getElementById('mobile-sounds-menu');
    if (mobileSoundsMenu.style.display === 'block') {
        closeMobileMenu();
    }
    updateSoundInfo(id);
    changeBackgroundColors();
    selectMenuItem(id);
    document.querySelector('#sound-audio').play();
    document.querySelector('#play-pause > span').innerHTML = 'pause';
}

function changeVolume(e) {
    const audio = document.querySelector('#sound-audio');
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
createDesktopMenu();