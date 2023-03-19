const navIcon = document.querySelector('#navDiv');
const navSection = document.querySelector('.navSection');
const navIconClose = document.querySelector('.navSection .fa-times');
const body = document.querySelector('body');

navIcon.addEventListener("click", () => {
    navSection.classList.toggle('open');
    body.classList.toggle('openNav'); 
});

navIconClose.addEventListener("click", () => {  
    navSection.classList.toggle('open');
    body.classList.toggle('openNav');
});

// ---------------------------------------------------------
const today = document.querySelector('#today');
const date = new Date();
const options = {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
};

today.textContent = `${date.toLocaleDateString("en-UK", options)}`;
const lastModified = document.querySelector('#lastModified');
lastModified.textContent = `Last Modified: ${document.lastModified}`
let year = date.getFullYear();
document.querySelector('#currentYear').innerHTML = `&copy;${year}`



// Weather
// URL--------------------------------------------------------------------------------------------------------
// //


const weatherURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Carlsbad%2C%20California?unitGroup=us&key=PFARUPTJZN58SQSPDJGRUH2G8&contentType=json";


let humidity = document.querySelector('#humid span');
let weatherDescription = document.querySelector('#conditions');
let weatherIcon = document.querySelector('#weatherIcon');
let day1 = document.querySelector('#temp1 span');
let day2 = document.querySelector('#temp2 span');
let day3 = document.querySelector('#temp3 span');


const getWeather = async () => {
    const response = await fetch(weatherURL);
    const data = await response.json();
    // console.log(data);

    let temp = data.currentConditions.temp;
    document.querySelector('#temp span').textContent = (temp).toFixed(1);

    let image = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/SVG/1st%20Set%20-%20Monochrome/${data.currentConditions.icon}.svg`;
    

    humidity.textContent = data.currentConditions.humidity;
    weatherDescription.textContent = data.currentConditions.conditions;
    weatherIcon.src = image;
    weatherIcon.alt = data.currentConditions.conditions + ' icon';
    day1.textContent = data.days[1].temp;
    day2.textContent = data.days[2].temp;
    day3.textContent = data.days[3].temp;
    


};
getWeather();

// let drinks = localStorage.getItem(0) ? localStorage(0) : 0


document.querySelector('button#reset').addEventListener('click',clear);

function clear(event){
    localStorage.clear();
    location.reload();
}


if (!localStorage.getItem('drinks')) {
    document.querySelector('#numDrinks').textContent = 0;
}else{
    let drinks = localStorage.getItem('drinks');
    document.querySelector('#numDrinks').textContent = drinks;
}


// lazy loading

//This is to select all of the images on the screen
let images = document.querySelectorAll("[data-src]");


// This is to emphize the lazy loading process
const imgOptions = {
    threshold: 0
    // rootMargin: "0px 0px -100px 0px"
};


// this function is what swaps the data-src with the actual src
function preloadImage(img){
    const src = img.getAttribute('data-src');
    if (!src){
        return;
    }

    img.src = src;
};



// Creating the new intersectionObserver -- entries are all of the pictures and entry is an
// individual thing. After we have observed the image we are going to stop observing it. We also
// pass the iamge options here to allow us to eph the change.
const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach( entry => {
        if (!entry.isIntersecting){
            return;
        }else{
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);





// Setting each image to be observed
images.forEach(image => {
    imgObserver.observe(image);
});