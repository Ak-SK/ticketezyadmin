import React, { useEffect, useState } from "react";
import SwitchComponent from "../UI/Switch";
import Axios from "axios";
import Loader from "../UI/Loader";
import { Link, useNavigate } from "react-router-dom";

const Manager = (props) => {
  let id = null;
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prevState) => {
      return !prevState;
    });
    setLoading(true);
    if (checked === true) {
      id = "inactive";
    } else {
      id = "active";
    }
    Axios.patch(
      `https://apidev.ticketezy.com/event_managers/${props.manager.secret}`,
      {
        event_manager: {
          status: id,
        },
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setLoading(false);
        // window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        alert("A Network error occured !\nPlease try again later");
      });
  };
  useEffect(() => {
    if (props.manager.status === "active") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);
  const onDeleteHandler = (manager) => {
    if (confirm("Are you sure want to delete this Manager") == true) {
      setLoading(true);
      let deleteId = manager.secret;
      const url = `https://apidev.ticketezy.com/event_managers/${deleteId}`;
      Axios.delete(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setLoading(false);
          alert("Manager has been deleted successfully");
          // window.location.reload();
        })
        .catch((error) => {
          setLoading(false);
          alert("OOPS an error occured !\n\nPlease try again later");
        });
    }
  };
  return (
    <>
      <div className="col-sm-6 col-md-3 px-3 py-2">
        <div className="card box-shadow p-2">
          <div className="pb-2">
            <SwitchComponent checked={checked} handleChange={handleChange} />
            <p className="name f-600">{props.manager.name}</p>
            <p className="company">{props.manager.company_name}</p>
            <p className="number">{props.manager.mobile}</p>
            <p className="eventno">{props.manager.email}</p>
          </div>
          <div className="card-footer bg-transparent row py-2">
            <Link
              className="footer-icon fas fa-eye text-primary"
              to={`/managerdetails/${props.manager.secret}`}
              key={props.manager.secret}
            ></Link>
            <i
              className="footer-icon fas fa-edit text-secondary"
              onClick={() => props.editModal(props.manager)}
            ></i>
            <i
              className="footer-icon fa fa-trash ml-auto mr-0  text-danger"
              onClick={() => onDeleteHandler(props.manager)}
            ></i>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default Manager;
