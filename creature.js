class Creature {
    constructor(x = 0,y = 0){
        // Phisical values
        this.position = createVector(x,y);
        this.velocity = createVector();
        this.acceleration = createVector();
        this.maxspeed;
        this.maxforce;
        // Creature values
        this.dna = [];
        this.energy = 100;
        this.multiplied = false;
    }
    collision(){
        let size = this.energy*0.1;
        if(this.position.x < 0 + size){
            this.position.x = fieldW - size;
        }  
        if(this.position.y < 0 + size){
            this.position.y = fieldH - size;
        }
        if(this.position.x > fieldW - size){
            this.position.x = 0 + size;
        }
        if(this.position.y > fieldH - size){
            this.position.y = 0 + size;
        }
    }
    display(){
        let angle = this.velocity.heading() + PI / 2;
        push();
        noStroke();
        fill(255,1027,0);
        this.energy-=0.1;
        ellipse(this.position.x, this.position.y, this.energy*0.05, this.energy*0.05);
        translate(this.position.x, this.position.y);
        rotate(angle);
        pop();
    }
    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.collision();
    }
    isDead(){
        return true ? this.energy <1 : null;
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
    eatF(list,radius){
        let record = Infinity;
        let closest = -1;
        for (let i = 0; i < list.length; i++) {
            const distance = dist(this.position.x, this.position.y, list[i].position.x, list[i].position.y);
            if(distance < record && distance <= radius){
                record = distance;
                closest = i;
            }
            
        }
        if(record < 5){
            this.energy += list[closest].amount;
            list.splice(closest,1);
        } else if (closest > -1){
            this.seek(list[closest].position);
        }
        
       
    }
    breeding(){
        if(this.energy >= 200){
            this.energy = 0;
            this.multiplied = true;
        }
    }

}