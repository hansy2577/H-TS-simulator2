let doc = document;

//sessionStorage.setItem("data",'["MF77","metro","Testing Route"]')

let doc_Get = function (id) {
      return document.getElementById(id); 
}

if (JSON.parse(sessionStorage.getItem("data")) == null) {
      alert("error while try to getting data")
      toMenu();
}

let game = {
      version: "2.7.5",
      choiseMaps: (JSON.parse(sessionStorage.getItem("data")))[1],
      choiseTrain: (JSON.parse(sessionStorage.getItem("data")))[0],
      choiseLigne: (JSON.parse(sessionStorage.getItem("data")))[2],
      gameLoad: false,
      
      gui: {
            json: null,
            
            button: {
                  doorsOpen: null,
                  doorsClose: null,
                  aws: null,
                  auto: null,
                  motor: null
            }
      },
      
      camera: {
            x: 0,
            y: 0
      },
      
      maps: {
            json: null,
            data: null,
            
            signalisation: {
                  setAs: 0
            }
      },
      
      train: {
            camPressOldPosition: 0,
            camFixe: true,
            modeAuto: true,
            speedLimite: 120,
            manipulatorSpeedIn: 0,
            path: null,
            json: null,
            data: null,
            meter: 0,
            speed: 0,
            canMove: true,
            doors: {
                  left: false,
                  right: false,
                  both: false
            },
            motor: false,
            motorJson: null
      },
      
      ligne: {
            json: null,
            lineLength: null
      }
}

document.getElementById('game version').innerText = "v"+game.version;

function toMenu() {
      window.location = "menu.html";
}

getTrain()

function getTrain() {
  // get the json file
  var src = "assets/Trains/"+game.choiseTrain+"/main.json";
  var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
  { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
            alert("fail to get : \n'"+src+"' reson :\n"+allText)
            toMenu()
      } else {
            game.train.path = "assets/Trains/"+game.choiseTrain+"/";
            game.train.json = JSON.parse(allText);
            getTrainAudio()
            getTrainUiModifier()
      } 
    }
  };rawFile.send();
}

function getTrainAudio() {
  // get the json file
  var src = "assets/Trains/"+game.choiseTrain+"/motor.json";
  var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
  { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
            alert("fail to get : \n'"+src+"' reson :\n"+allText)
            toMenu()
      } else {
            game.train.motorJson = JSON.parse(allText);
            
            getMaps();
      } 
    }
  };rawFile.send();
}

function getTrainUiModifier() {
  // get the json file
  var src = "assets/Trains/"+game.choiseTrain+"/UI.json";
  var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
  { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
            console.log("fail to get : \n'"+src+"' reson :\n"+allText)
      } else {
            game.gui.json = JSON.parse(allText);
      } 
    }
  };rawFile.send();
}


function getMaps() {
  // get the json file
  var src = "assets/Maps/"+game.choiseMaps+"/main.json";
  var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
  { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
    if (reload == 3) {
      if (allText == "Error 404, file not found." || allText == null) {
            alert("fail to get : \n'"+src+"' reson :\n"+allText)
            toMenu()
      } else {
            game.maps.json = JSON.parse(allText);
        
            getLigne();
      } 
    }
  };rawFile.send();
}

function getLigne() {
  // get the json file
  var src = "assets/Lignes/"+game.choiseMaps+"/"+game.choiseLigne+".json";
  var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
  { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
            alert("fail to get : \n'"+src+"' reson :\n"+allText)
            toMenu()
      } else {
            game.ligne.json = JSON.parse(allText);
      
            makeTrain()
            makeBG(game.ligne.json)
            load()
      } 
    }
  };rawFile.send();
}


function load() {
      game.gameLoad = true;
      game.ligne.lineLength = game.ligne.json["line length"] * 10;
      
      document.getElementById("gui-button").style.scale = 1;
      
      loadMotor();
      showGui();
      loadModifiedGui();
      loadTrainPassingFile();
      afterLoading();
      loadTrainScripts();
}

function makeBG(data) {
      if (data == null) {
            alert("fail to get maps JSON \n "+data)
            return;
      }
      
      var bGColor = doc.createElement("style");
      bGColor.innerHTML = "body { background-color:"+game.maps.json.backgroundColor+"; }"
      doc.body.appendChild(bGColor);

      
      var x = -768;
      var grilleChoseBG = -1;
      var long = game.ligne.json["line-BG length"];
      var stati = 0;
      var ligndRead = false
      for (var i = 0; i < long; i++) {
            x += 768*0.70;
            
            if (grilleChoseBG >= game.ligne.json.GrilleBG.length - 1) {
                  grilleChoseBG = 0;
            } else {
                  grilleChoseBG++;
            }
            
            if (i == long - 1) {
                  doc.getElementById("loaf").remove()
            }
            
            if (stati <= game.ligne.json.station.length - 1) {
                  if (!ligndRead && game.ligne.json.station[stati] == undefined) {
                        stati++;
                        ligndRead = true;
                  }
  
                  if /* default station */ (!ligndRead && i >= game.ligne.json.station[stati][2].meter * 10 && game.ligne.json.station[stati][0][0] !== "#") {
                        var station = doc.createElement("img");
                        if (!game.ligne.json.station[stati][2].topTrain) {
                              doc.getElementById("BG").appendChild(station)
                        } else {
                              doc.getElementById("BG2").appendChild(station)
                        }
                        station.id = "u"
                        station.style.scale = 0.7;
                        station.style.zIndex = 1
                        station.style.position = "absolute";
                        station.style.left = x+"px";
                        station.style.top = game.ligne.json.station[stati][2].y+"px"//game.maps.json.sprites.BG[game.ligne.json.GrilleBG[grilleChoseBG]][0][2]+"px";
                        station.src = "assets/Maps/"+game.maps.json.folder+"/"+game.ligne.json.station[stati][0]+".png";
                        station.onerror = function () {
                              alert("fail to load images '"+game.ligne.json.station[stati][1]+"' \n at line :"+stati+" \n from 'main.js' ")
                              return;
                        }
                        ligndRead = true;
                        stati++;
                  }
                  
                  if /* images */ (!ligndRead && i >= game.ligne.json.station[stati][2].meter * 10 && game.ligne.json.station[stati][0] == "#image") {
                        var e = doc.createElement("img");
                        if (!game.ligne.json.station[stati][2].topTrain) {
                              doc.getElementById("BG").appendChild(e)
                        } else {
                              doc.getElementById("BG2").appendChild(e)
                        }
                        e.id = "u"
                        e.style.position = "absolute";
                        e.style.scale = game.ligne.json.station[stati][2].scale;
                        e.style.zIndex = game.ligne.json.station[stati][2].z;
                        e.style.left = (x + game.ligne.json.station[stati][2].position[0] * 10)+"px";
                        e.style.top = game.ligne.json.station[stati][2].position[1]+"px"//game.maps.json.sprites.BG[game.ligne.json.GrilleBG[grilleChoseBG]][0][2]+"px";
                        e.src = "assets/Maps/"+game.maps.json.folder+"/"+game.ligne.json.station[stati][1];
                        
                        e.onerror = function () {
                              alert("fail to load custom images '"+game.ligne.json.station[stati][1]+"' \n at line :"+stati+" \n \n from 'main.js'")
                              return;
                        }
                        
                        ligndRead = true;
                        stati++;
                  }
                  
                  if /* object */ (!ligndRead && i >= game.ligne.json.station[stati][2].meter * 10 && game.ligne.json.station[stati][0] == "#object") {
                        makeObj("assets/Maps/"+game.choiseMaps+"/"+game.ligne.json.station[stati][1],"assets/Maps/"+game.choiseMaps+"/",{
                              scale: game.ligne.json.station[stati][2].scale,
                              z: game.ligne.json.station[stati][2].z,
                              xd: (x + game.ligne.json.station[stati][2].position[0] * 10),
                              yd: game.ligne.json.station[stati][2].position[1],
                              topTr: game.ligne.json.station[stati][2].topTrain
                        })                  
                        ligndRead = true;
                        stati++;
                  }
                  
                  ligndRead = false;

            }
            //console.log(grilleChoseBG)
            
            var track = doc.createElement("div");
            doc.getElementById("BG").appendChild(track)
            track.id = "train:neutre"
            track.style.scale = 0.7;
            track.style.position = "absolute";
            track.style.top = "80px";
            track.style.width = "768px";
            track.style.height = "768px";
            track.style.left = x+"px";
            track.style.zIndex = "2";
            //track.style.backgroundColor = "red"
            track.style.backgroundSize = "768px";
            track.style.backgroundImage = "url(assets/Maps/"+game.maps.json.folder+"/Track.png)"

            
            var bg = doc.createElement("img");
            doc.getElementById("BG").appendChild(bg)
            bg.id = "train:neutre"
            bg.style.scale = 0.7;
            bg.style.zIndex = -1
            bg.style.position = "absolute";
            bg.style.left = x+"px";
            bg.style.top = game.maps.json.sprites.BG[game.ligne.json.GrilleBG[grilleChoseBG]][0][2]+"px";
            bg.src = "assets/Maps/"+game.maps.json.folder+"/"+game.maps.json.sprites.BG[game.ligne.json.GrilleBG[grilleChoseBG]][0][0]
            
            var bg2 = doc.createElement("img");
            doc.getElementById("BG").appendChild(bg2)
            bg2.id = "train:neutre"
            bg2.style.scale = 0.7;
            bg2.style.position = "absolute";
            bg2.style.zIndex = -2
            bg2.style.left = x+"px";
            bg2.style.top = game.maps.json.sprites.BG[game.ligne.json.GrilleBG[grilleChoseBG]][1][2]+"px";
            bg2.src = "assets/Maps/"+game.maps.json.folder+"/"+game.maps.json.sprites.BG[game.ligne.json.GrilleBG[grilleChoseBG]][1][0]
      }
      
}

function afterLoading() {
      var loop = setInterval(() => {
            if (game.train.meter >= (game.ligne["lineLength"] + (game.ligne.json["line delay"] * 10))) {
                  clearInterval(loop);
  /*                
                  if (prompt("congratulations you finish the line 1!1!! \n it was fun ?", "yep") == "non") {
                        alert("...")
                  }
  */    
                  doc.remove()
                  window.close()
                  
                  return;
            }
      }, 10)
      
      var station2 = 0;
      setInterval(() => {
            doc.getElementById("speedType").innerText = traction.value;
            //doc.getElementById("pop").innerText = game.train.meter + "\n" + game.ligne.lineLength;
            //doc_Get("pop2").innerText = game.train.meter+"\n";
            
            if (station2 <= game.ligne.json.station.length - 1) {
                  // show gui next station 
                  
                  if (game.ligne.json.station[station2][0][0] == "#") {
                        station2++;
                  }

                  
                  if (game.train.meter >= (game.ligne.json.station[station2][2].delay + game.ligne.json.station[station2][2].meter)*10) {
                        station2++;
                  }
                  
                  doc_Get("NewStation").innerText = "next station is:\n" + game.ligne.json.station[station2][1] + "\n" + ((((game.ligne.json.station[station2][2].meter * 10) / game.train.meter) - 1)+"").substr(0, 4);
            } else {
                  doc_Get("NewStation").innerText = "next station is:\n...\n...";
            }
      }, 30)
}


function makeObj(obj,defaultSrc,{ xd, yd, z, scale, topTr }) {
  // get the json file
  var src = obj;
  var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
  { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
    if (reload == 3) {
      if (allText == "Error 404, file not found.") {
            alert("fail to get : \n'"+src+"' reson :\n"+allText)
      } else {
            var data = JSON.parse(allText);
          f = document.createElement("div");
    f.id = "#object"; //data.name;
    f.style.cssText  = "position: absolute; left: "+xd+"px; top:"+yd+"px; scale: "+scale+"; z-index: "+z+";"
                        if (!topTr) {
                              doc.getElementById("BG").appendChild(f)
                        } else {
                              doc.getElementById("BG2").appendChild(f)
                        }

  for (var i = 0; i < data.data.length; i++) {
    
    const b = document.createElement("img");
    b.id = "p"+Math.random() * 10;//data.data[i].name;
    b.style.cssText = "position: absolute; z-index:"+data.data[i].position[2]+"; left:"+(
      data.data[i].position[0]
    )+"px; top:"+(
      data.data[i].position[1]
    )+"px;";
    
    b.style.scale = data.data[i].scale;
    b.src = defaultSrc+data.data[i].src;
    f.appendChild(b)
  }
      } 
    }
  };rawFile.send();
}


function camChange() {
      if (game.train.camFixe) {
            game.camera.x = 0;
            game.camera.y = 0;
            
            game.train.camFixe = false;
            game.train.camPressOldPosition = game.train.meter;
      } else {
            game.train.camFixe = true;
      }
}

function loadTrainScripts() {
      for (var i = 0; i < game.train.json.scripts.length; i++) {
            var s = document.createElement("script");
            s.src = game.train.path + game.train.json.scripts[i];
            document.body.appendChild(s);
          
            console.info("scripts '"+game.train.json.scripts[i]+"' playing/found successfully !")
      }
}