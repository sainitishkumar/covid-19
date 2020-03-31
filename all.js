var firebaseConfig = {
    apiKey: "AIzaSyDxwnbz3KLGwJ_IUYtZj7ROigTGJynielQ",
    authDomain: "sain-covid-19.firebaseapp.com",
    databaseURL: "https://sain-covid-19.firebaseio.com",
    projectId: "sain-covid-19",
    storageBucket: "sain-covid-19.appspot.com",
    messagingSenderId: "404509151056",
    appId: "1:404509151056:web:a3e8dc94334ca50efb6655",
    measurementId: "G-0Y255H054N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
console.log("Done");

var OSMPICKER = (function(){
	var app = {};
	
	var map;
	var marker;
    var circle;
    var marker_array = [];
    var text_array = [];
    
	app.initmappicker = function(lat, lon, r, option){
		try{
			map = new L.Map('locationPicker');
		}catch(e){
			console.log(e);
		}
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
		var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 40});		
        map.setView([lat, lon],10);
		map.addLayer(osm);
		if(!marker){
			marker = new L.marker([lat, lon], {draggable:'true'});
			circle = new L.circle([lat, lon], r, {
				weight: 2
			});
		}else{
			marker.setLatLng([lat, lon]);
			circle.setLatLng([lat, lon]);
		}
		
		marker.on('dragend', function(e){
			circle.setLatLng(e.target.getLatLng());
			map.setView(e.target.getLatLng());
			$("#"+option.latitudeId).val(e.target.getLatLng().lat);
			$("#"+option.longitudeId).val(e.target.getLatLng().lng);
        });

		function newLocation(item, text){
            if(item!=undefined){
                markerloc = new L.LatLng(item.lat, item.lon);
                marker = new L.marker(markerloc, {draggable:'true'});
                marker_array.push(marker);
                text_array.push(text);
                circle.setLatLng(marker.getLatLng());
                marker.bindPopup(text);
                map.addLayer(marker);
                map.setView(marker.getLatLng());
                map.addLayer(circle);
                table_text = "<tr>";
                table_text += "<td>"+text+"</td>";
                table_text += "<td>" + '<button>Delete</button>' + "</td></tr>";
                $("#table_id").append(table_text);
            }
        }

        const db = firebase.firestore();
        var data = db.collection('locations').get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // console.log(doc.id, " => ", doc.data());
                var locations = doc.data();
                var final_view;
                for(var key in locations){
                    marker = new L.marker([locations[key].lat, locations[key].lon], {draggable:'false'});
                    circle.setLatLng([locations[key].lat, locations[key].lon]);
                    marker.bindPopup(locations[key].loc);
                    map.addLayer(marker);
                    map.addLayer(circle);
                    final_view = marker;
                }
                map.setView([lat, lon],4);
            })});
        // var item = searchLocation("sainathpuram", newLocation);

	};

	function searchLocation(text, callback){
		var requestUrl = "http://nominatim.openstreetmap.org/search?format=json&q="+text;
		$.ajax({
			url : requestUrl,
			type : "GET",
			dataType : 'json',
			error : function(err) {
				console.log(err);
                window.alert("Incorrect Location");
            },
			success : function(data) {
                console.log(data);
                if(data.length == 0){
                    window.alert("Incorrect Location");
                }
                else{
                    var item = data[0];
                    callback(item, text);
                }
            }
		});
	};
	
	return app;
})();