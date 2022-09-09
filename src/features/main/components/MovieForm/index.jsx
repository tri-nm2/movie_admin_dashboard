import React from "react";

function MovieForm(props) {
  return (
    <div>
      Form + {props.movieId ? "Update" : "Create"} + {props.movieId}
    </div>
  );
}

export default MovieForm;
