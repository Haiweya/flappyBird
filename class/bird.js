const birdDom = document.querySelector('.bird');
const birdStyle = getComputedStyle(birdDom);
const birdHeight = parseFloat(birdStyle.height);
const birdWidth = parseFloat(birdStyle.width);
const birdLeft = parseFloat(birdStyle.left);
const birdTop = parseFloat(birdStyle.top);

class Bird extends Rectangle {
    constructor() {
        super(birdHeight, birdWidth, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 300;//重力加速度
        this.maxY = containerHeight - landHeight - this.height;
        this.timer = null;
        this.swingStatus = 1;
    }
    move(duration) {
        super.move(duration)
        this.ySpeed += duration * this.g;
    }
    onMove() {
        if (this.top <= 0) {
            this.top = 0;
        } else if (this.top >= this.maxY) {
            this.top = this.maxY;
        }
    }
    // 开始煽动翅膀
    starSwing(){
        if(this.timer){
            return
        }
        this.timer = setInterval(() => {
            this.swingStatus ++;
            if(this.swingStatus === 4 ){
                this.swingStatus =1 ;
            }
            this.render()
        }, 200);

    }
    // 暂停煽动翅膀
    stopSwing(){
        clearInterval (this.timer);
        this.timer =null;
    }
    render(){
        super.render();
        this.dom.className  = ` bird swing${this.swingStatus}`
    }
    // 小鸟跳,还需再考虑
    jump(){
        this.ySpeed = -110;
    }

}
