import React, { useRef, useState } from "react";
import Style from "features/main/pages/MovieManagement/style.module.css";
import { Button, Modal } from "antd";
import MovieForm from "features/main/components/MovieForm";

function MovieManagement() {
  const [open, setOpen] = useState(false);
  const movieId = useRef("");

  const handleCreateButtonClick = () => {
    movieId.current = "";
    setOpen(true);
  };

  const handleUpdateButtonClick = (id) => {
    movieId.current = id;
    setOpen(true);
  };

  return (
    <div className={Style.main}>
      <h1 className={Style.title}>Quản lý phim</h1>
      <Button type="primary" onClick={() => handleCreateButtonClick()}>
        Create
      </Button>

      <Button
        type="primary"
        onClick={() => {
          const id = Math.random();
          handleUpdateButtonClick(id.toString());
        }}
      >
        Update
      </Button>

      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <MovieForm movieId={movieId.current} />
      </Modal>
    </div>
  );
}

export default MovieManagement;
