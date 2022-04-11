import React from "react";

const Navbar = () => {
  return (
    <nav>
        <h1>Just Curious...</h1>
      <input placeholder="search by question, topic or person" type="text" />
      <button>Submit</button>
      <a>Topics</a>
      {/* need to add logic to change the verbiage when a user is not logged in */}
      <a>Logout</a>
    </nav>
  );
};

export default Navbar;
