var idArray = [];
var n = o;

function getLocation() {
    n = 0;
    idArray = [];
    var location = document.getElementById('searchValue').value;
    getLocationdata(location);
    $('.entry').remove();
    $('.musicsuggestion').remove();
    return (location);
}

function getLocationdata(plaats) {
    console.log(plaats);
    var myRequest = new XMLHttpRequest();

    var method = "GET";
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + plaats + "&appid=da506e07c9a1074780a5448e2384b12b";

    myRequest.open(method, url);
    myRequest.send();

    myRequest.onreadystatechange = function() {
        if (myRequest.readyState === 4) {
            var data = myRequest.response;
            var dataParsed = JSON.parse(data);
            console.log(myRequest.readyState);
            console.log(dataParsed);

            var temperatuur = dataParsed.main.temp;
            var humidity = dataParsed.main.humidity;
            var wind = dataParsed.wind.speed;
            var wolken = dataParsed.weather[0].main;

            var genre = getTemperatuurdata(temperatuur);
            var danceability = getHumiditydata(humidity);
            var tempo = getWindspeeddata(wind);
            var mood = getClouddata(wolken);

            var context = {
                stemming: mood,
                snelheid: tempo,
                dansbaarheid: danceability,
                musicgenre: genre,
                city: plaats,
                temperatuur: (temperatuur - 273).toFixed(2),
                luchtvochtigheid: humidity,
                windspeed: wind,
                sky: wolken
            };
            console.log(context);
            var source = $("#htmlweer").html();
            var template = Handlebars.compile(source);
            var html = template(context);
            $("#weerhtml").append(html);

            console.log("Luchtvochtigheid is", humidity);

            console.log("Windsnelheid is", wind);
            console.log("De lucht is", wolken);
            getGenrendata(genre, danceability, tempo, mood);

        } else {
            console.log(myRequest.readyState);
        }
    };

}

function getTemperatuurdata(graden) {
    console.log("graden in Kelvin:", graden);
    if (graden > 303) {
        genre = ("tropical");
        return (genre);
    } else if (graden > 293) {
        genre = ("dance");
        return (genre);
    } else if (graden > 283) {
        genre = ("pop");
        return (genre);
    } else if (graden > 273) {
        genre = ("acoustic");
        return (genre);
    } else if (graden > 263) {
        genre = ("jazz");
        return (genre);
    } else {
        genre = ("christmas");
        return (genre);
    }
}

function getHumiditydata(vocht) {

    if (vocht > 99) {
        danceability = (0.75);
        return (danceability);
    } else if (vocht > 75) {
        danceability = (0.7);
        return (danceability);
    } else if (vocht > 50) {
        danceability = (0.6);
        return (danceability);
    } else if (vocht > 25) {
        danceability = (0.3);
        return (danceability);
    } else if (vocht > 1) {
        danceability = (0.4);
        return (danceability);
    } else {
        danceability = (0.5);
        return (danceability);
    }

}

function getWindspeeddata(bries) {

    if (bries > 18) {
        tempo = (150);
        return (tempo);
    } else if (bries > 10) {
        tempo = (120);
        return (tempo);
    } else if (bries > 7) {
        tempo = (110);
        return (tempo);
    } else if (bries > 3) {
        tempo = (100);
        return (tempo);
    } else if (bries > 1) {
        tempo = (90);
        return (tempo);
    } else {
        tempo = (80);
        return (tempo);
    }
}

function getClouddata(wolken) {
    if (wolken === "Clear") {
        mood = ("relaxing");
        return (mood);
    } else if (wolken === "Clouds") {
        mood = ("happy");
        return (mood);
    } else if (wolken === "Drizzle") {
        mood = ("sad");
        return (mood);
    } else if (wolken === "Mist") {
        mood = ("party");
        return (mood);
    } else {
        mood = ("romantic");
        return (mood);
    }
}
// FROM HERE THE CODE REFERS TO ECHONEST-SPOTIYI API

function getGenrendata(style, dansindex, bpm, stemming) {
    console.log("Muziekstyle is", style);
    console.log("Dansbaar index is", dansindex);
    console.log("Tempo is max BPM:", bpm);
    console.log("Stemming is:", stemming);

    var myRequest = new XMLHttpRequest();

    var method = "GET";
    var url = "http://developer.echonest.com/api/v4/song/search?api_key=MQFDG7HXSGYE1CHUF&style=" + style + "&min_danceability=" + dansindex + "&max_tempo=" + bpm + "&mood=" + stemming + "&results=20&sort=song_hotttnesss-desc";


    myRequest.open(method, url);
    myRequest.send();

    myRequest.onreadystatechange = function() {
        if (myRequest.readyState === 4) {
            var data = myRequest.response;
            var dataParsed = JSON.parse(data);
            console.log(myRequest.readyState);
            console.log(dataParsed);

            //var songId = dataParsed.response.songs[0].id;
            for (var i = 0; i < 19; i++) {
                var songId = dataParsed.response.songs[i].id;
                console.log("Returned Echonest IDs zijn ", songId);
                getSpotifyid(songId);
            }

            console.log("KLAAR!!!!");
            showPlaylist(idArray[n]);
        } else {
            console.log(myRequest.readyState);
        }
    };

}

function getSpotifyid(songId) {
    var echoNesturl = "http://developer.echonest.com/api/v4/song/profile?api_key=MQFDG7HXSGYE1CHUF&bucket=tracks&bucket=id%3Aspotify-WW&id=" + songId + "";
    var myRequest = new XMLHttpRequest();

    var method = "GET";

    myRequest.open(method, echoNesturl, false);
    myRequest.send();
    var spotifyId;

    if (myRequest.readyState === 4) {
        var data = myRequest.response;
        var dataParsed = JSON.parse(data);

        if (dataParsed.response.songs[0].tracks[0] !== undefined) {
            if (dataParsed.response.songs[0].tracks[0].foreign_id !== undefined)

                idArray.push(dataParsed.response.songs[0].tracks[0].foreign_id);

        }
    }
}

function nextSong() {
    n = n + 1;
    showPlaylist(idArray[n]);
}

function previousSong() {
    n = n - 1;
    showPlaylist(idArray[n]);
}

function showPlaylist(spotifyId) {
    var playlist = document.getElementById('spotifyFrame');
    console.log("playlist", playlist);
    playlist.src = "https://embed.spotify.com/?uri=" + spotifyId + "&theme=white";
}
// THE FUNCTION BELOW IS OBSOLETE BUT MIGHT BE USED IN FUTURE VERSION
/*function createSpotifyplaylist() {
    var http = new XMLHttpRequest();
    var url = "https://api.spotify.com/v1/users/pvtwuyver/playlists";
    http.open("POST", url, true);
    var accessToken = "BQDLTUEcj9KKLpWVZQbCipFYU1r9Ju1kKjmwkGx9Jl2YmU4Q-I6uNofYhBJcQETfkaIHQ5ziGxrviLCpm-UEOWp9lZ0OtWup0fI76S_jjbM0be0NvgWPkFNf693pI5ZkXcFlKyVbpO-xDxWt1-wOFWDq1rTSZva58ZAncDbK1T5PSGLnQYsLPNnvkbv_7Nap0fk2xKKfnL-xDiyIqsbSwwHRBWBE-plQQxbaUQ";
    // Send the proper header information along with the request
    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("Authorization", "Bearer " + accessToken);
    var data = {
        "name": "Weather playlist",
        "public": false
    };
    http.onreadystatechange = function() { //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
        }
    };
    http.send(JSON.stringify(data));
}*/