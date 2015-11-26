var genre;

  
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
                        console.log(dataParsed.main.temp);
                       var temperatuur = dataParsed.main.temp;
                       console.log("temp is ", temperatuur);
                    var genre =  getTemperatuurdata(temperatuur); 
                    getGenrendata (genre);
                    } else {
                    console.log(myRequest.readyState);
                }
            };
           
}

function getTemperatuurdata(graden){
    console.log("graden:",graden);
        if (graden > 288){
            genre = ("jazz");
        }else{
            genre = ("classic rock");
            return(genre);
            }
}          


function getGenrendata(style){  
    console.log(style);
    var myRequest = new XMLHttpRequest();
            
    var method = "GET";
    var url = "http://developer.echonest.com/api/v4/artist/search?api_key=MQFDG7HXSGYE1CHUF&style="+style+"";
            
    myRequest.open(method, url);
    myRequest.send();
          
    myRequest.onreadystatechange = function(){
                if (myRequest.readyState === 4) {
                    var data = myRequest.response ;
                    var dataParsed = JSON.parse(data);
                    console.log(myRequest.readyState);
                    console.log(dataParsed);
                        
                       var muziekStyle = dataParsed;
                       console.log("style is ", muziekStyle);
                       //getGenrendata(muziekStyle); 
                    } else {
                    console.log(myRequest.readyState);
                }
            };
           
}

   
   
 