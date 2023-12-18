import { useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import styled from "styled-components"

//Login Container
const Lc = styled.div`
    justify-content: center;
    flex-direction: column;
    align-items: center;
    display: flex;
    height: 100vh;
    gap: 20px;
`

//Title
const Title = styled.span`
    color: gray;
`

//Form
const F = styled.div`
    gap: 10px;
`

//Text
const T = styled.p``

//Pattern Validation
const E = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 10px;
`

//Input
const I = styled.input`
    padding: 10px;
    width: 350px;
    border: none;
    border-radius: 3px;
    outline-color: white;

    &::placeholder {
      color: gray;
    }

    &:focus{
      outline-color:  rgb(255, 212, 59);
      transition: all 0.7s ease;
    }
`

//Button
const B = styled.button`
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: rgb(255, 212, 59);
    font-weight: 600;

    &:not(:hover){
      background-color: rgb(255, 212, 59);
      transition: all 0.3s ease;
    }
    &:hover{
      background-color: rgb(255, 227, 126);
      transition: all 0.3s ease;
    }
`


//Pattern Container
const P = styled.div`
    display: flex;
    flex-direction: column;
`

const Login = () => {
  const url = "http://localhost:8800/api/auth/signin"
  const [error, setError] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const account = {email, password}
  const navigate = useNavigate()

  const inputValidation = (e) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!pattern.test(e.target.value)) {
      setError(true)
    }else {
      setError(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch(url, {
      //Method
      method: "POST",    
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(account),
      referrerPolicy: "no-referrer",
      mode: "cors",
      credentials: "same-origin",
      cache: "no-cache"
    }).then(res => res.json())  //Promise
    .then((data) => {
      console.log(data); if (!data.data?.email) {
        console.log("Login failed! no action")
      }else {
        console.log("Login success! need action")
        localStorage.setItem("user", JSON.stringify(account))
        navigate("/task")
      }
    })
    
    .catch((err) => console.log(err))
  }

  

  


  return (
    <Lc>
      <Title>Please enter your account information in order to sign in</Title>
      <F>
        <T>Email</T>
        <P>
          <I placeholder="email" onInput={inputValidation} onChange={(e) => setEmail(e.target.value)}/>
          {error ? (
            <E>email not valid!</E>
            ) : null}
        </P>
        <T>Password</T>
        <I placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
      </F>
      <B onClick={handleSubmit}>Sign in</B>
    </Lc>
  )
}

export default Login