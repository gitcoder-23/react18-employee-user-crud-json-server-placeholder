import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonComponent = (props) => {
  const { variant, onClickEvent, buttonName } = props;
  return (
    <>
      <Button variant={variant} onClick={onClickEvent}>
        {buttonName}
      </Button>
    </>
  );
};

export default ButtonComponent;
