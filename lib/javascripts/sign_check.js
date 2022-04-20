// < !__회원가입 유효성 체크__ >

// emailCheck : 이메일 형식에 맞게 썻는지 검사 ex)aa01@aa.aa
let emailCheck = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);
// userIdCheck : 영문, 숫자 _,-만 입력 가능하고 8에서 20자리를 입력했는지 체크한다 {}사이에는 n과 m을 입력하여 n과 m사이의 값을 입력했는지 체크한다. n만 입력했을 경우 n자리 수 만큼 입력했는지 체크한다.
let idCheck = RegExp(/^[a-z0-9\-]{6,20}$/);
let idNotification = "아이디는 영문 소문자 혹은 숫자로 된 6자 ~ 20자입니다.";

// maker id Check
let makerIdCheck = RegExp(/^(?=.*[가-힣A-Za-z])(?=.*[0-9]).{6,20}$/);

// passwdCheck : 패스워드 체크에서는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자가 되는지 검사를 한다.
// let passwordCheck = RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,14}$/);

// 패스워드 영문과 숫자로 8자 이상
let passwordCheck = RegExp(/^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$/);
let pwNotification = "비밀번호는 영문과 숫자를 포함한 8자 ~ 20자입니다.";

let specialCharactersCheck = RegExp(/^(?=.*[~!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?])/);
/**
// 한국인 이름
let nameCheck = RegExp(/^[가-힣]{2,6}$/);
 */

// 글로벌 이름
let nameCheck = RegExp(/^[A-Za-z가-힣]{2,20}$/);
// 01로 시작하여 그 다음은 0,1,7,9 중 하나와 매칭되는지 체크한뒤 7~8자리인지 검사한다.
let phoneCheck = RegExp(/^0[0-9]{9,10}$/);
// 폰번호는 3칸에 나뉘어서 작성할시에 사용
let phoneNumberCheck = RegExp(/^[0-9]{3,4}$/);

//영문만 입력했는지 검사 입니다.
let engCheck = RegExp(/^[가-힣]/g);
// 숫자만 입력했는지 검사
let numberCheck = RegExp(/^[0-9]/g);
// 한글과 영어, 숫자만 사용하였는지 검사
let cmpNameCheck = RegExp(/^[()가-힣a-zA-Z0-9]{2,20}$/);
// 주민등록번호 검사
let RNNCheck = RegExp(/^[0-9]{6}$/);

let zipcodeCheck = RegExp(/^[0-6][0-3]\d{3}$/);


// console.log(identificationValue);
function signCheck(target) {
    let allCheckValid = [];

    let identificationInput = document.getElementById("user_id");
    let makerIdentificationInput = document.getElementById("maker_id");
    let engCheckInput = document.getElementById("crop_eng");
    let passwordInput = document.getElementById("user_password");
    let passwordCheckInput = document.getElementById("user_password_check");
    let nameInput = document.getElementById("user_name");
    let cmpNameInput = document.getElementById("company_name");
    let emailInput = document.getElementById("user_email");
    let inputTel = document.querySelectorAll("input[type=tel]");
    let phoneInput = document.getElementById("user_phone");
    let zipcodeInput = document.getElementById("user_zipcode");
    // let zipcodeInput = document.getElementById("user_zipcode");

    // 유저 이메일 입력 체크 - 이메일양식이 아이디가 될 수 도 있음
    if (emailInput) {
        console.log()
        emailInput.addEventListener("keyup", function (e) {
            let email = e.target.value;

            if (email !== "") {
                // 값이 입력됨
                if (emailCheck.test(email)) {
                    // 정규 표현식에 적합함
                    if (allCheckValid.includes("email")) {
                        // 이미 적합판정을 받은 상태임
                        return;
                    }
                    // paragraph.classList.add("text-color__success", "sign-check-result");
                    // paragraph.innerText = "올바른 아이디 양식입니다."
                    // inputWrap.append(paragraph);
                    $(this).siblings("#check_email").text("올바른 이메일 양식입니다.");
                    $(this).siblings("#check_email").attr("class", "text-color__success sign-check-result");

                    allCheckValid.push("email");
                } else {
                    // 적합한 값이 아님
                    // paragraph.classList.add("text-color__danger", "sign-sign-check-result");
                    $(this).siblings("#check_email").text("아이디 양식에 맞지 않습니다.");
                    $(this).siblings("#check_email").attr("class", "text-color__danger sign-check-result");
                    allCheckValid = allCheckValid.filter(item => item !== "email");
                }
            } else {
                // 값이 입력되지 않았음
                $(this).siblings("#check_email").text("");
                $(this).siblings("#check_email").attr("class", "text-color__danger sign-check-result");
                allCheckValid = allCheckValid.filter(item => item !== "email");
            }
        });
    }

    // 유저 아이디 입력 체크
    if (makerIdentificationInput) {
        makerIdentificationInput.addEventListener("keyup", function (e) {

            let id = e.target.value;

            if (id !== "") {
                // 값이 입력됨
                if (idCheck.test(id)) {
                    // 정규 표현식에 적합함
                    if (allCheckValid.includes("id")) {
                        // 이미 적합판정을 받은 상태임
                        return;
                    }

                    $(this).siblings("#check_id").text("올바른 아이디 양식입니다.");
                    $(this).siblings("#check_id").attr("class", "text-color__success sign-check-result");

                    allCheckValid.push("id");
                } else if (specialCharactersCheck.test(id)) {
                    alert("특수문자는 아이디에 사용하실 수 없습니다.")
                }
                else {
                    // 적합한 값이 아님
                    $(this).siblings("#check_id").text("아이디 양식에 맞지 않습니다.");
                    $(this).siblings("#check_id").attr("class", "text-color__danger sign-check-result");
                    allCheckValid = allCheckValid.filter(item => item !== "id");
                }
            } else {
                // 값이 입력되지 않았음
                $(this).siblings("#check_id").text(" ");
                $(this).siblings("#check_id").attr("class", "text-color__danger sign-check-result");
                allCheckValid = allCheckValid.filter(item => item !== "id");
            }
        });
    }

    // 유저 아이디 입력 체크
    if (identificationInput) {
        identificationInput.addEventListener("keyup", function (e) {

            let id = e.target.value;

            if (id !== "") {
                // 값이 입력됨
                if (idCheck.test(id)) {
                    // 정규 표현식에 적합함
                    if (allCheckValid.includes("id")) {
                        // 이미 적합판정을 받은 상태임
                        return;
                    }
                    console.log(e.target);
                    console.log(e.target.nextSibling.nextSibling);
                    $(this).siblings("#check_id").text("올바른 아이디 양식입니다.");
                    $(this).siblings("#check_id").attr("class", "text-color__success sign-check-result full");

                    allCheckValid.push("id");
                } else if (specialCharactersCheck.test(id)) {
                    alert("특수문자는 아이디에 사용하실 수 없습니다.")
                }
                else {
                    // 적합한 값이 아님
                    $(this).siblings("#check_id").text(idNotification);
                    $(this).siblings("#check_id").attr("class", "text-color__danger sign-check-result full");
                    allCheckValid = allCheckValid.filter(item => item !== "id");
                }
            } else {
                // 값이 입력되지 않았음
                $(this).siblings("#check_id").text(" ");
                $(this).siblings("#check_id").attr("class", "text-color__danger sign-check-result full");
                allCheckValid = allCheckValid.filter(item => item !== "id");
            }
        });
    }

    // 유저 비밀번호 입력 체크
    if (passwordInput || passwordCheckInput) {
        function checkPassword() {
            let pw1 = passwordInput.value;
            let pw2 = passwordCheckInput.value;
            if (pw1 != "" || pw2 != "") {
                if (pw1 !== pw2) {
                    $("#check_password2").text("비밀번호가 일치하지 않습니다.");
                    $("#check_password2").attr("class", "text-color__danger sign-check-result font-size__sm text-align__left full");
                    allCheckValid = allCheckValid.filter(item => item !== "checkPassword");
                } else {
                    $("#check_password2").text("비밀번호가 일치합니다.");
                    $("#check_password2").attr("class", "text-color__success sign-check-result font-size__sm text-align__left full");

                    if (allCheckValid.includes("checkPassword")) {
                        return;
                    }
                    allCheckValid.push("checkPassword");
                }
            } else {
                $("#check_password2").text("비밀번호를 입력해주세요.");
                $("#check_password2").attr("class", "text-color__danger sign-check-result font-size__sm text-align__left full");
                allCheckValid = allCheckValid.filter(item => item !== "checkPassword");
            }
        }

        passwordInput.addEventListener("keyup", function (e) {
            checkPassword();
            let pw = e.target.value;
            // console.log(password)
            if (pw !== "") {
                if (passwordCheck.test(pw)) {
                    $(this).siblings("#check_password").text("안전한 비밀번호 입니다.");
                    $(this).siblings("#check_password").attr("class", "text-color__success sign-check-result full");

                    if (allCheckValid.includes("password")) {
                        return;
                    }
                    allCheckValid.push("password");
                } else {

                    $(this).siblings("#check_password").text(pwNotification);
                    $(this).siblings("#check_password").attr("class", "text-color__danger sign-check-result full");
                    allCheckValid = allCheckValid.filter(item => item !== "password");
                }
            } else {
                $(this).siblings("#check_password").text(" ");
                $(this).siblings("#check_password").attr("class", "text-color__danger sign-check-result full");
                allCheckValid = allCheckValid.filter(item => item !== "password");
            }
        });

        // 유저 비밀번호 확인 입력 체크
        passwordCheckInput.addEventListener("keyup", function () {
            checkPassword();
        });
    }

    // 유저 이름(실명) 입력 체크
    if (nameInput) {
        nameInput.addEventListener("keyup", function (e) {
            let name = e.target.value;

            if (name !== "") {
                if (nameCheck.test(name)) {
                    $(this).siblings("#check_name").text("확인되었습니다.");
                    $(this).siblings("#check_name").attr("class", "text-color__success sign-check-result");

                    if (allCheckValid.includes("name")) {
                        return;
                    }
                    allCheckValid.push("name");
                } else {
                    $(this).siblings("#check_name").text("실명을 확인해 주세요.");
                    $(this).siblings("#check_name").attr("class", "text-color__danger sign-check-result");
                    allCheckValid = allCheckValid.filter(item => item !== "name");
                }
            } else {
                $(this).siblings("#check_name").text(" ");
                $(this).siblings("#check_name").attr("class", "text-color__danger sign-check-result");
                allCheckValid = allCheckValid.filter(item => item !== "name");
            }
            // console.log(allCheckValid)
        });
    }

    // 회사 이름 입력 체크
    if (cmpNameInput) {
        cmpNameInput.addEventListener("keyup", function (e) {
            let cmpName = e.target.value;

            if (cmpName !== "") {
                if (cmpNameCheck.test(cmpName)) {
                    $(this).siblings("#check_company_name").text("확인되었습니다.");
                    $(this).siblings("#check_company_name").attr("class", "text-color__success sign-check-result");

                    if (allCheckValid.includes("company_name")) {
                        return;
                    }
                    allCheckValid.push("company_name");
                } else {
                    $(this).siblings("#check_company_name").text("업체명을 확인해 주세요.");
                    $(this).siblings("#check_company_name").attr("class", "text-color__danger sign-check-result");
                    allCheckValid = allCheckValid.filter(item => item !== "company_name");
                }
            } else {
                $(this).siblings("#check_company_name").text(" ");
                $(this).siblings("#check_company_name").attr("class", "text-color__danger sign-check-result");
                allCheckValid = allCheckValid.filter(item => item !== "company_name");
            }
            // console.log(allCheckValid)
        });
    }
    // 폰번호 양식 만들기
    // if (inputTel) {
    //     for (var i = 0; i < inputTel.length; i++) {
    //         inputTel[i].addEventListener("keyup", formatPhoneNumber)
    //     }

    //     function formatPhoneNumber() {
    //         this.value = this.value.replace(/[^0-9]/g, "");
    //         let inputNumber = this.value.replace(/[^0-9]/g, "");
    //         let phoneNumber = "";
    //         // console.log(inputNumber)
    //         if (inputNumber.length < 4) {
    //             return inputNumber;
    //         } else if (inputNumber.length < 7) {
    //             phoneNumber += inputNumber.substr(0, 3);
    //             phoneNumber += "-";
    //             phoneNumber += inputNumber.substr(3);
    //         } else if (inputNumber.length < 11) {
    //             phoneNumber += inputNumber.substr(0, 3);
    //             phoneNumber += "-";
    //             phoneNumber += inputNumber.substr(3, 3);
    //             phoneNumber += "-";
    //             phoneNumber += inputNumber.substr(6);
    //         } else {
    //             phoneNumber += inputNumber.substr(0, 3);
    //             phoneNumber += "-";
    //             phoneNumber += inputNumber.substr(3, 4);
    //             phoneNumber += "-";
    //             phoneNumber += inputNumber.substr(7);
    //         }

    //         this.value = phoneNumber;
    //     }
    // }

    // 유저 전화번호 입력 체크
    if (phoneInput) {
        phoneInput.addEventListener("keyup", function (e) {
            let phone = e.target.value;
            phone = phone.replace(/-/gi, "");
            // console.log(phone);

            if (phone !== "") {
                if (phoneCheck.test(phone)) {
                    $(this).siblings("#check_phone").text("확인되었습니다.");
                    $(this).siblings("#check_phone").attr("class", "text-color__success sign-check-result");

                    if (allCheckValid.includes("phone")) {
                        return;
                    }
                    allCheckValid.push("phone");
                } else {
                    $(this).siblings("#check_phone").text("실명을 확인해 주세요.");
                    $(this).siblings("#check_phone").attr("class", "text-color__danger sign-check-result");
                    allCheckValid = allCheckValid.filter(item => item !== "phone");
                }
            } else {
                $(this).siblings("#check_phone").text(" ");
                $(this).siblings("#check_phone").attr("class", "text-color__danger sign-check-result");
                allCheckValid = allCheckValid.filter(item => item !== "phone");
            }
            // console.log(allCheckValid)
        });
    }

    // 유저 우편번호 입력 체크
    if (zipcodeInput) {
        var $input = $("#user_zipcode"); //이놈이 오늘의 주인공 우편번호 input box!!   
        // console.log($input)
        $("#user_zipcode").on('input', function () {
            // Do this when value changes
            // console.log("Input text changed!" + $(this).val());
        });
        // zipcodeInput.addEventListener("change", function (e) {
        //     let zipcode = e.target.value;
        //     console.log(zipcode);

        //     if (zipcode !== "") {
        //         if (zipcodeCheck.test(zipcode)) {
        //             $(this).siblings("#check_zipcode").text("확인되었습니다.");
        //             $(this).siblings("#check_zipcode").attr("class", "text-color__success sign-check-result");

        //             if (allCheckValid.includes("zipcode")) {
        //                 return;
        //             }
        //             allCheckValid.push("zipcode");
        //         } else {
        //             $(this).siblings("#check_zipcode").text("실명을 확인해 주세요.");
        //             $(this).siblings("#check_zipcode").attr("class", "text-color__danger sign-check-result");
        //             allCheckValid = allCheckValid.filter(item => item !== "zipcode");
        //         }
        //     } else {
        //         $(this).siblings("#check_zipcode").text(" ");
        //         $(this).siblings("#check_zipcode").attr("class", "text-color__danger sign-check-result");
        //         allCheckValid = allCheckValid.filter(item => item !== "zipcode");
        //     }
        // });

        (function ($) {
            // console.log("sda")
            var originalVal = $.fn.val;
            $.fn.val = function (value) {
                var res = originalVal.apply(this, arguments);

                if (this.is('input:text') && arguments.length >= 1) {
                    // this is input type=text setter
                    // console.log(this)
                    this.trigger("input");
                }

                return res;
            };
        })(jQuery);
    }

    let submitButton = document.getElementById(target)
    submitButton.disabled = true;

    // 필수 요소에 클래스를 추가 하여 성공적인 입력값 개수와 비교하여 제출 버튼을 활성화 시킨다.
    let checkReg = document.querySelectorAll(".check-reg");
    let checkRegCount = checkReg.length;
    for (var i = 0; i < checkRegCount; i++) {
        checkReg[i].addEventListener("keyup", function () {
            let validCount = allCheckValid.length;
            console.log(allCheckValid);
            console.log(checkRegCount);
            if (validCount == checkRegCount) {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }
        })
    }


    if (engCheckInput) {
        engCheckInput.addEventListener("keyup", function (e) {

            let string = e.target.value;

            if (string !== "") {
                // 값이 입력됨
                if (engCheck.test(string)) {
                    alert("한글은 입력하실 수 없습니다.");
                }
            }
        });
    }
}