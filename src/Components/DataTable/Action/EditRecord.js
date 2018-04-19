import React, { Component } from 'react';
import ModalDefault from '../../Modals/Default';

export default class EditRecord extends Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };

    this.handleToggleFormModal.bind(this);
    this.handleOpenModal.bind(this);
  }

  handleToggleFormModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleOpenModal(e) {
    e.preventDefault();
    this.setState({ showModal: true });
  }

  render() {
    const {
      showEditRecord,
      resource,
      resourceIdKey,
      editFormOption,
      onSuccess,
      path,
    } = this.props;

    if (!showEditRecord) return null;

    const resourceId = resource[resourceIdKey];

    return (
      <span>
        <ModalDefault
          formOption={editFormOption}
          resource={resource}
          enableModal={showEditRecord}
          showModal={this.state.showModal}
          onSuccess={onSuccess}
          toggleModalHandler={this.handleToggleFormModal}
        />
        <a
          href={[path, resourceId, 'edit'].join('/')}
          className="datatable-actions-btn"
          onClick={this.handleOpenModal}
        >
          Edit
        </a>
      </span>
    );
  }
}
