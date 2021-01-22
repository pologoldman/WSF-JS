// Themes begin
am4core.useTheme(am4themes_material);
am4core.useTheme(am4themes_animated);
// Themes end

// create chart
var chart = am4core.create("chartdiv", am4plugins_sunburst.Sunburst);
chart.padding(0,0,0,0);
chart.radius = am4core.percent(98);

chart.data = [{
  name: "Achat",
  children: [
    { name: "2017", value: 56413 },
    { name: "2018", value: 60589 },
    { name: "2019", value: 58003 }
  ]
},
{
  name: "Immobilisations",
  children: [
    { name: "2017", value: 17156 },
    { name: "2018", value: 17668 },
    { name: "2019", value: 6552 }
  ]
},
{
  name: "Déplacements",
  children: [
    { name: "2017", value: 13676 },
    { name: "2018", value: 13278 },
    { name: "2019", value: 9557 }
  ]
},
{
  name: "Energie",
  children: [
    { name: "2017", value: 3638 },
    { name: "2018", value: 5116 },
    { name: "2019", value: 5074 }
  ]
},
{
  name: "Autres postes",
  children: [
    { name: "2017", value: 5092 },
    { name: "2018", value: 4214 },
    { name: "2019", value: 4207 }
  ]
}];

chart.colors.step = 3;
chart.fontSize = 14;
chart.innerRadius = am4core.percent(10);

// define data fields
chart.dataFields.value = "value";
chart.dataFields.name = "name";
chart.dataFields.children = "children";


var level0SeriesTemplate = new am4plugins_sunburst.SunburstSeries();
level0SeriesTemplate.hiddenInLegend = false;
chart.seriesTemplates.setKey("0", level0SeriesTemplate)

// this makes labels to be hidden if they don't fit
level0SeriesTemplate.labels.template.truncate = true;
level0SeriesTemplate.labels.template.hideOversized = true;

level0SeriesTemplate.labels.template.adapter.add("rotation", function(rotation, target) {
  target.maxWidth = target.dataItem.slice.radius - target.dataItem.slice.innerRadius - 10;
  target.maxHeight = Math.abs(target.dataItem.slice.arc * (target.dataItem.slice.innerRadius + target.dataItem.slice.radius) / 2 * am4core.math.RADIANS);

  return rotation;
})


var level1SeriesTemplate = level0SeriesTemplate.clone();
chart.seriesTemplates.setKey("1", level1SeriesTemplate)
level1SeriesTemplate.fillOpacity = 0.75;
level1SeriesTemplate.hiddenInLegend = true;

var level2SeriesTemplate = level0SeriesTemplate.clone();
chart.seriesTemplates.setKey("2", level2SeriesTemplate)
level2SeriesTemplate.fillOpacity = 0.5;
level2SeriesTemplate.hiddenInLegend = true;

chart.legend = new am4charts.Legend();

