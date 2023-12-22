import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Add, Close } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";

//Form Container
const Fc = styled.div`
  background-color: rgb(244, 244, 244);
  justify-content: space-between;
  flex-direction: column;
  padding: 20px 0px;
  border-radius: 20px;
  padding-right: 20px;
  padding-left: 20px;
  display: flex;
  width: 450px;
`;

//Top Content
const Tc = styled.div`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  display: flex;
`;

//Form Title
const Title = styled.span`
  font-weight: 500;
  font-size: 24px;
`;

//Title Form Input
const Fi = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.2);
  align-items: center;
  margin-bottom: 20px;
  border-radius: 8px;
  padding: 15px;
  display: flex;
`;

//Title Input
const Input = styled.input`
  background: transparent;
  outline: none;
  border: none;
  width: 300px;
`;

//Desc Form Input
const Di = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  height: 100px;
  padding: 15px;
  display: flex;
  margin-bottom: 25px;
`;

//Desc Input
const Dnput = styled.textarea`
  font-family: "Lexend Deca", sans-serif;
  background: transparent;
  overflow: hidden;
  outline: none;
  resize: none;
  width: 300px;
  border: none;
`;

//Feature Container
const Fco = styled.div`
  justify-content: space-between;
  align-items: center;
  margin: 20px 0px;
  max-width: 60%;
  display: flex;
  width: 100%;
`;

//Feature Title
const Ft = styled.span``;

//Feature Select
const Fs = styled.select`
  border: 2px solid rgba(0, 0, 0, 0.2);
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  padding: 6px;
`;

//Feature Option
const Fo = styled.option``;

//Add New Subtask
const Ns = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  align-items: center;
  padding: 10px;
  display: flex;
`;

//Icon
const Icon = styled.div`
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  color: gray;
`;

//Box
const Box = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin-top: 1px;
  padding: 5px;
`;

//Subtask Container
const Sc = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  cursor: pointer;
  display: flex;
  padding: 10px;
`;

//Item Container
const Item = styled.div`
  display: flex;
`;

//Subtask Text
const Text = styled.span``;

//Submit Button
const Sb = styled.button`
  background-color: rgb(255, 212, 59);
  border-radius: 12px;
  padding: 10px 30px;
  cursor: pointer;
  border: none;
`;

//Whole Content Except Submit Button
const Whc = styled.div``;

//Checkbox
const Cb = styled.input`
  margin-top: 4px;
  cursor: pointer;
`;

const Form = ({ setHandleOpen, formType }) => {
  const navigate = useNavigate();
  const [currentValue, setCurrentValue] = useState("");
  const [currentTask, setCurrentTask] = useState([]);
  const [taskValues, setTaskValues] = useState("");
  const [todoObject, setTodoObject] = useState({
    title: "",
    description: "",
    date: "",
    subtask: [],
    taskType: "" || "Personal",
  });

  //Get Task By Id
  const taskId = localStorage["id"];
  var task;
  const threadTask = (a) => {
    a.filter((i) => {
      return i._id == taskId;
    })
    .map((i) => {
      task = i;
    });
  }
  const z = localStorage["task"]
  const t = JSON.parse(z);
  threadTask(t)


  console.log(task)

  //Date Variables
  const date = [];
  const x = new Date();
  const a = new Date("12-31-2024");

  //Get All Date's from 2023-2024
  function dateLoop() {
    for (let dates = x; dates <= a; dates.setDate(dates.getDate() + 1)) {
      date.push(dates.toLocaleDateString());
    }
    date.push(a.toLocaleDateString());
  }

  dateLoop();

  //Close Form
  const handleClose = (e) => {
    e.preventDefault();
    setHandleOpen(false);
    navigate("/");
  };

  //Req body automation function
  const handleChange = (e) => {
    setTodoObject({ ...todoObject, [e.target.name]: e.target.value });
  };

  //addSubTask
  const handleSubTask = (e) => {
    setCurrentTask([...currentTask, taskValues]);
  };

  //if checked added subtask
  const threadMax = (a) => {
    setCurrentValue([...currentValue, a]);
  };

  //if not checked remove subtask!
  const removeThread = (a) => {
    console.log(currentValue)
    setCurrentValue(currentValue.filter((i) => i !== a))
  }
  
  //Check if subtask is updated!
  const handleCheck = async (e) => {
    const check = e.target.checked;
    if (check === true) { 
      threadMax(e.target.value);
    } else {
      console.log("not checked!");
      removeThread(e.target.value)
    }
  };
  
  
  useEffect(()=> {
    setTodoObject({...todoObject, subtask: [...currentValue]})
  },[currentValue])

  console.log("item removed!")
  console.log('updated: ', currentValue)

  // console.log("currentValue: ", currentValue);
  // console.log(todoObject)


  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8800/api/todo/c";
    fetch(url, {
      method: "POST",
      body: JSON.stringify(todoObject),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      cache: "no-cache",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.title) {
          console.log("Task created!");
          alert('Task created!')
        } else {
          console.log("Task not created!");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `http://localhost:8800/api/todo/update/${taskId}`;
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      cache: "no-cache",
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data?.title) {
          console.log("Task updated!");
        } else {
          console.log("Task not updated!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fc>
      <Whc id="parent">
        {formType == "edit" ? ( // EDIT TASK
          <>
            <Tc>
              <Title>Edit Task: </Title>
              <Close style={{ cursor: "pointer" }} onClick={handleClose} />
            </Tc>
            <Fi>
              <Input
                placeholder={task.title}
                name="title"
                onChange={handleChange}
              />
            </Fi>
            <Di>
              <Dnput
                placeholder={task.description}
                name="description"
                onChange={handleChange}
              />
            </Di>
            <Fco>
              <Ft>List</Ft>
              <Fs name="taskType" onChange={handleChange}>
                {task.taskType ? (
                  <Fo disabled>Current: {task.taskType}</Fo>
                ) : null}
                <Fo value="Personal">Personal</Fo>
                <Fo value="Work">Work</Fo>
                <Fo value="Groups">Groups</Fo>
              </Fs>
            </Fco>
            <Fco>
              <Ft>Due Date</Ft>
              <Fs name="date" onChange={handleChange}>
                {task.date ? <Fo disabled>{task.date}</Fo> : null}
                {date.map((i, id) => (
                  <Fo value={i} key={id}>
                    {i}
                  </Fo>
                ))}
              </Fs>
            </Fco>
            <Tc>
              <Title>Subtasks:</Title>
            </Tc>
            <Ns>
              <Icon>
                <Add />
              </Icon>
              <Input type="text" placeholder="Add New Subtask" />
            </Ns>
            {task.subtask ? (
              <>
                {task.subtask.map((i, ind) => (
                  <Sc id="append" key={ind}>
                    <Item>
                      <Icon>
                        <Cb type="checkbox" />
                      </Icon>
                      <Text id="target">{i}</Text>
                    </Item>
                  </Sc>
                ))}
              </>
            ) : null}
          </>
        ) : (
          // CREATE TASK
          <>
            <Tc>
              <Title>Create Task:</Title>
              <Close style={{ cursor: "pointer" }} onClick={handleClose} />
            </Tc>
            <Fi>
              <Input placeholder="Title" name="title" onChange={handleChange} />
            </Fi>
            <Di>
              <Dnput
                placeholder="Description"
                name="description"
                onChange={handleChange}
              />
            </Di>
            <Fco>
              <Ft>List</Ft>
              <Fs name="taskType" onChange={handleChange}>
                <Fo value="Personal">Personal</Fo>
                <Fo value="Work">Work</Fo>
                <Fo value="Groups">Groups</Fo>
              </Fs>
            </Fco>
            <Fco>
              <Ft>Due Date</Ft>
              <Fs name="date" onChange={handleChange}>
                {date.map((i, id) => (
                  <Fo value={i} key={id}>
                    {i}
                  </Fo>
                ))}
              </Fs>
            </Fco>
            <Tc>
              <Title>Subtasks:</Title>
            </Tc>
            <Ns>
              <Icon>
                <Add onClick={handleSubTask} />
              </Icon>
              <Input
                type="text"
                placeholder="Add New Subtask"
                onChange={(e) => setTaskValues(e.target.value)}
              />
            </Ns>
            {currentTask.map((i, index) => (
              <Sc key={index}>
                <Item>
                  <Icon>
                    <Cb type="checkbox" onChange={handleCheck} value={i} />
                  </Icon>
                  <Text>{i}</Text>
                </Item>
              </Sc>
            ))}
          </>
        )}
      </Whc>
      {formType == "edit" ? (
        <Sb onClick={handleUpdate}>Save Changes</Sb>
      ) : (
        <Sb onClick={handleSubmit}>Create Task</Sb>
      )}
    </Fc>
  );
};

export default Form;
