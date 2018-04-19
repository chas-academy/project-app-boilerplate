import React, { Component } from 'react'
import { connect } from 'react-redux'

class StudentDetails extends Component {
  render() {
    if (!Object.keys(this.props.activeStudent).length)
      return <p>Select a student to view details.</p>

    return <p><strong>GitHub:</strong> {this.props.activeStudent.github}</p>
  }
}

function mapStateToProps({ Students }) {
  return { activeStudent: Students.activeStudent }
}

export default connect(mapStateToProps)(StudentDetails)
