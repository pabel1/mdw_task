import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ModalC from "./ModalC";
import Table from "./Table";

const ModalB = () => {
  const [query, setQuery] = useSearchParams();

  const navigate = useNavigate("");
  const [check, setCheck] = useState(false);
  const [view, setView] = useState({});
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    let endpoint;
    if (!search) {
      endpoint = "/api/country-contacts/United States";
    } else if (search) {
      endpoint = `/api/contacts/?search=${search}`;
    }
    const getAllContacts = async () => {
      const res = await fetch(endpoint, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      const data = await res.json();
      if (check) {
        setContacts([...data?.results?.filter((item) => item?.id % 2 === 0)]);
      } else {
        setContacts([...data?.results]);
      }
    };

    getAllContacts();
  }, [check, search]);

  return (
    <>
      {show && <ModalC setShow={setShow} data={view} />}
      <div
        className="position-fixed top-0 start-0 vw-100 vh-100 d-flex justify-content-center align-items-center  opacity-3"
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          zIndex: 100,
        }}
      >
        <div
          className="rounded  d-flex flex-column align-items-center bg-white position-relative "
          style={{
            width: "1000px",
            height: "600px",
          }}
        >
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearch(e.target.value)}
            className=" position-absolute end-0  mt-4 mr-4"
          />
          <h3>Modal B</h3>
          <div className="d-flex justify-content-center gap-3">
            <button
              onClick={() => {
                navigate("/problem-2/modal-A");
              }}
              className="btn btn-sm text-white"
              type="button"
              style={{ backgroundColor: "#46139f" }}
            >
              All Contacts
            </button>
            <button
              onClick={() => {
                navigate("/problem-2/modal-B");
              }}
              className="btn btn-sm text-white "
              type="button"
              style={{ backgroundColor: "#ff7f50" }}
            >
              US Contacts
            </button>
            <button
              onClick={() => {
                navigate("/problem-2");
              }}
              className="btn btn-sm "
              type="button"
              style={{ borderColor: "#46139f" }}
            >
              Close
            </button>
            <label
              style={{ position: "absolute", left: "4%", bottom: "4%" }}
              className="d-flex align-items-center gap-3"
            >
              Only Even
              <input
                checked={check}
                onChange={(e) => setCheck(e.target.checked)}
                className="form-check-input mt-0"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
              />
            </label>
          </div>
          {contacts && (
            <Table data={contacts} setView={setView} setShow={setShow} />
          )}
        </div>
      </div>
    </>
  );
};

export default ModalB;
