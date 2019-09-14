let width = 1000, height = 600;
let creatures = [];



function setup(){
    let canvas = createCanvas(width, height);
    background(0);
    for (let index = 0; index < 10; index++) {
        creatures.push(new Creature(random(0, width),random(0, height)));
    }
    
}
function draw(){
    let target = createVector(mouseX, mouseY);
    
    for (let index = 0; index < 10; index++) {
        creatures[index].seek(target);
        creatures[index].update();
        creatures[index].draw();
    }
}