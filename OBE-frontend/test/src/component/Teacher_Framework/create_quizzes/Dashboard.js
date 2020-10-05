import React, { Fragment } from "react";
import GET from "./GET";
import POST from "./POST";
import Postchoices from "./postchoices";
import List from "./AssignmentList";
import AsignmentList from "./AssignmentList";
export default function Dashboard() {
  return (
    <div>
      <Fragment>
        <AsignmentList />
      </Fragment>
    </div>
  );
}
