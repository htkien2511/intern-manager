import { TextareaAutosize } from '@material-ui/core';
import React from 'react';
import { Button} from "reactstrap";

export default function ManageFeedbackDetail() {
  return (
    <div className="manage-feedback-detail">
      <div className="manage-feedback-detail__inner flex align__center flex-col">
        <h2>Content</h2>
        <TextareaAutosize style={{ width: 900, height: 350, borderRadius: 15, marginBottom: 50 }}></TextareaAutosize>
        <div className="flex space-between">
          <Button className="button--success" style={{ background: "blue" }}>Back</Button>
          <Button className="button--secondary" style={{ background: "green" }}>Response</Button>
          <Button style={{ background: "red" }}>Delete</Button>
        </div>
      </div>
    </div>
  );
}