let map = L.map("map").setView([53.2734, -7.77832031], 7);

let osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
	attribution:
	  "&copy; <a href='https://openstreetmap.org/copyright'> Openstreet map</a> contributors",
  }
);
osm.addTo(map);

function geojsonStyle(feature){
	return {
		fillColor: getColor(feature.properties.p14_100k),
		weight: .1,
		opacity: 1, 
		color: 'white',
		fillOpacity: 0.6
	}
}

function getColor(d) {
    return d > 400 ? '#800026' :
           d > 300  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 25   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 25, 50, 100, 200, 300, 400],
        labels = [];

	div.innerHTML = '<strong>Cases per 100k</strong><br>'
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);