import React from "react";

const ModalC = ({ setShow, data }) => {
  console.log(data);
  return (
    <div
      className="position-fixed top-0 start-0 vw-100 vh-100 d-flex justify-content-center align-items-center opacity-3"
      style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 150 }}
    >
      <div
        style={{
          width: "600px",
          height: "400px",
        }}
        className="d-flex justify-content-center flex-column align-items-center  bg-white position-relative"
      >
        <h3>Modal C</h3>
        <div className="d-flex justify-content-between align-items-center gap-3 mt-4">
          <h5>
            <h>ID :</h>
          </h5>
          <h6>{data?.id}</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center gap-3 mt-4">
          <h5>Country :</h5>
          <h6>{data?.country?.name}</h6>
        </div>

        <div className="d-flex justify-content-between align-items-center gap-3 my-4">
          <h5>Phone :</h5>
          <h6>{data?.phone}</h6>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => {
              setShow(false);
            }}
            className="btn btn-sm "
            type="button"
            style={{ borderColor: "#46139f" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalC;
