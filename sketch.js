var backgroundScene, backgroundImg, blackboardImg;

var boy, boyAnim, boyStop;
var obstacle, obstacle1, obstacle2, obstacle3, obstaclesGroup;
var book, book1, book2, book3, booksGroup;
var invisibleGround;
var apple, appleImg;

var inputBox, button;

var gameState = 1;
var marks = -3;

function preload(){
  backgroundImg = loadAnimation("background.jpg");
  blackboardImg = loadAnimation("blackboard.jpg");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");

  book1 = loadImage("book1.png");
  book2 = loadImage("book2.png");
  book3 = loadImage("book3.png");

  boyAnim = loadAnimation("1.png", "2.png", "3.png", "4.png");
  boyStop = loadAnimation("4.png");

  appleImg = loadImage("apple.png");
}

function setup(){
  createCanvas(displayWidth - 100, displayHeight - 150);
  
  backgroundScene = createSprite(1050, 375, 10, 10);
  backgroundScene.addAnimation("bg", backgroundImg);
  backgroundScene.addAnimation("bb", blackboardImg);
  backgroundScene.velocityX = -8;
  backgroundScene.scale = 3;

  boy = createSprite(70, height - 100);
  boy.addAnimation("walk", boyAnim);
  boy.addAnimation("stop", boyStop);
  boy.scale = 0.8;
  boy.mirrorX(boy.mirrorX() * -1);

  apple = createSprite(width/2, height/2 - 200, 10, 10);
  apple.addImage(appleImg);
  apple.scale = 0.2;
  apple.visible = false;

  invisibleGround = createSprite(width/2, height, width, 20);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  booksGroup = new Group();
}

function draw(){
  background("white");

  boy.collide(invisibleGround);
  boy.velocityY = boy.velocityY + 0.8;

  if(gameState === 1){
    if(backgroundScene.x < 275){
      backgroundScene.x = 1000
    }

    if(keyDown("Space") && boy.y > height - 110){
      boy.velocityY = -20;
    }

    var rand = Math.round(random(1, 2));

    switch(rand){
      case 1:
        spawnObstacles();
        break;
      case 2:
        spawnBooks();
        break;
      default:
        break;
    }

    if(boy.isTouching(obstaclesGroup)){
      gameState = 0;
    }

    for(i = 0; i < booksGroup.length; i++){
      if(boy.isTouching(booksGroup.get(i))){
        if(marks === 0 || marks === 5 || marks === 10){
          marks = marks + 0.5;
        } else {
          marks++;
        }
        booksGroup.get(i).destroy();
      }
    }

    if(marks === 0.5 || marks === 5.5 || marks === 10.5){
      gameState = 2;
      test();
    }

    if(marks === 11){
      gameState = 0;
    }

    drawSprites();
  } else {
    boy.changeAnimation("stop", boyStop);

    drawSprites();

    textSize(20);
    fill("red");
    if(boy.isTouching(obstaclesGroup)){
      text("No matter how many hurdles come in your way, you must never stop learning.", displayWidth/2 - 400, 50);
      text("To continue learning, press the space bar.", displayWidth/2 - 240, 80);
    } else if(marks === 11){
      text("Congrats. You have educated the boy.", displayWidth/2 - 200, 50);
      text("Stop illiteracy and educate the world.", displayWidth/2 - 195, 80);
      text("To educate the boy more, press the space bar.", displayWidth/2 - 235, 110);
    }

    backgroundScene.velocityX = 0;

    obstaclesGroup.setVelocityXEach(0);
    booksGroup.setVelocityXEach(0);

    if(keyDown("space")){
      reset()
    }
  }

  textSize(20);
  fill("blue");
  if(marks > 0){
    if(marks === 0.5){
      text("Class: UKG", 50, 50);
    } else if(marks === 5.5){
      text("Class: 5", 50, 50);
    } else if(marks === 10.5){
      text("Class: 10", 50, 50);
    } else {
      text("Class: " + marks, 50, 50);
    }
  } else if(marks === -3){
    text("Start Educating", 50, 50);
  } else if(marks === -2){
    text("Class: Nursery", 50, 50);
  } else if(marks === -1){
    text("Class: LKG", 50, 50);
  } else if(marks === 0){
    text("Class: UKG", 50, 50);
  } else if(marks === 11){
    text("Education Completed", 50, 50);
  }
}

function reset(){
  obstaclesGroup.destroyEach();
  booksGroup.destroyEach();

  marks = -3;

  boy.changeAnimation("walk", boyAnim);

  backgroundScene.velocityX = -8;

  gameState = 1;
}

function spawnObstacles(){
  if(frameCount % 80 === 0){
    obstacle = createSprite(width + 50, height - 40);
    obstacle.scale = 1.4;
    obstacle.velocityX = -5;

    var rand = Math.round(random(1, 6));

    switch(rand){
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.y = height - 50;
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.y = height - 50;
        obstacle.addImage(obstacle5);
      case 6:
        obstacle.y = height - 50;
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
    obstaclesGroup.add(obstacle);

    obstacle.setCollider("rectangle", 0, 0, 40, 40);
  }
}

function spawnBooks(){
  if(frameCount % 80 === 0){
    book = createSprite(width + 50, Math.round(random(300, 450)));
    book.velocityX = -5;

    var rand = Math.round(random(1, 3));

    switch(rand){
      case 1:
        book.scale = 0.3;
        book.addImage(book1);
        break;
      case 2:
        book.scale = 0.6;
        book.addImage(book2);
        break;
      case 3:
        book.scale = -0.6;
        book.addImage(book3);
        break;
      default:
        break;
    }
    booksGroup.add(book);
  }
}

function test(){
  if(gameState === 2){
    boy.visible = false;

    booksGroup.destroyEach();
    obstaclesGroup.destroyEach();

    backgroundScene.changeAnimation("bb", blackboardImg);
    backgroundScene.x = width/2;
    backgroundScene.y = height/2;
    backgroundScene.scale = 1;

    if(marks === 0.5){
      apple.visible = true;
        
      var q1= createElement('h1');
      q1.html("Identify the fruit");
      q1.position(width/2 - 120, 50);
        
      input = createInput();
      input.position(width/2-120, height/2-100);
      
      button = createButton('Submit');
      button.position(input.x + input.width, height/2-100);
      button.mousePressed(()=>{
        var a1 = input.value();
        input.hide();
        button.hide();
        if(a1 === "apple" || a1 === "Apple" || a1 === "APPLE"){
          var a1= createElement('h1');
          a1.html("Correct Answer");
          a1.position(width/2 - 105, height/2 - 100);
          var con = createButton('Continue Educating');
          con.position(width/2 - 60, a1.y + 70);
          con.mousePressed(()=>{
            boy.visible = true;
            boy.changeAnimation("walk", boyAnim);
            apple.destroy();
            backgroundScene.changeAnimation("bg", backgroundImg);
            backgroundScene.x = 1070;
            backgroundScene.y = 370;
            backgroundScene.velocityX = -8;
            backgroundScene.scale = 3;
            marks = marks + 0.5;
            q1.hide();
            a1.hide();
            con.hide();
            gameState = 1;
          });
        } else {
          var a1= createElement('h1');
          a1.html("Wrong Answer. Correct Answer is: Apple");
          a1.position(width/2 - 300, height/2 - 100);
          var con = createButton('Continue Educating');
          con.position(width/2 - 60, a1.y + 70);
          con.mousePressed(()=>{
            boy.visible = true;
            boy.changeAnimation("walk", boyAnim);
            apple.destroy();
            backgroundScene.changeAnimation("bg", backgroundImg);
            backgroundScene.x = 1070;
            backgroundScene.y = 370;
            backgroundScene.velocityX = -3;
            backgroundScene.scale = 3;
            marks = marks + 0.5;
            q1.hide();
            a1.hide();
            con.hide();
            gameState = 1;
          });
        }
      });
    } else if(marks === 5.5){
      var q2 = createElement('h1');
      q2.html("According to the distributive property, a(b + c) =")
      q2.position(width/2 - 330, 50);

      var input = createInput();
      input.position(width/2 - 120, height/2 - 100);

      button = createButton('Submit');
      button.position(input.x + input.width, height/2-100);
      button.mousePressed(()=>{
        var a2 = input.value();
        input.hide();
        button.hide();
        if(a2 === "ab + ac" || a2 === "ab+ac" || a2 === "ac + ab" || a2 === "ac+ab"){
          var a2= createElement('h1');
          a2.html("Correct Answer");
          a2.position(width/2 - 105, height/2 - 100);
          var con = createButton('Continue Educating');
          con.position(width/2 - 60, a2.y + 70);
          con.mousePressed(()=>{
            boy.visible = true;
            boy.changeAnimation("walk", boyAnim);
            backgroundScene.changeAnimation("bg", backgroundImg);
            backgroundScene.x = 1070;
            backgroundScene.y = 370;
            backgroundScene.velocityX = -8;
            backgroundScene.scale = 3;
            marks = marks + 0.5;
            q2.hide();
            a2.hide();
            con.hide();
            gameState = 1;
          });
        } else {
          var a2= createElement('h1');
          a2.html("Wrong Answer. Correct Answer is: Sodium");
          a2.position(width/2 - 280, height/2 - 100);
          var con = createButton('Continue Educating');
          con.position(width/2 - 60, a2.y + 70);
          con.mousePressed(()=>{
            boy.visible = true;
            boy.changeAnimation("walk", boyAnim);
            backgroundScene.changeAnimation("bg", backgroundImg);
            backgroundScene.x = 1070;
            backgroundScene.y = 370;
            backgroundScene.velocityX = -3;
            backgroundScene.scale = 3;
            marks = marks + 0.5;
            q2.hide();
            a2.hide();
            con.hide();
            gameState = 1;
          });
        }
      });
    } else if(marks === 10.5){
      var q3 = createElement('h1');
      q3.html("Identify the element: Na");
      q3.position(width/2 - 170, 50);

      var input = createInput();
      input.position(width/2 - 120, height/2 - 100);

      button = createButton('Submit');
      button.position(input.x + input.width, height/2-100);
      button.mousePressed(()=>{
        var a3 = input.value();
        input.hide();
        button.hide();
        if(a3 === "Sodium" || a3 === "sodium" || a3 === "Natrium" || a3 === "natrium"){
          var a3= createElement('h1');
          a3.html("Correct Answer");
          a3.position(width/2 - 105, height/2 - 100);
          var con = createButton('Continue Educating');
          con.position(width/2 - 60, a3.y + 70);
          con.mousePressed(()=>{
            boy.visible = true;
            boy.changeAnimation("walk", boyAnim);
            backgroundScene.changeAnimation("bg", backgroundImg);
            backgroundScene.x = 1070;
            backgroundScene.y = 370;
            backgroundScene.velocityX = -8;
            backgroundScene.scale = 3;
            marks = marks + 0.5;
            q3.hide();
            a3.hide();
            con.hide();
            gameState = 1;
          });
        } else {
          var a3= createElement('h1');
          a3.html("Wrong Answer. Correct Answer is: ab + ac");
          a3.position(width/2 - 280, height/2 - 100);
          var con = createButton('Continue Educating');
          con.position(width/2 - 60, a3.y + 70);
          con.mousePressed(()=>{
            boy.visible = true;
            boy.changeAnimation("walk", boyAnim);
            backgroundScene.changeAnimation("bg", backgroundImg);
            backgroundScene.x = 1070;
            backgroundScene.y = 370;
            backgroundScene.velocityX = -3;
            backgroundScene.scale = 3;
            marks = marks + 0.5;
            q3.hide();
            a3.hide();
            con.hide();
            gameState = 1;
          });
        }
      });
    }
  }
}