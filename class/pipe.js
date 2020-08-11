const containerWidth = parseFloat(containerStyle.width);  //containerHeight   //容器高度,宽度.用于水管的初始left值
class pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(height, 30, containerWidth, top, speed, 0, dom);
    }
    onMove() {
        if (this.left <= - this.width) {
            this.dom.remove();
        }
    }
}

// 求得随机高度
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


class pipePare {
    constructor(speed) {
        this.minHeight = 90;
        this.spaceHeight = 120;
        this.maxHeight = containerHeight - landHeight - this.minHeight - this.spaceHeight;

        const upHeight = getRandom(this.minHeight, this.maxHeight);
        // 新建dom,并添加样式
        const upDom = document.createElement('div');
        upDom.className = 'pip up'
        this.upPipe = new pipe(upHeight, 0, speed, upDom);

        const downDom = document.createElement('div');
        downDom.className = 'pip down'
        const downTop = upHeight + this.spaceHeight;
        const downHeight = containerHeight - downTop - landHeight;
        this.downPipe = new pipe(downHeight, downTop, speed, downDom);

        container.appendChild(upDom);
        container.appendChild(downDom);
    }
    // 移动
    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
    // 判断是否移除视野
    get useLess() {
        return this.upPipe.left < -this.upPipe.width; //因为两个管是在一列，所以直接判断判断上管得有用与否即可
    }

}

class GeneratePipe {
    constructor(speed) {
        this.speed = speed;
        this.timer = null;
        this.tick = 1500;
        this.pairs = [];
    }
    startGenerate() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.pairs.push(new pipePare(this.speed));
            for (let i = 0; i < this.pairs.length; i++) {
                const pair = this.pairs[i];
                if (pair.useLess) {
                    this.pairs.splice(i, 1);
                    i--;
                }
            }
        }, this.tick);
    }

    stopGenerate() {
        clearInterval(this.timer);
        this.timer = null;
    }

}







