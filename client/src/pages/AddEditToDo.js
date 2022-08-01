import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const initiState = {
  heading: "",
  description: "",
  status:"Not Completed"
};
const AddEditToDo = () => {

  const [state, setState] = useState(initiState);
  const { heading, description ,comment} = state;

  const [checked, setChecked] = useState(false);
  const[status,setStatus]=useState('Not Completed');


  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => {   
      setState({ ...resp.data[0] });
    const {status}={...resp.data[0]}
    //  setStatus({...status})
      console.log({status})

      if({status}==='Completed') {       
        setChecked(false)
        setStatus('Not Completed')
     
      }
      else{      
        setChecked(true)
        setStatus('Completed')
       
      }
    });
  }, [id]);

  const handleChange = () => {
    setChecked(!checked);
  
    if(!checked){
    
      setStatus("Completed")
    }else{
      setStatus("Not Completed")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!heading || !description) {
      toast.error("Please provide value to each field");
    } else {
      if(!id){
           axios
        .post("http://localhost:5000/api/post", { heading, description})
        .then(() => {
          setState({ heading: "", description: "" });
        })
        .catch((err) => toast.error(err.response.Data));
      toast.success("added successfully");
      setTimeout(() => navigate("/"), 500);
      }else{
      

        axios
        .put(`http://localhost:5000/api/update/${id}`, { heading, description ,status})
        .then(() => {
          setState({ heading: "", description: "" });
        })
        .catch((err) => toast.error(err.response.Data));
      toast.success("Updated successfully");
      setTimeout(() => navigate("/"), 500);
      }
   
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label style={{float:"left"}}>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };
  return (
    <Container>
      <h2>{id? "Edit ToDo":"Add ToDo"}</h2>
      <Row style={{ marginTop: "30px" }}>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="heading"
                value={heading || ""}
                onChange={handleInput}
                placeholder="Enter title"
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter Description"
                name="description"
                value={description || ""}
                onChange={handleInput}
              />
            </Form.Group>

           {id && (  
            <Checkbox
            label="Completed"
            value={checked}
            onChange={handleChange}
            style={{float:"left"}}
          /> )} 
            
       
              <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "30px",width:"100px"}}
              
            >
             {id? "update": "Save"}
            </Button>
            <Link to='/'> <Button variant="success" style={{marginTop:"30px"}}>Home Page</Button></Link>
       

        
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEditToDo;
