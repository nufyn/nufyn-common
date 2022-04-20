const DebugMode = true;
const deviceSizeCheck = false;
// uri값 나눠놨음
const currentUrl = location.pathname;
const urlArray = currentUrl.split("/");

if (sessionStorage.getItem('isLogined') != "true" && urlArray[1] != "") {
    alert("로그인 후 이용해주세요")
    location.href = "/"
}

function getParameter(key) {
    const url = new URL(location.href);
    const urlParams = url.searchParams;

    let entries = urlParams.entries();
    for (const entry of entries) {
        console.log(entry[0] + ': ' + entry[1]);
    }

    return urlParams.get(key);
}
getParameter();

let baseURL = "";
let apiVesion1 = "apis/v1";
let apiVesion2 = "apis/v2";
// const DebugMode = false;
const bodyElem = document.querySelector("body");
const mainElem = document.querySelector("main");
const formElem = document.querySelector("form");
const debugElem = document.querySelector("#debug_mode");
const preventDefault = function (e) {
    e.preventDefault();
}
const stopPropagation = function (e) {
    e.stopPropagation();
}

// js 발동 순서 제어

/**

'ready' - DOM이 준비된 것을 확인한 후 원하는 DOM 노드를 찾아 핸들러를 등록해 인터페이스를 초기화할 때

'load' - 모든 자식 프레임(iframe)과 이미지(img)에서 로드(load) 이벤트가 발생했을때 발생하는 이벤트이다.

 */

const HaedoScripts = {
    // 무조건 load보다 빨리 발동
    ready: (callback) => {
        if (!callback) {
            return;
        } else {
            if (document.readyState != "loading") callback();
            else document.addEventListener("DOMContentLoaded", callback);
            // console.log(callback)
        }
    },
    // 무조건 ready보다 늦게 발동
    load: (callback) => {
        // console.log("load");
        // console.log(callback);
        if (!callback) {
            return;
        } else {
            window.addEventListener("load", callback);
        }
    }
}

if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
    alert('Internet Explorer는 지원하지 않는 브라우저 입니다.')
    window.location = 'microsoft-edge:' + window.location;
    setTimeout(function () {
        window.location = 'https://go.microsoft.com/fwlink/?linkid=2135547';
    }, 1);
}

// 저장버튼 막아주기 
document.addEventListener("keydown", function (e) {
    // 저장 막기
    if (e.ctrlKey && e.key == "s") {
        console.log("Hey! Ctrl+S event captured!");
        e.preventDefault();
    }
})

// 디버그모드 제어
if (!DebugMode) {
    baseURL = "https://api.traceherb.com";
    // 콘솔로그 다 비활성화
    // console.log = function () { };

    document.addEventListener("keydown", function (e) {
        // 복사 막기
        if (e.ctrlKey && e.key == "c") {
            console.log("Hey! Ctrl+C event captured!");
            e.preventDefault();
        }

        // f12막기
        // if (e.key == "F12") {
        //     console.log("Hey! F12 event captured!");
        //     e.preventDefault();
        // }
    })

    // 우클릭등 위협요소 차단
    window.document.oncontextmenu = new Function("return false");
    // window.document.onselectstart = new Function("return false");
    // window.document.ondragstart = new Function("return false");

    // 디버그모드에서만 뜨는 모듈 다 지우기
    debugElem.remove();
} else {
    console.log("urlArray", urlArray);
    // 개발 중임
    console.log("여기 개발중");
    baseURL = "http://dev.nufyn.io:7603";
    // baseURL = "https:/api.traceherb.com";
    console.log(baseURL);
    // 디버그모듈 생성
    if (deviceSizeCheck) {
        checkScreenSize();
        debugElem.innerHTML = `<div data-device="" class="device-width-check-ball">디바이스</div>`;
    }
}

// 스크롤 이벤트 막기
function scrollDisable() {
    // console.log("스크롤막기");
    bodyElem.classList.add('scroll-none');
    bodyElem.addEventListener('scroll', preventDefault, { passive: false });
    bodyElem.addEventListener('touchmove', preventDefault, { passive: false });
    bodyElem.addEventListener('mousewheel', preventDefault, { passive: false });
}

// 스크롤 이벤트 풀기
function scrollEnable() {
    // console.log("스크롤막기해제");
    bodyElem.classList.remove('scroll-none');
    bodyElem.removeEventListener('scroll', preventDefault, { passive: false });
    bodyElem.removeEventListener('touchmove', preventDefault, { passive: false });
    bodyElem.removeEventListener('mousewheel', preventDefault, { passive: false });
}

// 스크린 계산
function checkScreenSize() {
    if (DebugMode) {
        let deviceCheckBall = document.querySelector(".device-width-check-ball");
        deviceCheckBall.style.textAlign = "center"

        let color = document.defaultView.getComputedStyle(deviceCheckBall).getPropertyValue("background-color");
        let compColor = calcRGBColorComplement(color);
        deviceCheckBall.style.color = compColor;

        if (window.innerWidth <= 600) {
            deviceCheckBall.innerText = `mob\n${window.innerWidth}`
        } else if (window.innerWidth >= 1024) {
            deviceCheckBall.innerText = `top\n${window.innerWidth}`
        } else {
            deviceCheckBall.innerText = `tab\n${window.innerWidth}`
        }

        window.addEventListener("resize", function (e) {
            if (window.innerWidth <= 600) {
                deviceCheckBall.innerText = `mob\n${window.innerWidth}`
            } else if (window.innerWidth >= 1024) {
                deviceCheckBall.innerText = `top\n${window.innerWidth}`
            } else {
                deviceCheckBall.innerText = `tab\n${window.innerWidth}`
            }

            color = document.defaultView.getComputedStyle(deviceCheckBall).getPropertyValue("background-color");
            compColor = calcRGBColorComplement(color);
            deviceCheckBall.style.color = compColor;
            // console.log(compColor);
        })
    } else {
        return 0;
    }
}

// 글자색을 배경색에 맞춰줌 -> 보색계산
function calcRGBColorComplement(color) {
    let _color = color.split("(")[1].replace(")", "");
    let rgbArray = _color.split(",");
    let compColor = "rgba(";
    for (var i = 0; i < rgbArray.length; i++) {
        if (i == 3) {
            compColor += `${1 - Number(rgbArray[i])}, `;
        } else {
            compColor += `${255 - Number(rgbArray[i])}, `;
        }
    }

    compColor = compColor.slice(0, -2);
    compColor += ")";
    return compColor;
}

function setDimLayer(zIndex) {
    if (!zIndex) {
        zIndex == 998;
    }
    // console.log("켜기")
    let dimLayer = document.createElement("div");
    dimLayer.classList.add("dim-layer");

    bodyElem.append(dimLayer);
    // dimLayer.style.height = `${window.innerHeight}px`;
    dimLayer.style.height = `100%`;
    dimLayer.style.zIndex = zIndex;
}

function offDimLayer() {
    let dimLayer = document.querySelector(".dim-layer");
    console.log(dimLayer);
    if (dimLayer) {
        dimLayer.remove();
    }
}


// form쓸때, submit안하고 우리는 formdata에 넣어서 보낼거임
document.addEventListener("submit", function (e) {
    e.preventDefault();
});

function removeUndifined(objs) {
    for (var [key, value] of Object.entries(objs)) {
        if (value == "null" || value == null) {
            objs[key] = "";
        }
        // console.log(`${key}: ${value}`);
    }
}

// js 발동 순서 제어

/**
'ready' - DOM이 준비된 것을 확인한 후 원하는 DOM 노드를 찾아 핸들러를 등록해 인터페이스를 초기화할 때
'load' - 모든 자식 프레임(iframe)과 이미지(img)에서 로드(load) 이벤트가 발생했을때 발생하는 이벤트이다.
 */
const HaedoScript = {
    // 무조건 load보다 빨리 발동
    ready: (callback) => {
        console.log("ready");
        console.log(callback);
        if (!callback) {
            return;
        } else {
            window.addEventListener("DOMContentLoaded", callback);
        }
    },
    // 무조건 ready보다 늦게 발동
    load: (callback) => {
        console.log("load");
        console.log(callback);
        if (!callback) {
            return;
        } else {
            window.addEventListener("load", callback);
        }
    }
}

function addFarmDataHistory(type, contents, target_uuid) {
    var data = {
        uuid: sessionStorage.getItem('uuid'),
        target_uuid: target_uuid,
        type: type,
        contents: contents
    }
    ajaxRequestAsync(`${baseURL}/${apiVesion1}/farm/create/history`, data)
        .done(function (results) {
            console.log(results);
        })
}