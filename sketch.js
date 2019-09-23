let globalwidth = 1100, globalheight = 900,fieldW = 1000, fieldH = 600;
let creatures = [];
let food = [];
let globalTime = 0;

function setup(){
    let canvas = createCanvas(globalwidth, globalheight);
    for (let index = 0; index < 40; index++) {
        creatures.push(new Worker(random(0, fieldW),random(0, fieldH)));
    }
    for (let index = 0; index < 200; index++) {
        food.push(new Food(random(20, fieldW-20),random(20, fieldH-20),random(5, 10)));
    }
    
}
function draw(){
    background(0);
    stroke(255);
    noFill();
    rect(0,0,fieldW,fieldH);

    fill(255);
    textSize(12);
    text('global time ' + globalTime.toString(), 0,fieldH+10,150,fieldH+50);
    
    
    for (let creature = 0 ; creature < creatures.length;creature++) {
        creatures[creature].eatF(food,50);
        creatures[creature].update();
        creatures[creature].display();
        creatures[creature].breeding();
        if(creatures[creature].multiplied){
            let p = creatures[creature].position;
            creatures.splice(creature,1,new Worker(random(p.x-30, p.x+30),random(p.y-30, p.y+30)));
            creatures.push(new Worker(random(p.x-30, p.x+30),random(p.y-30, p.y+30)));
        }
        if(creatures[creature].isDead()){
            creatures.splice(creature,1);
        }
        if(creatures[creature] != null){
            fill(255);
            text(creature+ ' ' +floor(creatures[creature].energy).toString(),globalwidth-100,12*creature,globalwidth,50+12*creature);
        }
        
        
    }
    for (const f of food) {
        f.display();
    }
    if(globalTime & 20){
        food.push(new Food(random(20, fieldW-20),random(20, fieldH-20),random(7, 11)));
    }
    globalTime++;
}