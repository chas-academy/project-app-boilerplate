import React, { Component } from 'react';
import { PageTitle } from '../../Lib/Common/Views';
import StudentList from '../../Redux/Containers/Students/StudentList';

export default class Redux extends Component {
  render() {
    return (
      <div className="redux-view">
        <PageTitle title="Redux" />
        <p>An example of containers and state management via Redux.</p>
        <div className="col-sm-5 no-padding">
          <StudentList />
        </div>
      </div>
    );
  }
}
