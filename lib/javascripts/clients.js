// 리소스서버 입력, 변경, 삭제 요청
// 클라이언트 정보
function getClient(clientId = 0) {
    // console.log("여기 ip추적")

    const nVer = navigator.appVersion;
    // console.log(nVer)
    const nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    const preUrl = document.referrer;
    // console.log(preUrl);
    let fullVersion = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset, verOffset, ix;

    // In Opera 15+, the true version is after "OPR/" 
    if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
        browserName = "Chrome";
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
        browserName = "Safari";
        fullVersion = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf("Version")) != -1)
            fullVersion = nAgt.substring(verOffset + 8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
        browserName = "Firefox";
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
        (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);
        if (browserName.toLowerCase() == browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
        fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
        fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    console.log(''
        + 'Browser name  = ' + browserName + '<br>'
        + 'Full version  = ' + fullVersion + '<br>'
        + 'Major version = ' + majorVersion + '<br>'
        + 'navigator.appName = ' + navigator.appName + '<br>'
        + 'navigator.userAgent = ' + navigator.userAgent + '<br>'
    )

    let clientInfo = {};
    const ua = navigator.userAgent;

    clientInfo["client_browser"] = browserName;
    clientInfo["client_referrer"] = preUrl;

    $.ajax({
        url: "https://ipinfo.io",
        type: "GET",
        dataType: "JSON",
        async: false,
        success: (results) => {
            // console.log(results)

            clientInfo["client_ip"] = results.ip;
            clientInfo["client_visit_url"] = window.location.href;
            clientInfo["client_location"] = `${results.city}, ${results.country}`;
            clientInfo["client_geo_location"] = results.loc;
        }
    })

    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        clientInfo["client_device"] = "tablet";
    } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        clientInfo["client_device"] = "mobile";
    } else {
        clientInfo["client_device"] = "desktop";
    }

    if (sessionStorage.getItem("isLogined")) {
        clientId = sessionStorage.getItem("uuid")
    }
    clientInfo["client_id"] = clientId;

    return clientInfo;
}

function checkClient() {

    // console.log(getClient())

    let data = getClient();
    // console.log(data)
    $.ajax({
        url: '/apis/v1/user/log/connect',
        type: "POST",
        dataType: "json",
        data: data,
        beforeSend: () => {
            $('.wrap-loading').removeClass('silence');
        },
        complete: () => {
            $('.wrap-loading').addClass('silence');
        }
    })
        .done(function (results) {
            // console.log("잘 다녀왔습니다.");
            // console.log(results)
        })
        // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
        .fail(function (xhr, status, errorThrown) {
            alert("오류가 발생했습니다. 관리자에게 문의하여 주십시오.");
        })
        // HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
        .always(function (xhr, status) {
            // console.log("요청이 완료되었습니다!");
        });
}

checkClient();