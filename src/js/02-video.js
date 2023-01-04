import Player from '@vimeo/player';
const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const LOCALE_STORAGE_KEY = 'videoplayer-current-time';

const timeOfPlaying = localStorage.getItem(LOCALE_STORAGE_KEY);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify(data.seconds));
}

player
  .setCurrentTime(timeOfPlaying)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
