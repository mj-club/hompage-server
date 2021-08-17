import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Card, Container } from "react-bootstrap";

const FormCard = ({icon, content, title}) => {
  return (
    <>
    <style type="text/css">
        {`
          .body{
           border : 3px solid #A99371;

          .form-title{
            font-size: 2rem;
            margin-top: 16px;
            margin-bottom : 16px;
          }
        `
        }
    </style>

    <Card className="body pb-3 m-3 mt-5 text-center">
      <div className="top-icon" >
        <div className="fa-layers">
          <FontAwesomeIcon icon={faCircle} color="#A99371" size="4x" transform="up-5 left-5" />
          <FontAwesomeIcon icon={icon} inverse size="4x" transform="shrink-7 up-5 left-6" />
        </div>
      </div>
      <div className="form-title">{title}</div>
      {content}
    </Card >
    </>
  );
}

export default FormCard;