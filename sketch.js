const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = []
var boats = []
var boat

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);
  cannon = new Cannon(180, 110, 130, 100, angle);

}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  push();
  fill("brown");
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width * 2, 1);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 160, 310);
  pop();


  // Matter.Body.setVelocity(boat.body,{x:-2,y:0});
  // boat.display();

  cannon.display();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i)
    collisionWithBoats(i)
  }
  showboats();

}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {

    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall)

  }


}


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    console.log(balls.length)
    balls[balls.length - 1].shoot()
  }
}



function showCannonBalls(ball, i) {
  if (ball) {
    ball.display();
  }
}


function showboats() {
  if (boats.length > 0) {
    if (boats[boats.length - 1].body.position.x < 900) {


      var positions = [-40, -60, -70, -20]
      var position = random(positions)
      boat = new Boat(1200, 400, 170, 170, position)
      boats.push(boat)
    }


    for (var i = 0; i < boats.length; i++) {
      boats[i].display();
      Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
      //console.log(boats[i])
    }
  }
  else {
    var boat = new Boat(1200, 400, 170, 170, -60)
    boats.push(boat)
  }
}

function collisionWithBoats(index) {

  for (var i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {



      var collision = Matter.SAT.collides(balls[index].body, boats[i].body)
      if (collision.collided) {
        boats[i].remove(i);
        World.remove(world, balls[index].body);
        delete balls[index]
      }
    }
  }
}
