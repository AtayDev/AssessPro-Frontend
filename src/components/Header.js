import React from "react";

import Button from "./Button";
import Icon from "./Icon";
import { iconPaths } from "../utils/iconPaths";
const Header = () => {
    return (<nav className="dashboard-nav">
        <div className="nav-content">
          <h1 className="dashboard-title" onClick={() => window.location.href = "/"}>Shift Manager +</h1>
        </div>
      </nav>)
}

export default Header;