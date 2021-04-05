import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const WeatherChart = ({ forecastOfDay }) => (
  <ResponsiveContainer width="100%" height={200}>
    <AreaChart
      width={1000}
      height={200}
      data={forecastOfDay}
      syncId="anyId"
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis dataKey='' />
    <Tooltip />
    <Area type="monotone" dataKey="temp" stroke="#82ca9d" fill="#82ca9d" />
    </AreaChart>
  </ResponsiveContainer>
);


WeatherChart.defaultProps = {
  forecastOfDay: [],
};

WeatherChart.propTypes = {
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
};

export default WeatherChart;
