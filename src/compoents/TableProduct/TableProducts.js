// import library
import React from "react";
import { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { SplitButton } from "primereact/splitbutton";

// import component
import "./TableProduct.scss";
import TableHeader from "../TableHeader/TableHeader";
import ModalAddNewAndEditProduct from "../ModalAddNewAndEditProduct/ModalAddNewAndEditProduct";
//
const TableProducts = (props) => {
  // define useState
  const [isShowModalAdd_EditProduct, setIsShowModalAdd_EditProduct] =
    useState();
  //
  const handleClose = () => {
    setIsShowModalAdd_EditProduct(false);
  };
  // define useState
  const [listProducts, setListProducts] = useState([]);
  const [updateTable, setUpdateTable] = useState(0);
  const [rowClick, setRowClick] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [dataProductEdit, setDataProductEdit] = useState({});
  const [isLocked, setIsLocked] = useState(false);
  // filters
  const [tableFilters, setTableFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    id: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    productLine: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  });

  const updateTableFilters = (newFilters) => {
    setTableFilters(newFilters);
  };

  const [loading, setLoading] = useState(true);
  // input product data;
  useEffect(() => {
    const storedData = localStorage.getItem("Product");
    if (storedData) {
      setListProducts(JSON.parse(storedData));
      setLoading(false);
    } else {
      let data = [
        {
          id: "Test",
          name: "Chakra Test",
          describe: "Product Test",
          warrantyPeriod: 2334324,
          solutionType: "Test",
          productLine: "Test",
          warrantyType: "Test",
        },
      ];

      localStorage.setItem("Product", JSON.stringify(data));
    }
  }, [updateTable]);
  // Function Edit Product Information
  const handleEditProduct = (rowData) => {
    console.log("check rowData", rowData);
    setIsShowModalAdd_EditProduct(true);
    setDataProductEdit(rowData);
  };
  // handle update product table while new product is created
  const handleUpdate = () => {
    setUpdateTable((current) => current + 1);
  };
  // Toastify
  const toast = useRef(null);
  // Confirm lock product
  const acceptLock = (rowData) => {
    rowData.isLocked = !rowData.isLocked;
    console.log("check rowData: ", rowData);
    let productArray = JSON.parse(localStorage.getItem("Product"));
    for (let e of productArray) {
      if (e.id === rowData.id) {
        e.isLocked = rowData.isLocked;
        break;
      }
    }
    localStorage.setItem("Product", JSON.stringify(productArray));
    handleUpdate();
    toast.current.show({
      severity: "success",
      summary: "Lưu thành công",
      describe: "Lưu thành công",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      describe: "You have rejected",
    });
  };
  const confirm = (rowData) => {
    console.log("check error");
    confirmDialog({
      message: rowData.isLocked
        ? 'Bạn có chắc muốn mở "' + rowData.id + '" ?'
        : 'Bạn có chắc muốn khóa "' +
          rowData.id +
          '"? Giá của sản phẩm không thể thao tác sau khi khóa!',
      header: "Xác nhận",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        acceptLock(rowData);
      },
      reject,
    });
  };
  // column include : lock icon
  const lockIcon = (rowData) => {
    return (
      <div>
        <div className="d-flex justify-content-center">
          <Button
            className="p-button p-component p-button-rounded p-button-text ml-1 p-button-icon-only"
            onClick={() => confirm(rowData)} // Thay đổi trạng thái isLocked khi nhấn nút
            tooltip="Đóng"
            tooltipOptions={{ position: "top" }}
          >
            {rowData.isLocked ? (
              <span className="p-button-icon p-c bx bx-lock-alt text-danger">
                {/* Hiển thị icon khóa khi isLocked = true */}
                <iconify-icon icon="bx:lock-alt"></iconify-icon>
              </span>
            ) : (
              <span className="p-button-icon p-c bx bx-lock-open-alt text-green">
                {/* Hiển thị icon khóa mở khi isLocked = false */}
                <iconify-icon icon="bx:lock-open-alt"></iconify-icon>
              </span>
            )}
          </Button>
        </div>
      </div>
    );
  };
  // button click to Edit
  const buttonEdit = (rowData) => {
    const handleEditProductWithData = () => {
      handleEditProduct(rowData);
    };

    const items = [
      {
        label: "Sửa",
        icon: (
          <span class="p-menuitem-icon bx bx-trash text-red">
            <iconify-icon icon="bx:pencil"></iconify-icon>
          </span>
        ),
        command: handleEditProductWithData,
      },
      {
        label: "Xóa",
        icon: (
          <span class="p-menuitem-icon bx bx-trash text-danger">
            <iconify-icon icon="bx:bx-trash"></iconify-icon>
          </span>
        ),
      },
    ];
    return (
      <div className="d-flex justify-content-center">
        <SplitButton
          model={items}
          dropdownIcon={
            <iconify-icon
              icon="bxs:down-arrow"
              style={{ color: "gray" }}
            ></iconify-icon>
          }
          tooltip="Hành động"
          tooltipOptions={{ position: "top" }}
        ></SplitButton>
      </div>
    );
  };
  //
  const [columnDataProduct, setColumnDataProduct] = useState([]);
  //
  return (
    <div
      className="fixed-table-container"
      style={{ height: "calc(100vh - 17px)" }}
    >
      {/* product data table */}
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        size="small"
        value={listProducts}
        showGridlines
        paginator
        rows={20}
        rowsPerPageOptions={[20, 25, 50, 100]}
        paginatorTemplate="RowsPerPageDropdown CurrentPageReport  FirstPageLink PrevPageLink  NextPageLink LastPageLink"
        dataKey="id"
        emptyMessage={
          <p className="d-flex justify-content-center">Không có dữ liệu</p>
        }
        // header
        header={
          <TableHeader
            handleUpdate={handleUpdate}
            filters={tableFilters}
            updateFilters={updateTableFilters}
            columnData={setColumnDataProduct}
          />
        }
        scrollable
        scrollHeight="flex"
        selectionMode={rowClick ? null : "checkbox"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        // filter
        filters={tableFilters}
        filterDisplay="menu"
        loading={loading}
        responsiveLayout="scroll"
        globalFilterFields={["id", "name", "productLine"]}
        currentPageReportTemplate="{first} - {last} of {totalRecords} "
      >
        <Column
          body={(_, { rowIndex }) => rowIndex + 1}
          bodyClassName={"p-0 text-center"}
        />
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        {/* column toggle */}
        {columnDataProduct}
        {/*  */}
        <Column className="p-0" body={lockIcon} />
        <Column body={buttonEdit} />
      </DataTable>
      {/* modal edit and add new product */}
      <ModalAddNewAndEditProduct
        showModal={isShowModalAdd_EditProduct}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        rowData={dataProductEdit}
      ></ModalAddNewAndEditProduct>
    </div>
  );
};

export default TableProducts;
