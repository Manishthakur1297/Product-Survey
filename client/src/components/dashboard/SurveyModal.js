import React, { Component, useState, useEffect } from "react";

import { Row, Col, Button, Modal } from "react-bootstrap";

import Form from "react-bootstrap/Form";

import { axiosInstance } from "../service/axiosApi";

import SurveyItem from "./SurveyItem";

const InviteModal = (props) => {
  // console.log(props);
  const hide = () => {
    props.hide();
  };

  const [answers, setAnswers] = useState([]);

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(false);

  const [loading2, setLoading2] = useState(false);

  const [formSubmit, setFormSubmit] = useState(false);

  const getQuestions = (state) => {
    axiosInstance
      .get(`/questions?state=${state}`)
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((error) => console.log(error));
  };

  const stopSurvey = () => {
    axiosInstance
      .put("/users/", {
        survey: false,
      })
      .then((res) => {
        localStorage.setItem("survey", false);
        hide();
      })
      .catch((error) => console.log(error));
  };

  const handleRadioChange = (e) => {
    console.log(e.target.value);
    setLoading(true);
    if (e.target.value != "Don't Care") {
      setLoading2(false);
      getQuestions(true);
    } else {
      getQuestions(false);
      setLoading2(true);
    }
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      stopSurvey();
    }
  };

  const textareaChanged = (data) => {
    let question = questions[data.name]._id.toString();
    let answer = data.value;

    let obj = { ["question"]: `${question}`, ["ans"]: `${answer}` };

    let arr = [...answers];

    console.log(arr);

    if (arr.length > 0) {
      if (arr.some((id) => id.question === question)) {
        for (let i in arr) {
          if (arr[i].question == question) {
            arr[i] = obj;
            break;
          }
        }
      } else {
        arr.push(obj);
      }
    } else {
      arr.push(obj);
    }

    setAnswers(arr);
  };

  const sendAnswers = async (arr) => {
    await axiosInstance.post("/answers", {
      answer: arr,
    });
  };

  const handleSubmit = (e) => {
    setFormSubmit(true);
    setTimeout(hide, 1500);
    sendAnswers(answers);
    stopSurvey();
  };

  return (
    <div>
      <Modal
        id="myModal"
        show={props.show}
        onHide={hide}
        backdrop="static"
        keyboard={false}
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            Are you happy❤ with our product?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div>
            <Form.Group as={Row}>
              <Row sm={3}>
                <Form.Check
                  type="radio"
                  label="Very Happy"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  value="Very Happy"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  type="radio"
                  label="Slightly"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  value="Slightly"
                  onChange={handleRadioChange}
                />
                <Form.Check
                  type="radio"
                  label="Don't Care"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios3"
                  value="Don't Care"
                  onChange={handleRadioChange}
                />
              </Row>
            </Form.Group>
            <hr />
            {!loading ? (
              <div className="modal-message">
                <input type="checkbox" onChange={handleCheckboxChange} /> I do
                not want to answer this
              </div>
            ) : null}

            {loading ? (
              <div>
                {/* {console.log(questions, loading2)} */}
                {loading2 ? (
                  <div className="modal-message">
                    We are sorry we are not very useful to you.
                    <hr />
                  </div>
                ) : (
                  <div className="modal-message">
                    Thank you. A few more questions Please...
                    <hr />
                  </div>
                )}
                <SurveyItem
                  questions={questions}
                  textareaChanged={textareaChanged}
                />
              </div>
            ) : null}
          </div>

          {formSubmit ? (
            <div>
              <hr />
              <p className="modal-message">Thank you so much for your time!</p>
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer className="modal-header">
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="secondary" onClick={hide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default InviteModal;
