class Food{
    constructor(x,y,amount = 0){
        this.position = createVector(x, y);
        this.amount = amount;
    }
    display(){
        push();
        noStroke();
        fill(0,255,0,100);
        ellipse(this.position.x, this.position.y, this.amount, this.amount)
        pop();
    }
}