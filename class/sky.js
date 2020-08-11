const skyDom = document.querySelector('.sky');
console.log(skyDom);
const skyStyle = getComputedStyle(skyDom);
const skyHeight = parseFloat(skyStyle.height);
const skyWidth = parseFloat(skyStyle.width);

class Sky extends Rectangle {
    constructor(speed){
        super(skyHeight,skyWidth,0,0,speed,0,skyDom)
    }
    onMove(){
        if(this.left<= -this.width/2){
            this.left =0;
        }
    }
    
}