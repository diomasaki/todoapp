import { Add, CalendarToday, KeyboardArrowRightOutlined } from '@material-ui/icons';
import styled from "styled-components";
import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar';

//Welcome Container
const Wc = styled.div`
    flex-direction: column;
    display: flex;
    width: 80%;

    @media only screen and (max-width: 1200px) {
      width: 100%;
  }
`

//Header Content
const Hd = styled.div`
    justify-content: space-between;
    align-items: center;
    margin: 0px 20px;
    display: flex;
`


//User Name
const User = styled.span`
    font-size: 19px;
`

//Heading
const Ht = styled.h1`
    font-weight: 600;
    font-size: 45px;
    margin: 0px;
    flex: 1;

    @media only screen and (max-width: 601px) {
      display: flex;  
      overflow: hidden;
    }

    @media only screen and (max-width: 500px) {
      display: none;
    }
`

//Main Content
const Mc = styled.div`
    padding: 20px;
    flex: 8;
`

//Add New Container
const Ac = styled.div`
    border: 2px solid rgba(0,0,0,0.2);
    align-items: center;
    margin-bottom: 15px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    padding: 10px;
`

//Task Container
const Tc = styled.div`
    border-bottom: 2px solid rgba(0,0,0,0.2);
    justify-content: space-between;
    align-items: center;
    margin: 10px 0px;
    cursor: pointer;
    display: flex;
    padding: 10px;
`

//Item Container
const Item = styled.div`
  display: flex;
`

//Icon
const Icon = styled.div`
    position: relative;
    margin-right: 10px;
    color: gray;
`

//AddText
const AText = styled.span`
    color: gray;
`

//Task Text
const Text = styled.span``

//Prop
const Prop = styled.div`
    display: flex;
    gap: 12px;

    @media only screen and (max-width: ${props => props.value == false ? '655px' : '1150px'}) {
      display: none;
    }
`

//Top Section
const Tp = styled.div`
    flex-direction: column;
    display: flex;
    gap: 10px;
`

//Prop Item
const Pi = styled.div`
    align-items: center;
    display: flex;
`

//Prop Text
const Pt = styled.span`
    font-size: 14px;
`

//Prop Line
const Line = styled.div`
    border-right: 1px solid gray;
`

//Fill Box
const Fb = styled.div`
    background-color: rgb(244, 244, 244);
    border-radius: 4px;
    font-weight: 600;
    padding: 2px 8px;
    font-size: 10px;
`

//Square
const Square = styled.div`
  background-color: ${(props) => props.value === "Personal" && "rgb(255, 107, 107)" || 
                                 props.value === "Work" &&  "rgb(68, 163, 255)" || 
                                 props.value === "Groups" && "rgb(255, 212, 59)"};
  border-radius: 3px;
  padding: 8px;
`

//Checkbox
const Cb = styled.input`
    margin-top: 4px;
    cursor: pointer;
`


const Welcome = ({ setHandleOpen, setFormType, handleOpen }) => {
  const x = location.pathname
  const [task, setTask] = useState([])
  const id = JSON.parse(localStorage["user"])

  //Open Create Form
  const handleClick = () => {
    setFormType("create")
    setHandleOpen(true)
  }

  //Open Edit Form
  const handleEdit = (a) => {
    localStorage.setItem("id", a)
    setFormType("edit")
    setHandleOpen(true)
  }

  //updateTask
  const updateTask = (a,b,c) => {
    const url = `http://localhost:8800/api/todo/update/${a}`
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(b),
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "cors",
      cache: "no-cache",
      referrerPolicy: "no-referrer",
      credentials: "same-origin"
    }).then(res => res.json()).then((data) => {
      //Get Task from Storage
      const xa = JSON.parse(localStorage["task"])
      //Need to define a variable for the array.map() method, cuz array.map() create's a new array  
      const update = xa.map((i) => {
        if (i._id === a) {
          return {...i, isChecked: c}
        }
        return i
      })
      localStorage.setItem("task", JSON.stringify(update))
      console.log(data)
    }).catch((err)=>console.log(err))
  }

  //handleCheck for task done!
  const taskDone = (e) => {
    const c = e.target.checked
    if (c === true) {
      console.log("checked!")
      console.log(e.target.value)
      updateTask(e.target.value, {isChecked: true}, true)
    }else {
      updateTask(e.target.value, {isChecked: false}, false)
      console.log("task not updated to done!")
    }
  }


  useEffect(() => {
    const url = `http://localhost:8800/api/todo/${id._id}`
          fetch(url, {
            method: "GET",    
            headers: {
              'Content-Type': 'application/json'
            },
            referrerPolicy: "no-referrer",
            mode: "cors",
            credentials: "same-origin",
            cache: "no-cache"
          })
          .then(res => res.json())
          .then((task) => { if (task.data.map((i) => i?.title)) 
            { 
              location.pathname == "/" && setTask(task.data) || 
              location.pathname == "/personal" && setTask(task.data.filter((i) => i.taskType === "Personal")) || 
              location.pathname == "/work" && setTask(task.data.filter((i) => i.taskType === "Work"))
              localStorage.setItem("task", JSON.stringify(task.data))
            } else { setTask("No task found!")}})
          .catch((err) => console.log(err))
  }, [])


  return (
    <>
    <Sidebar setTask={setTask} />
    <Wc>
        <Hd>
          {x === "/" ? (
            <Ht>Today</Ht>
          ) : 
          x === "/personal" ? (
            <Ht>Personal</Ht>
          ) : 
            <Ht>Work</Ht>
          }
          <User><strong>Welcome </strong>`{id.username}`</User>
        </Hd>
        <Mc>
          <Ac onClick={handleClick} >
            <Icon>
              <Add />
            </Icon>
            <AText>Add New Task</AText>
          </Ac>
          {task ? (
             <>
             {task.map((i) => (
             <Tc key={i._id}>
               <Item>
                 <Icon>
                   {i.isChecked === true ? (
                     <Cb type="checkbox" value={i._id} onChange={taskDone} defaultChecked/>
                     ) : 
                     <Cb type="checkbox" value={i._id} onChange={taskDone} />
                     }
                 </Icon>
                 <Tp>
                   <Text>{i.title}</Text>
                   <Prop value={handleOpen}>
                     {i.date == "" ? (
                       null
                     ) : 
                     <>
                     <Pi>
                       <Icon>
                         <CalendarToday style={{ height: "18px", marginTop: "2px" }}/>
                       </Icon>
                       <Pt>{i.date}</Pt>
                     </Pi>
                     <Line />
                     </>
                     }
                     <Pi>
                       <Icon>
                         <Fb>{i.subtask.length}</Fb>
                       </Icon>
                       <Pt>Subtasks</Pt>
                     </Pi>
                     <Line />
                     <Pi>
                       <Icon>
                         <Square value={i.taskType}/>
                       </Icon>
                       <Pt>{i.taskType}</Pt>
                     </Pi>
                   </Prop>
                 </Tp>
               </Item>
               <Icon>
                   <KeyboardArrowRightOutlined onClick={() => { handleOpen ? console.log("disabled") : handleEdit(i._id) } } />
               </Icon>
             </Tc>
             ))}
             </>
          ) : 
            "You don't have any task!"
          }
        </Mc>
    </Wc>
    </>

  )
}


export default Welcome