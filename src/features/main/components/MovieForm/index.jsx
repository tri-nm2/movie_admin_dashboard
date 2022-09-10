import { Input, InputNumber, DatePicker, Switch, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import { REQUIRED_MESSAGE } from "common/contants/messageContant";
import { getCurrentDate } from "common/utils/date";
import Style from "./style.module.css";

const { TextArea } = Input;

function MovieForm(props) {
  const dateFormat = "DD/MM/YYYY";
  const currentDate = props.selectMovie.ngayKhoiChieu
    ? props.selectMovie.ngayKhoiChieu
    : getCurrentDate();

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
      dangChieu: true,
      sapChieu: false,
      hot: true,
      danhGia: 10,
      hinhAnh: null,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      let movie = new FormData();
      movie.append("tenPhim", values.tenPhim);
      movie.append("trailer", values.trailer);
      movie.append("moTa", values.moTa);
      movie.append("ngayKhoiChieu", "10/09/2022");
      movie.append("dangChieu", values.dangChieu);
      movie.append("sapChieu", values.sapChieu);
      movie.append("hot", values.hot);
      movie.append("danhGia", values.danhGia);
      movie.append("file", values.hinhAnh, values.hinhAnh);

      props.handleSubmit(movie, "Create");
    },
  });
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
    console.log(info);
    formik.setFieldValue("hinhAnh", info.file);
  };

  //Events

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={Style.inputGroup}>
          <span className={Style.label}>Tên phim</span>
          <Input
            placeholder="Tên phim"
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
          <span className={Style.label}>Mô tả</span>
          <TextArea
            placeholder="Mô tả"
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
          <span>Ngày chiếu</span>
          <DatePicker
            allowClear={false}
            format={dateFormat}
            value={moment(formik.values.ngayKhoiChieu, dateFormat)}
            onChange={handleDatePickerChange}
          />
        </div>

        <div className={Style.switchContainer}>
          <div className={Style.switchGroup}>
            <span className={Style.switchLabel}>Đang chiếu</span>
            <Switch
              checked={formik.values.dangChieu}
              onChange={handleCurrentPlaySwitchChange}
            />
          </div>

          <div className={Style.switchGroup}>
            <span className={Style.switchLabel}>Sắp chiếu</span>
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
          <span>Đánh giá</span>
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
          <span>Hình ảnh</span>
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>Chọn hình</Button>
          </Upload>
        </div>
        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </form>
    </div>
  );
}

export default MovieForm;
