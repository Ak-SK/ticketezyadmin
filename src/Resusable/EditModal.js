import React, { useEffect, useState } from "react";
import Select from "react-select";
import { LanguageOptions } from "../Helpers/LanguageOptions";
import { CategoryOptions } from "../Helpers/CategoryOptions";
import { AdultOptions } from "../Helpers/AdultOptions";
import Axios from "axios";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditModal = (props) => {
  let tempArr = [];
  let navigate = useNavigate();
  const [crew, setCrew] = useState([]);
  // const url = `https://apidev.ticketezy.com/events_list/${props.eventDetails.secret}`
  const url = `https://apidev.ticketezy.com/events/${props.eventDetails.secret}`;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [cat, setCat] = useState([]);
  const [lang, setLang] = useState(LanguageOptions.filter(x => x.value === props.eventDetails.language));
  const [adult, setAdult] = useState(AdultOptions.filter(x => x.value === props.eventDetails.adult_content));
  var newArr = [];
  for (var i = 0; i < props.eventDetails.categories.length; i++) {
    newArr.push(
      ...CategoryOptions.filter(
        (x) => x.value === props.eventDetails.categories[i]
      )
    );
  }
  useEffect(() => {
    setCat(newArr);
  }, []);
  const [editDetails, setEditDetails] = useState({
    title: props.eventDetails.title,
    description: props.eventDetails.description,
    venue: props.eventDetails.venue,
    location: props.eventDetails.location,
    language: props.eventDetails.language,
    categories: props.eventDetails.categories,
    duration: props.eventDetails.duration,
    adult_content: props.eventDetails.adult_content,
  });
  const onChangeHandler = (event, action) => {
    const tempEditDetails = JSON.parse(JSON.stringify(editDetails));
    if (event.target) {
      tempEditDetails[event.target.id] = event.target.value;
    } else if (action) {
      tempEditDetails[action.id] = event.value;
    }
    setEditDetails(tempEditDetails);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const updateHandler = () => {
    for (var i = 0; i < cat.length; i++) {
      tempArr.push(cat[i].value);
    }
    editDetails.categories = [];
    editDetails.categories.push(...tempArr);
    editDetails.language = lang.value;
    editDetails.adult_content = adult.value;
    const tempEditDetails = JSON.parse(JSON.stringify(editDetails));
    if (
      editDetails.title === "" ||
      editDetails.description === "" ||
      editDetails.venue === "" ||
      editDetails.location === "" ||
      editDetails.language === "" ||
      editDetails.categories === "" ||
      editDetails.duration === "" ||
      editDetails.adult_content === "" ||
      editDetails.cast_and_crew === ""
    ) {
      setError("Enter valid data !");
    } else if (editDetails.description.length < 10) {
      setError("Description is too short");
    } else if (cat.length === 0) {
      setError("Categories cannot be empty");
    } else {
      setLoading(true);
      Axios.patch(
        url,
        {
          event: tempEditDetails,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
        .then((resp) => {
          setLoading(false);
          alert("Upadted Successfully");
          // window.location.reload();
        })
        .catch((error) => {
          setLoading(false);
          alert("A network error occured/nTry again later");
        });
    }
  };
  const addMember = () => {
    // create an array
    let addData = {
      id: crew.length,
      name: "",
      image: null,
    };
    setCrew((prevState) => {
      return [...prevState, addData];
    });
  };
  return (
    <>
      <div className="backdrop"></div>
      <div className="details edit-modal p-2 col-11 col-sm-8 col-md-6">
        <div className="d-flex flex-column">
          <div className="row my-2">
            <div
              className="d-flex back align-items-center px-3 py-1"
              style={{
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={props.onCloseHandler}
            >
              Close&ensp;&ensp;<i className="fa fa-close"></i>
            </div>
            <div className="d-flex align-items-center ml-auto p-2">
              <h4 className="m-0">{editDetails.title}</h4>
            </div>
          </div>
          {/* <div
            className="position-relative banner-image w-100"
            style={{ height: "250px", overflow: "hidden" }}
          >
            <input
              type="file"
              onChange={onImageChange}
              className="filetype"
              id="uploadimg"
            />
            <label className="uplabel" htmlFor="uploadimg">
              <i className="fa fa-upload fa-3x"></i>
            </label>
            <img
              src={image}
              className="position-relative"
              alt="preview"
              style={{ zIndex: "2" }}
            />
          </div> */}
          <div className="row">
            <div className="col-12">
              {error && <Alert variant="danger">{error}</Alert>}
            </div>
            <div className="col-md-6 p-2">
              <div className="d-flex flex-column mb-3">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  value={editDetails.title}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="d-flex flex-column">
                <label htmlFor="venue">Venue</label>
                <input
                  type="text"
                  id="venue"
                  value={editDetails.venue}
                  onChange={onChangeHandler}
                />
              </div>
            </div>
            <div className="col-md-6 p-2" style={{ height: "inherit" }}>
              <div className="d-flex flex-column" style={{ height: "100%" }}>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  style={{
                    height: "inherit",
                    resize: "none",
                    overflow: "auto",
                  }}
                  value={editDetails.description}
                  onChange={onChangeHandler}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 p-2" style={{ height: "inherit" }}>
              <div className="d-flex flex-column" style={{ height: "100%" }}>
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  value={editDetails.location}
                  onChange={onChangeHandler}
                  style={{ height: "inherit" }}
                />
              </div>
            </div>
            <div className="col-md-3 p-2" style={{ height: "inherit" }}>
              <div className="d-flex flex-column" style={{ height: "100%" }}>
                <label htmlFor="duration">Duration</label>
                <input
                  type="number"
                  id="duration"
                  value={editDetails.duration}
                  onChange={onChangeHandler}
                  className="px-2"
                  style={{ height: "inherit" }}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5 p-2">
              <div className="d-flex flex-column">
                <label htmlFor="categories">Category</label>
                <Select
                  isMulti
                  options={CategoryOptions}
                  id="categories"
                  value={cat}
                  onChange={setCat}
                />
              </div>
            </div>
            <div className="col-md-4 p-2">
              <div className="d-flex flex-column">
                <label htmlFor="language">Language</label>
                <Select
                  options={LanguageOptions}
                  id="language"
                  value={lang}
                  onChange={setLang}
                />
              </div>
            </div>
            <div className="col-md-3 p-2">
              <div className="d-flex flex-column">
                <label htmlFor="adult_content">Adult Content</label>
                <Select
                  options={AdultOptions}
                  id="adult_content"
                  value={adult}
                  onChange={setAdult}
                />
              </div>
            </div>
          </div>
          {/* <div className="row">
            <label className="w-100 mb-2">Event Speakers</label>
            <i
              className="fas fa-plus text-success cursor-pointer mx-2 my-1"
              onClick={addMember}
            ></i>
            <div className="row w-100">
              <div className="col-sm-3 col-lg-2 p-1">
                <input className="w-100 px-2" type="text" value="Akhil" />
              </div>
            </div>
          </div> */}
          <div className="row justify-content-end pt-3">
            <button
              className="btn btn-primary mr-2"
              type="submit"
              onClick={updateHandler}
            >
              Save
            </button>
            <button
              className="btn btn-primary"
              type="submit"
              onClick={props.onCloseHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
