window.addEventListener('DOMContentLoaded', () => {

    // Get DOM elements
    const start = document.querySelector('.content__start');
    const settings = document.querySelector('.settings');
    const info = document.querySelector('.content__info');
    const goBack = document.querySelector('.content__back');
    const volumeOn = document.querySelector('.icon-volume-up');
    const volumeOff = document.querySelector('.icon-volume-off');
    const settingsIcon = document.querySelector('.icon-cog');
    const infoIcon = document.querySelector('.icon-info');
    const cycles = document.querySelector('.cycles');
    let setTime = document.querySelector('.settings__input--time').value;
    let setBreak = document.querySelector('.settings__input--break').value;
    let setCycles = document.querySelector('.settings__input--cycles').value;
    const saveSettings = document.querySelector('.settings__save');
    const countdown = document.querySelector('.content__countdown');


    // Variables
    let volume = true;
    let setTimeInSeconds = setTime * 60;
    let setBreakInSeconds = setBreak * 60;
    let cycleCounter = 0;
    const audioElement = new Audio('sound.mp3');
    const workSpan = '<span class="content__current">' + 'Time:' + '</span>' + '<br>';
    const breakSpan = '<span class="content__current">' + 'Break:' + '</span>' + '<br>';


    // Functions
    const toggleClass = function (item, func) {
        func === "hide" ? item.classList.add('hidden') : item.classList.remove('hidden')
    }

    const convertSeconds = function (s) {
        const min = Math.floor(s / 60) < 10 ? '0' + Math.floor(s / 60) : Math.floor(s / 60);
        const sec = s % 60 < 10 ? '0' + s % 60 : s % 60;
        return min + ':' + sec;

    }

    const showSpan = function (name, time) {
        countdown.innerHTML = name + convertSeconds(time);
    }

    const showCycleCounter = function () {
        cycleCounter++;
        if (cycleCounter === 1) {
            cycles.innerHTML = "1st";
        } else if (cycleCounter === 2) {
            cycles.innerHTML = "2nd";
        } else if (cycleCounter === 3) {
            cycles.innerHTML = "3rd";
        } else {
            cycles.innerHTML = `${cycleCounter}th`;
        }
    }

    const playAudio = function () {
        if (volume === true) {
            setTimeout(() => audioElement.play(), 1);
        }
    }

    const updateTime = function () {
        setTime = document.querySelector('.settings__input--time').value;
        setBreak = document.querySelector('.settings__input--break').value;
        setCycles = document.querySelector('.settings__input--cycles').value;
        setTimeInSeconds = setTime * 60;
        setBreakInSeconds = setBreak * 60;
    }

    const countdownTimeoutFunction = function () {
        alert("It's break time!");
        runBreak();
        showSpan(breakSpan, setBreakInSeconds)
    }

    const breakTimeoutFunction = function () {
        alert(`You finished: ${cycleCounter} cycle's`);
        if (cycleCounter < setCycles) {
            updateTime()
            runCountdown();
            showSpan(workSpan, setTimeInSeconds)
        } else {
            countdown.innerHTML = '<a href="https://pomodorot.netlify.app/" class="content__done">' + "Done!" + '</a>';
        }
    }

    //Main interval
    const intervalFunction = function (spanName, time) {
        const interval = setInterval(() => {
            --time;
            showSpan(spanName, time)
            if (time === 0) {
                playAudio()
                clearInterval(interval);
                setTimeout(() => {
                    spanName === workSpan ? countdownTimeoutFunction() : breakTimeoutFunction()
                }, 500)
            }
        }, 1000);
    }

    //Countdown functionality
    const runBreak = function () {
        intervalFunction(breakSpan, setBreakInSeconds)
    }

    const runCountdown = function () {
        showCycleCounter()
        intervalFunction(workSpan, setTimeInSeconds)
    }

    // Events
    infoIcon.addEventListener('click', () => {
        toggleClass(start, 'hide')
        toggleClass(settings, 'hide')
        toggleClass(info, 'show')
    })
    goBack.addEventListener('click', () => {
        toggleClass(start, 'show')
        toggleClass(info, 'hide')
    })
    settingsIcon.addEventListener('click', () => {
        toggleClass(start, 'hide')
        toggleClass(info, 'hide')
        toggleClass(settings, 'show')
    })
    saveSettings.addEventListener('click', () => {
        updateTime()
        toggleClass(start, 'show')
        toggleClass(settings, 'hide')
    })
    volumeOn.addEventListener('click', () => {
        volume = false;
        toggleClass(volumeOn, 'hide')
        toggleClass(volumeOff, 'show')
    })
    volumeOff.addEventListener('click', () => {
        volume = true;
        toggleClass(volumeOn, 'show')
        toggleClass(volumeOff, 'hide')
    })
    start.addEventListener('click', () => {
        toggleClass(start, 'hide')
        toggleClass(settingsIcon, 'hide')
        toggleClass(infoIcon, 'hide')
        showSpan(workSpan, setTimeInSeconds)
        runCountdown();
    })
});