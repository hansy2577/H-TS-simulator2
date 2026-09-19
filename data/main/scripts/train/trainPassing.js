let disable = true;
let trainPassing = {
      spawnTime: 0,
      number: 0,
      json: null
}

function loadTrainPassingFile() {
      // get the json file
      
      var src = "main/Maps/"+game.choiseMaps+"/"+game.maps.json["trainPassing propriété"].folder+"/trainPassing.object";
      var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
      { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
      if (reload == 3) {
      if (allText == "Error 404, file not found.") {
            console.info("fail to load '"+game.choiseMaps+"/"+game.maps.json["trainPassing propriété"].folder+"/trainPassing.object' file")
      } else {
            trainPassing.json = JSON.parse(allText);
            if (localStorage.getItem("P10:TrainPassing") == "true") {
                  disable = false;
            }
      } 
      }
      };rawFile.send();
}

setInterval(() => {
      if (game.gameLoad && !disable && trainPassing.json !== undefined && trainPassing.json !== null ) {
            if (trainPassing.json.type == "TrainPassing" && trainPassing.number <= 5) {
                  spawnTrainPassing(trainPassing.json.data[0]);
            }
      }
},10000)

function spawnTrainPassing(stock) {
      var x = game.ligne.lineLength * 768;
      var y = stock.position[1];
      
      var t = doc.createElement("img");
      t.id = trainPassing.spawnTime;
      t.src = "main/Maps/"+game.choiseMaps+"/"+game.maps.json["trainPassing propriété"].folder+"/"+stock.src;
      t.style.position = "absolute";
      t.style.left = x+"px"
      t.style.top = stock.position[1]+"px";
      t.style.scale = stock.scale;
      t.style.zIndex = 10;
      
      document.getElementById("BG").appendChild(t);
      trainPassing.spawnTime++;
      trainPassing.number++;
      
      var tloop = setInterval(() => {
            x -= game.maps.json["trainPassing propriété"].speed * 2;
            t.style.left = x+"px";//(x * 10)+"px";
            
            if (x <= game.maps.json["trainPassing propriété"].maxPosition * 10) {
                  t.remove();
                  trainPassing.number--;
                  clearInterval(tloop);
            }
      },500)
}