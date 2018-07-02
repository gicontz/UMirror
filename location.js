
export const MyLocation = () => {

    var coordinates = Array();

    if (navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }   


    function successFunction(position) 
    {
        lati = position.coords.latitude;
        longi = position.coords.longitude; 
        accuracy = position.coords.accuracy;
        if (accuracy <= 100) {
            accu_rate = "Very Accurate";
        }
        else if (accuracy <= 5000) {
            accu_rate = "Accurate";
        }        
        else if (accuracy <= 10000){
            accu_rate = "Fair";
        }
        else if(accuracy <= 50000){
            accu_rate = "Poor";
        }
        else{
            accu_rate = "Very Poor";
        }
        //display the new place name upon geting the geo position of current location
        long_val = longi;
        lat_val = lati;
        coordinates[0] = longi;
        coordinates[1] = lati;
        getMyPlace(); 
    }

    function errorFunction() 
    {    
        coordinates[0] = "unknown";
        coordinates[1] = "unknown";
    }

    return coordinates;
  //a function to get the JSON of a geocode to get the place name (REVERSE GEOCODING)
  // function getMyPlace(){
  //   $.getJSON("http://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat_val + "," + long_val + "&sensor=true", function(data) {
  //       $(".placeName").html(data.results[0].formatted_address);
  //       $(".accuracy").text("Accuracy: " + accuracy + "m " + "("+ accu_rate +")");
  //   });
  //   }
}