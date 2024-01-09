import React from "react";
import styled from "styled-components";


//Reminders Container
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

//Box Content
const Content = styled.div`
    border: 1px solid rgba(0,0,0,0.1);
    height: calc( 100% - 30px );
    border-radius: 20px;
    padding: 25px;
`

//Notes
const Notes = styled.div`
    background-color: rgb(209, 234, 237);
    justify-content: center;
    border-radius: 20px;
    align-items: center;
    height: 300px;
    display: flex;
    padding: 10px;
    width: 300px;
`

//Item Container
const Ic = styled.div`
    flex-direction: column;
    border-radius: 20px;
    margin-bottom: 20px;
    padding: 0px 20px;
    overflow: hidden;
    overflow: scroll;
    display: flex;
    height: 100%;
    width: 100%;
    
    &::-webkit-scrollbar{
        display: none;
    }
`

//Notes Title
const T = styled.p`
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
`

//Task
const Dc = styled.p`
    text-align: justify;
    margin: 4px 0px;
    font-size: 14px;
    padding: 0px;
`

//Box Gap
const B = styled.div`
    flex-wrap: wrap;
    display: flex;
    gap: 20px;
`


const Reminder = () => {
    const id = JSON.parse(localStorage["user"])

    return(
    <>
    <Wc>
        <Hd>
            <Ht>Reminders</Ht>
          <User><strong>Welcome </strong>`{id.username}`</User>
        </Hd>
        <Mc>
            <Content>
                <B>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolores cum libero qui eius, corporis quidem esse quae vel illum repellendus consequatur corrupti error ipsam quasi ex illo eaque. Itaque.</Dc>
                        <Dc>- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolores cum libero qui eius, corporis quidem esse quae vel illum repellendus consequatur corrupti error ipsam quasi ex illo eaque. Itaque.</Dc>
                        <Dc>- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolores cum libero qui eius, corporis quidem esse quae vel illum repellendus consequatur corrupti error ipsam quasi ex illo eaque. Itaque.</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem dolores cum libero qui eius, corporis quidem esse quae vel illum repellendus consequatur corrupti error ipsam quasi ex illo eaque. Itaque.</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                <Notes>
                    <Ic>
                        <T>Social Media</T>
                        <Dc>- Plan social content</Dc>
                        <Dc>- Build content calendar</Dc>
                        <Dc>- Plan promotion and distribution</Dc>
                    </Ic>
                </Notes>
                </B>
            </Content>
        </Mc>
    </Wc>
    </>
    )
}


export default Reminder;