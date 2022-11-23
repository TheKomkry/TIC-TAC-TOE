document.getElementById('board-size').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        document.getElementById('play-button').click();
    }
});
document.getElementById('win-condition').addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        document.getElementById('play-button').click();
    }
});
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27) {
        document.getElementById('show-hide-gui').click();
    }
});