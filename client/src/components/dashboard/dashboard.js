import React, { useState } from "react";

import InviteModal from "./SurveyModal";

import { Container, Row, Col } from "react-bootstrap";

const DashBoard = () => {
  const user = localStorage.getItem("id");

  const [show, setShow] = useState(JSON.parse(localStorage.getItem("survey")));

  const hide = () => {
    setShow(!show);
  };

  return (
    <Container fluid>
      {show ? (
        <InviteModal user={user} show={show} hide={hide} />
      ) : (
        <div className="div-center">
          <div className="box-center">Thank you ✌</div>
        </div>
      )}
    </Container>
  );
};

export default DashBoard;
