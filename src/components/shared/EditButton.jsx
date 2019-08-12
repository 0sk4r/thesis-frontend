import React, { useContext } from "react";
import { Link } from "react-router-dom";
import IconButton from "components/shared/IconButton";
import { AuthContext } from "_helpers/auth_context";

function EditButton({ post }) {
  const context = useContext(AuthContext);
  return (
    <React.Fragment>
      {context.isAuth && context.user.id === post.user.id ? (
        <Link to={`/posts/${post.id}/edit`}>
          <IconButton type="edit" text="Edit" />
        </Link>
      ) : null}
    </React.Fragment>
  );
}

export default EditButton;
