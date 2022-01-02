import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const AddManager = () => {
  const url = "https://apidev.ticketezy.com/event_managers";
  const [managerDetails, setManagerDetails] = useState({
    name: "",
    companyname: "",
    email: "",
    number: "",
    account: "",
    ifsc: "",
    branch: "",
    bank: "",
    pan: "",
    aadhar: ""
  });
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const onChangeHandler = (event) => {
    let val = event.target.value;
    setManagerDetails((prevState) => {
      return {
        ...prevState,
        [event.target.id]: val
      };
    });
  };
  const createHandler = () => {
    if (
      managerDetails.name === "" ||
      managerDetails.companyname === "" ||
      managerDetails.email === "" ||
      managerDetails.number === "" ||
      managerDetails.account === "" ||
      managerDetails.ifsc === "" ||
      managerDetails.branch === "" ||
      managerDetails.bank === "" ||
      managerDetails.pan === "" ||
      managerDetails.aadhar === ""
    ) {
      setError("Enter valid data !");
    } else if (managerDetails.name.match(/^[a-zA-Z ]+$/) === null) {
      setError("Name cannot contain special character");
    } else if (managerDetails.companyname.match(/^[a-zA-Z ]+$/) === null) {
      setError("Enter valid company name");
    } else if (
      managerDetails.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/) ===
      null
    ) {
      setError("Enter valid email !");
    } else if (managerDetails.number.length !== 10) {
      setError("Enter valid mobile number !");
    } else if (managerDetails.branch.match(/^[a-zA-Z ]+$/) === null) {
      setError("Incorrect Branch Name");
    } else if (managerDetails.bank.match(/^[a-zA-Z ]+$/) === null) {
      setError("Enter valid Bank Name");
    } else if (managerDetails.pan.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/) === null) {
      setError("Enter valid pan number !");
    } else if (managerDetails.aadhar.length !== 12) {
      setError("Enter valid aadhar number !");
    } else {
      Axios.post(
        url,
        {
          event_manager: {
            name: managerDetails.name,
            company_name: managerDetails.companyname,
            pan_number: managerDetails.pan,
            aadhar: managerDetails.aadhar,
            email: managerDetails.email,
            mobile: managerDetails.number,
            account_number: managerDetails.account,
            ifsc_code: managerDetails.ifsc,
            branch_name: managerDetails.branch,
            bank_name: managerDetails.bank
          }
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      ).then((res) => {
        navigate("/eventsmanager");
      });
    }
  };
  return (
    <>
      <div className="details p-3" style={{ background: "#fff" }}>
        <h3 className="text-dark p-2">Add Manager</h3>
        <div className="col-12 p-0">
          {error && <Alert variant="danger">{error}</Alert>}
        </div>
        <div
          className="d-flex flex-wrap p-2"
          style={{ background: "var(--secondary)", borderRadius: "8px" }}
        >
          <div className="col-md-4 row p-2 px-4">
            <p className="text-dark p-2 w-100">Manager Details</p>
            <div className="d-flex w-100 flex-column mb-md-3">
              <label htmlfor="name">name</label>
              <input
                className="m-0 px-2"
                type="text"
                id="name"
                onChange={onChangeHandler}
                placeholder="Enter Event Manager Name"
              />
            </div>
            <div className="d-flex w-100 flex-column mb-md-3">
              <label htmlfor="companyname">Company Name</label>
              <input
                className="m-0 px-2"
                type="text"
                id="companyname"
                onChange={onChangeHandler}
                placeholder="Enter Company Name"
              />
            </div>
            <div className="d-flex w-100 flex-column mb-md-3">
              <label htmlfor="email">Email</label>
              <input
                className="m-0 px-2"
                type="email"
                id="email"
                onChange={onChangeHandler}
                placeholder="Enter Your Email"
              />
            </div>
            <div className="d-flex w-100 flex-column">
              <label htmlfor="number">Mobile Number</label>
              <input
                className="m-0 px-2"
                type="number"
                id="number"
                onChange={onChangeHandler}
                placeholder="Mobile Number"
              />
            </div>
          </div>
          <div className="col-md-4 row p-2 px-4">
            <p className="text-dark p-2 w-100">Bank Details</p>
            <div className="d-flex w-100 flex-column mb-md-3">
              <label htmlfor="account">Account Number</label>
              <input
                className="m-0 px-2"
                type="number"
                id="account"
                onChange={onChangeHandler}
                placeholder="Enter Account Number"
              />
            </div>
            <div className="d-flex w-100 flex-column mb-md-3">
              <label htmlfor="ifsc">IFSC</label>
              <input
                className="m-0 px-2"
                type="text"
                id="ifsc"
                onChange={onChangeHandler}
                placeholder="Enter IFSC code"
              />
            </div>
            <div className="d-flex w-100 flex-column mb-md-3">
              <label htmlfor="branch">Branch Name</label>
              <input
                className="m-0 px-2"
                type="text"
                id="branch"
                onChange={onChangeHandler}
                placeholder="Enter Branch Name"
              />
            </div>
            <div className="d-flex w-100 flex-column">
              <label htmlfor="bank">Bank Name</label>
              <input
                className="m-0 px-2"
                type="text"
                id="bank"
                onChange={onChangeHandler}
                placeholder="Enter Bank Name"
              />
            </div>
          </div>
          <div className="col-md-4 row p-2 px-4 align-self-start">
            <p className="text-dark p-2 w-100">Personal Details</p>
            <div className="d-flex w-100 flex-column mb-md-3">
              <label htmlfor="pan">Pan Number</label>
              <input
                className="m-0 px-2"
                type="text"
                id="pan"
                onChange={onChangeHandler}
                placeholder="Enter Pan Number"
              />
            </div>
            <div className="d-flex w-100 flex-column">
              <label htmlfor="aadhar">Aadhar</label>
              <input
                className="m-0 px-2"
                type="number"
                id="aadhar"
                onChange={onChangeHandler}
                placeholder="Enter Aadhar Number"
              />
            </div>
          </div>
        </div>
        <div className="row justify-content-end pt-3">
          <button
            className="btn btn-primary mr-2 px-3"
            type="submit"
            onClick={createHandler}
          >
            Create
          </button>
          <button className="btn btn-primary px-3" type="submit">
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default AddManager;
