/* This function takes a text(string) from a webpage as a paremeter and performs text processing in order to return the theme of the article */
function BBAlgorithm(text) {
    
    const returnString = ""

    /* Array containing the most commonly used in english */
    stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']

    /* Remove the stopwords from the string received as a parameter.
       This decreases the length of the string while keeping all the relevant words for future text processing */
    function remove_stopwords(arr) {
        res = []
        for(i=0;i<arr.length;i++){
            if (!stopwords.includes(arr[i])) {
                res.push(arr[i])
            }
        }
        return res 
    }

    /* Remove punctuation and new line characters so that the string can use space characters as separators and obtain the words */
    var regex = /[!"#$%'()*+,.:;<=>?@[\]^_`{|}~0234678]/g;
    var regex2 = /\n/g; 
    function removePunctuation(string) {
        return string.replace(regex, '');
    }
    function removeNewLine(string) {
        return string.replace(regex2, ' ');
    }

    /*Process text using library and previously defined functions to obtain an array containing the relevant words in the text */
    text = text.toLowerCase();
    text = removePunctuation(text);
    text = removeNewLine(text);
    text = text.trim();
    var textarr = text.split(' ');
    textarr = remove_stopwords(textarr);
    
    /* Variants of the term Covid that should be looked for first so that we know whether the article is related to Covid or not */
    var keywords1 = new Object();
    keywords1 = {"covid" : 0, "covid-19" : 0, "covid19" : 0, "coronavirus" : 0, "corona" : 0, "sars-cov" : 0, "sars-cov19" : 0};

    /* Keywords the algorithm will look for in the text. They are linked to their number of appearences */
    var keywords2 = new Object();
    keywords2 = {"vaccine" : 0, "vaccines" : 0, "5g" : 0,"pfizer-biontech" : 0, "pfizer/biontech" : 0, "biontech" : 0, "pfizer" : 0, "moderna" : 0, "astrazeneca" : 0, "sputnik" : 0, "certificate" : 0, "sinopharm" : 0, "dose" : 0, "doses" : 0, "mask" : 0, "masks" : 0, "day" : 0, "days" : 0, "test" : 0, "quarantine" : 0, "isolation" : 0};

    /* Words corresponding to keywords that contain spaces:
       bill - Bill Gates
       johnson - Johnson & Johnson
       side - side effects
       face - face covering */
    var keywords3 = new Object();
    keywords3 = {"bill" : 0, "johnson" : 0, "side" : 0, "face" : 0};

    var textarr2 = [];
    var j=0;
    for(var i = 0; i<textarr.length; i++){
        /* Search for the variants of the term Covid and count their appearences */
        if(textarr[i] in keywords1){
            keywords1[textarr[i]]+=1;
        }
        /* Create a new array that removes any redundant empty strings caused by splitting a string with multiple consecutive spaces */ 
        if(textarr[i]!==''){
            textarr2[j]=textarr[i];
            j++;
        }
    }

    /* Calculate the total number of references to Covid in the article*/
    var appearences=0;
    for (const [key, value] of Object.entries(keywords1)) {
        appearences+=value;
    }

    /* If the article refers to Covid at least 4 times, we will consider that its theme is related to that.
       Otherwise, consider the article unrelated to Coronavirus and stop the execution of the function. */
    if(appearences<4){
        return "No covid";
    }

    for(var i = 0; i<textarr2.length-1; i++){
        /* Count the number of appearences for the one word keywords. */ 
        if(textarr2[i] in keywords2){
            keywords2[textarr2[i]]+=1;
        }
        /* If the current word is "bill", check if the next word is "gates".
           If so, increment the number of appearences. */
        if(textarr2[i]==="bill" && textarr2[i+1]==="gates"){
            keywords3["bill"]++;
        }
        /* If the current word is "johnson", check if the next string is "&".
           If so, consider the text is mentioning Johnson & Johnson and increment the number of appearences. */
        if((textarr2[i]==="johnson" && textarr2[i+1]==="&")||(textarr2[i]==="johnson"&&textarr2[i+1]==="and")){
            keywords3["johnson"]++;
        }
        /* If the current word is "side", check if the next word is "effects".
           If so, increment the number of appearences. */
        if((textarr2[i]==="side"&&textarr2[i+1]==="effect")||(textarr2[i]==="side"&&textarr2[i+1]==="effects")){
            keywords3["side"]++;
        }
        /* If the current word is "face" or "facial", check if the next word is "covering".
           If so, increment the number of appearences. */
        if((textarr2[i]==="face"&&textarr2[i+1]==="covering")||(textarr2[i]==="facial"&&textarr2[i+1]==="covering")){
            keywords3["face"]++;
        }
    }

    /* The above for loop does not analyse the last word in the array(since it sometimes has to look at the next word for composed keywords).
       Therefore, check the last word separately. */
    if(textarr2[textarr2.length-1] in keywords2){
        keywords2[textarr2[textarr2.length-1]]+=1;
    }

    /* Create a dictionary containing article categories and their "score" in the text.
       The score will be 0 for all of them at first */
    var categories = new Object();
    categories = {"general" : 0, "vaccine" : 0, "masks" : 0, "selfisolation" : 0};

    /* For the general category, the score was already calculated when determining whether the text is about Covid or not */
    categories["general"]=appearences;

    /* For all the other categories, add the scores of their corresponding keywords to obtain a total score */
    categories["vaccine"]=keywords2["vaccine"]+keywords2["vaccines"]+keywords2["pfizer-biontech"]+keywords2["pfizer/biontech"]+keywords2["5g"]+keywords2["biontech"]+keywords2["pfizer"]+keywords2["moderna"]+keywords2["astrazeneca"]+keywords2["certificate"]+keywords2["dose"]+keywords2["doses"]+keywords3["bill"]+keywords3["johnson"]+keywords3["side"];
    categories["masks"]=keywords2["mask"]+keywords2["masks"]+keywords3["face"];
    categories["selfisolation"]=keywords2["day"]+keywords2["days"]+keywords2["quarantine"]+keywords2["isolation"]+keywords2["test"];

    /* Calculate the category with the maximum score.
       Consider this to be the overall theme of the article and return it */
    var max = categories["general"];
    var category = "general";
    for (const [key, value] of Object.entries(categories)) {
        if(value>max){
            category=key;
            max=value;
        } 
    }
    return category;
}

var str = "";
var executed = false;

function createNotification(category) {
    fetch('https://api.ipify.org')
    .then((res) => res.text())
    .then((ip) => {
        countryURL = "https://ipapi.co/" + ip + "/json/"; 
        fetch(countryURL)
        .then((res) => res.json())
        .then((res) => {
            country = res.country_code;
            url = 'https://covinformare-backend.herokuapp.com/' + country + '/' + category;
            console.log(url)
            fetch(url)
            .then((res) => res.text())            
            .then((res) => {
                str = res
                var timestamp = new Date().getTime();
                var id = 'myid' + timestamp
                if (executed == false) {
                    executed = true
                    setTimeout(() => {
                        executed = false
                        console.log("fixed")
                    }, 3000)

                    chrome.notifications.create(id, {
                        type: 'basic',
                        iconUrl: 'imgs/robot.png',
                        title: 'Looking for COVID info?',
                        message: 'Click here for reliable information from trusted sources relevant to you.',
                        priority: 2
                    })
            }
        })
    })
    })
}

chrome.notifications.onClicked.addListener(() => {
    chrome.tabs.create({url: str})
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        function modifyDOM() {
            //You can play with your DOM here or check URL against your regex
            return document.body.innerText;
        }

        //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
        chrome.tabs.executeScript({
            code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
        }, (results) => {
            //Here we have just the innerHTML and not DOM structure
            const whitelist = ['.gov', 'nhs.uk', 'canada.ca', 'gov.au', 'govt.nz', 'who.int, gc.ca']
            var flag = false
            whitelist.forEach((domain) => {
                flag = flag || (tab.url).includes(domain)
            })

            console.log('Popup script:')
            var keyword = BBAlgorithm(results[0])
            console.log(tab.url)
            if (keyword != "No covid" && !flag) {
                console.log("more than once")
                createNotification(keyword)
            }
            
        });

    }
);