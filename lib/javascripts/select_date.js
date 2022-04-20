let dateFrom = document.getElementById("search_date_start");
let dateTo = document.getElementById("search_date_end");
const TODAY = new Date();
const MIN_DATE = "2021-05-01";

// 날짜형식의 데이터를 넣으면 YY-mm-dd 형식으로 반환
function getDateFormat(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth());
    let day = date.getDate();

    month = month >= 10 ? month : '0' + month;

    day = day >= 10 ? day : '0' + day;

    return `${year}-${month}-${day}`;
}

// 스트링 형식('YY-mm-dd')을 넣으면 데이트타입 데이터로 반환
function getStringDateParse(string) {
    string = string.split("-");
    let year = string[0];
    let month = string[1];
    let day = string[2];

    date = new Date(year, month - 1, day);

    return date;
}

// periodFromTo();

function periodFromTo() {
    dateFrom.addEventListener("change", function () {
        dateTo.setAttribute("min", dateFrom.value);
    })

    dateTo.addEventListener("change", function () {
        dateFrom.setAttribute("max", dateTo.value);
    })
}

function periodStartToday() {
    TODAY = getDateFormat(TODAY);

    const dateInput = document.querySelectorAll("input[type=date]");

    for (var i = 0; i < dateInput.length; i++) {
        dateInput[i].setAttribute("min", TODAY);
    }
}

/* 오늘 날짜를 문자열로 반환 */
function getToday() {
    var d = new Date()
    return getDateFormat(d)
}

/* 내일 날짜를 문자열로 반환 */
function getTomorrows() {
    var d = new Date()
    var dayOfMonth = d.getDate()
    d.setDate(dayOfMonth + 1)
    return getDateFormat(d)
}

/* 오늘로부터 3일전 날짜 반환 */
function getLastThreedays() {
    var d = new Date()
    var dayOfMonth = d.getDate()
    d.setDate(dayOfMonth - 3)
    return getDateFormat(d)
}

/* 오늘로부터 5일전 날짜 반환 */
function getLastFifthdays() {
    var d = new Date()
    var dayOfMonth = d.getDate()
    d.setDate(dayOfMonth - 5)
    return getDateFormat(d)
}

/* 오늘로부터 1주일전 날짜 반환 */
function getLastWeek() {
    var d = new Date()
    var dayOfMonth = d.getDate()
    d.setDate(dayOfMonth - 7)
    return getDateFormat(d)
}

/* 오늘로부터 1개월전 날짜 반환 */
function getLastMonth() {
    var d = new Date()
    var monthOfYear = d.getMonth()
    d.setMonth(monthOfYear - 1)
    return getDateFormat(d)
}

/* 오늘로부터 1개월전 날짜 반환 */
function getCalcPeriod() {
    var d = new Date()

    d.setDate(d.getDate() - 7);
    let periodEnd = getDateFormat(d);

    d.setMonth(d.getMonth() - 1);
    let periodStart = getDateFormat(d);

    calcPeriodTemp = `${periodStart} ~ ${periodEnd}`;
    return calcPeriodTemp
}

// 다음달 구하기
function getDateAfterMonth(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 2);

    month = month >= 10 ? month : '0' + month;

    var day = date.getDate();

    day = day >= 10 ? day : '0' + day;

    return year + '-' + month + '-' + day;
}

// 전달 구하기
function getDateBeforeWeek(date) {

    var d = stringToDateFormat(date);

    // console.log(d)
    var dayOfMonth = d.getDate();

    d.setDate(dayOfMonth - 7)
    return getDateFormat(d)
}

function getLeapYear() {
    let thisYear = new Date().getFullYear();
    let thisMonth = new Date().getFullYear();
    // console.log(thisYear)
    const monthDate = new Date(thisYear, thisMonth, 0).getDate();

    return monthDate;
}

function periodDefault() {
    TODAY = getDateFormat(TODAY);

    const dateInput = document.querySelectorAll("input[type=date]");

    for (var i = 0; i < dateInput.length; i++) {
        dateInput[i].setAttribute("min", "2021-05-01");
        dateInput[i].setAttribute("value", TODAY);
    }
}

function periodSelect() {
    document.getElementById("period_all").setAttribute("checked", true);
    // dateFrom.value = getDateFormat(TODAY);
    dateTo.value = getDateAfterMonth(TODAY);

    $("input:radio[name=filter_period]").on("click", function () {
        let selectDate = $("input[name=filter_period]:checked").val();
        switch (selectDate) {
            case 'today':
                dateFrom.value = getToday();
                dateTo.value = getToday();
                break;
            case 'threedays':
                dateFrom.value = getLastThreedays();
                dateTo.value = getToday();
                break;
            case 'week':
                dateFrom.value = getLastWeek();
                dateTo.value = getToday();
                break;
            case 'month':
                dateFrom.value = getLastMonth();
                dateTo.value = getToday();
                break;
            default:
                dateFrom.value = "";
                dateTo.value = getToday();
        }

        // let fromDate = ;

    })
}

function convertTimestampToDate(timestamp) {
    var date = new Date(timestamp);

    return date;
}