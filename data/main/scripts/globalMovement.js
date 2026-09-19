let traction = {
      moveValue: 0,
      mutiplicator: 0.05,
      
      value: 0,

      up: function () {
            if (this.value >= 3) {
                  
            } else {
                  this.value++;
            }
            game.train.manipulatorSpeedIn = this.value;
      },
      
      down: function () {
            if (this.value <= -4) {
                  
            } else {
                  this.value--;
            }
            game.train.manipulatorSpeedIn = this.value;
      }
};

setInterval(() => {
      if (game.train.canMove && game.train.motor) {
      if (true) {
            if (traction.value == 1) {
                  
                  traction.moveValue += (game.train.motorJson["traction speed"] * traction.mutiplicator);
                  
            } else if (traction.value == 2) {
                  
                  traction.moveValue += (game.train.motorJson["traction speed"] * traction.mutiplicator) * 1.05;
            } else if (traction.value >= 2) {
                  
                  traction.moveValue += (game.train.motorJson["traction speed"] * traction.mutiplicator) * 2.03;
            }
      }
      
      if (traction.value == 0) {
            if (traction.moveValue >= 0) {
                  traction.moveValue -= 0.001;
            }
      }
      
      if (traction.moveValue >= 0.1) {
            if (traction.value == -1) {
     
                  traction.moveValue -= (game.train.motorJson["brake speed"] * traction.mutiplicator);
            } else if (traction.value == -2) {
   
                  traction.moveValue -= (game.train.motorJson["brake speed"] * traction.mutiplicator) * 1.05;
            } else if (traction.value == -3) {

                  traction.moveValue -= (game.train.motorJson["brake speed"] * traction.mutiplicator) * 2.5;
            } else if (traction.value <= -3) {
                  // emergency brake
                  traction.moveValue -= (game.train.motorJson["brake speed"] * traction.mutiplicator) * 4;
            }
      } else {
            if (traction.value <= 0) {
                  traction.moveValue = 0;
            }
      }
      
      }
},5)

var move = 0;

setInterval(() => {
      move -= game.train.speed * 0.5;
      
      if (game.gameLoad) {
            const bgElementWidth = 768 * 0.7; // 537.6px per BG segment
            const totalBGSegments = game.ligne.json["line-BG length"]; // 50
            const totalPixels = bgElementWidth * totalBGSegments; // Total scrollable distance
      
            // Meter = current position / total distance * total BG length
            game.train.meter = ((Math.abs(move) / totalPixels) * totalBGSegments) - (1.2 /* distance delay */);
      }
      
      game.train.speed = traction.moveValue * 0.45; // global game movement speed 
},4);

var oldXPos = 0;
setInterval(() => {
      if (game.gameLoad) {
            if (!game.train.camFixe) {
                  // if freeCam on
                  game.train.data.style.left = ((((game.train.meter * 450) - (((game.train.json.sprites.body[1]["position"][0]))) - 900) - game.train.camPressOldPosition * 450)) +"px";
            } else {
                  game.train.data.style.left = (game.train.json.sprites.body[1]["position"][0] - 500)+'px';
            }
      }
      
      if (game.train.camFixe && doc.getElementById("BG").style.transform !== `translateX(${move}px)`) {
            doc.getElementById("BG").style.transform = `translateX(${move}px)`;
      }
      
      if (game.train.camFixe && doc.getElementById("BG2").style.transform !== `translateX(${move}px)`) {
            doc.getElementById("BG2").style.transform = `translateX(${move}px)`;
      }
      
      if (!game.train.camFixe && game.camera.x !== oldXPos) {
            oldXPos = game.camera.x;
            doc.getElementById("BG").style.transform = `translateX(${move+game.camera.x}px)`;
            doc.getElementById("BG2").style.transform = `translateX(${move+game.camera.x}px)`;
      }

      if ((game.train.speed * 7) <= 9.9) {
            doc.getElementById("speedCount").innerText = ((game.train.speed * 7) + "").substr(0,3)
      } else {
            doc.getElementById("speedCount").innerText = ((game.train.speed * 7) + "").substr(0,2)
      }
},15)



