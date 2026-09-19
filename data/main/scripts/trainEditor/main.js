let x = 0;
let y = 0;
let select = "";      // select elements
let data = null;      // main json
let train = null;     // data for train main.json
let loaded = false;   // import
let globalType = "";     // train or obj



function load_Train() {
  // get the json file
  
  /*   if (result !== "json") {
    if (result == ".png") {
      data = { "position": [0, 0], "scale": 1 }
      makeTrain(false)
    }
  } else
  */
  
  var result = ((document.getElementById("src").value)[document.getElementById("src").value.length - 4]+
  (document.getElementById("src").value)[document.getElementById("src").value.length - 3]+
  (document.getElementById("src").value)[document.getElementById("src").value.length - 2] + 
  (document.getElementById("src").value)[document.getElementById("src").value.length - 1]);
  
  var rawFile = new XMLHttpRequest();
  var reload = 0;
  rawFile.open("get","main/"+document.getElementById("src").value, true);
  rawFile.onreadystatechange = function() {
    reload++;
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
    }
    if (reload == 3 ) {
      
      if (allText == "Error 404, file not found.") {
        alert("error ! | sorry no train asset found")
      } else {
        data = JSON.parse(allText);
        load(prompt("type: 'train','obj' or 'object'"))
      }
    }
  }
  rawFile.send();
}

function load(type) {
  if (type == "train" || type == "obj") {
    if (type == "obj") {
      if (prompt("reset position ?",false)) {
        makeObj(null,true)
      } else {
        makeObj(null)
      }
      globalType = "obj"
    } else {
      makeTrain()
      globalType = "train"
    }
  } else {
    alert(type+" is not a 'train' or a 'obj'")
  }
}

function makeObj(src = null,rp = false) {
  for (var i = 0; i < data.data.length; i++) {
    f = document.createElement("div");
    f.id = "main"; //data.name;
    document.body.appendChild(f)
    
    const b = document.createElement("img");
    b.id = "p"+i//data.data[i].name;
    if (!rp) {
    b.style.cssText = "position: absolute; z-index:"+data.data[i].position[2]+"; left:"+(
      0
    )+"px; top:"+(
      0
    )+"px;";
    } else {
    b.style.cssText = "position: absolute; z-index:"+data.data[i].position[2]+"; left:"+(
      data.data[i].position[0]
    )+"px; top:"+(
      data.data[i].position[1]
    )+"px;";

    }
    
    b.style.scale = data.data[i].scale;
    if (src == null) {
      b.src = "main/"+data.data[i].src;
    } else {
      b.src = src;
    }
    
    b.onclick = function () { reset(b.id) };
    f.appendChild(b);
  }
}

function makeTrain() {
    train = document.createElement("div");
    train.id="train"
    train.style.cssText = "position: absolute; scale:"+data.sprites.body[1]["scale"]+"; z-index:3; left: "+(
          data.sprites.body[1]["position"][0] - 500
    )+"px; top:"+(
          data.sprites.body[1]["position"][1] + 10
    )+"px;"
      
      
    t = document.createElement("img");
    t.id = "train:neutre"
    t.src = "main/Trains/"+data.name+"/"+data.sprites.body[0];

    t.onclick = function () {
      reset(train.id)
    }

    for (var i = 0; i < data.sprites["wheels"].length; i++) {
    const w = document.createElement("img");
    w.id = "wheels"+i;
    w.style.cssText = "position: absolute; z-index:1; left:"+(
      data.sprites["wheels"][i][1].position[0]
    )+"px; top:"+(
      data.sprites["wheels"][i][1].position[1]
    )+"px;";
    
    w.style.scale = data.sprites["wheels"][i][1].scale;
    w.src = "main/Trains/"+data.name+"/"+data.sprites["wheels"][i][0];
    train.appendChild(w);
    
    w.onclick = function () {
      reset(w.id)
    }
    }
      
    document.body.appendChild(train);
    train.appendChild(t);
}

function reset(id) {
document.getElementById("x").value = document.getElementById(id).style.left;
document.getElementById("y").value = document.getElementById(id).style.top;
document.getElementById("s").value = document.getElementById(id).style.scale;
document.getElementById("src").value = document.getElementById(id).src;

select = id;
}

function saveD() {
  if (globalType == "train") {
    if (select == "train:neutre") {
prompt("copy it :",'"position": ['+(
      (document.getElementById("train").style.left).replace("px","")
    )+','+(
      (document.getElementById("train").style.top).replace("px","")
      )+'], "scale":'+document.getElementById("train").style.scale+','
    )

    } else {
  prompt("copy it :",'"position": ['+(
      (document.getElementById(select).style.left).replace("px","")
    )+','+(
      (document.getElementById(select).style.top).replace("px","")
      )+'], "scale":'+document.getElementById(select).style.scale+','
    )
    }
  }
  
  if (globalType == "obj") {
    var objInfo = '{ "type":"'+data.type+'", "data":[';
    
    for (var i = 0; i < data.data.length; i++) {
     objInfo += '{ "name":"'+data.data[i].name+'", "src":"'+document.getElementById("p"+i).src+'", "position":['+((document.getElementById("p"+i).style.left).replace("px",""))+','+
     ((document.getElementById("p"+i).style.top).replace("px",""))+','+
     ((document.getElementById("p"+i).style.zIndex))+'], "scale":'+(document.getElementById("p"+i).style.scale)+'}'
     
     if (i >= data.data.length - 1) {
       objInfo += '], "scripts":["'+data.scripts+'"] }';
       JSON.parse(objInfo)
       prompt("replace your current .object file content by that :",objInfo);
     } else {
       objInfo += ',';
     }
    }
  }
}

setInterval(() => {
  if (select !== "") {
    document.getElementById(select).style.left = document.getElementById("x").value;
    document.getElementById(select).style.top = document.getElementById("y").value;
    document.getElementById(select).style.scale = document.getElementById("s").value;
    document.getElementById(select).src = document.getElementById("src").value;
  }
},100)

