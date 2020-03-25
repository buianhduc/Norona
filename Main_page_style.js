import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const MyButton = styled(Button)({
    width: 5.5vw;
    height: 5.5vw;
    padding: 0;
    border: none;
    margin-right: 2vw;
    display: block;
     cursor: pointer;
     text-align: center;
     align-items: center;
     align-content: center;
     top: 50%;
     left: 50%;
});

export default function StyledComponents() {
  return <MyButton>Styled Components</MyButton>;
}