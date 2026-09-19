let mapsLoad = false;

function play() {
      sessionStorage.setItem('data','["'+document.getElementById('T').value+'","'+document.getElementById('M').value+'","'+document.getElementById('L').value+'"]'); 
      window.location = 'game.html';
      // alert('["'+document.getElementById('T').value+'","'+document.getElementById('M').value+'","'+document.getElementById('L').value+'"]')
}

function playViews() {
      sessionStorage.setItem('data','["'+document.getElementById('T').value+'","'+document.getElementById('M').value+'","'+document.getElementById('L').value+'"]'); 
      window.location = 'game-views.html';
      // alert('["'+document.getElementById('T').value+'","'+document.getElementById('M').value+'","'+document.getElementById('L').value+'"]')
}

function getTrainList() {
  // get the json file
      var src = "main/Trains/list.txt";
      var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
      { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
            if (reload == 3) {
                  if (allText == "Error 404, file not found.") {
                        alert("fail to get : \n'"+src+"' reson :\n"+allText)
                  } else {
                        var tes = allText;
                        var trainList = tes.split(/\n/);
                  
                        for (var i = 0; i < trainList.length; i++) {
                              const m = document.createElement("a");
                              m.style.cssText = "background-color: white; color: black; font-size: 13px; padding: 4px; border-radius: 3px;"
                              m.innerText = trainList[i];
                              m.onclick = function () { document.getElementById("T").value = m.innerText }
                              document.getElementById("trainlist").appendChild(m);
                        }
                        
                        reloadList()
                  } 
            }
      };rawFile.send();
}


function reloadList() {
  // get the json file
      var src = "main/ligneList.txt";
      var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
      { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
            if (reload == 3) {
                  if (allText == "Error 404, file not found.") {
                        alert("fail to get : \n'"+src+"' reson :\n"+allText)
                  } else {
                        var tes = JSON.parse("{"+allText+"}");
                        /*if (document.getElementById("ligneList").childNodes) {
                    }*/
                        if (!mapsLoad) {
                              mapsLoad = true;
                        var tesL = Object.keys(tes);
                        for (var i = 0; i < tesL.length; i++) {
                              const m = document.createElement("a");
                              m.id = i+"list"
                              m.style.cssText = "background-color: white; color: black; font-size: 13px; padding: 4px; border-radius: 3px;"
                              m.innerText = tesL[i];
                              m.onclick = function () { document.getElementById("M").value = m.innerText; reloadList()  }
                              document.getElementById("mapslist").appendChild(m);
                        }
                        } else {
                              
                              for (var i = 0; i < document.getElementById("lignelist").children.length; i++) {
                                    document.getElementById("lignelist").children[i].remove()
                              }
                        }
                        
                        for (var i = 0; i < tes[document.getElementById("M").value].length; i++) {
                              const l = document.createElement("a");
                              l.id = i+"list"
                              l.style.cssText = "background-color: white; color: black; font-size: 13px; padding: 4px; border-radius: 3px;"
                              l.innerText = tes[document.getElementById("M").value][i];
                              l.onclick = function () { document.getElementById("L").value = l.innerText }
                              document.getElementById("lignelist").appendChild(l);
                        }
                  } 
            }
      };rawFile.send();
}


getTrainList();