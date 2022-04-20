class Component {
    $target;
    $state;
    constructor($target) {
        // 타켓 엘리먼트 선정
        this.$target = $target;
        this.setup();
        // 초기 렌더링
        this.render();
    }
    setup() { };
    template() { return ''; }
    render() {
        // 템플릿 달기
        this.$target.innerHTML = this.template();
        // 이벤트 걸기
        this.setEvent();
    }

    setState(newState) {
        // 상태값 판별
        this.$state = { ...this.$state, ...newState };
        // 상태값의 변동시 리렌더링
        this.render();
    }

    // 에벤트 추가
    setEvent() { }
}