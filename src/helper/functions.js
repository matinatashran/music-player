// This function set seconds to down format
// Example: input => 190 / output => 03:10
export function formatDuration(value) {
    const minutes = Math.floor(value / 60);
    const seconds = (value - (minutes * 60)).toFixed(0);
    return `${minutes ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

// ####################################

// This function get duration of music and return it
export async function getDuration(url) {
    return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.preload = "metadata";
        audio.onloadedmetadata = function () {
            resolve(Math.floor(audio.duration));
        };
    });
}

// ####################################

// This function shuffle an array and return it
export function shuffle(array){
    return array.sort(() => Math.random() - 0.5);
}
