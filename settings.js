function ShowHideGui(state){
    let button = document.getElementById('show-hide-gui');
    let elem = document.getElementById('settings-gui');
    if (document.body.clientWidth > document.body.clientHeight){
        if (elem.style.right == '0px' || state == 'hide') {
            elem.style.right = -(elem.clientWidth * 0.85)+"px";
            button.innerHTML = "‹";
            elem.classList.add('settings-label');
            document.querySelectorAll('[tabindex]').forEach(e => {
                e.setAttribute('tabindex', '-1');
            });
        } else if (elem.style.right == -(elem.clientWidth * 0.85)+"px" || state == 'show') { //‹ › « »
            elem.style.right = '0px';
            button.innerHTML = "›";
            elem.classList.remove('settings-label');
            document.querySelectorAll('[tabindex]') .forEach(e => {
                e.setAttribute('tabindex', 'auto');
            });
        }
    } else {
        if (elem.style.bottom == '0px' || state == 'hide') {
            elem.style.bottom = -(elem.clientWidth * 0.70)+"px";
            button.innerHTML = "‹";
            document.querySelectorAll('[tabindex]').forEach(e => {
                e.setAttribute('tabindex', '-1');
            });
        } else if (elem.style.bottom == -(elem.clientWidth * 0.70)+"px" || state == 'show') { //‹ › « »
            elem.style.bottom = '0px';
            button.innerHTML = "›";
            elem.classList.remove('settings-label');
            document.querySelectorAll('[tabindex]').forEach(e => {
                e.setAttribute('tabindex', 'auto');
            });
        }
    }

}
document.getElementById('color-bg-inp').checked = true;
document.getElementById('color-bg-inp').addEventListener('change', function(event) {
    let color = document.getElementById('color-bg-inp').checked;
    let gradient = document.getElementById('gradient-canvas');
    if (color) {
        gradient.classList.add('hue-rotate');
    } else {
        gradient.classList.remove('hue-rotate');
    }
});