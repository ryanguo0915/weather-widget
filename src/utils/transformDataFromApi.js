import moment from 'moment';

export default function transformDataFromApi(data) {
  return ({
    dt: data.dt,
    temp: data.main.temp,
    temp_min: data.main.temp_min,
    temp_max: data.main.temp_max,
    humidity: data.main.humidity,
    icon: data.weather[0].icon,
    desc: data.weather[0].description,
    clouds: data.clouds.all,
    wind: data.wind.speed,
    time: moment(data.dt_txt).locale('en-us').format('h:mm a')
  });  
}