import React, { useState, useRef } from "react";
import "./custom.css";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";

export default function AddProductForm({ handleUpdateTable, hide }) {
  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: "error",
      summary: "ERROR",
      detail: "ma da ton tai vui long nhap ma khac",
    });
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      family: "",
      warranty: "",
      solution: "",
      unit: "",
      detail: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.code) {
        errors.code = "Mã không được trống";
      }
      if (/[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/.test(data.code)) {
        errors.code = 'Mã chỉ cho phép chữ, số, dấu "-"và dấu "_"';
      }

      if (!data.name) {
        errors.name = "Tên không được trống";
      }
      if (!data.family) {
        errors.family = "Dòng sản phẩm không được trống";
      }
      return errors;
    },
    onSubmit: (data) => {
      let productArray = JSON.parse(localStorage.getItem("products"));
      if (productArray == null) {
        let firstProduct = [data];
        localStorage.setItem("products", JSON.stringify(firstProduct));
      } else {
        let checkCode = true;
        productArray.forEach((e) => {
          if (e.code === data.code) {
            checkCode = false;
          }
        });
        if (checkCode) {
          let newProductArray = [data, ...productArray];
          localStorage.setItem("products", JSON.stringify(newProductArray));
          hide();
          show();
        } else {
          show();
        }
      }

      handleUpdateTable();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error" style={{ fontSize: "12px" }}>
          {formik.errors[name]}
        </small>
      )
    );
  };

  return (
    <div>
      <Toast ref={toast} />
      <form
        id="my-form"
        className="p-fluid fluid formgrid grid"
        onSubmit={formik.handleSubmit}
      >
        <div className="col-6 px-3 py-1">
          <div className="flex py-1 h-full mx-2">
            <div className="field-preview-label pt-2">
              <div className="field-preview-label-text">
                <div className="field-require text-sm">Mã</div>
              </div>
            </div>
            <div className="pt-2 flex-1 overflow-hidden field-content">
              <div className="field">
                <span className="">
                  <InputText
                    id="code"
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("name"),
                    })}
                  />
                </span>
                {getFormErrorMessage("code")}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 px-3 py-1">
          <div className="flex py-1 h-full mx-2">
            <div className="field-preview-label pt-2">
              <div className="field-preview-label-text">
                <div className="field-require text-sm">Tên</div>
              </div>
            </div>
            <div className="pt-2 flex-1 overflow-hidden field-content">
              <div className="field">
                <span className="">
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("name"),
                    })}
                  />
                </span>
                {getFormErrorMessage("name")}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 px-3 py-1">
          <div className="flex py-1 h-full mx-2">
            <div className="field-preview-label pt-2">
              <div className="field-preview-label-text">
                <div className="field-require text-sm">Dòng sản phẩm</div>
              </div>
            </div>
            <div className="pt-2 flex-1 overflow-hidden field-content">
              <div className="field">
                <span className="">
                  <InputText
                    id="family"
                    name="family"
                    value={formik.values.family}
                    onChange={formik.handleChange}
                    className={classNames({
                      "p-invalid": isFormFieldValid("name"),
                    })}
                  />
                </span>
                {getFormErrorMessage("family")}
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 px-3 py-1">
          <div className="flex py-1 h-full mx-2">
            <div className="field-preview-label pt-2">
              <div className="field-preview-label-text">
                <div className="text-sm">Thời hạn bảo hành</div>
              </div>
            </div>
            <div className="pt-2 flex-1 overflow-hidden field-content">
              <div className="field">
                <span className="">
                  <InputText
                    id="warranty"
                    name="warranty"
                    value={formik.values.warranty}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 px-3 py-1">
          <div className="flex py-1 h-full mx-2">
            <div className="field-preview-label pt-2">
              <div className="field-preview-label-text">
                <div className="text-sm">Loại giải pháp</div>
              </div>
            </div>
            <div className="pt-2 flex-1 overflow-hidden field-content">
              <div className="field">
                <span className="">
                  <InputText
                    id="solution"
                    name="solution"
                    value={formik.values.solution}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 px-3 py-1">
          <div className="flex py-1 h-full mx-2">
            <div className="field-preview-label pt-2">
              <div className="field-preview-label-text">
                <div className="text-sm">Loại bảo hành</div>
              </div>
            </div>
            <div className="pt-2 flex-1 overflow-hidden field-content">
              <div className="field">
                <span className="">
                  <InputText
                    id="unit"
                    name="unit"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 px-3 py-1">
          <div className="flex py-1 h-full mx-2">
            <div className="field-preview-label pt-2">
              <div className="field-preview-label-text">
                <div className="text-sm">Mô tả</div>
              </div>
            </div>
            <div className="pt-2 flex-1 overflow-hidden field-content">
              <div className="field">
                <span className="">
                  <InputTextarea
                    id="detail"
                    name="detail"
                    value={formik.values.detail}
                    onChange={formik.handleChange}
                    rows={5}
                    cols={30}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
