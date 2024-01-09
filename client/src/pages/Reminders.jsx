import React from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Reminder from "../components/Reminder";

//Home Container
const Hc = styled.div`
    padding: 20px;
`

//Flex Content
const Fc = styled.div`
    display: flex;
    gap: 30px;
`

const Reminders = () => {
    return(
    <>
    <Hc>
        <Fc>
            <Sidebar/>
            <Reminder/>
        </Fc>
    </Hc>
    </>
    )
}


export default Reminders;