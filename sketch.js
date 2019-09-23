let globalwidth = 1200, globalheight = 800,fieldW = 1200, fieldH = 600;
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
    }
    for (const f of food) {
        f.display();
    }
    if(globalTime & 50){
        food.push(new Food(random(20, fieldW-20),random(20, fieldH-20),random(7, 11)));
    }

    globalTime++;
    fill(255);
    textSize(12);
    text('global time ' + (floor(globalTime*0.01)).toString(), 0,fieldH+10,150,fieldH+30);
    text('Number of Creatures    ' + (creatures.length+1).toString() ,0,fieldH+30,150,fieldH+50);
        
}