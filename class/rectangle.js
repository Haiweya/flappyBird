 class Rectangle {
    constructor(height, width, left, top, xSpeed, ySpeed, dom) {
        this.height = height;
        this.width = width;
        this.left = left;
        this.top = top;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.dom = dom;
    }
    // 渲染
    render() {
        this.dom.style.height = this.height + 'px';
        this.dom.style.width = this.width + 'px';
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    // 移动
    move(duration){
        const xDis = duration * this.xSpeed;
        const yDis = duration * this.ySpeed;
        this.left = this.left + xDis;
        this.top = this.top + yDis;
        if(this.onMove){
            this.onMove();
        }
        this.render();
    }
}
