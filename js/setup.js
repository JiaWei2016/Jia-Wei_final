//Final project_Jia Wei
//With this website, you can make routes and know how many crashes along the routes
//You can know the location of crash point by year and type
//You can get information about crash data overview by clicking crash overview button
//data source: open.philadelphia

//map
//code source: week12, Jquery API documentatin
var app = {
  apikey: "b4721195dea6cddb0c7c0af3b5cc20a276a605ce",
  map: L.map('map', { center: [39.949965, -75.164779], zoom: 13 }),
  geojsonClient: new cartodb.SQL({ user: 'jiawei2016', format: 'geojson' }),
  drawnItems: new L.FeatureGroup()
};

L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
 	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
 	subdomains: 'abcd',
 	minZoom: 0,
 	maxZoom: 14,
 	ext: 'png'
 }).addTo(app.map);

var state = {
  count: 0,
  marker1: undefined,
  marker2: undefined,
  line: undefined,
}

//data
var Crashdata2012=$.ajax("https://raw.githubusercontent.com/dmcglone/philly-crash-data/master/data/2012/all_crashes_2012.geojson")
var Crashdata2011=$.ajax("https://raw.githubusercontent.com/dmcglone/philly-crash-data/master/data/2011/all_crashes_2011.geojson")
var Crashdata2010=$.ajax("https://raw.githubusercontent.com/dmcglone/philly-crash-data/master/data/2010/all_crashes_2010.geojson")
var Crashdata2009=$.ajax("https://raw.githubusercontent.com/dmcglone/philly-crash-data/master/data/2009/all_crashes_2009.geojson")
var Crashdata2008=$.ajax("https://raw.githubusercontent.com/dmcglone/philly-crash-data/master/data/2008/all_crashes_2008.geojson")

//Create function to groupdata
var selection=function(x){app.geojsonClient.execute(x)
  .done(function(data) {
    L.geoJson(data, {
      onEachFeature: function(feature, layer) {
        layer.on('click', function() { fillForm(feature.properties); });
        // console.log(feature.properties)
        layer.bindPopup('Year:'+feature.properties.crash_year+',  '+'Collision:'+ feature.properties.collision_+',  '+
        'Fatality:'+feature.properties.fatal+',  '+'Injury:'+ feature.properties.injury).openPopup().addTo(app.map);}
      })
  }).error(function(errors) {
  })
 };

 //groupdata
var year2012=function(){selection("SELECT * FROM all_crashes_2012 LIMIT 200")}
var year2011=function(){selection("SELECT * FROM all_crashes_2011 LIMIT 200")}
var year2010=function(){selection("SELECT * FROM all_crashes_2010 LIMIT 200")}
var year2009=function(){selection("SELECT * FROM all_crashes_2009 LIMIT 200")}
var year2008=function(){selection("SELECT * FROM all_crashes_2008 LIMIT 200")}
var car_2012=function(){selection("SELECT * FROM all_crashes_2012 WHERE automobile >=1 and bicycle=0 LIMIT 200")}
var car_2011=function(){selection("SELECT * FROM all_crashes_2011 WHERE automobile >=1 and bicycle=0  LIMIT 200")}
var car_2010=function(){selection("SELECT * FROM all_crashes_2010 WHERE automobile >=1 and bicycle=0  LIMIT 200")}
var car_2009=function(){selection("SELECT * FROM all_crashes_2009 WHERE automobile >=1 and bicycle=0 LIMIT 200")}
var car_2008=function(){selection("SELECT * FROM all_crashes_2008 WHERE automobile >=1 and bicycle=0 LIMIT 200")}
var bike_2012=function(){selection("SELECT * FROM all_crashes_2012 WHERE bicycle >=1 and automobile=0 LIMIT 200")}
var bike_2011=function(){selection("SELECT * FROM all_crashes_2011 WHERE bicycle >=1 and automobile=0 LIMIT 200")}
var bike_2010=function(){selection("SELECT * FROM all_crashes_2010 WHERE bicycle >=1 and automobile=0 LIMIT 200")}
var bike_2009=function(){selection("SELECT * FROM all_crashes_2009 WHERE bicycle >=1 and automobile=0 LIMIT 200")}
var bike_2008=function(){selection("SELECT * FROM all_crashes_2008 WHERE bicycle >=1 and automobile=0 LIMIT 500")}

//Remove markers
var removemarkers = function(markers) {
    _.each(markers,function(m){
      app.map.removeLayer(m)
    });
};

var layerMarkers = [];

var slide=function(x){
  if(layerMarkers.length){
    removeMarkers(layerMarkers)
    layerMarkers = [];
  };
    layerMarkers = x;
}
$("#year").val()
$("#type").val()
//change slides
   slide(year2012())
  $("#type").change(function(){
  if($("#year").val()==="2012" && $("#type").val()==="All types"){
        slide(year2012());
  }else if($("#year").val()==="2011" && $("#type").val()==="All types"){
        slide(car_2011());
  }else if($("#year").val()==="2010" && $("#type").val()==="All types"){
        slide(car_2010());
  }else if($("#year").val()==="2009" && $("#type").val()==="All types"){
        slide(car_2009());
  }else if($("#year").val()==="2008" && $("#type").val()==="All types"){
        slide(car_2008());
  }else if($("#year").val()==="2012" && $("#type").val()==="cars"){
        slide(car_2012());
  }else if($("#year").val()==="2011" && $("#type").val()==="cars"){
        slide(car_2011());
  }else if($("#year").val()==="2010" && $("#type").val()==="cars"){
        slide(car_2010());
  }else if($("#year").val()==="2009" && $("#type").val()==="cars"){
        slide(car_2009());
  }else if($("#year").val()==="2008" && $("#type").val()==="cars"){
        slide(car_2008());
  }else if($("#year").val()==="2012" && $("#type").val()==="Bike"){
        slide(bike_2012());
  }else if($("#year").val()==="2011" && $("#type").val()==="Bike"){
        slide(bike_2011());
  }else if($("#year").val()==="2010" && $("#type").val()==="Bike"){
        slide(bike_2010());
  }else if($("#year").val()==="2009" && $("#type").val()==="Bike"){
        slide(bike_2009());
  }else if($("#year").val()==="2008" && $("#type").val()==="Bike"){
        slide(bike_2008());
  }else{
        slide(year2012())
  }
})


//Leaflet draw setup
app.map.addLayer(app.drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
app.map.addControl(
  new L.Control.Draw({
    edit: {
      featureGroup: app.drawnItems
    },
    draw: {
      rectangle: false,
      polyline: false,
      polygon: false,
      marker: false,
      circle: false
    }
  })
);

// Automatically fill the form on the left from geojson response
var fillForm = function(properties) {
  $('#cartodb_id').val(properties.cartodb_id);
  $('#name').val(properties.name);
};

// Handling the creation of Leaflet.Draw layers
// Note the use of drawnLayerID - this is the way you should approach remembering and removing layers
var drawnLayerID;
app.map.on('draw:created', function (e) {
  var type = e.layerType;
  var layer = e.layer;
  console.log('draw created:', e);
});

//routes
//code source: week09
var myMarker = [];
var demoShapes= [];

var drawControl = new L.Control.Draw({
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    marker: true,
    rectangle: false,
  }
});
console.log(drawControl)
app.map.addControl(drawControl);


var resetApplication = function() {
  state.count = 0;
  app.map.removeLayer(state.marker1);
  state.marker1 = undefined;
  app.map.removeLayer(state.marker2);
  state.marker2 = undefined;
  app.map.removeLayer(state.line);
  state.line = undefined;
  $('#button-reset').hide();
}

$('#button-reset').click(resetApplication);
/** ---------------
On draw

Leaflet Draw runs every time a marker is added to the map. When this happens
---------------- */
var checkCount = function(){
  if (state.count > 1){
    app.map.removeControl(drawControl);
    var route = {
      "locations":[
        {"lat":state.marker1._latlng.lat,"lon":state.marker1._latlng.lng},
        {"lat":state.marker2._latlng.lat,"lon":state.marker2._latlng.lng}],
      "costing":"auto",
      "directions_options":{"units":"miles"}};
    var routeString = "https://matrix.mapzen.com/optimized_route?json=" +
      JSON.stringify(route) + "&api_key=mapzen-fXK4VkV";

      $.ajax(routeString).done(function(Data){
       var Decode = decode(Data.trip.legs[0].shape);
       var lineCoor = _.map(Decode,function(x){
         return (x.reverse());
       });

       var lineGeoj = {
         "type": "FeatureCollection",
         "features": [
           {
             "type": "Feature",
             "properties": {},
             "geometry": {
               "type": "LineString",
               "coordinates": lineCoor
             }
           },
         ]
       };

       state.line = L.geoJSON(lineGeoj);
       state.line.addTo(app.map);
     });
   }
};

app.map.on('draw:created', function (e) {
    var type = e.layerType; // The type of shape
    var layer = e.layer; // The Leaflet layer for the shape
    var id = L.stamp(layer); // The unique Leaflet ID for the
   layer.addTo(app.map);

   state.count += 1;
   state["marker"+state.count.toString()] = layer;
   checkCount();
   console.log('Do something with the layer you just created', layer, layer._latlng);
   console.log(layer, layer._latlng);
   $('#button-reset').show();
  });

//draw line charts
//code source: Chart JS Totorial
const CHART=document.getElementById("lineChart");
console.log(CHART)
let lineChart=new Chart(CHART,{
  type:'line',
  data: data={
    labels: ["2008", "2009", "2010", "2011", "2012"],
    datasets: [
        {
            label: "Crash data from 2008 to 2012",
            fill: false,
            lineTension: 0.05,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 1,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [10365, 10481, 10764, 10593, 11057],
            spanGaps: false,
        }
    ]
  }
})
