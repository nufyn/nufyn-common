function defaultTabActivity(_target) {

}

function resetTabActivity(_target) {
    console.log(_target)
    for (let i = 0; i < _target.length; i++) {
        _target[i].classList.remove("active");
    }
}

function HaedoTab(targetContainer) {
    let tabLinks = document.querySelectorAll(`#${targetContainer} .tab-link`);

    for (var i = 0; i < tabLinks.length; i++) {
        let targetContents = tabLinks[i].dataset.content;
        tabLinks[i].addEventListener("click", function (e) {
            openTabMenu(e, targetContents);
        })
    }

    function openTabMenu(e, targetContents) {
        console.log(targetContents);
        let tabContents = document.getElementById(targetContents).parentNode.children;
        console.log(tabContents);

        resetTabActivity(tabLinks);
        resetTabActivity(tabContents);

        document.getElementById(targetContents).classList.add("active");
        e.currentTarget.className += " active";
    }
}