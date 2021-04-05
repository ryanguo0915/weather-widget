import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from '@emotion/styled';
import WeatherBannerTab from '../WeatherBannerTab/WeatherBannerTab';
import MiniWeatherCard from '../MiniWeatherCard/MiniWeatherCard';

const WeatherWidget = ({ config, forecast }) => {
  const [forecastIdx, setForecastIdx] = useState(0);
  if (forecast !== undefined && forecast.length > 0) {
    // track day of forecast
    let firstMomentOfDay;
    // store forecasts
    let forecastOfDay = [];
    // store forecast in days
    const forecastOfDayList = [];
    /* eslint-disable no-param-reassign */
    forecast.forEach((item, index) => {
      if (firstMomentOfDay === undefined) {
        firstMomentOfDay = moment.unix(item.dt);
        forecastOfDay.push(item);
      } else {
        const currentMoment = moment.unix(item.dt);
        if (firstMomentOfDay.isSame(currentMoment, 'day')) {
          forecastOfDay.push(item);
        } else {
          // forecast is next day check if today's forecast has 8 time, if no append next day
          if(forecastOfDay.length <= 8) {
            const nextDay = forecast.slice(index, index+8-forecastOfDay.length);
            forecastOfDay = [...forecastOfDay, ...nextDay];
          }
          forecastOfDayList.push(forecastOfDay);
          forecastOfDay = [];
          forecastOfDay.push(item);
          firstMomentOfDay = currentMoment;
        }
      }
    });
    return (
      <ContentContainer>
        <WeatherBannerTab
          className=""
          location={config.location}
          locale={config.locale}
          city={config.city}
          forecastOfDay={forecastOfDayList[forecastIdx]}
          unit={config.unit}
        />
        <Next5Container>
          {forecastOfDayList.map((item, index) =>           
            <MiniWeatherCard
              key={index.toString()}
              onClick={() => setForecastIdx(index)}
              forecastList={item}
              isSelected={forecastIdx === index}
              unit={config.unit}
              locale={config.locale}
            />
          )}
        </Next5Container>
      </ContentContainer>
    );
  }
  return (
    <div>
      <h3>No forecast data available!</h3>
    </div>
  );
};

WeatherWidget.defaultProps = {
  config: {
    unit: '',
    locale: '',
  },
  forecast: [],
};

WeatherWidget.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      temp: PropTypes.number.isRequired,
      temp_min: PropTypes.number.isRequired,
      temp_max: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      clouds: PropTypes.number.isRequired,
      wind: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
    }),
  ),
  config: PropTypes.shape({
    location: PropTypes.string.isRequired,
    unit: PropTypes.string,
    city: PropTypes.string,
    locale: PropTypes.string,
  }),
};

const ContentContainer = styled.div`
  display: block;
  margin: 10px 5px;
  text-align: left;
  border: 1px solid #dddddd;
  box-shadow: 3px 3px 3px #aaaaaa;
  padding: 1rem 1rem;
`;

const Next5Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
  justify-content: space-around;
`;

export default WeatherWidget;
