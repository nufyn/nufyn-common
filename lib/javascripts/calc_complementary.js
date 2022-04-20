// 글자색을 배경색에 맞춰줌
function calcRGBColorComplement(color) {
    let _color = color.split("(")[1].replace(")", "");
    let rgbArray = _color.split(",");
    console.log(rgbArray);
    let compColor = "rgba(";
    for (var i = 0; i < rgbArray.length; i++) {
        console.log(compColor)
        if (i == 3) {
            compColor += `${1 - Number(rgbArray[i])}, `;
        } else {
            console.log(Number(rgbArray[i]));
            compColor += `${255 - Number(rgbArray[i])}, `;
        }
    }

    compColor = compColor.slice(0, -2);
    compColor += ")";
    console.log(compColor);
    return compColor;
}