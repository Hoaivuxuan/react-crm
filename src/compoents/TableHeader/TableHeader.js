import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import ModalAddNewAndEditProduct from "../ModalAddNewAndEditProduct/ModalAddNewAndEditProduct";
import "./TableHeader.scss";
//
const TableHeader = ({ handleUpdate }) => {
  const [isShowModalAdd_EditProduct, setIsShowModalAdd_EditProduct] = useState();
  //
  const handleClose = () => {
    setIsShowModalAdd_EditProduct(false);
  };
  //
  return (
    <div className="flex">
      <div className="crm-toolbar-left-wrapper">
        <div className="filter-wrapper flex mb-4 justify-content-center align-items-center">
          <div
            className="border-round-sm flex justify-content-center align-items-center p-1 h-full"
            style={{ backgroundColor: "rgb(144, 10, 191)", opacity: "0.64" }}
          >
            <i className="bx bx-data text-4xl text-white">
              <iconify-icon icon="bx:data"></iconify-icon>
            </i>
          </div>
          <div className="ml-2">
            <span className="module-name">Sản phẩm</span>
            <div className="flex" style={{ textAlign: "left" }}>
              <div
                className="p-multiselect p-component p-inputwrapper p-inputwrapper-filled"
                style={{ width: "20em" }}
              >
                <div className="p-hidden-accessible">
                  <input
                    readOnly=""
                    type="text"
                    role="listbox"
                    aria-expanded="false"
                    tabIndex="0"
                  />
                </div>
                <div className="p-multiselect-label-container">
                  <div className="p-multiselect-label p-multiselect-items-label">
                    Tất cả sản phẩm
                  </div>
                </div>
                <div className="p-multiselect-trigger">
                  <span className="p-multiselect-trigger-icon p-c pi pi-chevron-down"></span>
                </div>
              </div>
              <button className="p-button p-component p-button-outlined p-button-sm p-button-info ml-2 p-button-icon-only">
                <span className="p-button-icon p-c bx bxs-pin">
                  <iconify-icon icon="bxs:pin"></iconify-icon>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="crm-toolbar-right-wrapper w-full text-right">
        <div className="action-wrapper mb-2">
          <Button
            className="p-button p-component p-button-text  border-1 border-solid p-2 border-400 border-noround border-round-left-sm"
            onClick={() => setIsShowModalAdd_EditProduct(true)}
          >
            <span className="p-button-label p-c">
              <span className="link-button">Tạo mới</span>
            </span>
          </Button>
          <Button className="p-button p-component p-button-text  border-1 border-solid p-2 border-400 border-noround border-round-left-sm">
            <span className="p-button-label p-c">
              <span className="link-button">Export</span>
            </span>
          </Button>
          <Button className="p-button p-component p-button-text  border-1 border-solid p-2 border-400 border-noround border-round-left-sm">
            <span className="p-button-label p-c">
              <span className="link-button">Giao diện in</span>
            </span>
          </Button>
        </div>
        <div className="search-wrapper flex justify-content-end align-items-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText placeholder="Tìm kiếm..." />
          </span>
        </div>
      </div>
      <ModalAddNewAndEditProduct
        show={isShowModalAdd_EditProduct}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      ></ModalAddNewAndEditProduct>
    </div>
  );
};

export default TableHeader;
