import React from 'react';
import {GrAddCircle} from 'react-icons/gr'


export default function Task({arr}){
        return (
            <>
                <div className="task-1">
                    <div className="task-name">
                        <p id="name-1">{arr.judul}</p>
                    </div>
                        <p id="name-2">{arr.status}</p> 
                        {arr.render}  
                    <div className="main-3" onClick={()=>{arr.onClick(arr.params)}}>
                        <GrAddCircle id="icon-2"/>
                        <p id="new-task">New Task</p>
                    </div>
                </div>  
            </>
        )
    // })

}