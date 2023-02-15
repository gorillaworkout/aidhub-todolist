import React from 'react'


export default function TaskName({arr}){

    return (
        <div className="body-name">
            <p id="body-task-name">{arr.taskName}</p>
            <input type={arr.typeInput} placeholder={arr.placeholder} defaultValue={arr.defaultValue} id={arr.className} onChange={arr.onClick}/>
        </div>
    )
}