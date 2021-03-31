import React from 'react';
import { Button, Table } from "reactstrap";
import { Checkbox } from '@material-ui/core';

export default function ManageIntern() {
  return (
    <div className="manage-schedule-detail">
      <div className="manage-schedule-detail__inner">
        <Table>
          <thead>
            <tr>
              <th>Time/Day</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            {
              ["All day", "Morning", "Afternoon", "OT"].map((item, index) => {
                return (
                  <tr key={"row-" + index}>
                    <th scope="row">{item}</th>
                    <td><Checkbox /></td>
                    <td><Checkbox /></td>
                    <td><Checkbox /></td>
                    <td><Checkbox /></td>
                    <td><Checkbox /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <Button className="button button--shadow">Update</Button>
      </div>
    </div>
  );
}