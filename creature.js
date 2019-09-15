class Creature {
    constructor(x = 0,y = 0){
        this.position = createVector(x,y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0,0);
        this.maxspeed = 2;
        this.maxforce = 0.2;
        this.energy = 100;
        //this.mass = 1;
    }
    collision(){
        let pos = this.position;
        let size = this.energy*0.1;
        if((pos.x+size) <= 0 && (pos.y+size) <= 0 && (pos.x-size) > fieldW && (pos.y-size) > fieldW ){
            this.applyForce(-1);
        }
    }
    display(){
        let angle = this.velocity.heading() + PI / 2;
        push();
        noStroke();
        fill(255,0,0);
        this.energy-=0.1;
        ellipse(this.position.x, this.position.y, this.energy*0.1, this.energy*0.1,);
        translate(this.position.x, this.position.y);
        rotate(angle);
        pop();
    }
    update(){
        this.collision();
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        
    }
    isDead(){
        if(this.energy < 1){
            return true;
        }
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
    eat(list){
        let record = Infinity;
        let closest = -1;
        for (let i = 0; i < list.length; i++) {
            const distance = dist(this.position.x, this.position.y, list[i].position.x, list[i].position.y);
            if(distance < record){
                record = distance;
                closest = i;
            }
            
        }
        if(record < list[closest].amount){
            this.energy += list[closest].amount;
            //this.mass += list[closest].amount;
            list.splice(closest,1);
        } else if (closest > -1){
            this.seek(list[closest].position);
        }
        
       
    }
}