import React, { Component } from 'react';
import XLSX from 'xlsx';
import Typography from '@material-ui/core/Typography';
import MuiDatatables from 'mui-datatables';
import Divider from '@material-ui/core/Divider';

import BarChart from './BarChart';
import LineChart from './LineChart';
import FileUpload from './FileUpload';
import AreaChart from './AreaChart';

const getData = (data, columns) => {
  return data.map((row) => {
    const rowData = [];
    columns.forEach((column) => {
      rowData.push(row[column] ? row[column].toString() : '');
    });
    return rowData;
  });
};

const getColumns = (data) => {
  const columns = [];
  data.forEach((row) => {
    const keys = Object.keys(row);
    const originalKeys = keys.filter((key) => {
      return columns.find((col) => { return col === key; }) === undefined;
    });
    if (originalKeys.length > 0) columns.push(...originalKeys);
  });
  return columns;
};

class ChartRender extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      columns: [],
      tableData: [],
      readData: [],
      readCols: [],
      dataCalc: data,
    };
    this.onDrop = this.onDrop.bind(this);
    this.getTable = this.getTable.bind(this);
    this.makeData = this.makeData.bind(this);
  }

  componentDidMount() {
    this.getTable();
  }

  onDrop(acceptedFiles) {
    const file = acceptedFiles[0]; // eslint-disable-next-line
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const readData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      const readCols = readData.shift();
      this.setState({ readData, readCols }, () => {
        this.makeData();
      });
    };
    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  getTable() {
    const {
      dataCalc,
    } = this.state;
    const columns = getColumns(dataCalc);
    const tableData = getData(dataCalc, columns);
    this.setState({ columns, tableData });
  }

  makeData() {
    const { readData, readCols } = this.state;
    const data = readData.map((row) => {
      const entries = Object.entries(row);
      const obj = {};
      for (let i = 0; i < entries.length; i += 1) { // eslint-disable-next-line
        obj[readCols[i]] = entries[i][1];
      }
      return obj;
    });
    const columns = getColumns(data);
    const tableData = getData(data, columns);

    this.setState({ dataCalc: data, columns, tableData });
  }

  render() {
    const {
      title, options, data, ...other
    } = this.props;
    const {
      columns, tableData, dataCalc,
    } = this.state;
    const tableOptions = options || {
      filterType: 'checkbox',
    };
    return (
      <>
        <FileUpload onDrop={this.onDrop} />
        <MuiDatatables
          title={title}
          data={tableData}
          columns={columns}
          options={tableOptions}
          {...other}
        /><br /><br />
        <Divider />
        <Typography variant="h3">Bar Chart</Typography>
        <BarChart data={dataCalc} columns={columns} />
        <Divider />
        <Typography variant="h3">Line Chart</Typography>
        <LineChart data={dataCalc} columns={columns} />
        <Divider />
        <Typography variant="h3">Area Chart</Typography>
        <AreaChart data={dataCalc} columns={columns} />
      </>
    );
  }
}

export default ChartRender;
