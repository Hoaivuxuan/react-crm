import React from "react";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "../ModalAddNewProduct/ModalAddNewUser";
import ModalEditUser from "../ModalEditProduct/ModalEditUser";
import { rows, columns } from "../ProductDetail/ProductDetail.tsx";
import { DataGrid } from "@mui/x-data-grid";
//
const TableProducts = (props) => {
  // props
  const [listProducts, setListProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  // function close modal
  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
  };
  // function update table
  const handleUpdateTable = (user) => {
    setListProducts([...listProducts, user]);
  };
  //
  useEffect(() => {
    getUsers();
  }, []);
  //
  const getUsers = async (page) => {
    // call api
    let res = await fetchAllUser(page);
    //
    if (res && res.data) {
      setTotalUsers(res.total);
      setListProducts(res.data);
      setTotalPages(res.total_pages);
    }
    // console.log("check res: ", res);
  };
  // Function click to next page
  const handlePageClick = (event) => {
    getUsers(+event.selected + 1);
    // console.log("check event: ", event);
  };
  // Function Edit User Infomation
  const handleEditUser = (user) => {
    console.log(user);
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  return (
    <div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
      {/* modal add new user */}
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      ></ModalAddNew>
      {/* modal edit user infomation */}
      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
      ></ModalEditUser>
    </div>
  );
};

export default TableProducts;
