let aside = `
    <nav class="snb-wrap">
        <section class="flex-row__between">
            <button type="button" id="close_side" onclick="closeSideNav()"
                class="response-device__tablet response-device__mobile">
                <i class="ic-close"></i>
            </button>
            <a href="/" class="snb-link__home">관리자 시스템</a>
        </section>
        <ul class="flex-col__top flex-gap full">`;
if (sessionStorage.getItem('auth_user') == 1) {
    aside += `
        <li data-url="user" class="snb-item">
            <a href="/user" class="snb-link">유저관리</a>
        </li>
    `;
}

if (sessionStorage.getItem('auth_farm') == 1) {
    aside += `
        <li data-url="farm" class="snb-item">
            <a href="/farm" class="snb-link">농가관리</a>
        </li>
    `;
}
if (sessionStorage.getItem('auth_manufacturer') == 1) {
    aside += `
        <li data-url="manufacturer" class="snb-item">
            <a href="/manufacturer" class="snb-link">제조사관리</a>
        </li>
    `;
}

if (sessionStorage.getItem('auth_system') == 1) {
    aside += `
        <li data-url="system" class="snb-item">
            <a href="/system" class="snb-link">시스템관리</a>
        </li>
    `;
}
if (sessionStorage.getItem('auth_site') == 1) {
    aside += `
        <li data-url="site" class="snb-item">
            <a href="/site" class="snb-link">사이트관리</a>
        </li>
    `;
}
aside +=
    `
        </ul>
        <p id="logined_account" class="text-align__right w-100">${sessionStorage.getItem("name")}</p>
    </nav>
`;

document.getElementById("aside").innerHTML = aside;

sideNavActive();

function sideNavActive() {
    let navItem = document.querySelectorAll(".snb-item");
    let navLink = new Array;
    for (var i = 0; i < navItem.length; i++) {
        // console.log(navItem[i].dataset.url);

        navLink[i] = navItem[i].dataset.url;
        // console.log(urlArray[1]);
        if (navItem[i].dataset.url == urlArray[1]) {
            navItem[i].classList.add("active");
        }

        if (urlArray[1] == "") {
            navItem[0].classList.add("active");
        }
    }
}

function openSideNav() {
    document.getElementById("aside").style.width = "100%";
    document.getElementById("aside").style.height = "100%";
    // document.getElementById("side_navbar").style.opacity = "1";
    document.getElementById("aside").style.left = "0px";
    setDimLayer(997);
    // console.log("스크롤막기");
    scrollDisable();
}

function closeSideNav() {
    document.getElementById("aside").style.width = "0";
    document.getElementById("aside").style.height = "0";
    // document.getElementById("side_navbar").style.opacity = "0";
    document.getElementById("aside").style.left = "-200px";
    offDimLayer();
    scrollEnable();
}