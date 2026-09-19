
var motor = himageSheets_add("Motor","assets/images/UI.png", ['[724.6,644.1,-5448,-2587.7,6211.3]'])
motor.style.zIndex = "5";
motor.style.top = "460px"
motor.style.left = "-32px";
motor.style.scale = "0.06";
motor.onclick = function () {
      if (!game.train.motor && game.train.speed <= 0.2) {
            game.train.motor = true;
            motor_onPlay();
            motor.style.filter = "brightness("+200+"%)";
      } else {
            game.train.motor = false;
            motor_onStop();
            motor.style.filter = "brightness("+100+"%)";
      }
}
document.body.appendChild(motor)


var doorsOpen = himageSheets_add("doorsOpen","assets/images/UI.png", ['[738,661,-5653,-39,6433]'])
doorsOpen.style.zIndex = "5";
doorsOpen.style.top = "410px"
doorsOpen.style.left = "-37px";
doorsOpen.style.scale = "0.06";
doorsOpen.onclick = function () {
      if (game.train.motor && !game.train.doors.both) {
            game.train.doors.both = true;
            game.train.canMove = false;
            doorsOpen.style.filter = "brightness("+500+"%)";
            doorsClose.style.filter = "brightness("+100+"%)";
            
            train_openDoors()
      }
}
document.body.appendChild(doorsOpen)


var doorsClose = himageSheets_add("doorsClose","assets/images/UI.png", ['[738,631,-5653,-740,6433]'])
doorsClose.style.zIndex = "5";
doorsClose.style.top = "427px"
doorsClose.style.scale = "0.06";
doorsClose.onclick = function() {
      if (game.train.motor && game.train.doors.both) {
            game.train.doors.both = false;
            game.train.canMove = true;
            doorsOpen.style.filter = "brightness("+100+"%)";
            doorsClose.style.filter = "brightness("+5000+"%)";
            
            train_closeDoors()
      }
}

var auto = himageSheets_add("auto","assets/images/UI.png", ['[113.7,93.6,-898.2,-530.2,1009.4]'])
auto.style.zIndex = "5";
auto.style.top = "735px"
auto.style.left = "325px";
auto.style.scale = "0.4";
document.body.appendChild(auto)
auto.onclick = function () {
      if (!game.train.modeAuto) {
            game.train.modeAuto = false;
      } else {
            game.train.modeAuto = true
      }
}


document.body.appendChild(doorsClose)

var AWSS = himageSheets_add("AWSS","assets/images/UI.png", ['[652.9,695.5,-1348.7,45.1,3296.5]'])
AWSS.style.zIndex = "5";
AWSS.style.top = "390px"
AWSS.style.left = "-180px";
AWSS.style.scale = "0.18";
document.body.appendChild(AWSS)

/* element gui */

var circle = himageSheets_add("j","assets/images/UI.png", ['[997.9,968.1,-1051,-591.7,2746.8]'])
circle.style.zIndex = "5";
circle.style.top = "290px"
circle.style.left = "215px";
circle.style.scale = "0.2";
document.body.appendChild(circle)

/* gui modifier */

function loadModifiedGui() {
      if (game.gui.json !== null) {
            if (game.gui.json.center.backgroundColor !== "") {
                  document.getElementById("gui-main").style.backgroundColor = game.gui.json.center.backgroundColor;
            }
            
            if (game.gui.json.center.padding !== "") {
                  document.getElementById("gui-main").style.padding = game.gui.json.center.paddding;
            }
      }
}