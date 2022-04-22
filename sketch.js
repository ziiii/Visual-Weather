var weather;
var https = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&appid=92b96db15ac5342acb2e2f524949ddf9";
var units = "&units=metric";
var clearArr=[];
var input;
var city;
var cloudWord = [];
var rainletter = [];

function setup() {
  createCanvas(600, 400);
  var button = select("#submit");
  button.mousePressed(weatherAsk);
  input = select("#city");
}

function weatherAsk() {
  var url = https + input.value() + apiKey + units;
  loadJSON(url, drawData);
}

function drawData(data) {
  weather = data;
  console.log(weather);

  var main = weather.weather[0].main;
  var desc = weather.weather[0].description;
  var windSpeed = weather.wind.speed;
  var windDire = map(weather.wind.deg, 0, 360, 10, -10);
  var cloudSpeed = windSpeed * windDire * 0.1;
  var temp = weather.main.temp;
  var blueness = map(temp, -40, 40, 10, 200);
  var cloudColor = (10, 20, temp);
  var cloudCrowd = weather.clouds.all;
  var size = weather.main.feels_like;
  var humidity = weather.main.humidity;
  var timezone = weather.timezone;
  if(main=="Rain"||main=="Mist"){
  var heavy = weather.rain["1h"];
  var rainSpeed = map(heavy,0,15,0.1,40);
  }


  console.log(main);
  console.log(desc);
  console.log("wind:", windSpeed);
  console.log("windDire:", windDire);
  console.log("temp:", temp);
  console.log("crowd", cloudCrowd);
  console.log("humi:", humidity);
  console.log("xmove:", cloudSpeed);
  console.log("size:", size);
  console.log("timezone", timezone);
  console.log("heavy", heavy);
  console.log("rainSpeed", rainSpeed);
  console.log("blue:",blueness);


  if (main == "Clouds") {
    for (let i = 0; i < cloudCrowd; i++) {
      cloudWord.push(
        new cloud(
          random(width / 10, (9 * width) / 10),
          random((height * 2) / 3),
          desc,
          cloudSpeed,
          size,
          blueness,
          random(90, 100),
          random(-1, 1)
        )
      );
    }
  }

  if (main == "Rain"||main=="Mist") {
    for (let k = 0; k < humidity * heavy; k++) {
      currentX = random(width);
      for (let i = 0; i < desc.length; i++) {
        let letter = desc.substring(i, i + 1);
        let letterWidth = textWidth(letter);
        let mylet = new Letter(
          currentX,
          random((-height * heavy) / 3, 0),
       
          letter,
          cloudSpeed,
          rainSpeed,
          size,
          blueness,
          random(90, 100),
          random(-1, 1)
        );
        currentX += letterWidth;
        rainletter.push(mylet);
      }
    }
  }
  
  if (main == "Clear") {
   
      for (let i = 0; i < desc.length; i++) {
        let letter = desc.substring(i, i + 1);   
        let length=desc.length;
  
        clearArr.push(new clearLetter(
          i,
          width/50+i*i+i*temp*0.1,
          height/ 2,   
          letter,
          2,
          windSpeed*0.1,
          map(abs(size),-40,40,5,40),
          blueness,
          random(90, 100),
          random(-1, 1),length
        ));
        

      }
      

    }
  

}

function draw() {
  background(250);

  for (let j = 0; j < cloudWord.length; j++) {
    cloudWord[j].drawCloud();
  }

  for (let k = 0; k < rainletter.length; k++) {
    rainletter[k].rainDrop();
  }
  
  for(let p=0;p<clearArr.length;p++){
    clearArr[p].skyClear();
  }
}

class cloud {
  constructor(
    x,
    y,
    word,
    xmove,
    size,
    colorValue,
    tran,
    tranChange
   
  ) {
    this.x = x;
    this.y = y;
    this.word = word;
    this.xmove = xmove + random(-0.1, 0.1);
    this.size = size + random(size * -0.2, size * 0.2);
    this.colorValue = colorValue;
    this.tran = tran;
    this.tranChange = tranChange + noise(-3, 3);

  }

  drawCloud() {
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.word, this.x, this.y);
     fill( this.colorValue, 120, 255-this.colorValue, this.tran);
    this.x += this.xmove;
    this.tran += this.tranChange;
    if (this.tran < 50) {this.tran = 50;}
    if (this.tran > 200){ this.tran = 200;}
  }
}

class Letter {
  constructor(
    x,
    y,
    letter,
    xmove,
    ymove,
    size,
    colorValue,
    tran,
    tranChange
  
  ) {
    this.x = x;
    this.y = y;
    this.letter = letter;
    this.xmove = xmove;
    this.ymove = ymove + random(ymove * -0.4, ymove * 0.4);
    this.size = size + random(size * -0.2, size * 0.2);
    this.colorValue = colorValue;
    this.tran = tran;
    this.tranChange = tranChange + noise(-3, 3);
  
  }
  rainDrop() {
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.letter, this.x, this.y);
    fill( this.colorValue, 120, 255-this.colorValue, this.tran);
    this.x+=this.xmove;
    this.y += this.ymove;
    this.tran += this.tranChange;
    if (this.tran < 50) {
      this.tran = 50;
    }
    if (this.tran > 200) {this.tran = 200;}
  }
}

class clearLetter {
  constructor(
  index,
    x,
    y,
    letter,
space,
step,
    size,
    colorValue,
    tran,
    tranChange,length
  
  ) {
    this.index=index;
    this.x=x;
    this.y = y;
    this.letter = letter;
    this.step=step;
    this.space=space;
    this.size = size + random(size * -0.2, size * 0.2);
    this.colorValue = colorValue;
    this.tran = tran;
    this.tranChange = tranChange + noise(-3, 3);
  this.length=length;
      
  }
 skyClear() {
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.letter, this.x, this.y);
    fill(this.colorValue, 120, 255-this.colorValue, this.tran);
    this.space=this.space+this.step;
    this.x=this.x+this.space*(this.index+1)*0.5-random(1);
    this.y=this.y;
    this.tran += this.tranChange;
   
    if (this.tran < 50) {
      this.tran = 50;
    }
    if (this.tran > 200) {this.tran = 200;}
  }
}