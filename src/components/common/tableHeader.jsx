import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { path, order } = this.props.sortColumn;
    if (column.path !== path) return;

    return order === "asc" ? (
      <i className="fa fa-sort-asc"></i>
    ) : (
      <i className="fa fa-sort-desc"></i>
    );
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              className="clickable"
              onClick={() => this.raiseSort(column.path)}
              key={column.path || column.key}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
