// made by me!

function himageSheets_add(id,imgSrc,data) {
  var folder = document.createElement("div");
  folder.style.position = 'absolute';
  folder.id = id;
  var img = document.createElement("div");
  folder.appendChild(img);
  
  
  if (data !== null) {
    var json = JSON.parse(data);
    img.style.cssText = 'background-image: url('+imgSrc+'); width: '+json[0]+'px; height: '+json[1]+'px; background-position-X: '+json[2]+'px; background-position-Y: '+json[3]+'px; background-size: '+json[4]+'px; background-repeat: no-repeat;';
  }
  
  return folder;
}