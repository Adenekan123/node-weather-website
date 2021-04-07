const load_data = async (address,callback) => {
        let response = await fetch('http://localhost:3000/search/data?address='+encodeURIComponent(address));
        let result =  await response.json();
        if(result.error === undefined){
           callback(undefined,result);
        }else{
            callback(result.error,undefined);
            // console.log(result);
        }
}

document.querySelector('.loader').classList.remove('d-none');
localStorage.removeItem('error');



const add_data = (forecast,location) =>{
    document.querySelector('#temp').innerHTML = `${Math.floor(forecast.temp)}&deg;`;
    document.querySelector('#dew_point').innerHTML = `${Math.floor(forecast.dew_point)}&deg;`;
    document.querySelector('#place_name1').innerText = location;
    document.querySelector('#place_name2').innerText = `There is ${forecast.clouds}% chance of rain`;

    document.querySelector('#temp_data').innerText = forecast.humidity+'%';
    document.querySelector('#wind_data').innerText = forecast.wind_deg+'k/h';
    document.querySelector('#cloud_data').innerHTML =`${Math.floor(forecast.feels_like)}&deg;`.trim();

    const main_weather_img = document.querySelector('#main_weather_img');

    if(Math.floor(forecast.temp) < 0) main_weather_img.src = 'img/snow.png';
    else if(Math.floor(forecast.temp) >= 18 && Math.floor(forecast.temp) <= 25 ) main_weather_img.src = 'img/cloudy.png';
    else if(Math.floor(forecast.temp) >= 25) main_weather_img.src = 'img/sunny.png';

    document.querySelector('.loader').classList.add('d-none');
    localStorage.removeItem('address');

}

if(localStorage.getItem('address') && localStorage.getItem('address') !== null){
   load_data(localStorage.getItem('address'), (error,{forecast,location} = {}) =>{
       if(error){
        localStorage.setItem('error',JSON.stringify(error));
        return window.location.href = `/error`;
       } 
       
    console.log(forecast);
    add_data(forecast,location);
   });



}else{

    const success = async (position) =>{
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude 
            let response = await fetch(`http://localhost:3000/location?lat=${latitude}&lng=${longitude}`);
            let result = await response.json();
            if(result.error) return window.location.href ='/help';

            console.log(result);
            const {forecast,location} = result;
            add_data(forecast,location);
       
       

    }
    navigator.geolocation.getCurrentPosition(success);


}





