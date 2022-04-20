// formData 선언
let formData = new FormData;

// 중복 submit방지l
let doubleSubmitFlag = false;
function doubleSubmitCheck() {
    if (doubleSubmitFlag) {
        return doubleSubmitFlag;
    } else {
        doubleSubmitFlag = true;
        return false;
    }
}

function ajaxRequestSync(targetUrl, data) {
    return $.ajax({
        url: targetUrl,
        type: "POST",
        dataType: "json",
        data: data,
        async: false,
        beforeSend: () => {
            $('.wrap-loading').removeClass('silence');
        },
        complete: () => {
            $('.wrap-loading').addClass('silence');
        }
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

function ajaxRequestAsync(targetUrl, data) {
    return $.ajax({
        url: targetUrl,
        type: "POST",
        dataType: "json",
        data: data,
        async: true,
        beforeSend: () => {
            $('.wrap-loading').removeClass('silence');
        },
        complete: () => {
            $('.wrap-loading').addClass('silence');
        }
    })
        // HTTP 요청이 실패하면 오류와 상태에 관한 정보가 fail() 메소드로 전달됨.
        .fail(function (xhr, status, errorThrown) {
            console.log(xhr)
            console.log(status)
            console.log(errorThrown)
            alert("오류가 발생했습니다. 관리자에게 문의하여 주십시오.");
        })
        // HTTP 요청이 성공하거나 실패하는 것에 상관없이 언제나 always() 메소드가 실행됨.
        .always(function (xhr, status) {
            // console.log("요청이 완료되었습니다!");
        });
}

function ajaxMultipartAsync(targetUrl) {
    return $.ajax({
        url: targetUrl,
        enctype: 'multipart/form-data',
        type: "POST",
        dataType: "JSON",
        data: formData,
        processData: false,
        contentType: false,
        async: true,
        beforeSend: () => {
            $('.wrap-loading').removeClass('silence');
        },
        complete: () => {
            $('.wrap-loading').addClass('silence');
        }
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

function ajaxMultipartSync(targetUrl) {
    return $.ajax({
        url: targetUrl,
        enctype: 'multipart/form-data',
        type: "POST",
        dataType: "JSON",
        data: formData,
        processData: false,
        contentType: false,
        async: false,
        beforeSend: () => {
            $('.wrap-loading').removeClass('silence');
        },
        complete: () => {
            $('.wrap-loading').addClass('silence');
        }
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

