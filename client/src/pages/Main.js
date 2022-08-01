import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const Main = () => {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    if (window.confirm("Are you want to Delete?")) {
      axios.delete(`http://localhost:5000/api/remove/${id}`);
      toast.success("Deleted Successfully");
    
     setTimeout(() => loadData(), 500);
    }
  };
  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get");
    setData(response);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Link to="/add">
        <Button style={{ float: "right", marginTop: "50px" }} variant="primary">
          Add ToDo
        </Button>
      </Link>

      <Table style={{ marginTop: "200px" }} striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Heading</th>
            <th>Desciption</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.data?.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.heading}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link to={`/edit/${item.id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Main;
