let songs = {
      ambiance: null,
      startAmb: null,
      ambiance2: null,
      ambianceBrack: null,
      doorsO: null,
      doorsC: null
}

function loadMotor() {
      //alert(game.train.path + game.train.motorJson)
      songs.ambiance = new Audio(game.train.path + game.train.motorJson["motor audio"].ambiance[0])
      songs.ambiance.loop = true;

      songs.startAmb = new Audio(game.train.path + game.train.motorJson["motor audio"]["start-audio"][0])
      songs.startAmb.loop = true;

      songs.ambianceL = new Audio(game.train.path + game.train.motorJson["motor audio"]["loop-ambiance"][0])
      songs.ambianceL.loop = true;

      songs.ambiance2 = new Audio(game.train.path + game.train.motorJson["motor audio"].ambiance2[0])
      songs.ambiance2.loop = true;

      songs.doorsO = new Audio(game.train.path + game.train.motorJson["motor audio"].events["open-doors"][0])
      songs.doorsO.volume = game.train.motorJson["motor audio"].events["open-doors"][1].volume;
      
      songs.doorsC = new Audio(game.train.path + game.train.motorJson["motor audio"].events["close-doors"][0])
      songs.doorsC.volume = game.train.motorJson["motor audio"].events["close-doors"][1].volume;

      songs.ambianceBrack = new Audio(game.train.path + game.train.motorJson["motor audio"]["brack-ambiance"][0])
      songs.ambianceBrack.volume = 0;
      songs.ambianceBrack.loop = true;
      
      setInterval(() => {
            if (game.train.speed >= 0.5) {
                  if (game.train.speed <= game.train.motorJson["motor audio"]["start-audio"][1]["max-speed"]) {
                        if (game.train.motorJson["motor audio"]["start-audio"][1]["disable onTration"]) {
                              // if disble onTraintion on
                              
                              if (!game.train.manipulatorSpeedIn == 0) {
                                    songs.startAmb.volume = game.train.motorJson["motor audio"]["start-audio"][1].volume;
                              } else {
                                    songs.startAmb.volume = 0;
                              }
                        } else {
                              // if disble onTraintion off
                              
                              songs.startAmb.volume = game.train.motorJson["motor audio"]["start-audio"][1].volume;
                        }
                  } else {
                        songs.startAmb.volume = 0;
                  }

                  if (game.train.motorJson["motor audio"]["start-audio"][1]["allow pitch"][0] && (game.train.speed * game.train.motorJson["motor audio"]["start-audio"][1]["allow pitch"][1]) >= 0.2) {
                        songs.startAmb.playbackRate = game.train.speed * game.train.motorJson["motor audio"]["start-audio"][1]["allow pitch"][1];
                        songs.startAmb.preservesPitch = false;
                  }
                  
                  if (game.train.manipulatorSpeedIn <= -1) {
                        songs.ambianceBrack.volume = game.train.motorJson["motor audio"]["brack-ambiance"][1].volume;
                  } else {
                        songs.ambianceBrack.volume = 0;
                  }
                  
                  /* ambiance */
                  
                  if (game.train.motorJson["motor audio"].ambiance[1]["allow pitch"][0] && (game.train.speed * game.train.motorJson["motor audio"].ambiance[1]["allow pitch"][1]) >= 0.2) {
                        songs.ambiance.playbackRate = game.train.speed * game.train.motorJson["motor audio"].ambiance[1]["allow pitch"][1];
                        songs.ambiance.preservesPitch = false;
                  }
                  
                  if (!game.train.motorJson["motor audio"].ambiance[1]["allow volumeManipulatorSync"]) {
                        if (game.train.manipulatorSpeedIn == 0) {
                              songs.ambiance.volume = 0;
                        }
                  }

                  if (game.train.motorJson["motor audio"].ambiance[1]["allow volumeManipulatorSync"]) {
                        if (game.train.manipulatorSpeedIn == 1) {
                              songs.ambiance.volume = game.train.motorJson["motor audio"].ambiance[1]["volume"] * 0.3;
                        }
                        
                        if (game.train.manipulatorSpeedIn == 2) {
                              songs.ambiance.volume = game.train.motorJson["motor audio"].ambiance[1]["volume"] * 0.5;
                        }
                        
                        if (game.train.manipulatorSpeedIn == 3) {
                              songs.ambiance.volume = game.train.motorJson["motor audio"].ambiance[1]["volume"];
                        }
                        
                        if (game.train.manipulatorSpeedIn <= 0) {
                              songs.ambiance.volume = game.train.motorJson["motor audio"].ambiance[1]["volume"] * 0.5;
                        }
                  }
                  
                  /* ambiance2 */
            
                  if (game.train.motorJson["motor audio"].ambiance2[1]["allow pitch"][0] && (((game.train.speed / 2) * game.train.motorJson["motor audio"].ambiance2[1]["allow pitch"][1]) - 0.05) >= 0.2) {
                        songs.ambiance2.playbackRate = ((game.train.speed / 2) * game.train.motorJson["motor audio"].ambiance2[1]["allow pitch"][1]) - 0.05;
                        songs.ambiance2.preservesPitch = false;
                  }
                  
                  if (!game.train.motorJson["motor audio"].ambiance2[1]["allow volumeManipulatorSync"]) {
                        if (game.train.manipulatorSpeedIn == 0) {
                              songs.ambiance2.volume = 0;
                        }
                  }

                  if (game.train.motorJson["motor audio"].ambiance2[1]["allow volumeManipulatorSync"]) {
                        if (game.train.manipulatorSpeedIn == 1) {
                              songs.ambiance2.volume = game.train.motorJson["motor audio"].ambiance2[1]["volume"] * 0.3;
                        }
                        
                        if (game.train.manipulatorSpeedIn == 2) {
                              songs.ambiance2.volume = game.train.motorJson["motor audio"].ambiance2[1]["volume"] * 0.5;
                        }
                        
                        if (game.train.manipulatorSpeedIn == 3) {
                              songs.ambiance2.volume = game.train.motorJson["motor audio"].ambiance2[1]["volume"];
                        }
                        
                        if (game.train.manipulatorSpeedIn <= 0) {
                              songs.ambiance2.volume = game.train.motorJson["motor audio"].ambiance2[1]["volume"] * 0.5;
                        }
                  }

            } else {
                  songs.ambianceBrack.volume = 0;
                  songs.ambiance.volume = 0;
                  songs.ambiance2.volume = 0;
                  songs.startAmb.volume = 0;
            }
      }, 50)
}


function motor_onPlay() {
      // play all songs
      songs.ambianceBrack.play();
      songs.startAmb.play();
      songs.ambiance.play();
      songs.ambiance2.play();
      songs.ambianceL.play();
      songs.ambianceL.volume = game.train.motorJson["motor audio"]["loop-ambiance"][1].volume;
      /*if (game.gameLoad) {
            var songList = Object.keys(songs)
            for (var i = 0; i < songList.length; i++) {
                  songs[songList[i]].play()
            }
      }*/
}

function motor_onStop() {
      // stop all songs 
      
      songs.ambianceBrack.pause();
      songs.startAmb.pause();
      songs.ambiance.pause();
      songs.ambiance2.pause();
      if (!game.train.motorJson["motor audio"]["loop-ambiance"][1]["only motor on"]) {
            songs.ambianceL.pause();
      }
      /*if (game.gameLoad) {
            var songList = Object.keys(songs)
            for (var i = 0; i < songList.length; i++) {
                  songs[songList[i]].pause()
            }
      }*/
}

function train_openDoors() {
      songs.doorsO.play();
}

function train_closeDoors() {
      songs.doorsC.play();
}

function train_buttonPress() {
      var b = new Audio(game.train.path + game.train.motorJson["motor audio"].events["button-press"][0]);
      b.volume = game.train.motorJson["motor audio"].events["button-press"][1].volume;
      b.play()
}


var inB = 0;
function train_ManipulatorButtonPress() {
      var b = new Audio(game.train.path + game.train.motorJson["motor audio"].events["manipulator-change"][0]);
      b.volume = game.train.motorJson["motor audio"].events["manipulator-change"][1].volume;
      b.play()
      
      if (inB == 0 && game.train.manipulatorSpeedIn <= 0) {
            inB = 1;
      }
      
      if (inB == 1 && game.train.manipulatorSpeedIn >= 0) {
            inB = 0;
            
            var f = new Audio(game.train.path + game.train.motorJson["motor audio"].events["disable-brack"][0]);
            f.volume = game.train.motorJson["motor audio"].events["disable-brack"][1].volume;
            f.play();
      }

      if (game.train.manipulatorSpeedIn == -4) {
            var c = new Audio(game.train.path + game.train.motorJson["motor audio"].events["urgencyBrack-press"][0]);
            c.volume = game.train.motorJson["motor audio"].events["urgencyBrack-press"][1].volume;
            c.play();
      }
}