let songs = {
      ambiance: null,
      startAmb: null,
      ambiance2: null,
      doors0: null,
      doors1: null
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

      songs.doorsO = new Audio(game.train.path + game.train.motorJson["motor audio"]["open-doors"][0])

      songs.doorsC = new Audio(game.train.path + game.train.motorJson["motor audio"]["close-doors"][0])


      setInterval(() => {
            if (game.train.speed >= 0.5) {
                  if (game.train.speed <= game.train.motorJson["motor audio"]["start-audio"][1]["max-speed"]) {
                        songs.startAmb.volume = game.train.motorJson["motor audio"]["start-audio"][1].volume
                  } else {
                        songs.startAmb.volume = 0;
                  }

                  if (game.train.motorJson["motor audio"].startAmb[1]["allow pitch"][0] && (game.train.speed * game.train.motorJson["motor audio"].startAmb[1]["allow pitch"][1]) >= 0) {
                        songs.startAmb.playbackRate = game.train.speed * game.train.motorJson["motor audio"].startAmb[1]["allow pitch"][1];
                        songs.startAmb.preservesPitch = false;
                  }
                  
                  if (game.train.motorJson["motor audio"].ambiance[1]["allow pitch"][0] && (game.train.speed * game.train.motorJson["motor audio"].ambiance[1]["allow pitch"][1]) >= 0) {
                        songs.ambiance.playbackRate = game.train.speed * game.train.motorJson["motor audio"].ambiance[1]["allow pitch"][1];
                        songs.ambiance.preservesPitch = false;
                        songs.ambiance.volume = game.train.motorJson["motor audio"].ambiance[1]["volume"];
                  }
            
                  if (game.train.motorJson["motor audio"].ambiance2[1]["allow pitch"][0] && (((game.train.speed / 2) * game.train.motorJson["motor audio"].ambiance2[1]["allow pitch"][1]) - 0.05) >= 0) {
                        songs.ambiance.volume = game.train.motorJson["motor audio"].ambiance2[1]["allow pitch"][0];
                        songs.ambiance2.playbackRate = ((game.train.speed / 2) * game.train.motorJson["motor audio"].ambiance2[1]["allow pitch"][1]) - 0.05;
                        songs.ambiance2.preservesPitch = false
                  }
            } else {
                  songs.ambiance.volume = 0;
                  songs.ambiance2.volume = 0;
                  songs.startAmb.volume = 0;
            }
      }, 100)
}


function motor_onPlay() {
      // play all songs automatically 
      songs.startAmb.play();
      songs.ambiance.play();
      songs.ambiance2.play();
      songs.ambianceL.play();
      /*if (game.gameLoad) {
            var songList = Object.keys(songs)
            for (var i = 0; i < songList.length; i++) {
                  songs[songList[i]].play()
            }
      }*/
}

function motor_onStop() {
      // stop all songs automatically 
      songs.startAmb.pause();
      songs.ambiance.pause();
      songs.ambiance2.pause();
      if (!game.train.motorJson["motor audio"]["loop-ambiance"][1]["only motor on"]) {
            songs.ambianceL.stop();
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