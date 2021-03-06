import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import Loader from "../UI/Loader";

const ManagerDetails = () => {
    const url = "https://apidev.ticketezy.com/event_managers";
    let params = useParams();
    const [singleManagerDetails, setSingleManagerDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => {
            setLoading(false);
            setSingleManagerDetails(res.data);
        })
    }, [])

    let ui = null;
    if (singleManagerDetails === null) {
        ui = <>
            {loading && <Loader />}
        </>
    } else {
        ui = singleManagerDetails.filter(x => x.secret === params.id).map((data) => {
            return (
                <div className="details p-3" style={{ background: "#fff" }} key={data.secret}>
                    <div
                        className="row p-2"
                        style={{ background: "var(--secondary)", borderRadius: "8px" }}
                    >
                        <div className="col-md-4 p-2 px-4">
                            <h6 className="py-2 m-0 text-primary">
                                Manager Details
                            </h6>
                            <div className="d-flex w-100 flex-column mb-md-3">
                                <h5 className="p-1 pb-0 m-0 f-600">Name</h5>
                                <p className="p-1 pt-0 pl-3">{data.name}</p>
                            </div>
                            <div className="d-flex w-100 flex-column mb-md-3">
                                <h5 className="p-1 pb-0 m-0 f-600">Company Name</h5>
                                <p className="p-1 pt-0 pl-3">{data.company_name}</p>
                            </div>
                            <div className="d-flex w-100 flex-column mb-md-3">
                                <h5 className="p-1 pb-0 m-0 f-600">Email</h5>
                                <p className="p-1 pt-0 pl-3">{data.email}</p>
                            </div>
                            <div className="d-flex w-100 flex-column">
                                <h5 className="p-1 pb-0 m-0 f-600">Mobile Number</h5>
                                <p className="p-1 pt-0 pl-3">{data.mobile}</p>
                            </div>
                        </div>
                        <div className="col-md-4 p-2 px-4">
                            <h6 className="py-2 m-0 text-primary">Bank Details</h6>
                            <div className="d-flex w-100 flex-column mb-md-3">
                                <h5 className="p-1 pb-0 m-0 f-600">Account Number</h5>
                                <p className="p-1 pt-0 pl-3">{data.account_number}</p>
                            </div>
                            <div className="d-flex w-100 flex-column mb-md-3">
                                <h5 className="p-1 pb-0 m-0 f-600">IFSC</h5>
                                <p className="p-1 pt-0 pl-3">{data.ifsc_code}</p>
                            </div>
                            <div className="d-flex w-100 flex-column mb-md-3">
                                <h5 className="p-1 pb-0 m-0 f-600">Branch Name</h5>
                                <p className="p-1 pt-0 pl-3">{data.branch_name}</p>
                            </div>
                            <div className="d-flex w-100 flex-column">
                                <h5 className="p-1 pb-0 m-0 f-600">Bank Name</h5>
                                <p className="p-1 pt-0 pl-3">{data.bank_name}</p>
                            </div>
                        </div>
                        <div className="col-md-4 p-2 px-4 align-self-start">
                            <h6 className="py-2 m-0 text-primary">Personal Details</h6>
                            <div className="d-flex w-100 flex-column mb-md-3">
                                <h5 className="p-1 pb-0 m-0 f-600">Pan Number</h5>
                                <p className="p-1 pt-0 pl-3">{data.pan_number}</p>
                            </div>
                            <div className="d-flex w-100 flex-column">
                                <h5 className="p-1 pb-0 m-0 f-600">Aadhar</h5>
                                <p className="p-1 pt-0 pl-3">{data.aadhar}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
    return (
        ui
    )
}

export default ManagerDetails;
