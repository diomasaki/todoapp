import React, { useState } from "react";
import styled from "styled-components"
import Sidebar from "../components/Sidebar";
import Welcome from "../components/Welcome";
import Form from "../components/Form";


//Home Container
const Hc = styled.div`
    padding: 20px;
`

//Flex Content
const Fc = styled.div`
    display: flex;
    gap: 30px;
`


//Welcome TodoApp Pages :)
const Home = () => {
    const [handleOpen, setHandleOpen] = useState(false)
    const [formType, setFormType] = useState("")

 return(
    <Hc>
        <Fc>
            <Sidebar />
            <Welcome setHandleOpen={setHandleOpen} handleOpen={handleOpen} setFormType={setFormType} />
            {!handleOpen ? (
                null
                ) : <Form setHandleOpen={setHandleOpen} formType={formType} />}
        </Fc>
    </Hc>
 )
}

export default Home;