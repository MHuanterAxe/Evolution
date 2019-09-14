let width = 1000, height = 600;
let creatures = [];
let food = [];


function setup(){
    let canvas = createCanvas(width, height);
    
    for (let index = 0; index < 20; index++) {
        creatures.push(new Creature(random(0, width),random(0, height)));
    }
    for (let index = 0; index < 200; index++) {
        food.push(new Food(random(0, width),random(0, height),random(1, 4)));
    }
    
}
function draw(){
    background(0);
    for (let creature = 0 ; creature <creatures.length;creature++) {
        creatures[creature].eat(food);
        creatures[creature].update();
        creatures[creature].display();
        if(creatures[creature].isDead()){
            creatures.splice(creature,1);
            
        }
            
        
    }
    for (const f of food) {
        f.display();
    } 
}