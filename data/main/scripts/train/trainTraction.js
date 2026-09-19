let traction = {
      moveValue: 0,
      
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
      if (traction.moveValue <= 120) {
            if (traction.value == 1) {
                  
                  traction.moveValue += 0.01;
            } else if (traction.value == 2) {
                  
                  traction.moveValue += 0.025;
            } else if (traction.value >= 2) {
                  
                  traction.moveValue += 0.04;
            }
      }
      
      if (traction.value == 0) {
            if (traction.moveValue >= 0) {
                  traction.moveValue -= 0.001;
            }
      }
      
      if (traction.moveValue >= 0.1) {
            if (traction.value == -1) {
     
                  traction.moveValue -= 0.02;
            } else if (traction.value == -2) {
   
                  traction.moveValue -= 0.03;
            } else if (traction.value == -3) {

                  traction.moveValue -= 0.06;
            } else if (traction.value <= -3) {
                  // emergency brake
                  traction.moveValue -= 0.2;
            }
      } else {
            if (traction.value <= 0) {
                  traction.moveValue = 0;
            }
      }
      
      } else {
            if (traction.moveValue >= 0.1) {
                  traction.moveValue -= 0.02;
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
            game.train.meter = (Math.abs(move) / totalPixels) * totalBGSegments;
      }
      
      game.train.speed = traction.moveValue * 2;
      if (doc.getElementById("BG").style.transform !== `translateX(${move}px)`) {
            doc.getElementById("BG").style.transform = `translateX(${move}px)`;
      }
      
      if (game.train.speed <= 9.9) {
            doc.getElementById("speedCount").innerText = (game.train.speed + "").substr(0,3)
      } else {
            doc.getElementById("speedCount").innerText = (game.train.speed + "").substr(0,4)
      }
},5);

