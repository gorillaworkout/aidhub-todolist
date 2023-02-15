import React from 'react'
import { css } from "@emotion/react";
import { DotLoader, PulseLoader } from "react-spinners";

const override = css`
display: block;
margin: 0 auto;
border-color: red;
`;

export const FullPageLoading=(loading,size,color)=>{
    return (
        <div className="sweet-loading">
        <DotLoader
            css={override}
            size={size}
            color={color}
            loading={loading}
        />
      </div>
    )
}

export const ButtonLoading=(loading,size,color)=>{
    return (
        <div className="sweet-loading">
        <PulseLoader
            css={override}
            size={size}
            color={color}
            loading={loading}
        />
      </div>
    )
}
