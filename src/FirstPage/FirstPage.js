import React, { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import './FirstPage.css'

const FirstPage = () => {
    let par=useParams();
    const [username,setUsername]=useState('');
    const [color,setColor]=useState(null);
    let navigate=useNavigate();

    let handleClick=()=>{
        if(username.length>0 && color!=null){
            let data={
                username,
                color,
                par
            };
            navigate('/chatRoom',{state:data})

        }
        else{
            alert("please enter user name and choose color")
        }
    }
    
  return (
    <>
        <div id='firstdiv'>
            <div id='firstchilddiv'>
                <div id='childdiv1'>
                    <span>Your Secret Name</span>
                    <input type="text" name="color" id="" onChange={(e)=>setUsername(e.target.value)} />
                    
                </div>
                <div id='childdiv2'>
                    <span>Choose your color</span>
                    <input type="color" name='color' onChange={(e)=>{setColor(e.target.value)}}/>
                </div>

                <div id='bottom'><button onClick={handleClick}>Enter The Room</button></div>
                

            </div>

        </div>

    </>
  )
}

export default FirstPage