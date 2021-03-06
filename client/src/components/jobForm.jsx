import React, {Component} from 'react';
import axios from 'axios';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

class JobForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
      company: '',
      date: null,
      status: '',
      notes: '',
      url: '',
      value: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleURL = this.handleURL.bind(this);
  }

  handleClick () {
    this.setState({
      open: !this.state.open
    });
  }

  handleTitle (e) {
    this.setState({
      title: e.target.value
    });
  }

  handleCompany (e) {
    this.setState({
      company: e.target.value
    });
  }


  handleNotes (e) {
    this.setState({
      notes: e.target.value
    });
  }

  handleURL (e) {
    this.setState({
      url: e.target.value
    });
  }

  handleStatus (event, index, value) {
    this.setState({
      status: event.target.textContent,
      value: value,
    });
  }

  saveJob () {
    var form = this;
    console.log(this.state);
    axios.post('/card', {
      job: {
        title: this.state.title,
        company: this.state.company,
        notes: this.state.notes,
        url: this.state.url
      },
      status: {
        date: this.state.date,
        status: this.state.status
      }
    })
      .then(function(response) {
        form.setState({
          open: false,
          value: 0
        });
        console.log('sent to server');
      })
      .catch(function(error) {
        form.setState({
          open: false,
          value: 0
        });
        console.log('error', error);
      });
  }


  handleDate (e, date) {
    this.setState({
      date: date
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        //primary={true}
        //keyboardFocused={true}
        onClick={this.handleClick}
      />,
      <FlatButton
        label="Save"
        //primary={true}
        //keyboardFocused={true}
        onClick={this.saveJob}
      />
    ];
    const values = ['What is the status of this application?', 'Interested', 'Applied', 'Interview Scheduled', 'Interviewed', 'No response', 'Rejected', 'Offer made', 'Archived'];
    const items = values.map(function(val, i) { return <MenuItem value={i} key={i} primaryText = {val} />; });
    return (
      <div>
        <RaisedButton label='Add a job' onClick={this.handleClick}/>
        <Dialog
          title="What are the details?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClick}
        >
          <TextField onChange={this.handleTitle} hintText="Job title" errorText="This field is required"/><br/>
          <TextField onChange={this.handleCompany} hintText="Company" errorText="This field is required"/><br/>
          <DropDownMenu maxHeight={300} value={this.state.value} onChange={this.handleStatus}>
            {items}
          </DropDownMenu><br/>
          <DatePicker onChange={this.handleDate} value ={this.state.date} hintText="When did you apply?"/><br/>

          <TextField onChange={this.handleURL} hintText="Application link"/><br/>
          <TextField onChange={this.handleNotes} multiLine = {true} rows={2} rowsMax={10} hintText="Anything else we should know?"/><br/>
        </Dialog>
      </div>
    );
  }
}

// function mapStateToProps () {

// }

export default JobForm;