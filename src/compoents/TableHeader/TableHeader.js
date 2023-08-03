// import lib
import { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { Column } from "primereact/column";
// import file
import ModalAddNewAndEditProduct from "../ModalAddNewAndEditProduct/ModalAddNewAndEditProduct";
import "./TableHeader.scss";
//
const TableHeader = ({ filters, updateFilters, handleUpdate, columnData }) => {
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
  const toast = useRef(null);
  const items = [
    {
      label: "Table",
      icon: <iconify-icon icon="bx:table"></iconify-icon>,
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Updated",
          detail: "Table style has been changed!",
        });
      },
    },
    {
      label: "Kanban",
      icon: <iconify-icon icon="bx:table"></iconify-icon>,
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Updated",
          detail: "Table style has been changed!",
        });
      },
    },
    {
      label: "Split View",
      icon: <iconify-icon icon="bx:table"></iconify-icon>,
      command: () => {
        toast.current.show({
          severity: "success",
          summary: "Updated",
          detail: "Table style has been changed!",
        });
      },
    },
  ];
  // column
  const linkColumn = (rowData) => {
    // Define the link
    const linkURL = `/`;

    return (
      <a href={linkURL} style={{ textDecoration: "none", color: "#009688" }}>
        {rowData.id}
      </a>
    );
  };
  //
  const columns = [
    { field: "id", header: "Mã" },
    { field: "name", header: "Tên" },
    { field: "describe", header: "Mô tả" },
    { field: "productLine", header: "Dòng sản phẩm" },
  ];
  useEffect(() => {
    columnData(renderColumns(columns));
  }, []);
  const [selectedColumns, setSelectedColumns] = useState(columns);
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
    columnData(renderColumns(selectedColumns));
  };
  const renderColumns = (selectedColumns) => {
    console.log(selectedColumns);
    let cols = selectedColumns.map((col) => {
      if (col.field === "id") {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={linkColumn} // Thêm body vào cột id để render link
          />
        );
      } else if (col.field === "name") {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={linkColumn} // Thêm body vào cột name để render link
          />
        );
      } else {
        return <Column key={col.field} field={col.field} header={col.header} />;
      }
    });
    return cols;
  };
  // main
  return (
    <div className="flex">
      <Toast ref={toast}></Toast>
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
                  //
                  value={selectedColumns}
                  options={columns}
                  onChange={onColumnToggle}
                  optionLabel="header"
                  //
                  placeholder="Tất cả sản phẩm"
                  maxSelectedLabels={4}
                  //
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
            tooltip="Tạo mới"
            tooltipOptions={{ position: "top" }}
          >
            <span className="p-button-label p-c">
              <span className="link-button">Tạo mới</span>
            </span>
          </Button>
          <Button
            className="p-button p-component p-button-text  border-1 border-solid p-2 border-400 border-noround border-round-left-sm ml-1"
            tooltip="Export"
            tooltipOptions={{ position: "top" }}
          >
            <span className="p-button-label p-c">
              <span className="link-button">Export</span>
            </span>
          </Button>
          <Button
            className="p-button p-component p-button-text  border-1 border-solid p-2 border-400 border-noround border-round-left-sm ml-1"
            tooltip="Giao diện in"
            tooltipOptions={{ position: "top" }}
          >
            <span className="p-button-label p-c">
              <span className="link-button">Giao diện in</span>
            </span>
          </Button>
        </div>
        <div className="search-wrapper flex justify-content-end align-items-center mb-2">
          <span className="p-input-icon-left mr-2 w-25rem">
            <i className="pi pi-search" />
            <InputText
              className="w-25rem"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Tìm kiếm..."
            />
          </span>
          {/*  */}
          <SplitButton
            model={items}
            // className="p-button-outlined p-button-secondary mr-2 mb-2"
            className="p-button p-component p-button-outlined text-color-secondary ml-1 p-2 p-button-icon-only"
            dropdownIcon={
              <span className="p-button-icon p-c bx bx-table text-xl">
                <iconify-icon icon="bx:table"></iconify-icon>
              </span>
            }
            tooltip="Giao diện xem"
            tooltipOptions={{ position: "top" }}
          ></SplitButton>
          {/*  */}
          <Button
            className="p-button p-component p-button-outlined text-color-secondary ml-1 p-2 p-button-icon-only"
            tooltip="Tải lại trang"
            tooltipOptions={{ position: "top" }}
          >
            <span className="p-button-icon p-c bx bx-refresh text-xl">
              <iconify-icon icon="bx:refresh"></iconify-icon>
            </span>
          </Button>
          {/*  */}
          <Button
            className="p-button p-component p-button-outlined text-color-secondary ml-1 p-2 p-button-icon-only"
            tooltip="Chỉnh sửa danh sách xem"
            tooltipOptions={{ position: "top" }}
          >
            <span className="p-button-icon p-c bx bx-pencil text-xl">
              <iconify-icon icon="bx:pencil"></iconify-icon>
            </span>
          </Button>
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
