class Game {
    constructor() {
        this.speed = -100; //移动像素距离
        this.tick = 16;  //定时器间隔
        this.duration = 16 / 1000; //移动时常,
        this.timer = null;
        this.gameOver = false;
        this.sky = new Sky(-120);
        this.land = new Land(this.speed);
        this.bird = new Bird();
        this.pipePare = new GeneratePipe(this.speed);
    }
    // 监听键盘事件
    eventListener() {
        window.onkeydown = (e) => {
            if (e.key === "Enter") {
                if (this.timer) {
                    this.gameStop();
                } else {
                    console.log("开始");
                    this.gameStart();
                }
            } else if (e.key === ' ') {
                this.bird.jump();
            }
        }

    }
    // isHit(recOne, recTwo) {
    //     // 判断是否碰撞
    //     // 纵向：两个矩形中心点的纵向距离。是否小于矩形高度之和的一半。
    //     // 横向：两个矩形中心点的横向距离是否小于矩形宽度之和的一半。
    //     const recOneX = recOne.left + recOne.width / 2;
    //     const recTwoX = recTwo.left + recTwo.width / 2;
    //     const disX = Math.abs(recTwoX - recOneX);

    //     const recOneY = recOne.top + recOne.height / 2;
    //     const recTwoY = recTwo.top + recTwo.height / 2;
    //     const disY = Math.abs(recOneY - recTwoY);
    //     if ((disX < (recOne.width + recTwo.width) / 2) && (disY < (recOne.height + recTwo.height) / 2)) {
    //         console.log("bong")
    //         return true;
    //     } 
    //         return false;
        
    // }

    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        var centerX1 = rec1.left + rec1.width / 2;
        var centerY1 = rec1.top + rec1.height / 2;
        var centerX2 = rec2.left + rec2.width / 2;
        var centerY2 = rec2.top + rec2.height / 2;
        var disX = Math.abs(centerX1 - centerX2); //中心点横向距离
        var disY = Math.abs(centerY1 - centerY2);//中心点总想距离
        if (disX < (rec1.width + rec2.width) / 2 &&
            disY < (rec1.height + rec2.height) / 2
        ) {
            return true;
        }
        return false;
    }
    // 开始
    gameStart() {
        console.log("gamestart")
        if (this.timer) {
            return
        }
        if (this.gameOver) {
            window.location.reload(); //若在游戏结束之后重新开始，则刷新页面
        }
        this.pipePare.startGenerate();//生产水管
        this.bird.starSwing();
        this.timer = setInterval(() => {
            this.sky.move(1.2 * this.duration);
            this.land.move(this.duration);
            this.bird.move(this.duration);
            console.log(this.pipePare.pairs.length);
            // 检测水管与小鸟
            for (let i = 0; i < this.pipePare.pairs.length; i++) {
                // 移动水管
                const upPipe = this.pipePare.pairs[i].upPipe;
                upPipe.move(this.duration);
                const  downPipe = this.pipePare.pairs[i].downPipe
                downPipe.move(this.duration);
                // if (this.isHit(this.bird, upPipe) || this.isHit(this.bird,downPipe)) {
                //     this.gameOver = true;
                //     this.gameStop();
                // }
                if (this.isGameOver()) {
                    this.gameOver = true;
                    this.gameStop();
                }
            }
            
        }, this.tick);
    }
    // 停止
    gameStop() {
        console.log("gamestop")
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipePare.stopGenerate();
    }

    isGameOver (){
        // if (this.bird.top = 0 || this.bird.top <= containerHeight - landHeight - this.bird.width) {
        //    return true
        // } 
        if (this.bird.top === this.bird.maxY) {
            return true;
        }
        for (let i = 0; i < this.pipePare.pairs.length; i++) {
            const piar =this.pipePare.pairs[i]
            if (this.isHit(this.bird, piar.upPipe) || this.isHit(this.bird, piar.downPipe)) {
               return true;
            }
        }
        return false ;
    }
}

var g = new Game();
g.eventListener();