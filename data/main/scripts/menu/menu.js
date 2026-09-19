let mapsLoad = false;
let listD = "";
let listM = "";
let selectM = "";

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
      var src = "assets/Trains/list.txt";
      var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
      { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
            if (reload == 3) {
                  if (allText == "Error 404, file not found.") {
                        alert("fail to get : \n'"+src+"' reson :\n"+allText)
                  } else {
                        var tes = allText;
                        var trainList = tes.split(/\n/);
                        listD = allText;
                        for (var i = 0; i < trainList.length; i++) {
                              var mm = trainList[i].split(/__/);
                              
                              const m = document.createElement("a");
                              m.style.cssText = "background-color: white; color: black; font-size: 13px; padding: 4px; border-radius: 3px; background-color:"+mm[1]+";"
                              m.innerText = mm[0];
                              m.onclick = function () { changeDescript(m.innerText); document.getElementById("T").value = m.innerText }
                              document.getElementById("trainlist").appendChild(m);
                        }
                        
                        reloadList()
                  } 
            }
      };rawFile.send();
}

function changeDescript(isThe) {
      var a = listD.split(/\n/);
      var ab = a+"";
      var b = ab.split(/__/);
      
      for (var i = 0; i < a.length; i++) {
            if (isThe == a[i].split(/__/)[0]) {
                  document.getElementById("description").innerText = (a[i].split(/__/)[2]);
            }
      }

}

function changeDescriptMaps(isThe) {
      var a = JSON.parse(listM);
      var b = Object.keys(a);

      for (var i = 0; i < b.length; i++) {
            if (isThe == b[i]) {
                  document.getElementById("description").innerText = (a[b[i]][0][1]);
            }
      }

}


function reloadList() {
  // get the json file
      var src = "assets/ligneList.txt";
      var rawFile = new XMLHttpRequest();var reload = 0;rawFile.open("get",src, true);rawFile.onreadystatechange = function() 
      { reload++; if (rawFile.readyState === 4) { var allText = rawFile.responseText; };
            if (reload == 3) {
                  if (allText == "Error 404, file not found.") {
                        alert("fail to get : \n'"+src+"' reson :\n"+allText)
                  } else {
                        var tes = JSON.parse("{"+allText+"}");
                        /*if (document.getElementById("ligneList").childNodes) {
                    }*/ listM = "{"+allText+"}";
                        if (!mapsLoad) {
                              mapsLoad = true;
                        var tesL = Object.keys(tes);
                        for (var i = 0; i < tesL.length; i++) {
                              const m = document.createElement("a");
                              m.id = i+"list"
                              m.style.cssText = "background-color: "+tes[tesL[i]][0][0]+"; color: black; font-size: 13px; padding: 4px; border-radius: 3px;"
                              m.innerText = tesL[i];
                              m.onclick = function () { document.getElementById("M").value = m.innerText; changeDescriptMaps(m.innerText); if (m.innerText !== selectM) { selectM = m.innerText; reloadList(); };  }
                              document.getElementById("mapslist").appendChild(m);
                        }
                        } else {
                              
                              for (var i = 0; i < document.getElementById("lignelist").children.length; i++) {
                                    document.getElementById("lignelist").children[i].remove()
                              }
                        }
                        if (document.getElementById("M").value !== "") {
                        for (var i = 1; i < tes[document.getElementById("M").value].length; i++) {
                              const l = document.createElement("a");
                              l.id = i+"list"
                              l.style.cssText = "background-color: white; color: black; font-size: 13px; padding: 4px; border-radius: 3px;"
                              l.innerText = tes[document.getElementById("M").value][i];
                              l.onclick = function () { document.getElementById("L").value = l.innerText }
                              document.getElementById("lignelist").appendChild(l);
                        }
                        }
                  } 
            }
      };rawFile.send();
}


getTrainList();