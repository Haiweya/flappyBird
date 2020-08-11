const landDom = document.querySelector(".land");
const landStyle = getComputedStyle(landDom);
const landHeight = parseFloat(landStyle.height);
const landWidth = parseFloat(landStyle.width);

const container = document.querySelector('.container');
const containerStyle = getComputedStyle(container);
const containerHeight = parseFloat(containerStyle.height)

const landTop = containerHeight - landHeight;//390

class Land extends Rectangle{
    constructor(speed){
        super(landHeight,landWidth,0,landTop,speed,0,landDom);  
    }

    onMove(){
        if(this.left<= -this.width/2){
            this.left = 0;
        }
    }
}


