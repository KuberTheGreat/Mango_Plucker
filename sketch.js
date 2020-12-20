const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world;

var ground;

var stone;

var rope;

var mango1, mango2, mango3, mango4, mango5, mango6, mango7;

var boy, boy_image;
var tree, tree_image;

var launchingForce = 150;

function preload(){
	boy_image = loadImage("images/boy.png");
	tree_image = loadImage("images/tree.png");
}

function setup(){
	createCanvas(800, 500);

	engine = Engine.create();
	world = engine.world;

	boy = Bodies.rectangle(200, 400, 1, 1);
	World.add(world, boy);

	tree = Bodies.rectangle(650, 250, 1, 1);
	World.add(world, tree);

	ground = new Ground(400, 490, 800, 20);

	mango1 = new Mango(630, 200, 50);
	mango2 = new Mango(700, 220, 50);
	mango3 = new Mango(550, 150, 50);
	mango4 = new Mango(650, 100, 50);
	mango5 = new Mango(600, 50, 50);
	mango6 = new Mango(750, 200, 50);
	mango7 = new Mango(700, 100, 50);

	stone = new Stone(150, 330, 60);

	rope = new Rope(stone.body, {x:150, y:330});
}


function draw() {
	background("grey"); 

	Engine.update(engine);

	ground.display();

	imageMode(CENTER);
	image(boy_image, 200, 400, 150, 300);

	image(tree_image, 650, 250, 350, 500);

	mango1.display();
	mango2.display();
	mango3.display();
	mango4.display();
	mango5.display();
	mango6.display();
	mango7.display();

	stone.display();

	rope.display();

	fall(stone, mango1);
	fall(stone, mango2);
	fall(stone, mango3);
	fall(stone, mango4);
	fall(stone, mango5);
	fall(stone, mango6);
	fall(stone, mango7);
}

function mouseDragged(){
	Body.setPosition(stone.body, {x:mouseX, y:mouseY});
}

function mouseReleased(){
	rope.fly();
}

function keyPressed(){
	if(keyCode === 32){
		rope = new Rope(stone.body, {x:150, y:330});
		rope.attach(stone.body);
	}
	/*else{
		rope = null;
	}*/
}

function fall(stoneObj, mangoObj){
	mangoPos = mangoObj;
	stonePos = stoneObj;

	var distance = dist(stonePos.x, stonePos.y, mangoPos.x, mangoPos.y);

	if(distance <= mangoObj.r + stoneObj.r){
		Matter.Body.setStatic(mangoObj.body, false);
	}
}

/*object1.x - object2.x < object2.width/2 + object1.width/2
    && object2.x - object1.x < object2.width/2 + object1.width/2
    && object1.y - object2.y < object2.height/2 + object1.height/2
    && object2.y - object1.y < object2.height/2 + object1.height/2)*/
