import React, { Component } from 'react';
import Form from 'react-jsonschema-form';
import clone from 'lodash.clone';
import pickBy from 'lodash.pickby';
import identity from 'lodash.identity';

import { Button } from 'react-bootstrap';

function filteredData(formData) {
  return pickBy(formData, identity);
}

export default class ColumnFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      initialised: true,
      buttonsDisabled: true,
    };
    this.schema = {
      type: 'object',
      properties: this.props.filters,
    };
    this.uiSchema = {
      'ui:rootFieldId': 'column_filters',
      dateFrom: { 'ui:widget': 'date-time' },
      dateTo: { 'ui:widget': 'date-time' },
    };
    this.formTO = 0;

    this.handleOnChange.bind(this);
    this.handleOnSubmit.bind(this);
    this.handleResetFilters.bind(this);
  }

  componentDidMount() {
    this.setFilters();
  }

  componentWillReceiveProps() {
    if (this.state.initialised) this.setFilters();
  }

  setFilters() {
    const formData = clone(this.props.filtered);

    if (Object.keys(formData).length > 0) {
      Object.keys(formData).forEach(key => {
        formData[key] = decodeURIComponent(formData[key]);
      });
    }

    this.setState({
      formData,
      buttonsDisabled: this.buttonsDisabled(formData),
    });
  }

  buttonsDisabled(filtered) {
    if (this.props.queryString !== '') return false;

    return Object.keys(filtered).length === 0;
  }

  handleOnChange({ formData }) {
    const disabled = this.buttonsDisabled(filteredData(formData));

    this.setState({
      formData,
      buttonsDisabled: disabled,
    });
  }

  handleOnSubmit({ formData }) {
    this.setState({ formData, initialised: false });

    clearTimeout(this.formTO);

    this.formTO = setTimeout(() => {
      if (Object.keys(filteredData(this.state.formData)).length > 0)
        this.props.setStateHandler({
          filtered: filteredData(formData),
          page: 0,
        });
      else {
        this.setState({ buttonsDisabled: true });
        this.handleResetFilters();
      }

      setTimeout(() => {
        this.setState({ initialised: true });
      }, 100);
    }, 100);
  }

  handleResetFilters() {
    this.props.setStateHandler({ filtered: {}, page: 0 });
  }

  render() {
    if (!this.props.filters) return null;

    return (
      <div className="column-filters">
        <Form
          autocomplete="off"
          formData={this.state.formData}
          schema={this.schema}
          uiSchema={this.uiSchema}
          onChange={this.handleOnChange}
          onSubmit={this.handleOnSubmit}
        >
          <div className="form-group column-filters-buttons">
            <Button
              type="button"
              bsStyle="default"
              disabled={this.state.buttonsDisabled}
              onClick={this.handleResetFilters}
            >
              Reset Filters
            </Button>
            <Button
              type="submit"
              bsStyle="primary"
              disabled={this.state.buttonsDisabled}
            >
              Filter Records
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}
