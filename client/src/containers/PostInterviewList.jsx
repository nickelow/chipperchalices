import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import JobCard from './JobCard.jsx';

class PostInterviewList extends Component {
  render() {
    return (
      <div>
        {this.props.postInterviewJobs.map((job, i) => (
          <JobCard key={i} job={job}/>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // whatever is returned will show up as props inside of InterestList
  return {
    postInterviewJobs: state.postInterviewJobs
  };
};

export default connect(mapStateToProps)(PostInterviewList);