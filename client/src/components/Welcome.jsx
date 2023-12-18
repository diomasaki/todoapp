import { Add, CalendarToday, KeyboardArrowRightOutlined } from '@material-ui/icons';
import styled from "styled-components";
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

//Welcome Container
const Wc = styled.div`
    flex-direction: column;
    display: flex;
    width: 80%;
`

//Heading
const Ht = styled.h1`
    font-weight: 600;
    font-size: 45px;
    margin: 0px;
    flex: 1;
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

    @media only screen and (max-width: ${props => props.handleOpen == false ? '600px' : '1150px'}) {
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
  background-color: rgb(255, 107, 107);
  border-radius: 3px;
  padding: 8px;
`

//Checkbox
const Cb = styled.input`
    margin-top: 4px;
    cursor: pointer;
`


const Welcome = ({ setHandleOpen, setFormType, handleOpen }) => {
  const [task, setTask] = useState([])
  const pattern = /^\/task\//

  //Open Create Form
  const handleClick = () => {
    setFormType("create")
    setHandleOpen(true)
  }

  //Open Edit Form
  const handleEdit = () => {
    setFormType("edit")
    setHandleOpen(true)
  }

  useEffect(() => {
    const url = "http://localhost:8800/api/todo/"
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
          .then((task) => { if (task.data.map((i) => i?.title)) { setTask(task.data); localStorage.setItem("task", JSON.stringify(task.data))}else { setTask("No task found!")}})
          .catch((err) => console.log(err))
  }, [])


  return (
    <Wc>
        <Ht>Today</Ht>
        <Mc>
          <Ac onClick={handleClick} >
            <Icon>
              <Add />
            </Icon>
            <AText>Add New Task</AText>
          </Ac>
          {task.map((i, key) => (
          <Tc key={key}>
            <Item>
              <Icon>
                <Cb type="checkbox" />
              </Icon>
              <Tp>
                <Text>{i.title}</Text>
                <Prop handleOpen={handleOpen}>
                  <Pi>
                    <Icon>
                      <CalendarToday style={{ height: "18px", marginTop: "2px" }}/>
                    </Icon>
                    <Pt>{i.date}</Pt>
                  </Pi>
                  <Line />
                  <Pi>
                    <Icon>
                      <Fb>{i.subtask.length}</Fb>
                    </Icon>
                    <Pt>Subtasks</Pt>
                  </Pi>
                  <Line />
                  <Pi>
                    <Icon>
                      <Square />
                    </Icon>
                    <Pt>Personal</Pt>
                  </Pi>
                </Prop>
              </Tp>
            </Item>
            <Icon>
              <Link to={pattern.test(location.pathname) ? location.pathname : `/task/${i._id}`}>
                <KeyboardArrowRightOutlined onClick={handleEdit} />
              </Link>
            </Icon>
          </Tc>
          ))}
        </Mc>
    </Wc>
  )
}

export default Welcome