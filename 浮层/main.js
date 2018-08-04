//    clickMe.addEventListener('click', function (e) {
 //   popover.style.display = 'block'
//    })

clickMe.onclick = function() {
    if (popover.style.display == 'none') { // 如果层是隐藏的
        popover.style.display = 'block';
        clickMe.className = 'button button-hover';
    } else { // 如果层是显示的
        popover.style.display = 'none';
        clickMe.className = 'button';
    }
}

wrapper.addEventListener('click', function (e) {
    e.stopPropagation()
})

document.addEventListener('click', function () {
    popover.style.display = 'none'
})
