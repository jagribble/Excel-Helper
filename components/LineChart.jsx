import React, { Component } from 'react';
import {
  LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line,
} from 'recharts';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class LineChartRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: '',
      y: '',
    };
    this.handleXChange = this.handleXChange.bind(this);
    this.handleYChange = this.handleYChange.bind(this);
  }


  handleXChange(event) {
    this.setState({ x: event.target.value });
  }

  handleYChange(event) {
    this.setState({ y: event.target.value });
  }

  render() {
    const {
      data, columns,
    } = this.props;
    const {
      x, y,
    } = this.state;

    return (
      <>
        <br /><br />
        Y Axis &nbsp;
        <Select value={y} onChange={this.handleYChange}>
          {columns.map((col) => {
            return <MenuItem key={col} value={col}>{col}</MenuItem>;
          })}
        </Select><br /><br />
        <br /><br />
        X Axis &nbsp;
        <Select value={x} onChange={this.handleXChange}>
          {columns.map((col) => {
            return <MenuItem key={col} value={col}>{col}</MenuItem>;
          })}
        </Select><br /><br />
        <LineChart width={730} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey={x} fill="#8884d8" />
        </LineChart>
      </>
    );
  }
}

export default LineChartRender;
