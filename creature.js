class Creature {
    constructor(x = 0,y = 0){
        this.position = createVector(x,y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0,0);
        this.maxspeed = 8;
        this.maxforce = 0.2;
    }
    draw(){
        let theta = this.velocity.heading() + PI / 2;
        push();
        noStroke();
        fill(random(0, 255),random(0, 255),random(0, 255));
        ellipse(this.position.x, this.position.y, 8, 8);
        translate(this.position.x, this.position.y);
        rotate(theta);
        pop();
    }
    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

    }
    applyForce(force){
        this.acceleration.add(force);
    }
    seek(target){
        let desired = p5.Vector.sub(target, this.position);
        
        desired.setMag(this.maxspeed);
        let steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
}