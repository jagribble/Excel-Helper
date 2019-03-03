import React, { Component } from 'react';
import {
  BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar,
} from 'recharts';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import CheckBox from '@material-ui/core/Checkbox';

class BarChartRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: '',
      y: '',
      aggregateData: false,
    };
    this.handleXChange = this.handleXChange.bind(this);
    this.handleYChange = this.handleYChange.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.aggregateSelectedData = this.aggregateSelectedData.bind(this);
  }


  handleXChange(event) {
    this.setState({ x: event.target.value });
  }

  handleYChange(event) {
    this.setState({ y: event.target.value });
  }

  toggleCheckbox() {
    const { aggregateData } = this.state;
    this.setState({ aggregateData: !aggregateData });
  }

  aggregateSelectedData() {
    const { data } = this.props;
    const { x, y } = this.state;
    if (typeof (data[0][y]) === 'number') {
      const newData = [];
      data.forEach((row) => {
        const find = newData.find((d) => { return d[x] === row[x]; });
        if (find) {
          let count = find[y]; // eslint-disable-next-line
          if (!(isNaN(row[y]) || row[y] === undefined || row[y] === null)) {
            count += row[y];
          }
          newData[newData.indexOf(find)][y] = count; // eslint-disable-next-line
        } else if (isNaN(row[y]) || row[y] === undefined || row[y] === null) {
          const copy = row;
          copy[y] = 0;
          newData.push(copy);
        } else {
          newData.push(row);
        }
      });
      return newData;
    }
    return data;
  }

  render() {
    const {
      data, columns,
    } = this.props;
    const {
      x, y, aggregateData,
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
        </Select>
        <CheckBox value="aggregateData" checked={aggregateData} onClick={this.toggleCheckbox} />
        <br /><br />
        <BarChart
          width={730}
          height={250}
          data={!aggregateData ? data : this.aggregateSelectedData()}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={x} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={y} fill="#8884d8" />
        </BarChart>
      </>
    );
  }
}

export default BarChartRender;
