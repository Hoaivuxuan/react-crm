// import lib
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { MultiSelect } from "primereact/multiselect";
// import file
import ModalAddNewAndEditProduct from "../ModalAddNewAndEditProduct/ModalAddNewAndEditProduct";
import "./TableHeader.scss";
//
const TableHeader = ({ filters, updateFilters, handleUpdate }) => {
  const [isShowModalAdd_EditProduct, setIsShowModalAdd_EditProduct] =
    useState();
  //
  const handleClose = () => {
    setIsShowModalAdd_EditProduct(false);
  };
  //
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  //
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    updateFilters(_filters);
    setGlobalFilterValue(value);
  };
  //
  const products = [
    { name: "Mã", code: "NY" },
    { name: "Tên", code: "RM" },
    { name: "Mô tả", code: "LDN" },
    { name: "Dòng sản phẩm", code: "IST" },
  ];
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
                <MultiSelect
                  style={{ width: "20em" }}
                  options={products}
                  optionLabel="name"
                  placeholder="Tất cả sản phẩm"
                  maxSelectedLabels={3}
                />
                {/*  */}
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
          <Button className="p-button p-component p-button-text  border-1 border-solid p-2 border-400 border-noround border-round-left-sm ml-1">
            <span className="p-button-label p-c">
              <span className="link-button">Export</span>
            </span>
          </Button>
          <Button className="p-button p-component p-button-text  border-1 border-solid p-2 border-400 border-noround border-round-left-sm ml-1">
            <span className="p-button-label p-c">
              <span className="link-button">Giao diện in</span>
            </span>
          </Button>
        </div>
        <div className="search-wrapper flex justify-content-end align-items-center">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Tìm kiếm..."
            />
          </span>
          {/*  */}
          <div
            className="p-splitbutton p-component p-button-outlined p-button-info border-noround action-wrapper-split ml-2"
            id="pr_id_2"
          >
            <button
              type="button"
              className="p-button p-component p-button-outlined text-color-secondary border-round-sm p-2 p-button-icon-only"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="p-button-icon p-c bx bx-table text-xl">
                <iconify-icon icon="bx:table"></iconify-icon>
              </span>
            </button>
          </div>
          {/*  */}
          <button className="p-button p-component p-button-outlined text-color-secondary ml-1 p-2 p-button-icon-only">
            <span className="p-button-icon p-c bx bx-refresh text-xl">
              <iconify-icon icon="bx:refresh"></iconify-icon>
            </span>
          </button>
          {/*  */}
          <button className="p-button p-component p-button-outlined text-color-secondary ml-1 p-2 p-button-icon-only">
            <span className="p-button-icon p-c bx bx-pencil text-xl">
              <iconify-icon icon="bx:pencil"></iconify-icon>
            </span>
          </button>
        </div>
      </div>
      <ModalAddNewAndEditProduct
        showModal={isShowModalAdd_EditProduct}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      ></ModalAddNewAndEditProduct>
    </div>
  );
};

export default TableHeader;
