/**
--싱글 업로드

<div class="form-item">
    <p class="form-label point">로고 포인트</p>
    <input type="file" name="files" id="preview_single2(변수)" class="silence" />
    <label for="preview_single2(변수)" class="preview-upload-wrap"></label>
</div>

-- 멀티플 업로드
<div class="form-column">
    <p class="form-label"></p>
    <ul class="form-preview-list">
        <li class="form-preview-trigger">
            <input type="file" name="files" id="preview_multi1(변수)" class="silence" multiple />
            <label for="preview_multi1(변수)" data-preview="multiple" class="preview-upload-wrap"></label>
        </li>
    </ul>
</div>

*/


// let uploadedFileObject = new Object;
// HaedoScripts.ready(function () {
//     filePreview();
// });
function filePreview(uploadLimit = 5) {
    let previewFiles = document.querySelectorAll("input[name=files]");
    console.log(previewFiles);
    for (var i = 0; i < previewFiles.length; i++) {
        previewFiles[i].addEventListener("change", handleFiles);
    }

    function handleFiles(e) {
        console.log(previewFiles)
        // 파일리스트 값 초기화
        e.target.value == null;

        const files = e.target.files;
        const filesArr = Array.from(files);
        const fileCount = filesArr.length;
        let targetFor = e.target.id;
        let previewWrap = document.querySelector(`label[for="${targetFor}"]`);

        if (previewWrap.dataset.preview == "multiple") {
            if (fileCount > uploadLimit) {
                HaedoDialog.alert("사진은 최대 5장까지 업로드 가능합니다.");
            } else {
                // 멀티플 이미지 새로 업로드
                // let previewListWrap = previewWrap.parentElement.parentElement;
                // let previewedItem = previewListWrap.querySelectorAll(".form-preview-item");

                filesArr.forEach(function (f) {
                    if (!f.type.match("image.*")) {
                        console.log("사진말고 다른 파일");
                        return;
                    } else {
                        let reader = new FileReader();
                        let previewList = previewWrap.parentElement.parentElement;
                        let previewItem = document.createElement("li");
                        previewItem.classList.add("form-preview-item");
                        reader.onload = function (e) {
                            let file = e.target.result;
                            let previewImageWrap = document.createElement("figure");
                            previewImageWrap.classList.add("preview-upload-wrap");
                            previewImageWrap.classList.add("active");
                            let previewImage = document.createElement("img");
                            previewImage.src = file;
                            previewImage.alt = f.name;
                            previewImage.classList.add("preview-image");

                            previewImageWrap.append(previewImage);
                            previewItem.append(previewImageWrap);
                            previewList.prepend(previewItem);
                        };
                        reader.readAsDataURL(f);
                    }
                });
            }
        } else if (previewWrap.dataset.preview == "single" || !previewWrap.dataset.preview) {
            // deleteimage(previewWrap.querySelector("img").dataset.imgId);
            // 싱글 이미지 새로 업로드
            console.log(previewWrap.childNodes);
            if (previewWrap.classList.contains("active")) {
                previewWrap.querySelector("img").remove();
            }
            filesArr.forEach(function (f) {
                if (!f.type.match("image.*")) {
                    alert("확장자는 이미지 확장자만 가능합니다.");
                    return;
                }

                let reader = new FileReader();
                // previewWrap.quertSelector.remove();
                reader.onload = function (e) {
                    let file = e.target.result;
                    previewWrap.classList.add("active");

                    let previewImage = document.createElement("img");
                    previewImage.src = file;
                    previewImage.alt = f.name;
                    previewImage.classList.add("preview-image", "curved");

                    previewWrap.append(previewImage);
                };
                reader.readAsDataURL(e.target.files[0]);
            });

        } else if (previewWrap.dataset.preview == "file") {
            console.log(filesArr);
            filesArr.forEach(function (f) {
                console.log(previewWrap)
                console.log(f.name)
                previewWrap.innerText = f.name;
            });
        } else if (previewWrap.dataset.preview == "files") {
            if (fileCount > uploadLimit) {
                HaedoDialog.alert("파일은 최대 5장까지 업로드 가능합니다.");
            } else {
                // 멀티플 이미지 새로 업로드
                // let previewListWrap = previewWrap.parentElement.parentElement;
                // let previewedItem = previewListWrap.querySelectorAll(".form-preview-item");

                filesArr.forEach(function (f) {
                    let reader = new FileReader();
                    let previewList = previewWrap.parentElement.parentElement;
                    console.log(previewList);
                    let previewItem = document.createElement("li");
                    console.log(previewItem);
                    // previewItem.classList.add("form-preview-item");
                    reader.onload = function (e) {
                        let file = e.target.result;
                        let previewDownloadLink = document.createElement("a");
                        previewDownloadLink.download = f.name;
                        previewDownloadLink.href = file;
                        previewDownloadLink.target = "_blank";
                        previewDownloadLink.innerText = f.name;

                        previewItem.append(previewDownloadLink);
                        previewList.append(previewItem);
                    };
                    reader.readAsDataURL(f);

                });
            }
        }
        else if (previewWrap.dataset.preview == "download") {
            console.log(filesArr);
            filesArr.forEach(function (f) {
                let file = e.target.result;

                console.log(file)
                console.log(f.name)
                let downloadButton = document.createElement("p");
                downloadButton.classList.add("text-decoration__underline")
                downloadButton.innerText = f.name;

                previewWrap.parentElement.append(downloadButton);
            });
        } else {
            console.log(filesArr);
            filesArr.forEach(function (f) {
                if (!f.type.match("image.*")) {
                    alert("확장자는 이미지 확장자만 가능합니다.");
                    return;
                }

                let reader = new FileReader();

                reader.onload = function (e) {

                };
                reader.readAsDataURL(e.target.files[0]);
            });
        }
    };

    function updateimage(e) {
        inputObject();

        formData.append("target_uuid", urlArray[3]);
        ajaxMultipartAsync(`${baseURL}/${apiVesion1}/${apiTarget}/update`)
            .done(function (results) {
                console.log(results);
                if (results.Status == 200) {
                    alert("정상적으로 유저를 저장했습니다.");
                    // location.reload();
                }
            })
    };
    function deleteimage(e) {
        console.log(e.target);
        // console.log(e.target);
        var data = {
            pk: e,
            table: "FarmInfo"
        };
        ajaxRequestAsync(`${baseURL}/${apiVesion1}/${apiTarget}/delete/img`, data)
            .done(function (results) {
                console.log(results);
            })
    };
}