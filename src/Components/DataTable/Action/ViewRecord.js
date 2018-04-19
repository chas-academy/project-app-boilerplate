import React, { Component } from 'react';
import ViewModal from '../../Modals/Default';

export default class ViewRecord extends Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };

    this.handleToggleViewModal.bind(this);
    this.handleOpenModal.bind(this);
  }

  handleToggleViewModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleOpenModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  render() {
    const {
      resource,
      showViewRecord,
      viewRecordOption,
      resourceIdKey,
      path,
    } = this.props;

    if (!showViewRecord) return null;

    const resourceId = resource[resourceIdKey];

    return (
      <span>
        <ViewModal
          formOption={viewRecordOption}
          resource={resource}
          enableModal={showViewRecord}
          showModal={this.state.showModal}
          toggleModalHandler={this.handleToggleViewModal}
        />
        <a
          href={[path, resourceId].join('/')}
          className="datatable-actions-btn"
          onClick={this.handleOpenModal}
        >
          View
        </a>
      </span>
    );
  }
}
