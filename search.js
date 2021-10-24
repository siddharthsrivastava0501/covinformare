//Get the text somehow ??
stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']
var regex = /[!"#$%'()*+,.:;<=>?@[\]^_`{|}~0234678]/g;
var regex2 = /\n/g; 
function remove_stopwords(arr) {
    res = []
    for(i=0;i<arr.length;i++){
       if(!stopwords.includes(arr[i])) {
           res.push(arr[i])
       }
    }
    return res 
}
function removePunctuation(string) {
    return string.replace(regex, '');
  }
function removeNewLine(string) {
    return string.replace(regex2, '');
  }
var text = " for covid-19 are important side effects because vaccine mask ";
text = text.toLowerCase();
text = removePunctuation(text);
text = removeNewLine(text);
text = text.trim();
var textarr = text.split(' ');
textarr = remove_stopwords(textarr);
console.log(textarr);
for(i=0; i<textarr.length; i++){

}
var keywords1 = new Object();
keywords1 = {"covid" : 0, "covid-19" : 0, "covid19" : 0, "coronavirus" : 0, "corona" : 0, "sars-cov" : 0, "sars-cov19" : 0};

var keywords2 = new Object();
keywords2 = {"vaccine" : 0, "vaccines" : 0, "5g" : 0,"pfizer-biontech" : 0, "pfizer/biontech" : 0, "biontech" : 0, "pfizer" : 0, "moderna" : 0, "astrazeneca" : 0, "sputnik" : 0, "certificate" : 0, "sinopharm" : 0, "dose" : 0, "doses" : 0, "mask" : 0, "masks" : 0, "day" : 0, "days" : 0, "test" : 0, "quarantine" : 0, "isolation" : 0};

var keywords3 = new Object();
keywords3 = {"bill" : 0, "johnson" : 0, "side" : 0, "face" : 0};

for(var i = 0; i<textarr.length; i++){
    if(textarr[i] in keywords1){
        keywords1[textarr[i]]+=1;
    }
}

var appearences=0;

for (const [key, value] of Object.entries(keywords1)) {
    appearences+=value;
  }
console.log(appearences);
if(appearences<6){}

for(var i = 0; i<textarr.length-1; i++){
    if(textarr[i] in keywords2){
        keywords2[textarr[i]]+=1;
    }
    if(textarr[i]==="bill" && textarr[i+1]==="gates"){
        keywords3["bill"]++;
    }
    if((textarr[i]==="johnson" && textarr[i+1]==="&")||(textarr[i]==="johnson"&&textarr[i+1]==="and")){
        keywords3["johnson"]++;
    }
    if((textarr[i]==="side"&&textarr[i+1]==="effect")||(textarr[i]==="side"&&textarr[i+1]==="effects")){
        keywords3["side"]++;
    }
    if((textarr[i]==="face"&&textarr[i+1]==="covering")||(textarr[i]==="facial"&&textarr[i+1]==="covering")){
        keywords3["face"]++;
    }
}
if(textarr[textarr.length-1] in keywords2){
    keywords2[textarr[textarr.length-1]]+=1;
}

var categories = new Object();
categories = {"covid" : 0, "vaccines" : 0, "masks" : 0, "isolation" : 0};

categories["covid"]=appearences;

categories["vaccines"]=keywords2["vaccine"]+keywords2["vaccines"]+keywords2["pfizer-biontech"]+keywords2["pfizer/biontech"]+keywords2["5g"]+keywords2["biontech"]+keywords2["pfizer"]+keywords2["moderna"]+keywords2["astrazeneca"]+keywords2["certificate"]+keywords2["dose"]+keywords2["doses"]+keywords3["bill"]+keywords3["johnson"]+keywords3["side"];

categories["masks"]=keywords2["mask"]+keywords2["masks"]+keywords3["face"];

categories["isolation"]=keywords2["day"]+keywords2["days"]+keywords2["quarantine"]+keywords2["isolation"]+keywords2["test"];

var max = categories["covid"];
var category = "covid";
for (const [key, value] of Object.entries(categories)) {
    if(value>max){
        category=key;
        max=value;
    } 
}
console.log(category);

