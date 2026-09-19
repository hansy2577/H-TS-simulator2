document.addEventListener("keypress",function (e) {
      // camera 
      
      if (e.key == "ArrowLeft") {
            game.camera.x -= 40;
      }
      
      if (e.key == "ArrowRight") {
            game.camera.x -= 40;
      }

      // traction

      if (e.key == "ArrowUp") {
            document.getElementById("manipulator-button-up").onclick()
      }
      
      if (e.key == "ArrowDown") {
            document.getElementById("manipulator-button-down").onclick()
      }

      // extrat command 
      
      if (e.key == "c") {
            camChange()
      }
      
      if (e.key == "d") {
            if (!game.train.doors.both) {
                  document.getElementById("doorsOpen-button").onclick();
            } else {
                  document.getElementById("doorsClose-button").onclick();
            }
      }
})