function makeModalTemplate(modalType) {
    // let template = "";
    switch (modalType) {
        case "alert":
            // console.log('알림');
            makeAlertTemplate();
            break;
        case "dialog":
            // console.log('다이얼로그');
            makeDialogTemplate();
            makeAlertTemplate();
            break;
        case "confirm":
            // console.log('컨펌');
            makeAlertTemplate();
            break;
        case "sign":
            // console.log('컨펌');
            makeSignTemplate();
            break;
        default:
            // console.log("커스텀 모달레이어");
            makeAlertTemplate();
    }

    function makeSignTemplate() {
        let modalTemplateWrap = document.createElement("article");
        modalTemplateWrap.classList.add("modal", "modal-section", "type-sign", "sign");
        modalTemplate = `
            <section class="dialog-head">
                <h1 class="dialog-title"></h1>
                <button type="button" class="modal-close">
                    <i class="ic-close"></i>
                </button>
            </section>
            <section class="dialog-body">
            </section>
            <section>
            <canvas id="signature" style="border:1px solid;margin-bottom: 2rem;"></canvas>    
            </section>
                <section class="modal-foot">
                <button type="button" class="modal-button ground-point modal-confirm" id="save">서명하기</button>
                <button type="button" class="modal-button ground-grey modal-confirm" id="clear">지우기</button>
            </section>
            
        `;
        modalTemplateWrap.innerHTML = modalTemplate
        bodyElem.append(modalTemplateWrap);

    };
    function makeAlertTemplate() {
        let modalTemplate = document.createElement("article");
        modalTemplate.classList.add("modal", "modal-section", "type-alert");
        modalTemplate.innerHTML = `
            <section class="modal-body">
                <p class="modal-message"></p>
            </section>
            <section class="modal-foot">
                <button type="button" class="modal-button ground-point modal-close">확인</button>
            </section>
        `;
        bodyElem.append(modalTemplate);
    };

    function makeDialogTemplate() {
        let modalTemplate = document.createElement("article");
        modalTemplate.classList.add("modal", "modal-section", "type-dialog", "dialog");
        modalTemplate = `
            <section class="dialog-head">
                <h1 class="dialog-title"></h1>
                <button type="button" class="modal-close">
                    <i class="ic-close"></i>
                </button>
            </section>
            <section class="dialog-body">

            </section>
        `;
        modalTemplate.innerHTML = modalTemplate
        bodyElem.append(modalTemplate);

    };

    function makeConfirmTemplate() {

    };

    function makeEditorDialogTemplate() {
        modalTemplate = `
            <article class="dialog modal modal-section type-dialog">
                <section class="dialog-head">
                    <h1 class="dialog-title"></h1>
                    <button type="button" class="modal-close">
                        <i class="ic-close"></i>
                    </button>
                </section>
                <section class="dialog-body">

                </section>
            </article>
        `;
        bodyElem.append(modalTemplate);

    };
}

// 기본 alert은 초기에 제공함
makeModalTemplate("alert");

/**
 *  alert, confirm 대용 팝업 메소드 정의 <br/>
 *  timer : 애니메이션 동작 속도 <br/>
 *  alert : 경고창 <br/>
 *  confirm : 확인창 <br/>
 *  dialog : 커스텀 다이얼로그 <br/>
 *  open : 팝업 열기 <br/>
 *  sign : 서명란 열기 <br />
 *  close : 팝업 닫기 <br/>
 */


$(document).on("click", ".modal-close", function () {
    HaedoDialog.close(this);
});

$(document).keydown(function (event) {
    if (event.keyCode == 27 || event.which == 27 || event.keycode == 13 || event.which == 13) {
        $(".modal-close").trigger("click");
    };
});

let HaedoDialog = {
    timer: 200,
    confirm: function (text, callback) {
        // console.log(text)
        if (text == null || text.trim() == "") {
            console.warn("confirm message is empty.");
            return;
        } else if (callback == null || typeof callback != 'function') {
            console.warn("callback is null or not function.");
            return;
        } else {
            $(".type-confirm .modal-confirm").on("click", function () {
                $(this).unbind("click");
                callback(true);
                close(this);
            });
            this.open("type-confirm", text);
        }
    },

    dialog: function (title, contents, callback) {
        // console.log(title);
        // console.log(contents);
        if (title.trim() == "") {
            $(".dialog-title").hide();
        }
        if (title == null) {
            console.warn("confirm message is empty.");
            return;
        } else if (callback == null || typeof callback != 'function') {
            console.warn("callback is null or not function.");
            return;
        } else {
            $(document).on("click", ".type-dialog .modal-confirm", function (e) {
                $(this).unbind("click");
                callback(true, this);
                close(this);
            });
            this.dialogOpen("type-dialog", title, contents);
        }
    },

    dialogOpen: function (type, title, contents) {
        let popup = $("." + type);
        popup.find(".dialog-title").text(title);
        popup.find(".dialog-body").html(contents);
        scrollDisable();
        setDimLayer();
        popup.fadeIn(this.timer);
    },

    alert: function (text) {
        $(':focus').blur();
        if (text == null) {
            console.warn("confirm message is empty.");
            return;
        } else {
            this.open("type-alert", text);
        }
    },
    sign: function (type, title, contents) {
        let popup = $("." + type);
        popup.find(".dialog-title").text(title);
        popup.find(".dialog-body").html(contents);
        scrollDisable();
        setDimLayer();
        popup.fadeIn(this.timer);
    },

    open: function (type, text) {
        let popup = $("." + type);
        popup.find(".modal-message").text(text);
        scrollDisable();
        setDimLayer();
        popup.fadeIn(this.timer);
    },

    close: function (target) {
        let modal = $(target).closest(".modal-section");
        let dimLayer;
        if (modal.hasClass("type-confirm")) {
            dimLayer = $(".dim-layer[target=type-confirm]");
        } else if (modal.hasClass("type-alert")) {
            dimLayer = $(".dim-layer[target=type-alert]")
        } else if (modal.hasClass("type-dialog")) {
            dimLayer = $(".dim-layer[target=type-dialog]")
        } else if (modal.hasClass("type-sign")) {
            dimLayer = $(".dim-layer[target=type-sign]")
        } else {
            console.warn("close unknown target.")
            return;
        }
        modal.fadeOut(this.timer);
        // setTimeout(function () {
        //     dimLayer != null ? offDimLayer() : "";
        // }, this.timer);
        scrollEnable();
        offDimLayer();
    }
}