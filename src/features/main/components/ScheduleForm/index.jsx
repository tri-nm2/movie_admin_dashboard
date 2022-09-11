import { Input, InputNumber, Select, DatePicker, Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import Style from "./style.module.css";
import instace from "api/instance";
import { useEffect } from "react";
import { formatDateTime, getCurrentDate } from "common/utils/date";
import { useFormik } from "formik";
import moment from "moment";

function ScheduleForm(props) {
  const { Option } = Select;
  const { error } = Modal;

  const dateFormat = "DD/MM/YYYY hh:mm";
  const currentDate = getCurrentDate() + " 00:00:00";
  const formik = useFormik({
    initialValues: {
      maPhim: props.selectMovie.maPhim,
      maRap: "",
      ngayChieuGioChieu: currentDate,
      giaVe: 0,
    },
    onSubmit: (values) => {
      if (values.maRap === "") {
        showError("Bạn chưa chọn cụm rạp");
        return;
      }

      props.handleCreateSchedule(values);
    },
  });

  const [cinemasSystem, setCinemasSystem] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  //Hooks
  useEffect(() => {
    if (cinemasSystem.length === 0) {
      fetchCinemasSystem();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cinemasSystem]);
  //Hooks

  //Api function
  const fetchCinemasSystem = async () => {
    try {
      const response = await instace.request({
        url: "/api/QuanLyRap/LayThongTinHeThongRap",
        method: "GET",
      });

      setCinemasSystem(response.data.content);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchCinemas = async (cinemasSystemId) => {
    try {
      const response = await instace.request({
        url: "/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
        method: "GET",
        params: {
          maHeThongRap: cinemasSystemId,
        },
      });

      setCinemas(response.data.content);
    } catch (error) {}
  };
  //Api function

  //Message box
  const showError = (message) => {
    error({
      title: "Thông báo",
      content: message,
    });
  };
  //Message box

  //Events
  const handleCinemasSystemChange = (value) => {
    fetchCinemas(value);
  };

  const handleCinemasChange = (value) => {
    formik.setFieldValue("maRap", value);
  };

  const handleOk = (value) => {
    let dateTime = formatDateTime(value);
    dateTime = dateTime + ":00";
    formik.setFieldValue("ngayChieuGioChieu", dateTime);
  };

  const handlePriceChange = (value) => {
    formik.setFieldValue("giaVe", value);
  };
  //Events

  //Other function
  const renderCinemas = () => {
    let tag;
    if (cinemas.length === 0) {
      return <Option value="null">Chưa trọn hệ thống rạp</Option>;
    } else {
      tag = cinemas.map((item) => {
        return (
          <Option key={item.maCumRap} value={item.maCumRap}>
            {item.tenCumRap}
          </Option>
        );
      });
    }

    return tag;
  };
  //Other function

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className={Style.inputGroup}>
          <span>Mã phim</span>
          <Input value={props.selectMovie.maPhim} disabled></Input>
        </div>

        <div className={Style.inputGroup}>
          <span>Tên phim</span>
          <Input value={props.selectMovie.tenPhim} disabled></Input>
        </div>

        <div className={Style.inputGroup}>
          <span>Hệ thống rạp</span>
          <Select
            className={Style.select}
            style={{
              width: 120,
            }}
            onChange={handleCinemasSystemChange}
          >
            {cinemasSystem?.map((item) => {
              return (
                <Option key={item.maHeThongRap} value={item.maHeThongRap}>
                  {item.tenHeThongRap}
                </Option>
              );
            })}
          </Select>
        </div>

        <div className={Style.inputGroup}>
          <span>Cụm rạp</span>
          <Select
            className={Style.select}
            style={{
              width: 120,
            }}
            onChange={handleCinemasChange}
          >
            {renderCinemas()}
          </Select>
        </div>

        <div className={Style.inputGroup}>
          <span>Ngày giờ chiếu</span>
          <DatePicker
            className={Style.dateTime}
            allowClear={false}
            showTime
            format={dateFormat}
            value={moment(formik.values.ngayChieuGioChieu, dateFormat)}
            onOk={handleOk}
          />
        </div>

        <div className={Style.inputGroup}>
          <span>Giá vé</span>
          <InputNumber
            className={Style.price}
            min={0}
            value={formik.values.giaVe}
            onChange={handlePriceChange}
          ></InputNumber>
        </div>

        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </form>
    </div>
  );
}

export default ScheduleForm;
