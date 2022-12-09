import PropTypes from "prop-types";
import React from "react";
import {Card} from "react-bootstrap";

const Comment = ({username, context}) => {
  return (
    <div className="CommentUser">
        <div className="CommentUser__User d-flex">
            <i className="pe-7s-user "/> 
            <label>
              {username}:
            </label>
        </div>
        <p className="CommenUser__Content">
          {context}
        </p>
    </div>
  );
};

Comment.propTypes = {
    username : PropTypes.string,
    content : PropTypes.string
};

export default Comment;
