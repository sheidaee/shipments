import React, { useContext } from "react";
import moment from "moment";
import {  
  useHistory, 
  Redirect
} from "react-router-dom";

import { AuthContext } from "../../../../context/AuthProvider";
import AddShipment from "../AddShipment";
import Styles from "./Panel.module.scss";
import SignIn from "../../../Authentication/components/SingIn";
import SignOut from "../../../Authentication/components/SignOut";
import { ADMIN_HOME_PAGE, ASSIGNEE_HOME_PAGE } from "../../../../utilities/constants";
import IconEl from "../../../../components/IconEl";

/**
 * Displays current date, total number of shipments, add shipment button
 *
 */
export function Panel({ shipmentsCount = 0 }) {
  const { loggedIn, hasRole, user }: any = useContext(AuthContext);
  const { location } = useHistory();    
  
  if (location.pathname === "/" && loggedIn) {
    const redirectTo = hasRole('ADMIN') ? ADMIN_HOME_PAGE : ASSIGNEE_HOME_PAGE;
    return <Redirect to={redirectTo} />;
  }
  
  return (
    <div className={Styles.Panel}>
      <div className={Styles.metaData}>
        {loggedIn && <span><IconEl icon="user" /> {user.name} </span>} 
        <span><IconEl icon="calendar" /> { moment().format("MMM Do YY")}</span>
      </div>
      {loggedIn && <>      
          <div className={Styles.title}>Total: {shipmentsCount}</div>        
          {hasRole('ADMIN') && <AddShipment />}
          <SignOut />
        </>
      }

      {!loggedIn && <SignIn />}
    </div>
  );
}

export default Panel;
