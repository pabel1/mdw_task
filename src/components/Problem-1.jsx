import React, { useState } from "react";

const Problem1 = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [activeLists, setActiveLists] = useState([]);
  const [completedLists, setCompletedLists] = useState([]);
  const [allLists, setAllLists] = useState([]);
  const [show, setShow] = useState("all");
  const sortOrder = ["Active", "Completed", "Pending", "Archive"];
  const handleClick = (value) => {
    setShow(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "active" || status === "Active") {
      setActiveLists([...activeLists, { name, status }]);
    } else if (status === "completed" || status === "Completed") {
      setCompletedLists([...completedLists, { name, status }]);
    }
    setAllLists([...allLists, { name, status }]);
    setName("");
    setStatus("");
  };
  console.log(allLists);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {show === "all" &&
                [...allLists]
                  ?.sort(function (a, b) {
                    const statusA = sortOrder.indexOf(a.status);
                    const statusB = sortOrder.indexOf(b.status);

                    return statusA - statusB;
                  })
                  ?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.name}</td>
                      <td>{item?.status}</td>
                    </tr>
                  ))}
              {show === "active" &&
                activeLists?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.status}</td>
                  </tr>
                ))}
              {show === "completed" &&
                completedLists?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>{item?.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
