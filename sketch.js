let width = 1000, height = 600;
let creatures = [];
let food = [];


function setup(){
    let canvas = createCanvas(width, height);
    
    for (let index = 0; index < 20; index++) {
        creatures.push(new Creature(random(0, width),random(0, height)));
    }
    for (let index = 0; index < 400; index++) {
        food.push(new Food(random(0, width),random(0, height),random(0, 20)));
    }
    
}
function draw(){
    background(0);
    for (const creature of creatures) {
        creature.eat(food);
        creature.update();
        creature.display();
    }
    for (const f of food) {
        f.display();
    } 
}