let footer = `
    <ul class="fnb-list">
        <li class="fnb-item company-info">
            <ul class="company-info-list">
                <li class="company-info-item">
                    <span>상호명 : </span>
                    <p>회사이름</p>
                </li>
            </ul>
        </li>
        <li class="fnb-item customer-service">
            <ul class="customer-service-list">
                <li class="customer-service-item">
                    <span>고객센터 전화번호 : </span>
                    <p>010-9228-7104</p>
                </li>
            </ul>
        </li>
        <li class="fnb-item company-copyright">
            <p>Copyrightⓒ2021.회사명, All rights reserved.</p>
        </li>
        <li class="fnb-item company-policy">
            <ul class="company-policy-list">
                <li class="company-policy-item">
                    <a href="">카테고리1</a>
                </li>
                <li class="company-policy-item">
                    <a href="javascript:void(0)" class="cursor__non-allowed" aria-disabled="true">비활성 카테고리</a>
                </li>
            </ul>
        </li>
    </ul>
`;

document.getElementById("footer").innerHTML = footer;