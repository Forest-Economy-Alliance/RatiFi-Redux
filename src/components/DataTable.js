import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";

const DataTable = ({ data }) => {

  const isImageUrl = (value) => {
    const urlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))/i;
    return urlPattern.test(value);
  };

  const renderTableRows = (category, fields, isLight) => {
    const keys = Object.keys(fields);
    const rowClass = isLight ? "table-light" : "table-LIGHT";
    return keys.map((key, index) => (
      <tr key={`${category}-${key}`} className={rowClass}>
       
        {index === 0 && (
          <td rowSpan={keys.length} className="align-middle text-center">
            {category}
          </td>
        )}
        <td>{key}</td>
        <td>
          {isImageUrl(fields[key]) ? (
            <img
              src={fields[key]}
              alt={key}
              style={{ width: "200px", height: "100px", objectFit: "cover",border:'solid 1px black' }}
            />
          ) : (
            fields[key] || "N/A"
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">School Details</h2>
      <Table bordered hover>
        <thead className="thead-dark">
          <tr>
            <th className="text-center">Category</th>
            <th className="text-center">Field</th>
            <th className="text-center">Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([category, fields], index) =>
            renderTableRows(category, fields, index % 2 === 0)
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
