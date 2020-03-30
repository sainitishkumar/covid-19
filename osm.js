// var firebaseConfig = {
//     apiKey: "AIzaSyDxwnbz3KLGwJ_IUYtZj7ROigTGJynielQ",
//     authDomain: "sain-covid-19.firebaseapp.com",
//     databaseURL: "https://sain-covid-19.firebaseio.com",
//     projectId: "sain-covid-19",
//     storageBucket: "sain-covid-19.appspot.com",
//     messagingSenderId: "404509151056",
//     appId: "1:404509151056:web:a3e8dc94334ca50efb6655",
//     measurementId: "G-0Y255H054N"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
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
		// map.addLayer(marker);
		// map.addLayer(circle);

		// $("#"+option.latitudeId).val(lat);
		// $("#"+option.latitudeId).on('change', function(){
		// 	marker.setLatLng([Number($(this).val()), marker.getLatLng().lng]);
		// 	circle.setLatLng(marker.getLatLng());
		// 	map.setView(marker.getLatLng());
		// });

		// $("#"+option.longitudeId).val(lon);
		// $("#"+option.longitudeId).on('change', function(){
		// 	marker.setLatLng([marker.getLatLng().lat, Number($(this).val())]);
		// 	circle.setLatLng(marker.getLatLng());
		// 	map.setView(marker.getLatLng());
		// });

		$("#"+option.radiusId).val(r);
		$("#"+option.radiusId).on('change', function(){
			circle.setRadius(Number($(this).val()));
		});

		// $("#"+option.addressId).on('change', function(){
		// 	var item = searchLocation($(this).val(), newLocation);
		// });

        $('#add_button').on('click', function(){
            var item = searchLocation($("#"+option.addressId).val(), newLocation);
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
	};
    
    $("#table_id").on('click', 'button', onClickDelete);
    function onClickDelete() {
        console.log($(this).parents('tr')[0].cells[0].innerText);
        var temp = $(this).parents('tr')[0].cells[0].innerText;
        $(this).parents('tr').remove();
        // var num = text_array.findIndex(function(e){
        //     return e == temp;
        // });
        var num;
        for(var i = 0; i<text_array.length; i++){
            if(text_array[i] == temp) {
                num = i;
                break;
            }
        }
        var temptext = text_array.splice(num,1);
        var marker = marker_array.splice(num,1);
        console.log("Removed"+temptext, num);
        // map.removeLayer(marker);
        map.eachLayer(function(marker){
            map.removeLayer(marker);
        });
        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
		var osm = new L.TileLayer(osmUrl, {minZoom: 1, maxZoom: 40});		
		map.addLayer(osm);
        for (var i=0; i<marker_array.length; i++) {
            // var lon = marker_array[i][0];
            // var lat = marker_array[i][1];
            var popupText = text_array[i];
            // var markerLocation = new L.LatLng(lat, lon);
            // var marker = new L.Marker(markerLocation);
            circle.setLatLng(marker_array[i].getLatLng());
            marker_array[i].bindPopup(popupText);
            map.addLayer(marker_array[i]);
            map.setView(marker_array[i].getLatLng());
            map.addLayer(circle);
            // table_text = "<tr>";
            // table_text += "<td>"+popupText+"</td>";
            // table_text += "<td>" + '<button>Delete</button>' + "</td></tr>";
            // $("#table_id").append(table_text);
        }
    }

    $("#submit_button").on('click', submitFunc);
    function submitFunc(){
        // console.log("SENT", firebase);
        // var ref = firebase.database().ref();
        // ref('locations').set({'test':1});
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