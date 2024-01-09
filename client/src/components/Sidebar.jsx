import { AddBox, ArrowRightTwoTone, CheckBox, ExitToApp, Notes, Search, SquareFoot } from '@material-ui/icons';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";

//Sidebar Container
const Sc = styled.div`
    background-color: rgb(244, 244, 244);
    justify-content: space-between;
    height: calc(100vh - 80px);
    flex-direction: column;
    border-radius: 20px;
    display: flex;
    padding: 15px;
    width: 20%;

    @media only screen and (max-width: 2200px) {
        max-height: 1024px; 
    }

    @media only screen and (max-width: 1200px) {
        display: none;
    }
`

//Sidebar Info
const Si = styled.div`
    flex-direction: column;
    display: flex;
    gap: 15px;
`

//Sidebar Title
const St = styled.span`
    font-weight: bold;
    font-size: 24px;
`

//Sidebar Filter Container
const Ic = styled.div`
    border: 1px solid rgba(0,0,0,0.3);
    background: transparent;
    border-radius: 11px;
    align-items: center;
    display: flex;
    padding: 4px;
`

//Input
const Sfc = styled.input`
    background: transparent;
    border: 1px solid black;
    margin-right: 10px;
    padding: 10px 0px;
    font-size: 15px;
    outline: none;
    border: none;
    width: 100%;
`

//Top
const Top = styled.div``

//Task List
const Tl = styled.div`
    margin: 50px 0px;
`

//Task Title
const Tm = styled.span`
    font-weight: bold;
    font-size: 15px;
`

//UList
const Ul = styled.ul`
    flex-direction: column;
    list-style-type: none;
    align-items: center;
    display: flex;
    padding: 0px;
    gap: 12px;
`

//List
const Li = styled.li`
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    padding: 10px;
    width: 90%;

    &:not( :hover ){
        transition: all 0.3s ease-out;
    }

    &:hover{
        background-color: rgba(255,255,255, 0.9);
        transition: all 0.3s ease-in;
    }
`

//List Item
const Item = styled.div`
    align-items: center;
    display: flex;

    @media only screen and (max-width: 1020px) {
        display: flex;
        overflow: hidden;
    }
`

//Icon
const Icon = styled.div`
    align-items: center;
    margin-right: 10px;
    display: flex;
    color: gray;
`

//List Item Title
const ITitle = styled.span`
    font-weight: 600;
`

//Notifications
const Notifications = styled.div`
    background-color: rgba(0,0,0,0.1);
    border-radius: 10px;
    margin-right: 5px;
    padding: 8px 12px;
    font-weight: 600;

    @media only screen and (max-width: 1000px) {
        display: none;
    }
`

//Auth Section
const Auth = styled.div`
    align-items: center;
    border-radius: 10px;
    margin: 20px 0px;
    cursor: pointer;
    display: flex;
    padding: 10px;

    &:not( :hover ){
        transition: all 0.3s ease-out;
    }

    &:hover{
        background-color: rgba(255,255,255, 0.9);
        transition: all 0.3s ease-in;
    }
`

//Square
const Square = styled.div`
    background-color: ${props => props.color || 'black'};
    border-radius: 3px;
    padding: 8px;
`

const Sidebar = ({ setTask }) => {
    const task = JSON.parse(localStorage["task"])
    const personal = task.filter((i) => i.taskType == "Personal")
    const work = task.filter((i) => i.taskType == "Work")

    //Signout Function
    const handleSignOut = () => {
        localStorage.removeItem("user")
        location.reload()
    }

    //handleTask Component
    const navigate = useNavigate()
    const handleNavigate = (a) => {
        if (a === "/") {
            const task = JSON.parse(localStorage["task"])
            console.log(task)
            setTask(task)
        } else {
            const task = JSON.parse(localStorage["task"])
            console.log(task)
            const x = a[1].toUpperCase() + a.slice(2)
            setTask(task.filter((i) => i.taskType === x))
        }
        navigate(a)
    }

    const handleReminders = (a) => {
        navigate(a)
    }

  return (
    <Sc>
        <Top>
        <Si>
            <St>Menu</St>
            <Ic>
                <Search style={{ color: "gray", marginRight: "10px", cursor: "pointer" }}/>
                <Sfc placeholder='Search'/>
            </Ic>
        </Si>
        <Tl>
            <Tm>TASKS</Tm>
            <Ul>
                <Li>
                    <Item>
                        <Icon>
                            <ArrowRightTwoTone />
                        </Icon>
                        <ITitle>Upcoming</ITitle>
                    </Item>
                    <Notifications>12</Notifications>
                </Li>
                <Li onClick={()=> location.pathname === "/reminders" ? handleReminders("/") : handleNavigate("/")}>
                    <Item>
                        <Icon>
                            <CheckBox />
                        </Icon>
                        <ITitle>Today</ITitle>
                    </Item>
                    {task.length > 0 ? (
                        <Notifications>{task.length}</Notifications>
                    ) : 
                        <Notifications>0</Notifications>
                    }
                </Li>
                <Li onClick={()=> handleNavigate("/reminders")}>
                    <Item>
                        <Icon>
                            <Notes />
                        </Icon>
                        <ITitle>Daily Reminder</ITitle>
                    </Item>
                    <Notifications>3</Notifications>
                </Li>
            </Ul>
        </Tl>
        <Tl>
            <Tm>LISTS</Tm>
            <Ul>
                <Li onClick={() => location.pathname === "/reminders" ? handleReminders("/personal") : handleNavigate("/personal")}>
                    <Item>
                        <Icon>
                            <Square color={"rgb(255, 107, 107)"}/>
                        </Icon>
                        <ITitle>Personal</ITitle>
                    </Item>
                    {personal.length > 0 ? (
                        <Notifications>{personal.length}</Notifications>
                    ) : 
                        <Notifications>0</Notifications>
                    }
                </Li>
                <Li onClick={() => location.pathname === "/reminders" ? handleReminders("/work") : handleNavigate("/work")}>
                    <Item>
                        <Icon>
                            <Square color={"rgb(68, 163, 255)"} />
                        </Icon>
                        <ITitle>Work</ITitle>
                    </Item>
                    {work.length > 0 ? (
                        <Notifications>{work.length}</Notifications>
                    ) : 
                        <Notifications>0</Notifications>
                    }
                </Li>
                <Li>
                    <Item>
                        <Icon>
                           <Square color={"rgb(255, 212, 59)"} />
                        </Icon>
                        <ITitle>Groups</ITitle>
                    </Item>
                    <Notifications>3</Notifications>
                </Li>
            </Ul>
        </Tl>
        </Top>
        <Auth>
            <Icon>
                <ExitToApp />
            </Icon>
            <ITitle onClick={handleSignOut}>Sign Out</ITitle>
        </Auth>
    </Sc>
  )
}

export default Sidebar;