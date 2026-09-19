

function makeTrain() {
      if (game.train.json == null) {
            alert("fail to get train JSON \n "+game.train.json)
      }
      
      // make the folder
      game.train.data = doc.createElement("div")
      game.train.data.id = "Train";
      game.train.data.style.cssText = "position: absolute; z-index: -5; scale:"+game.train.json.sprites.body[1]["scale"]+"; z-index:3; left: "+(
            game.train.json.sprites.body[1]["position"][0] - 500
      )+"px; top:"+(
            game.train.json.sprites.body[1]["position"][1] + 10
      )+"px"
      
      // make the body
      t = doc.createElement("img");
      t.id = "train:body"
      t.src = game.train.path+game.train.json.sprites.body[0];
      
      // make the wheels
      for (var i = 0; i < game.train.json.sprites["wheels"].length; i++) {
            const w = document.createElement("img");
            w.id = "wheels"+i;
            w.style.cssText = "position: absolute; z-index:1; left:"+(
                  game.train.json.sprites["wheels"][i][1].position[0]
            )+"px; top:"+(
                  game.train.json.sprites["wheels"][i][1].position[1]
            )+"px;";
    
            w.style.scale = game.train.json.sprites["wheels"][i][1].scale;
            w.src = game.train.path+game.train.json.sprites["wheels"][i][0];
            
            var spin = 0;
            const delay = Math.random() * 200;
            var wheelsLoop = setInterval(() => {
                  if (game.train.motor && game.train.manipulatorSpeedIn !== -4) {
                  spin += game.train.speed ;
                  w.style.transform = "rotate("+(spin - delay)+"deg)";
                  }
            },10);
            
            game.train.data.appendChild(w);
      }

      
      doc.body.appendChild(game.train.data);
      game.train.data.appendChild(t);
      
      wait_cabSheack();
      
      function wait_cabSheack() {
            var lo = setInterval(() => {
                  if (game.train.speed >= 10 && game.train.camFixe) {
                        cabSheack();
                        clearInterval(lo);
                  }
            }, (Math.random() * 1000))
      }
      
      function cabSheack() {
            game.train.data.style.transform = "translateY(-2px)";
            
            //var v = -60;
            var l = setInterval(() => {
                  
                  /*if (v <= 0) {
                        v += 0.05;
                  } else {*/
                        wait_cabSheack();
                        clearInterval(l);
                  //}
                  game.train.data.style.transform = "translateY(0px)";
            },50)
      }
      
      // other
}
