import React from "react";
import "./Stats.css";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocalLibraryIcon from "@material-ui/icons/LocalLibrary";

import axios from "axios";

function Stats() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [totalMembers, setTotalMembers] = React.useState(0);
  const [totalBooks, setTotalBooks] = React.useState(0);

  React.useEffect(() => {
    axios.get(API_URL + "api/books/totalbooks").then((response) => {
      const number = response.data.total;
      if (number && typeof number === "number") setTotalBooks(number);
    });

    axios.get(API_URL + "api/users/totalmembers").then((response) => {
      const number = response.data.total;
      if (number && typeof number === "number") setTotalMembers(number);
    });
  }, []);

  return (
    <div className="stats">
      <div className="stats-block">
        <LibraryBooksIcon className="stats-icon" style={{ fontSize: 80 }} />
        <p className="stats-title">Total Books</p>
        <p className="stats-count">{totalBooks}</p>
      </div>
      <div className="stats-block">
        <LocalLibraryIcon className="stats-icon" style={{ fontSize: 80 }} />
        <p className="stats-title">Total Members</p>
        <p className="stats-count">{totalMembers}</p>
      </div>
    </div>
  );
}

export default Stats;
