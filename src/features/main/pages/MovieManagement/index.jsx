import React, { useEffect, useRef, useState } from "react";
import Style from "features/main/pages/MovieManagement/style.module.css";
import { Button, Modal, Input } from "antd";
import MovieForm from "features/main/components/MovieForm";
import ScheduleForm from "features/main/components/ScheduleForm";
import instace from "api/instance";
import {
  CREATE_SUCCESS_MESSAGE,
  UPDATE_SUCCESS_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
} from "common/contants/messageContant";
import MovieList from "features/main/components/MovieList";
import { movieGroupID } from "common/contants/myContants";
import { formatDate } from "common/utils/date";

function MovieManagement() {
  const { info, error, confirm } = Modal;
  const { Search } = Input;

  const [open, setOpen] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [paginationConfig, setPaginationConfig] = useState({
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
  });
  const keyWord = useRef("");

  //Hooks
  useEffect(() => {
    fetchMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationConfig.currentPage]);
  //Hooks

  //Api function
  const fetchMovieList = async () => {
    if (keyWord.current) {
      try {
        const response = await instace.request({
          url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
          method: "GET",
          params: {
            maNhom: movieGroupID,
            tenPhim: keyWord.current,
            soTrang: paginationConfig.currentPage,
            soPhanTuTrenTrang: paginationConfig.pageSize,
          },
        });

        const total = response.data.content.totalCount;
        setPaginationConfig({ ...paginationConfig, totalCount: total });
        setMovieList(response.data.content.items);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await instace.request({
          url: "/api/QuanLyPhim/LayDanhSachPhimPhanTrang",
          method: "GET",
          params: {
            maNhom: movieGroupID,
            soTrang: paginationConfig.currentPage,
            soPhanTuTrenTrang: paginationConfig.pageSize,
          },
        });

        const total = response.data.content.totalCount;
        setPaginationConfig({ ...paginationConfig, totalCount: total });
        setMovieList(response.data.content.items);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await instace.request({
        url: "/api/QuanLyPhim/XoaPhim",
        method: "DELETE",
        params: {
          MaPhim: movieId,
        },
      });

      showInfo(DELETE_SUCCESS_MESSAGE);

      fetchMovieList();
    } catch (error) {
      showError(error.response.data.content);
    }
  };
  //Api function

  //Message box
  const showInfo = (message) => {
    info({
      title: "Thông báo",
      content: message,
    });
  };

  const showError = (message) => {
    error({
      title: "Thông báo",
      content: message,
    });
  };

  const showConfirm = (movieId) => {
    confirm({
      title: "Xác nhận",
      content: "Bạn có muốn xóa phim",
      onOk() {
        deleteMovie(movieId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  //Message box

  //Events
  const handleCreateButtonClick = () => {
    setSelectedMovie({});
    setOpen(true);
  };

  const handleCreateSchedule = async (schedule) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await instace.request({
        url: "api/QuanLyDatVe/TaoLichChieu",
        method: "POST",
        data: schedule,
      });

      showInfo(CREATE_SUCCESS_MESSAGE);
    } catch (error) {
      showError(error.response.data.content);
    } finally {
      setOpenSchedule(false);
    }
  };

  const handleSubmit = async (movie, action) => {
    switch (action) {
      case "Create":
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await instace.request({
            url: "/api/QuanLyPhim/ThemPhimUploadHinh",
            method: "POST",
            data: movie,
          });

          showInfo(CREATE_SUCCESS_MESSAGE);

          fetchMovieList();
        } catch (error) {
          showError(error.response.data.content);
        } finally {
          setOpen(false);
        }
        break;
      case "Update":
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await instace.request({
            url: "/api/QuanLyPhim/CapNhatPhimUpload",
            method: "POST",
            data: movie,
          });

          showInfo(UPDATE_SUCCESS_MESSAGE);

          fetchMovieList();
          console.log(movie);
        } catch (error) {
          // console.log(error);
          showError(error.response.data.content);
        } finally {
          setOpen(false);
        }
        break;
      default:
        break;
    }
  };

  const handleChangePage = (currentPage) => {
    setPaginationConfig({ ...paginationConfig, currentPage: currentPage });
  };

  const onSearch = (value) => {
    keyWord.current = value;

    if (paginationConfig.currentPage > 1) {
      setPaginationConfig({ ...paginationConfig, currentPage: 1 });
    } else {
      fetchMovieList();
    }
  };

  const handleUpdateButtonClick = (data) => {
    const date = formatDate(data.ngayKhoiChieu);
    const movie = { ...data, ngayKhoiChieu: date };
    setSelectedMovie(movie);
    setOpen(true);
  };

  const handleDeleteButtonClick = (movieId) => {
    showConfirm(movieId);
  };

  const handleCreateScheduleButtonClick = (movie) => {
    setSelectedMovie(movie);
    setOpenSchedule(true);
  };
  //Events

  return (
    <div className={Style.main}>
      <h1 className={Style.title}>Quản lý phim</h1>
      <Button type="primary" onClick={() => handleCreateButtonClick()}>
        Thêm phim
      </Button>

      <Modal
        title="Thông tin phim"
        centered
        open={open}
        destroyOnClose={true}
        onCancel={() => {
          setOpen(false);
        }}
        footer={[]}
      >
        <MovieForm selectMovie={selectedMovie} handleSubmit={handleSubmit} />
      </Modal>

      <Modal
        title="Tạo lịch chiếu"
        centered
        open={openSchedule}
        destroyOnClose={true}
        onCancel={() => {
          setOpenSchedule(false);
        }}
        footer={[]}
      >
        <ScheduleForm
          selectMovie={selectedMovie}
          handleCreateSchedule={handleCreateSchedule}
        />
      </Modal>

      <div className={Style.movieListContainer}>
        <Search
          className={Style.searchBox}
          placeholder="input search text"
          onSearch={onSearch}
          style={{
            width: 300,
          }}
        />

        <MovieList
          movieList={movieList}
          paginationConfig={paginationConfig}
          handleChangePage={handleChangePage}
          handleUpdateButtonClick={handleUpdateButtonClick}
          handleDeleteButtonClick={handleDeleteButtonClick}
          handleCreateScheduleButtonClick={handleCreateScheduleButtonClick}
        />
      </div>
    </div>
  );
}

export default MovieManagement;
