const axios = require('axios');




const forecast = async (lat,lon,callback) => {
    try{
        let {data} = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=2f65864e9cc60191b31a6e77c954cdef&units=metric`);
        if(data == undefined) callback("Something Went Wrong, Please Try Again",undefined);
        else callback(undefined,data);

    }catch({isAxiosError,response}){
        if(isAxiosError && response === undefined) callback({type:1,message:"Unable connect to the Api Service"},undefined);
        else if(isAxiosError && response !== undefined) callback(response.data.cod,undefined);
    }
  
}

module.exports = forecast;