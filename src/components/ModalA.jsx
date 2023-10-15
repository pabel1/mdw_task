import React, { useEffect, useRef, useState } from "react";

import { useNavigate } from "react-router-dom";
import ModalC from "./ModalC";
import Table from "./Table";
const ModalA = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [check, setCheck] = useState(false);
  const [view, setView] = useState({});
  const [show, setShow] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const modalRef = useRef(null);

  useEffect(() => {
    const getAllContacts = async () => {
      let endpoint;

      if (!search) {
        endpoint = `/api/contacts?page=${page}`;
      } else if (search) {
        endpoint = `/api/contacts/?search=${search}&page=${page}`;
      }

      try {
        const res = await fetch(endpoint, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        });

        const data = await res.json();

        console.log(data);
        if (check) {
          setContacts([...data?.results?.filter((item) => item?.id % 2 === 0)]);
        } else {
          // setContacts((prevContacts) => [...prevContacts, ...data.results]);
          setContacts([...data.results]);
        }
      } catch (error) {
        // Handle any fetch errors
      }
    };
    getAllContacts();
  }, [page, check, search]);

  const fetchMoreData = () => {
    if (contacts.length < data?.count) {
      setPage(page + 1);
    }
  };

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
          <div>
            <input
              type="text"
              placeholder="Search.."
              onChange={(e) => setSearch(e.target.value)}
              className=" position-absolute end-0  mt-4 mr-4 "
            />
          </div>

          <h3>Modal A</h3>
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
            // <InfiniteScroll
            //   dataLength={contacts.length}
            //   next={fetchMoreData}
            //   hasMore={contacts.length < data?.count}
            //   loader={<div>Loading...</div>}
            //   endMessage={<div>No more data to load.</div>}
            // >
            //   <div className="table-container">
            <Table data={contacts} setView={setView} setShow={setShow} />
            //   </div>
            // </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalA;
