import React from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  classes += liked ? "" : "-o";
  return (
    <i className={classes} onClick={onClick} style={{ cursor: "pointer" }} />
  );
};

export default Like;
