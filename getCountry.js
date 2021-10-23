//Initialising a bunch of variables that facilitate the transfer of data from one API call to another
ip = "";
ipsuccess = false;
country = "";


//Get IP address; separate because the location service is not free for this API.
$.ajax({
    url: "https://api.ipify.org",
    type: "GET",
    success: function(textIP) {
        ip = textIP;
        console.log(textIP); //Remove when done
        countryURL = "https://ipapi.co/" + ip + "/json/";
        $.ajax({
            url: countryURL,
            type: "GET",
            success: function(json) {
                country = json.country_code;
                console.log(country); //Remove when done


                generalURL = "";
                vaxURL = "";
                travelURL = "";

                switch(country) {
                    case "GB":
                        generalURL = "https://www.nhs.uk/conditions/coronavirus-covid-19/";
                        vaxURL = "https://www.nhs.uk/conditions/coronavirus-covid-19/coronavirus-vaccination/";
                        travelURL = "https://www.gov.uk/guidance/travel-abroad-from-england-during-coronavirus-covid-19";
                        break;
                    case "US":
                        generalURL = "https://www.cdc.gov/coronavirus/2019-ncov/";
                        vaxURL = "https://www.cdc.gov/coronavirus/2019-ncov/vaccines/";
                        travelURL = "https://www.cdc.gov/coronavirus/2019-ncov/travelers/";
                        console.log("Thing");
                        break;
                }

                $("a#general").attr("href", generalURL);
                $("a#vaccines").attr("href", vaxURL);
                $("a#travel").attr("href", travelURL);
            }
        });
    }
});



/* fetch(countryURL)
.then((res) => res.json())
.then((json) => {
    ipsuccess = true;
    country = json.country_code;
}) */
//Take IP address and get country; takes IP address and gives back JSON object with, among other things, the country code.



/* const country = () => {
    $.ajax({
        url: countryURL,
        type: "GET",
        success: function(json) {
            console.log(country); //Remove when done
            countryCode = json.country_code;
        }
    });
    return countryCode;
}; */

