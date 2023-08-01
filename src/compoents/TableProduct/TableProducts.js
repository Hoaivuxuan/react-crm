// import library
import React from "react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { FilterMatchMode, FilterOperator } from "primereact/api";
// import component
import "./TableProduct.scss";
import TableHeader from "../TableHeader/TableHeader";
import ModalAddNewAndEditProduct from "../ModalAddNewAndEditProduct/ModalAddNewAndEditProduct";
//
const TableProducts = (props) => {
  const [isShowModalAdd_EditProduct, setIsShowModalAdd_EditProduct] =
    useState();
  //
  const handleClose = () => {
    setIsShowModalAdd_EditProduct(false);
  };
  // props
  const [listProducts, setListProducts] = useState([]);
  const [updateTable, setUpdateTable] = useState(0);
  const [rowClick, setRowClick] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [dataProductEdit, setDataProductEdit] = useState({});
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
    // localStorage.setItem("Product", JSON.stringify(dataObject));
    setListProducts(JSON.parse(localStorage.getItem("Product")));
    setLoading(false);
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
  // column include : lock icon
  const lockIcon = () => {
    return (
      <div className="d-flex justify-content-center">
        <button className="p-button p-component p-button-rounded p-button-text ml-1 p-button-icon-only">
          <span className="p-button-icon p-c bx bx-lock-open-alt text-green">
            <iconify-icon icon="bx:lock-open-alt"></iconify-icon>
          </span>
        </button>
      </div>
    );
  };
  // button click to Edit
  const buttonEdit = (rowData) => {
    return (
      <div className="d-flex justify-content-center">
        <Button
          label="Edit"
          aria-label="Submit"
          onClick={() => handleEditProduct(rowData)}
        />
      </div>
    );
  };
  return (
    <div
      className="fixed-table-container"
      style={{ height: "calc(100vh - 17px)" }}
    >
      {/* product data table */}
      <DataTable
        size="small"
        value={listProducts}
        showGridlines
        paginator
        rows={20}
        rowsPerPageOptions={[20, 25, 50, 100]}
        paginatorTemplate="RowsPerPageDropdown CurrentPageReport  FirstPageLink PrevPageLink  NextPageLink LastPageLink"
        dataKey="id"
        emptyMessage="Không có dữ liệu"
        header={
          <TableHeader
            handleUpdate={handleUpdate}
            filters={tableFilters}
            updateFilters={updateTableFilters}
          />
        }
        scrollable
        scrollHeight="flex"
        selectionMode={rowClick ? null : "checkbox"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
        //
        filters={tableFilters}
        filterDisplay="menu"
        loading={loading}
        responsiveLayout="scroll"
        globalFilterFields={["id", "name", "productLine"]}
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column
          body={(_, { rowIndex }) => rowIndex + 1}
          bodyClassName={"p-0 text-center"}
        />
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="id" header="Mã" dataType="text" />
        <Column field="name" header="Tên" dataType="text" />
        <Column field="describe" header="Mô tả" dataType="text" />
        <Column field="productLine" header="Dòng sản phẩm" dataType="text" />
        <Column className="p-0" body={lockIcon} />
        <Column body={buttonEdit} />
      </DataTable>
      {/* modal edit and add new product */}
      <ModalAddNewAndEditProduct
        show={isShowModalAdd_EditProduct}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        rowData={dataProductEdit}
      ></ModalAddNewAndEditProduct>
    </div>
  );
};

export default TableProducts;
