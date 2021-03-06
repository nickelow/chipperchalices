import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui';

import JobCard from './JobCard.jsx';

class InterviewList extends Component {
  render() {
    return (
      <div>
        {this.props.interviewJobs.map((job, i) => (
          <JobCard key={i} job={job}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // whatever is returned will show up as props inside of InterestList
  return {
    interviewJobs: state.interviewJobs
  };
};

export default connect(mapStateToProps)(InterviewList);