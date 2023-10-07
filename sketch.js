let dataObject;
let data;

let pm2_5Min;
let pm2_5Max;

function preload() {
  // Use the full URL to your JSON file
  let dataUrl =
    "https://dm-gy-6063-2023f-d.github.io/assets/homework/05/Beijing-PM2.5/Beijing-PM2.5.json";
  dataObject = loadJSON(dataUrl, loadData);
}

function loadData(data) {
  // Callback function called when data is loaded
  dataObject = data;

  // Call the setup function to initialize data processing
  setup();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  data = Object.values(dataObject);

  // Determine smallest and largest values for year, month, and pm2.5
  for (let i = 0; i < dataObject.length; i++) {
    let pm2_5 = dataObject[i]["pm2.5"];

    pm2_5Min = min(pm2_5Min, pm2_5);
    pm2_5Max = max(pm2_5Max, pm2_5);
  }
}

function draw() {
  background("beige");
  
  // Draw a visualization relating years, months, and pm2.5
  for (let i = 0; i < dataObject.length; i++) {
    let x = map(dataObject[i].month, 1, 12, 200, width - 100);
    let y = map(dataObject[i].year, 2010, 2014, height - 190, 110);
    let eDiam = map(dataObject[i]["pm2.5"], pm2_5Min, pm2_5Max, 30, 200);

    noFill();
    if (eDiam >= 30 && eDiam < 50) {
      stroke("lightblue");
    }
    if (eDiam >= 50 && eDiam < 95) {
      stroke("gold");
    }
    if (eDiam >= 95 && eDiam < 150) {
      stroke("orange");
    }
    if (eDiam >= 150) {
      stroke("deeppink");
    }
    ellipse(x, y, eDiam, eDiam);

    fill ('MediumSlateBlue');
    noStroke();
    textSize (24);
    text('Year', 20, 30);
    let y1 = map(dataObject[i].year, 2010, 2014, height - 190, 110);
    text(dataObject[i].year,20,y1);

    text('Month', width - 100, height - 20);
    let x1 = map(dataObject[i].month, 1, 12, 200, width - 100);
    text(dataObject[i].month,x1,height - 65);

  }
  noLoop();
}
