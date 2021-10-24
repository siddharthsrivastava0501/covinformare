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
        countryURL = "https://ipapi.co/" + ip + "/json/";
        $.ajax({
            url: countryURL,
            type: "GET",
            success: function(json) {
                country = json.country_code;


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
                        break;
                    case "AU":
                        generalURL = "https://covid19inlanguage.homeaffairs.gov.au/";
                        vaxURL = "https://www.health.gov.au/initiatives-and-programs/covid-19-vaccines/covid-19-vaccines";
                        travelURL = "https://www.health.gov.au/news/health-alerts/novel-coronavirus-2019-ncov-health-alert/coronavirus-covid-19-travel-and-restrictions/coronavirus-covid-19-advice-for-international-travellers";
                        break;
                    case "NZ":
                        generalURL = "https://covid19.govt.nz/";
                        vaxURL = "https://covid19.govt.nz/covid-19-vaccines/";
                        travelURL = "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-information-specific-audiences/covid-19-advice-travellers";
                        break;
                }

                $("a#general").attr("href", generalURL);
                $("a#vaccines").attr("href", vaxURL);
                $("a#travel").attr("href", travelURL);
            }
        });
    }
});
