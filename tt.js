// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end
looker.plugins.visualizations.add({
create: function(element, config) {
  element.innerHTML = `
	<style>
	.sannith {
	width: 100%;
	height: 500px
	}
	</style>
	`;
	
    var container = element.appendChild(document.createElement("div"));
	container.className = "sannith";
    container.id = 'amContainer';
	

	//this.container = element.appendChild(document.createElement("div"));
	
  },

updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
// Clear any errors from previous updates:
this.clearErrors();

// Dump data and metadata to console:
console.log('updateAsync() data', data)
console.log('updateAsync() config', config)
console.log('updateAsync() queryResponse', queryResponse)
	
	



// get the names of the first dimension and measure available in data
x = config.query_fields.dimensions[0].name;
y = config.query_fields.measures[1].name;
z = config.query_fields.dimensions[2].name;
n = config.query_fields.dimensions[3].name;
	


// build data array for the chart, by iterating over the Looker data object
var amData = [];
var colorSet = new am4core.ColorSet();
for(var row of data) {
	amData.push({
		
		y: row[y].value,
		x : row[x].value,
		text: row[z].value,
		center:row[n].value
		
	});
	
}
	
console.log('amChart data', amData)

let chart = am4core.create("amContainer", am4charts.XYChart);
// Create chart instance
//var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
// chart.data = [{
//   "y": "1",
//   "x": 1,
//   "text": "[bold]2018 Q1[/]\nThere seems to be some furry animal living in the neighborhood.",
//   "center": "right"
// }, {
//   "y": "2",
//   "x": 1,
//   "text": "[bold]2018 Q2[/]\nWe're now mostly certain it's a fox.",
//   "center": "left"
// }, {
//   "y": "3",
//   "x": 1,
//   "text": "[bold]2018 Q3[/]\nOur dog does not seem to mind the newcomer at all.",
//   "center": "right"
// }, {
//   "y": "4",
//   "x": 1,
//   "text": "[bold]2018 Q4[/]\nThe quick brown fox jumps over the lazy dog.",
//   "center": "left"
// }];

// Create axes
var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
yAxis.dataFields.category = "y";
yAxis.renderer.grid.template.disabled = true;
yAxis.renderer.labels.template.disabled = true;
yAxis.tooltip.disabled = true;

var xAxis = chart.xAxes.push(new am4charts.ValueAxis());
xAxis.min = 0;
xAxis.max = 1.99;
xAxis.renderer.grid.template.disabled = true;
xAxis.renderer.labels.template.disabled = true;
xAxis.renderer.baseGrid.disabled = true;
xAxis.tooltip.disabled = true;

// Create series
var series = chart.series.push(new am4charts.LineSeries());
series.dataFields.categoryY = "y";
series.dataFields.valueX = "x";
series.strokeWidth = 4;
series.sequencedInterpolation = true;

var bullet = series.bullets.push(new am4charts.CircleBullet());
bullet.setStateOnChildren = true;
bullet.states.create("hover");
bullet.circle.radius = 10;
bullet.circle.states.create("hover").properties.radius = 15;

var labelBullet = series.bullets.push(new am4charts.LabelBullet());
labelBullet.setStateOnChildren = true;
labelBullet.states.create("hover").properties.scale = 1.2;
labelBullet.label.text = "{text}";
labelBullet.label.maxWidth = 200;
labelBullet.label.wrap = true;
labelBullet.label.truncate = false;
labelBullet.label.textAlign = "middle";
labelBullet.label.paddingLeft = 20;
labelBullet.label.paddingRight = 20;
labelBullet.label.fill = am4core.color("#999");
labelBullet.label.states.create("hover").properties.fill = am4core.color("#000");

labelBullet.label.verticalCenter = "middle";
labelBullet.label.propertyFields.horizontalCenter = "center";


chart.cursor = new am4charts.XYCursor();
chart.cursor.lineX.disabled = true;
chart.cursor.lineY.disabled = true;
doneRendering();
}
})
