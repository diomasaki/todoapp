import styled from "styled-components";
import React, { useState } from "react";
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
  const [checkedItems, setCheckedItems] = useState([]);
  const [text, setText] = useState("");
  const [subtask, setSubTask] = useState([]);
  const [todoObject, setTodoObject] = useState({
    title: "",
    description: "",
    date: "",
    taskType: "" || "Personal",
  });

  //Get Task By Id
  const taskId = location.pathname.split("/")[2];
  var task;
  JSON.parse(localStorage["task"])
    .filter((i) => {
      return i._id == taskId;
    })
    .map((i) => {
      task = i;
    });

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
    navigate("/task");
  };

  //Req body automation function
  const handleChange = (e) => {
    setTodoObject({ ...todoObject, [e.target.name]: e.target.value });
  };

  //Subtask
  const handleSubTask = (e) => {
    setText(e.target.value);
  };

  //Add Subtask
  const addSubTask = () => {
    setSubTask([...subtask, text]);
  };

  const checkItem = (e) => {
    const valueToAdd = e.target.value;

    if (e.target.checked) {
      if (!checkedItems.includes(valueToAdd)) {
        setCheckedItems((prevItems) => [...prevItems, valueToAdd]);
      }
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== valueToAdd)
      );
    }
  };

  const data = { ...todoObject, subtask: checkedItems };
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = "http://localhost:8800/api/todo/c";
    fetch(url, {
      method: "POST",
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
          console.log("Task created!");
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
                <Add onClick={addSubTask} />
              </Icon>
              <Input
                type="text"
                placeholder="Add New Subtask"
                onChange={handleSubTask}
              />
            </Ns>
            {task.subtask && subtask ? (
              <>
              {subtask.map((i) => (
                  <Sc>
                    <Item>
                      <Icon>
                        <Cb
                          type="checkbox"
                          name="subtask"
                          onChange={checkItem}
                          value={i}
                        />
                      </Icon>
                      <Text>{i}</Text>
                    </Item>
                  </Sc>
                ))}
                {task.subtask.map((i) => (
                  <Sc id="append">
                    <Item>
                      <Icon>
                        <Cb
                          type="checkbox"
                          name="subtask"
                          onChange={checkItem}
                        />
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
                <Add onClick={addSubTask} />
              </Icon>
              <Input
                type="text"
                placeholder="Add New Subtask"
                onChange={handleSubTask}
              />
            </Ns>
            {subtask ? (
              <>
                {subtask.map((i) => (
                  <Sc>
                    <Item>
                      <Icon>
                        <Cb
                          type="checkbox"
                          name="subtask"
                          onChange={checkItem}
                          value={i}
                        />
                      </Icon>
                      <Text>{i}</Text>
                    </Item>
                  </Sc>
                ))}
              </>
            ) : null}
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
