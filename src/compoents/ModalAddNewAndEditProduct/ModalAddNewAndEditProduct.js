// import library
import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import "./ModalAddNewAndEditProduct.scss";
// import component
import { createUser } from "../../services/UserService";
//
const ModalAddNewAndEditProduct = (props) => {
  // props
  const { show, handleClose, handleUpdate } = props;
  //
  
  //
  const footerButton = () => {
    return (
      <div>
        <>
          <button
            aria-label="Hủy"
            className="p-button p-component p-button-text"
            onClick={handleClose}
          >
            <span className="p-button-label p-c" style={{ color: "black" }}>
              Hủy
            </span>
          </button>
          <button
            aria-label="Lưu"
            className="p-button p-component primary"
            type="submit"
            form="my-form"
          >
            <span className="p-button-icon p-c p-button-icon-left bx bxs-save">
              <iconify-icon icon="bxs:save"></iconify-icon>
            </span>
            <span className="p-button-label p-c">Lưu</span>
          </button>
        </>
      </div>
    );
  };
  //
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: "success",
      detail: "Lưu thành công",
    });
  };
  const showError = () => {
    toast.current.show({
      severity: "error",
      detail: "Id đã tồn tại, xin hãy chọn mã khác",
    });
  };
  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      productLine: "",
    },
    //
    validateOnChange:true,
    validate: (data) => {
      let errors = {};

      if (!data.id) {
        errors.id = "Mã không được trống";
      } else if (/[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/.test(data.id)) {
        errors.id = 'Mã chỉ cho phép chữ, số, dấu "-"và dấu "_"';
      }
      if (!data.name) {
        errors.name = "Tên không được trống";
      }
      if (!data.productLine) {
        errors.productLine = "Dòng sản phẩm không được trống";
      }

      return errors;
    },
    //
    onSubmit: (data) => {
      let productArray = JSON.parse(localStorage.getItem("Product"));
      if (productArray == null) {
        let firstProduct = [data];
        localStorage.setItem("Product", JSON.stringify(firstProduct));
      } else {
        let checkCode = true;
        productArray.forEach((e) => {
          if (e.id === data.id) {
            checkCode = false;
          }
        });
        if (checkCode) {
          let newProductArray = [data, ...productArray];
          localStorage.setItem("Product", JSON.stringify(newProductArray));
          handleClose(false);
          showSuccess();
        } else {
          showError();
        }
      }
      handleUpdate();
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
      <Dialog
        header={
          <div className="text-center text-2xl py-1">Thêm mới sản phẩm</div>
        }
        visible={show}
        onHide={handleClose}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        footer={footerButton}
      >
        <Toast ref={toast} />
        <form
          id="my-form"
          className="p-fluid fluid formgrid grid"
          onSubmit={formik.handleSubmit}
        >
          {/* product-productCode */}
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
                      id="id"
                      name="id"
                      // value={formik.values.id}
                      onChange={formik.handleChange}
                      
                    />
                  </span>
                  {getFormErrorMessage("id")}
                </div>
              </div>
            </div>
          </div>
          {/* product-productName */}
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
                      // value={formik.values.name}
                      onChange={formik.handleChange}
                      
                    />
                  </span>
                  {getFormErrorMessage("name")}
                </div>
              </div>
            </div>
          </div>
          {/* product-line */}
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
                      id="productLine"
                      name="productLine"
                      // value={formik.values.family}
                      onChange={formik.handleChange}
                      
                    />
                  </span>
                  {getFormErrorMessage("productLine")}
                </div>
              </div>
            </div>
          </div>
          {/* Warranty-period */}
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
                    <InputText id="warranty" onChange={formik.handleChange} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Solution Type */}
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
                    <InputText id="solution" onChange={formik.handleChange} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Warranty type */}
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
                    <InputText id="unit" onChange={formik.handleChange} />
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Describe */}
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
                      rows={5}
                      cols={30}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

export default ModalAddNewAndEditProduct;
