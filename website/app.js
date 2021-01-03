/* Global Variables */
let zip = document.getElementById("zip");
let feelings = document.getElementById("feelings")
const submitBtn = document.getElementById("generate")

const date =document.getElementById("date")
const temp =document.getElementById("temp")
const content =document.getElementById("content")


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiUrl = "http://api.openweathermap.org/data/2.5/weather"
const apiKey = "dcd213582300c0ac94049f4533deccaf";

/* Function to GET Web API Data*/
async function getWebApiData(zip) {

    return await fetch(apiUrl+"?zip="+zip+"&appid="+apiKey+"&units=metric")
        .then((response)=>{
            return response.json();
        })
}

/* Function to POST data */
async function postData(url,data) {
     await fetch(url,{
         method: "POST",
         credentials: "same-origin",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(data),
     }).then(async (response)=>{
         return await response;
     })
}

/* Function to GET Project Data */
async function getData(url) {
    return await fetch(url)
        .then((response) => response.json())
        .then(async (response) => {
            return await response;
        });
}
/* Function to update Project Ui */
function updateUi(response) {
    content.textContent = "Your feelings is : " + response.feel;
    temp.textContent = "Temperature is : " + response.temperature+ " ℃";
    date.textContent = "Date  : " + response.date;
}

submitBtn.addEventListener("click",async () =>{
    getWebApiData(zip)
        .then(async (response)=>{
            await postData("/insert",{
                feel:feelings,
                temperature:response,
                date:newDate
            });
        })
        .then(async ()=>{
            return await getData("/temperature");
        })
        .then(async (response)=> updateUi(response));
})

zip.addEventListener("change",(e)=>{
    zip = e.target.value;
})


feelings.addEventListener("change",(e)=>{
    feelings = e.target.value;
})