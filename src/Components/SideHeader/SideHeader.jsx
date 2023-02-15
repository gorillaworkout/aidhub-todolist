import React  from 'react'


export default function SideHeader({arr}){
    return (
        <>
            <div className="side-header">
                <img src={arr.img} id="logo-header" alt=""/>
            </div>
        </>
    )
}