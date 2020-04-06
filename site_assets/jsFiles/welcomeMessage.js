$(document).ready(async function(){
  var text1 = "Hello";
  var text2 = "My name is Doug!";
  var text3 = "Nice to meet you!";
  var text4 = "I'm an aspiring software developer in New York.";
  var text5 = "And I'm looking for new job opportunities!";
  var text6 = "Here's how you can get to know me better...";
  var arr = [text1,text2,text3,text4,text5,text6];
  var sizeArr = [10,8,7,4,4,4];
  var fontSizeArr = [7,6,5,3.5,3.5,3.5];
  var waitTimes = [1300,1300,1400,1400,1400,1400];
for(var i = 0; i < arr.length; i++){
    var map = populateBoxes(arr[i],sizeArr[i],fontSizeArr[i]);
    var time = calculateTime(map);
    randomizeBoxes(map);
    await sleep(time+waitTimes[i]);
    clearBoxes();
  }
});

function calculateTime(map){
  var time = 0;
  for(var i = 0; i < map["size"]; i++){
    for(var j = 0; j < map[i]["size"]; j++){
      if(map[i][j]!="none"){time+=100;}
    }
  }
  return time;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function populateBoxes(text,size,fontSize){
  var count = 0;
  var totLength = parseInt(text.length/2.2);
  text = text.split(" ");
  var arrangedText = []; // each element corresponds to the text per row
  var entry = ""; // to keep track of the text per row
  for(var i = 0; i < text.length; i++){
    count+=text[i].length;
    if(i == text.length-1){entry+=text[i];}
    else{entry+=(text[i]+" ");}
    if(count >= totLength){
      arrangedText.push(entry);
      count = 0;
      entry = "";
    }
    else if(i == text.length-1){
        arrangedText.push(entry);
    }
  }
  for(var i = 0; i < arrangedText.length; i++){
    if(arrangedText[i].charAt(arrangedText[i].length-1) == ' '){
      arrangedText[i] = arrangedText[i].slice(0,-1);
    }
  }
  console.log(arrangedText);
  var map = {};
  map["size"] = arrangedText.length+2;
  for(var i = 0; i <= arrangedText.length+1; i++){
    map[i] = {};
    if(i > 0 && i <= arrangedText.length){
      map[i]["size"] = arrangedText[i-1].length;
      for(var j = 0; j < arrangedText[i-1].length; j++){
        map[i][j] = arrangedText[i-1][j];
      }
    }
    else{
      map[i]["size"] = totLength;
      for(var j = 0; j < totLength; j++){
        map[i][j] = "none";
      }
    }
  }
  var t = "";
  for(var i = 0; i < map["size"]; i++){
    jQuery('<div/>', {
      id: 'row'+i
    }).appendTo('#intro');
    $('#row'+i).css({"margin":"0 auto","display":"flex","width":"100%","height":''+(100/map["size"]/2)+'%',"display":"inline-block","text-align":"center","justify-content":"center","align-items":"center","position":"relative"});
    for(var j = 0; j < map[i]["size"]; j++){
      jQuery('<span/>', {
        id: 'col'+i+''+j,
        text: map[i][j]
      }).appendTo('#row'+i);
      $('#col'+i+''+j).css({"width":size+'%',"opacity":"0","display":"inline-block","font-size":fontSize+"em"});
      t+= map[i][j];
    }
  }
  return map;
}

function clearBoxes(){
  $('#intro').empty(); // clear all the rows and make ready for another message
}

function lightElement(map,colors,colorIndex,i,j){
  if(map[i][j]!="none" && map[i][j]!=" "){
    $('#col'+i+''+j).css({'box-shadow':'0px 4px 13px 2px '+colors[colorIndex],'opacity':'100','color':'white','background-color':''+colors[colorIndex]});
  }
  else if(map[i][j]==="none"){
    $('#col'+i+''+j).css({'opacity':'0'});
  }
}

function randomizeBoxes(map){
  var colors = ['#009CE9', '#00BEDB','#00D2D9','#16E6B2','#9EF389','#FF9671','#E57B89','#B56D97','#7D6592','#4B597A'];
  var colorIndex = 0;
  var time = 0;
  for(var i = 0; i < map["size"]; i++){
    $('#row'+i).css({'margin-top':'5%'});
    for(var j = 0; j < map[i]["size"]; j++){
      if(map[i][j]!="none"){
        setTimeout(lightElement,time,map,colors,colorIndex,i,j);
        time+=100;
      }
      colorIndex++;
      if(colorIndex >= colors.length){colorIndex = 0;}
    }
  }
  return time;
}

