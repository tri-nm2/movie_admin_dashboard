import {
  Input,
  InputNumber,
  DatePicker,
  Switch,
  Button,
  Upload,
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { REQUIRED_MESSAGE } from "common/contants/messageContant";
import { getCurrentDate } from "common/utils/date";
import Style from "./style.module.css";
import { movieGroupID } from "common/contants/myContants";
import { NO_IMAGEFILE_MESSAGE } from "common/contants/messageContant";

function MovieForm(props) {
  const { TextArea } = Input;
  const { error } = Modal;

  const dateFormat = "DD/MM/YYYY";
  const currentDate = props.selectMovie.ngayKhoiChieu
    ? props.selectMovie.ngayKhoiChieu
    : getCurrentDate();
  //Initial values for switch control, if maPhim = true meaning selectMovie is set
  const currentPlay = props.selectMovie.maPhim
    ? props.selectMovie.dangChieu
    : true;
  const willPlay = props.selectMovie.maPhim
    ? props.selectMovie.sapChieu
    : false;
  const hot = props.selectMovie.maPhim ? props.selectMovie.hot : true;
  const rating = props.selectMovie.danhGia ? props.selectMovie.danhGia : 1;

  const schema = yup.object().shape({
    tenPhim: yup.string().required(REQUIRED_MESSAGE),
    trailer: yup.string().required(REQUIRED_MESSAGE),
    moTa: yup.string().required(REQUIRED_MESSAGE),
  });

  const formik = useFormik({
    initialValues: {
      tenPhim: props.selectMovie.tenPhim,
      trailer: props.selectMovie.trailer,
      moTa: props.selectMovie.moTa,
      ngayKhoiChieu: currentDate,
      dangChieu: currentPlay,
      sapChieu: willPlay,
      hot: hot,
      danhGia: rating,
      hinhAnh: null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let movie = new FormData();
      if (props.selectMovie.maPhim) {
        movie.append("maPhim", props.selectMovie.maPhim);
      }
      movie.append("tenPhim", values.tenPhim);
      movie.append("trailer", values.trailer);
      movie.append("moTa", values.moTa);
      movie.append("maNhom", movieGroupID);
      movie.append("ngayKhoiChieu", values.ngayKhoiChieu);
      movie.append("dangChieu", values.dangChieu);
      movie.append("sapChieu", values.sapChieu);
      movie.append("hot", values.hot);
      movie.append("danhGia", values.danhGia);
      if (values.hinhAnh) {
        movie.append("file", values.hinhAnh, values.hinhAnh.name);
      } else {
        showError(NO_IMAGEFILE_MESSAGE);
        return;
      }

      let action;
      if (props.selectMovie.tenPhim) {
        action = "Update";
      } else {
        action = "Create";
      }

      props.handleSubmit(movie, action);
    },
  });

  //Message box
  const showError = (message) => {
    error({
      title: "Th??ng b??o",
      content: message,
    });
  };
  //Message box

  //Events
  const handleDatePickerChange = (date, dateString) => {
    formik.setFieldValue("ngayKhoiChieu", dateString);
  };

  const handleCurrentPlaySwitchChange = (checked) => {
    formik.setFieldValue("dangChieu", checked);
  };

  const handleWillPlaySwitchChange = (checked) => {
    formik.setFieldValue("sapChieu", checked);
  };

  const handleHotSwitchChange = (checked) => {
    formik.setFieldValue("hot", checked);
  };

  const handleRatingChange = (value) => {
    formik.setFieldValue("danhGia", value);
  };

  const handleChange = (info) => {
    formik.setFieldValue("hinhAnh", info.file);
  };

  //Events

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={Style.inputGroup}>
          <span className={Style.label}>T??n phim</span>
          <Input
            placeholder="T??n phim"
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.tenPhim}
          />
          {formik.errors.tenPhim && formik.touched.tenPhim && (
            <span className={Style.errorMessage}>{formik.errors.tenPhim}</span>
          )}
        </div>

        <div className={Style.inputGroup}>
          <span className={Style.label}>Trailer</span>
          <Input
            placeholder="Trailer"
            name="trailer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.trailer}
          />
          {formik.errors.trailer && formik.touched.trailer && (
            <span className={Style.errorMessage}>{formik.errors.trailer}</span>
          )}
        </div>

        <div className={Style.inputGroup}>
          <span className={Style.label}>M?? t???</span>
          <TextArea
            placeholder="M?? t???"
            name="moTa"
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.moTa}
          />
          {formik.errors.moTa && formik.touched.moTa && (
            <span className={Style.errorMessage}>{formik.errors.moTa}</span>
          )}
        </div>

        <div className={Style.showDate}>
          <span>Ng??y chi???u</span>
          <DatePicker
            allowClear={false}
            format={dateFormat}
            value={moment(formik.values.ngayKhoiChieu, dateFormat)}
            onChange={handleDatePickerChange}
          />
        </div>

        <div className={Style.switchContainer}>
          <div className={Style.switchGroup}>
            <span className={Style.switchLabel}>??ang chi???u</span>
            <Switch
              checked={formik.values.dangChieu}
              onChange={handleCurrentPlaySwitchChange}
            />
          </div>

          <div className={Style.switchGroup}>
            <span className={Style.switchLabel}>S???p chi???u</span>
            <Switch
              checked={formik.values.sapChieu}
              onChange={handleWillPlaySwitchChange}
            />
          </div>

          <div className={Style.switchGroup}>
            <span className={Style.switchLabel}>Hot</span>
            <Switch
              checked={formik.values.hot}
              defaultChecked
              onChange={handleHotSwitchChange}
            />
          </div>
        </div>

        <div className={Style.rating}>
          <span>????nh gi??</span>
          <InputNumber
            className={Style.ratingInput}
            name="danhGia"
            min={1}
            max={10}
            value={formik.values.danhGia}
            onChange={handleRatingChange}
          />
        </div>

        <div className={Style.filePicker}>
          <span>H??nh ???nh</span>
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Ch???n h??nh</Button>
          </Upload>
        </div>
        <Button type="primary" htmlType="submit">
          G???i
        </Button>
      </form>
    </div>
  );
}

export default MovieForm;
