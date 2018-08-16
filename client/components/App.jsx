import React from 'react';
import $ from 'jquery';
import HostInfo from './HostInfo.jsx';
import HostDescription from './HostDescription.jsx';
import ContactAirbnb from './AlwaysContactAbnb.jsx';
import Neighborhood from './Neighborhood.jsx';
import GoogleMap from './Map.jsx';
import CSSModules from 'react-css-modules';
import styles from './css/styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 5,
      first_name: 'temp_name',
      listingId: props.listingId,
      host: {},
      joined_in_date: '12-3-1980',
      joinMonth: '',
      joinYear: '',
      numsOfReviews: 0,
      reviewWording: 'reviews',
      neighborhoodInfo: null,
      city: 'tempCity',
      state: 'tempState',
      country: 'tempCountry',
      description: 'tempDesc',
      verified: false,
      languages: 'templang',
      response_rate: 1,
      response_time: 1,
      photo_url: null,
    };

    this.responseTimeConvertor = this.responseTimeConvertor.bind(this);
  }

  componentDidMount() {
    this.getHostInfo();
    this.getReviewInfo();
    this.getNeighborhoodInfo();
  }

  getHostInfo() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $.get(`http://localhost:3001/api/about/hosts/${this.state.id}`, (data) => {
      data = JSON.parse(data);
      data = data.rows[0];
      this.setState({ verified: data.verified });
      this.setState({ languages: data.languages });
      this.setState({ id: data.id });
      this.setState({ joinMonth: monthNames[Number(this.state.joined_in_date.split('-')[1]) - 1] });
      this.setState({ joinYear: this.state.joined_in_date.split('-')[0] });
    });
  }

  getReviewInfo() {
    $.get(`http://localhost:3001/api/about/reviews/${this.state.id}`, (data) => {
      const formattedData = JSON.parse(data);
      this.setState({ numsOfReviews: formattedData.rows[0].numReviews });
    });
  }

  getNeighborhoodInfo() {
    $.get(`http://localhost:3001/api/about/listings/${this.state.listingId}`, (data) => {
      const neighborhoodInfo = JSON.parse(data);
      const lon_location = neighborhoodInfo.rows[0].lon_location;
      const lat_location = neighborhoodInfo.rows[0].lat_location;
      this.setState({ neighborhoodInfo: neighborhoodInfo[0], city: neighborhoodInfo.rows[0].city, state: neighborhoodInfo.rows[0].state, photo_url: neighborhoodInfo.rows[0].photo_url, description: neighborhoodInfo.rows[0].description });
    });
  }

  responseTimeConvertor() {
    if (this.state.response_time <= 59) {
      return <span className="boldingWords">Within an hour</span>;
    }
    return <span className="boldingWords">More than an hour</span>;
  }

  render() {
    return (
      <div>
        <span styleName='title'>Hosted By {this.state.first_name}</span>
        <span><img styleName='hostImg' src={this.state.photo_url}/></span>
        <HostInfo city={this.state.city} state={this.state.state} joinMonth={this.state.joinMonth} joinYear={this.state.joinYear} reviews={this.state.numsOfReviews} reviewWording={this.state.reviewWording} verifiedOrNot={this.state.verified} />
        <HostDescription response_rate={this.state.response_rate} resonse_time={this.state.response_time} description={this.state.description} host={this.state.host} city={this.state.city} state={this.state.state} country={this.state.country} responseTimeConvertor={this.responseTimeConvertor} languages={this.state.languages} />
        <ContactAirbnb />
        {this.state.neighborhoodInfo && <Neighborhood neighborhoodInfo={this.state.neighborhoodInfo} lat={this.state.neighborhoodInfo.lat_location } lng={this.state.neighborhoodInfo.lon_location} zoom='11' /> }
      </div>
    );
  }
}

export default CSSModules(App, styles);
