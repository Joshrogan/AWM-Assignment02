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

$.getJSON("{% url 'local_area' %}", function(data) {
	console.log(data);
	L.geoJSON(data, {
			style: geojsonStyle,
	}).addTo(map)
})

let coords = "0.0,0.0";
let curMarker = null;

function onMapClick(e) {

		if (curMarker != null) {
			map.removeLayer(curMarker)
		}
        coords = e.latlng;
        console.log(coords)
        let lat, lng = [coords.lat ,coords.lng];
        console.log(coords.lat)
        console.log(coords.lng)
        let test = coords.lat + ',' + coords.lng;
        console.log(test)
		curMarker = L.marker([coords.lat, coords.lng]).addTo(map)
        coords=test
}

map.on('click', onMapClick);

const form = document.getElementById('form');

let submitThis = () => {
    console.log({
        point: coords,
        comment: form.elements.comment.value,
        rating: form.elements.rating.value
    })

	$.ajax({
            type: "POST",
            headers: {
            },
            url: "/create_post/",
            data: {
                point: coords,
        		comment: form.elements.comment.value,
        		rating: form.elements.rating.value,
                csrfmiddlewaretoken: '{{ csrf_token }}'
            }
        }).done(function (data, status, xhr) {
            console.log(data["message"])
            console.log("success")
			location.reload();  
        }).fail(function (xhr,staus, error) {
            console.log(error);
        }).always(function () {
            console.log("reload");
			location.reload();  
        });
}

form.addEventListener('submit', submitThis);
const mydata = {{json|safe}}
mydata.forEach(data => {
	console.log(data)
})
let userID = {{user.id}}
console.log('userID' + userID)
let mapThis = mydata.map(test => {
	 let coord = Array(test["fields"].location.split('SRID=4326;POINT (')[1]).pop().split(' ')
	return {
	key: test["pk"],
	lat: coord[0],
	long: coord[1].slice(0, -1),
	rating: test["fields"].rating,
	comment: test["fields"].comment,
	profile: test["fields"].profile
	}
})

let container = document.createElement('div');
let button = document.createElement('button')
button.classList.add("trigger");
button.innerHTML ="Delete me"

container.appendChild(button)

let featureGroup = L.featureGroup().addTo(map).on("click", groupClick);
let marker = null;
let test = null;

console.log('mapthis test' + mapThis[0].key)

let postTest = `{{posts|safe}}`

postTest = postTest.split('<Post:')

postTest.shift()

mapTest = postTest.map(loc => {
 return loc.split(',')}
)

nameMap = mapTest.map(arr => {
return {"lat": arr[0], "long": arr[1], "name": arr[2]}})

console.log(nameMap)


for (let i = 0; i < mapThis.length; i++) {
	let owner = null;
	test = mapThis[i].key
	for (let j = 0; j < nameMap.length; j++) {
		if(mapThis[i].lat == nameMap[j].lat.trim()) {
			owner = nameMap[j].name;
		}
	}
	let comment = mapThis[i].comment
	let popup = null;
	if (mapThis[i].profile === userID) {
		popup = L.popup().setContent('<p>owner:' + owner + '</p><p>' + comment +'</p><button class="trigger btn-xs btn-danger" id=' + test + '> Delete </a>');

	} else {
		// popup = L.popup().setContent('<div id=' + test + ' > you will never get this </a>');
	}
	marker = L.marker([mapThis[i].lat, mapThis[i].long]).addTo(featureGroup).bindPopup(popup);
		marker.test = test
}

function groupClick(event) {
	console.log("Clicked on a maerker" + event.layer.test);
}


console.log(mapThis)

$('#map').on('click', '.trigger', function(event) {
    console.log(this.id);
		$.ajax({
            type: "POST",
            headers: {
            },
            url: "/delete/" + this.id + '/',
            data: {
                csrfmiddlewaretoken: '{{ csrf_token }}'
            }
        }).done(function (data, status, xhr) {
            console.log(data["message"])
            console.log(" delete success")
			location.reload();  
        }).fail(function (xhr,staus, error) {
            console.log(error);
        }).always(function () {
            console.log("delete finished");
        });
});

function focusOn(id) {
	var match = featureGroup.eachLayer(function(layer) {
		if (layer.test === id) {
			layer.openPopup()
		}
})}