import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNewUser";
import ModalEditUser from "./ModalEditUser";
//
const TableUsers = (props) => {
  // props
  const [listUsers, setListUsers] = useState([]);
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
    setListUsers([...listUsers, user]);
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
      setListUsers(res.data);
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
      <div className="my-3 d-flex  justify-content-between">
        <span className="h4">
          <b>List Users</b>
        </span>
        <button
          onClick={() => setIsShowModalAddNew(true)}
          className="btn btn-success"
        >
          Add new user
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        {/* show list user by index*/}
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td className="d-flex justify-content-around">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"
        //
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
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

export default TableUsers;
