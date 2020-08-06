import React, { Component } from "react";
import { axiosInstance } from "../service/axiosApi";

const SurveyItem = ({ questions, textareaChanged }) => {
  const inputChanged = (evt) => {
    textareaChanged(evt.target);
  };
  return (
    <div className="row">
      {questions.map((question, idx) => {
        return (
          <div key={idx} className="question-item">
            <p className="modal-question">
              {idx + 1}. {question.question}
            </p>
            <textarea
              name={idx}
              onChange={inputChanged}
              maxLength="200"
              rows="3"
              cols="60"
            ></textarea>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default SurveyItem;
