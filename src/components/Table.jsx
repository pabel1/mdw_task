import React from "react";

const Table = ({ data, setView, setShow }) => {
  return (
    <div
      style={{
        width: "90%",
        height: "70%",
        overflow: "auto",
        padding: "10px 0",
      }}
    >
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Country</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data?.map((item, index) => (
            <tr key={index}>
              <th scope="row">{item?.id}</th>
              <td>{item?.country?.name}</td>
              <td>{item?.phone}</td>
              <td>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setView(item);
                    setShow(true);
                  }}
                >
                  Open
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
