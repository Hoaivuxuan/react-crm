// import library
import React from "react";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
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
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [rowClick, setRowClick] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState(null);
  // input product data;
  useEffect(() => {
    // localStorage.setItem("Product", JSON.stringify(dataObject));
    setListProducts(JSON.parse(localStorage.getItem("Product")));
  }, [updateTable]);
  // Function Edit Product Information
  // const handleEditProduct = (product) => {
  //   console.log(product);
  //   setDataProductEdit(product);
  //   setIsShowModalEdit(true);
  // };

  const handleUpdate = () => {
    setUpdateTable((current) => current + 1);
  };
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
  const buttonEdit = (rowData) => {
    return (
      <div className="d-flex justify-content-center">
        <Button
          label="Edit"
          aria-label="Submit"
          onClick={() => setIsShowModalAdd_EditProduct(true)}
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
        header={<TableHeader handleUpdate={handleUpdate} />}
        scrollable
        scrollHeight="flex"
        selectionMode={rowClick ? null : "checkbox"}
        selection={selectedProducts}
        onSelectionChange={(e) => setSelectedProducts(e.value)}
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
      {/* modal edit and add new information */}
      <ModalAddNewAndEditProduct
        show={isShowModalAdd_EditProduct}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
      ></ModalAddNewAndEditProduct>
    </div>
  );
};

export default TableProducts;
