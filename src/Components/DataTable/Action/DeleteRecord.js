import React, { Component } from 'react';
import axios from 'axios';
import Axios from '../../../Lib/Common/Axios';
import ConfirmModal from '../../Modals/Confirm';
import Alert from '../../Alert';
import * as Session from '../../../Lib/Helpers/Session';

export default class DeleteRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      deleteRequestInProcess: false,
      deleteRequestSuccess: false,
      deleteRequestError: false,
    };

    this.handleCloseModal.bind(this);
    this.handleDeleteRequest.bind(this);
    this.handleDeleteRecord.bind(this);
  }

  handleDeleteRecord() {
    this.setState({
      showModal: true,
      deleteRequestSuccess: false,
      deleteRequestError: false,
    });
  }

  handleCloseModal() {
    const { onSuccess } = this.props;
    this.setState({ showModal: false });

    if (this.state.deleteRequestSuccess && onSuccess)
      setTimeout(() => {
        onSuccess();
      }, 300);
  }

  handleDeleteRequest() {
    if (!Session.decodedToken()) return Session.verifyToken();

    this.setState({ deleteRequestInProcess: true });

    setTimeout(() => {
      this.setState({ deleteRequestError: false });
    });

    const { resource, dataSource, resourceIdKey } = this.props;
    const resourceId = resource[resourceIdKey];

    return Axios.delete([dataSource, resourceId].join('/'))
      .then(() => {
        this.setState({
          deleteRequestSuccess: true,
          deleteRequestInProcess: false,
        });
      })
      .catch(error => {
        if (axios.isCancel(error)) return true;

        console.log('Error: ', error);

        this.setState({ deleteRequestInProcess: false });

        return setTimeout(() => {
          this.setState({ deleteRequestError: true });
        });
      });
  }

  render() {
    const {
      showDeleteRecord,
      resource,
      resourceIdKey,
      isButton,
      disabled,
      successMessage,
      confirmModal,
    } = this.props;

    if (!showDeleteRecord || resource[resourceIdKey] === 1) return null;

    const {
      showModal,
      deleteRequestInProcess,
      deleteRequestSuccess,
      deleteRequestError,
    } = this.state;
    const buttonClassName = isButton
      ? 'btn btn-danger'
      : 'datatable-actions-btn';
    const isDisabled = disabled || false;
    const message = successMessage || 'Record has been deleted.';

    return (
      <span>
        <ConfirmModal
          title={confirmModal.title}
          button={confirmModal.button}
          showModal={showModal}
          closeModalHandler={this.handleCloseModal}
          processRequestHandler={this.handleDeleteRequest}
          requestInProcess={deleteRequestInProcess}
          showCloseButton={deleteRequestSuccess}
        >
          {deleteRequestSuccess ? (
            <Alert type="success" hideDismissButton>
              {message}
            </Alert>
          ) : (
            <ModalContent
              deleteRequestError={deleteRequestError}
              message={confirmModal.message}
            />
          )}
        </ConfirmModal>
        <button
          type="button"
          className={buttonClassName}
          onClick={this.handleDeleteRecord}
          disabled={isDisabled}
        >
          Delete
        </button>
      </span>
    );
  }
}

const ModalContent = props => (
  <div>
    {props.deleteRequestError && <Alert processError />}
    {props.message}
  </div>
);
