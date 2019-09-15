let globalwidth = 1100, globalheight = 700,fieldW = 1000, fieldH = 600;
let creatures = [];
let food = [];
let globalTime = 0;

function setup(){
    let canvas = createCanvas(globalwidth, globalheight);
    for (let index = 0; index < 20; index++) {
        creatures.push(new Creature(random(0, fieldW),random(0, fieldH)));
    }
    for (let index = 0; index < 200; index++) {
        food.push(new Food(random(0, fieldW),random(0, fieldH),random(5, 10)));
    }
    
}
function draw(){
    background(0);
    stroke(255);
    noFill();
    rect(0,0,fieldW,fieldH);

    fill(255);
    textSize(14);
    text('global time ' + globalTime.toString(), 0,fieldH+10,150,fieldH+50);
    
    
    for (let creature = 0 ; creature < creatures.length;creature++) {
        creatures[creature].eat(food);
        creatures[creature].update();
        creatures[creature].display();
        if(creatures[creature].isDead()){
            creatures.splice(creature,1);
        }
        if(creatures[creature] != null){
            fill(255);
            text(creature+ ' ' +creatures[creature].energy.toString(),globalwidth-100,10*creature,globalwidth,50+10*creature);
        }
           
        
    }
    for (const f of food) {
        f.display();
    }
    if(globalTime & 20){
        food.push(new Food(random(0, fieldW),random(0, fieldH),random(1, 7)));
    }
    globalTime++;
}