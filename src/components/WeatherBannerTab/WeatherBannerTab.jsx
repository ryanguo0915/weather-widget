import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import WeatherBanner from '../WeatherBanner/WeatherBanner';
import WeatherChart from '../WeatherChart/WeatherChart';

const WeatherBannerTab = ({
  location,
  forecastOfDay,
  unit,
  city
}) => {
  return (
    <Container>
      <LocationText>{`${city} ${location}`}</LocationText>
      <WeatherBanner forecastNow={forecastOfDay[0]} unit={unit} />
      <WeatherChart forecastOfDay={forecastOfDay}/>
    </Container>
  );
};

WeatherBannerTab.defaultProps = {
  unit: '',
  locale: '',
  forecastOfDay: [],
  city: ''
};

WeatherBannerTab.propTypes = {
  location: PropTypes.string.isRequired,
  forecastOfDay: PropTypes.arrayOf(
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
  locale: PropTypes.string,
  unit: PropTypes.string,
  city: PropTypes.string
};

export default WeatherBannerTab;

const LocationText = styled.div`
  font-size: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

