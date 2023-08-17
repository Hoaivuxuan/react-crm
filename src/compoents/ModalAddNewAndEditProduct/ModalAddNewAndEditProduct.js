// import library
import { useState, useRef, useEffect, createContext, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { useFormik } from "primereact/formik";
//
import { useToast } from "../../App";
import "./ModalAddNewAndEditProduct.scss";
// import component
const ModalAddNewAndEditProduct = (props) => {
  //
  const { showSuccess, showError } = useToast();
  // props
  const { showModal, handleClose, handleUpdate, rowData } = props;
  const [isEditMode, setIsEditMode] = useState(false);
  // useEffect
  useEffect(() => {
    if (showModal && rowData) {
      setIsEditMode(true); // Đánh dấu đang ở chế độ chỉnh sửa
      formik.setValues(rowData);
    } else {
      setIsEditMode(false); // Đánh dấu đang ở chế độ thêm mới
      formik.resetForm();
    }
  }, [showModal, rowData]);
  // formik
  const formik = useFormik({
    initialValues: {
      id: isEditMode ? rowData?.id : "", // Truyền giá trị id vào nếu đang ở chế độ chỉnh sửa
      name: isEditMode ? rowData?.name : "",
      productLine: isEditMode ? rowData?.productLine : "",
    },
    //
    validate: (data) => {
      let errors = {};

      if (!data.id) {
        errors.id = "Mã không được trống";
      } else if (/[!@#$%^&*()+\-=[\]{};':"\\|,.<>/? ]+/.test(data.id)) {
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
    // if validate is accepted => call onSubmit
    onSubmit: (data) => {
      // Edit modal
      if (isEditMode) {
        let productArray = JSON.parse(localStorage.getItem("Product")) || [];
        const existingProductIndex = productArray.findIndex(
          (product) => product.id === rowData.id
        );
        if (existingProductIndex !== -1) {
          // Nếu tìm thấy sản phẩm, cập nhật thông tin sản phẩm
          const isDuplicateId = productArray.some(
            (product, index) =>
              index !== existingProductIndex && product.id === data.id
          );

          if (!isDuplicateId) {
            productArray[existingProductIndex] = data;
            localStorage.setItem("Product", JSON.stringify(productArray));
            handleClose(false);
            showSuccess();
          } else {
            showError();
          }
        }
        handleUpdate();
      }
      // Add new modal
      else {
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
            //
            handleClose(false);
            showSuccess();
            //
          } else {
            showError();
          }
        }
        handleUpdate();
      }
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
  // component
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
  return (
    <div>
      <Dialog
        header={
          <div className="text-center text-2xl py-1">
            {rowData ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm"}
          </div>
        }
        visible={showModal}
        onHide={handleClose}
        style={{ width: "50vw" }}
        breakpoints={{ "960px": "75vw", "641px": "100vw" }}
        footer={footerButton}
      >
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
                      value={formik.values.id}
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
                      value={formik.values.name}
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
                      value={formik.values.productLine}
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
                    <InputText
                      id="warrantyPeriod"
                      name="warrantyPeriod"
                      value={formik.values.warrantyPeriod}
                      onChange={formik.handleChange}
                      type="number"
                    />
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
                    <InputText
                      id="solutionType"
                      name="solutionType"
                      value={formik.values.solutionType}
                      onChange={formik.handleChange}
                    />
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
                    <InputText
                      id="warrantyType"
                      name="warrantyType"
                      value={formik.values.warrantyType}
                      onChange={formik.handleChange}
                    />
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
                      id="describe"
                      name="describe"
                      rows={5}
                      cols={30}
                      value={formik.values.describe}
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
