let dataObject;
let data;

let yearMin;
let yearMax;
let monthMin;
let monthMax;
let pm2_5Min;
let pm2_5Max;

function preload() {
  // Use the full URL to your JSON file
  let dataUrl = "https://dm-gy-6063-2023f-d.github.io/assets/homework/05/Beijing-PM2.5/Beijing-PM2.5.json";
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
    let year = dataObject[i].year;
    let month = dataObject[i].month;
    let pm2_5 = dataObject[i]["pm2.5"];

    yearMin = min(yearMin, year);
    yearMax = max(yearMax, year);
    monthMin = min(monthMin, month);
    monthMax = max(monthMax, month);
    pm2_5Min = min(pm2_5Min, pm2_5);
    pm2_5Max = max(pm2_5Max, pm2_5);
  }
}

function draw() {
  background('beige');
  fill('deeppink');

  // Draw a visualization relating years, months, and pm2.5
  for (let i = 0; i < dataObject.length; i++) {
    let x = map(dataObject[i].month, monthMin, monthMax, 20, width - 20);
    let y = map(dataObject[i].year, yearMin, yearMax, 20, height - 20);
    let eDiam = map(dataObject[i]["pm2.5"], pm2_5Min, pm2_5Max, 30, 200);
    ellipse(x, y, eDiam, eDiam);
  }
  noLoop(); 
}
