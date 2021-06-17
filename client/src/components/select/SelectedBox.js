import { useState } from 'react';
import ButtonBox from './ButtonBox';
import Selected from './Selected';
import SelectButton from './SelectButton';

const StyledHeader = {
  top: '10%',
  fontSize: '35px'
};

function SelectedBox({ result, userSelectList, setUserSelectList }) {
  const [disabled, setDisaled] = useState([false, false, false]);

  return (
    <Selected>
      <h2 style={StyledHeader}>{result[0]}</h2>
      <ButtonBox>
        <SelectButton
          i={1}
          userSelectList={userSelectList}
          setUserSelectList={setUserSelectList}
          disabled={disabled}
          setDisaled={setDisaled}
          result={result}
        />
        <SelectButton
          i={2}
          userSelectList={userSelectList}
          setUserSelectList={setUserSelectList}
          disabled={disabled}
          setDisaled={setDisaled}
          result={result}
        />
        <SelectButton
          i={3}
          userSelectList={userSelectList}
          setUserSelectList={setUserSelectList}
          disabled={disabled}
          setDisaled={setDisaled}
          result={result}
        />
      </ButtonBox>
    </Selected>
  );
}

export default SelectedBox;
