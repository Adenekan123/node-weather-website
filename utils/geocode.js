const axios = require('axios');

const geocode = async (address,callback) =>{
    try{
        const {data} = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoibmVrYW4xMjMiLCJhIjoiY2ttejY1eTFtMDdvNDJwcXVrbjZ1MXVreSJ9.Yjb_bZWe7GfJCRwMIDzYzw&limit=1`);
        if(data === undefined) callback("There is an error, Contact your administrator",undefined);
        else if(data !== undefined && data.features.length === 0) callback({type:3,message:"Unable to find location, Try another search"},undefined);
        else callback(undefined,{
            latitude: data.features[0].center[0],
            longitude: data.features[0].center[1],
            location: data.features[0].place_name
        });
    }catch({isAxiosError,response}){
        if(isAxiosError && response === undefined) callback({type:1,message:'Unable to connect to the api service'},undefined)
    }

}


module.exports =  geocode;

