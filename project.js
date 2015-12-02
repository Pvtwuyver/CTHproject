var genre;
var danceability;

function getLocation(){
   var location = document.getElementById('searchValue').value;
   getLocationdata(location);
   return(location);
   }

function getLocationdata(plaats){
   console.log(plaats);
   var myRequest = new XMLHttpRequest();

   var method = "GET";
   var url = "http://api.openweathermap.org/data/2.5/weather?q="+plaats+"&appid=da506e07c9a1074780a5448e2384b12b";

   myRequest.open(method, url);
   myRequest.send();

   myRequest.onreadystatechange = function(){
               if (myRequest.readyState === 4) {
                   var data = myRequest.response ;
                   var dataParsed = JSON.parse(data);
                   console.log(myRequest.readyState);
                   console.log(dataParsed);
                       
                       var temperatuur = dataParsed.main.temp;
                       var humidity = dataParsed.main.humidity;
                       var rain = dataParsed.rain; // this is an object, not a value
                       
                    var genre =  getTemperatuurdata(temperatuur);
                    var danceability = getHumiditydata(humidity);
                   
                   console.log("Humidity", humidity);
                   console.log("Rain in ml afgelopen 3 uur", rain);
                   getGenrendata (genre,danceability);
                   
                   } else {
                   console.log(myRequest.readyState);
               }
           };

}

function getTemperatuurdata(graden){
   console.log("graden:",graden);
       if (graden > 303){
           genre = ("tropical");
            return(genre);
       }else if (graden >293){
           genre = ("beach");
           return(genre);
        }else if (graden >283){
           genre = ("britpop");
           return(genre);
        }else if (graden >273){
           genre = ("dutch pop");
           return(genre);   
        }else if (graden >263){
           genre = ("dub");
           return(genre);   
        }else{
           genre = ("russian folk");
           return(genre);
        }
}

function getHumiditydata(vocht){
   console.log("vocht:",vocht);
       if (vocht > 99){
           danceability = (0.75);
            return(danceability);
       }else if (vocht >75){
           danceability = (0.7);
           return(danceability);
        }else if (vocht >50){
           danceability = (0.6);
           return(danceability);
        }else if (vocht >25){
           danceability = (0.3);
           return(danceability);   
        }else if (vocht >1){
           danceability = (0.4);
           return(danceability);   
        }else{
           danceability = (0.5);
           return(danceability);
        }        
}

// FROM HERE THE CODE REFERS TO ECHONEST-SPOTIYI API

function getGenrendata(style,dansindex){
   console.log("Muziekstyle is",style);
   console.log("Dansbaar index is",dansindex);
   
   var myRequest = new XMLHttpRequest();

   var method = "GET";
   var url = "http://developer.echonest.com/api/v4/song/search?api_key=MQFDG7HXSGYE1CHUF&style="+style+"&min_danceability="+dansindex +"&min_tempo=140&results=15&sort=artist_familiarity-asc";

   myRequest.open(method, url);
   myRequest.send();

   myRequest.onreadystatechange = function(){
               if (myRequest.readyState === 4) {
                   var data = myRequest.response ;
                   var dataParsed = JSON.parse(data);
                   console.log(myRequest.readyState);
                   console.log(dataParsed);

                    var returnedPlaylist = dataParsed.response.songs;
                      console.log("Returned Playlist is ", returnedPlaylist);
                   } else {
                   console.log(myRequest.readyState);
               }
           };

}

function getSpotify(){
var http = new XMLHttpRequest();
var url = "https://api.spotify.com/v1/users/pvtwuyver/playlists";
http.open("POST", url, true);
var accessToken = "bb62deaa06184c81a51403467925f1be";
//Send the proper header information along with the request
http.setRequestHeader("Content-Type", "application/json");
http.setRequestHeader("Authorization", "Bearer " + "bb62deaa06184c81a51403467925f1be");

var data = {"name": "Weather playlist", "public": false}

http.onreadystatechange = function() {//Call a function when the state changes.
   if(http.readyState == 4 && http.status == 200) {
       alert(http.responseText);
   }
}
http.send(JSON.stringify(data));
}
