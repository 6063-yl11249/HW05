let dataObject;
let data;

let pm2_5Min;
let pm2_5Max;

function preload() {
  dataObject = loadJSON("./Beijing_PM2.5.json");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  data = Object.values(dataObject);

  // Determine smallest and largest values for pm2.5
  for (let i = 0; i < data.length; i++) {
    let pm2_5 = data[i]["pm2.5"];

    pm2_5Min = min(pm2_5Min, pm2_5);
    pm2_5Max = max(pm2_5Max, pm2_5);
  }
}

function draw() {
  background("beige");
  
  // Draw a visualization relating years, months, and pm2.5
  for (let i = 0; i < data.length; i++) {
    let x = map(data[i].month, 1, 12, 200, width - 100);
    let y = map(data[i].year, 2010, 2014, height - 190, 110);
    let eDiam = map(data[i]["pm2.5"], pm2_5Min, pm2_5Max, 30, 200);

    noFill();
    if (eDiam >= 30 && eDiam < 50) {
      stroke('lightblue');
    }
    if (eDiam >= 50 && eDiam < 95) {
      stroke('gold');
    }
    if (eDiam >= 95 && eDiam < 150) {
      stroke('orange');
    }
    if (eDiam >= 150) {
      stroke('deeppink');
    }
    ellipse(x, y, eDiam, eDiam);

    fill ('MediumSlateBlue');
    noStroke();
    textSize (24);
    text('Year', 20, 30);
    let y1 = map(data[i].year, 2010, 2014, height - 190, 110);
    text(data[i].year,20,y1);

    text('Month', width - 100, height - 20);
    let x1 = map(data[i].month, 1, 12, 200, width - 100);
    text(data[i].month,x1,height - 65);

  }
  noLoop();
}
