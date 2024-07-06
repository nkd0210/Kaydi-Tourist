import React from "react";
import styled from "styled-components";

const Loader = () => {
    return (
        <Wrapper>
            <div className="flex justify-center items-center h-screen">
                <div className="loader-innner"></div>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  .loader-inner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
