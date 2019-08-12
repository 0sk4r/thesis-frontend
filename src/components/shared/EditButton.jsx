import React, { useContext } from "react";
import { Link } from "react-router-dom";
import IconButton from "components/shared/IconButton";
import { AuthContext } from "_helpers/auth_context";

function EditButton({ post_id }) {
  const context = useContext(AuthContext);

  return (
    <React.Fragment>
      {context.isAuth ? (
        <Link to={`/posts/${post_id}/edit`}>
          <IconButton type="edit" text="Edit" />
        </Link>
      ) : null}
    </React.Fragment>
  );
}

export default EditButton;
