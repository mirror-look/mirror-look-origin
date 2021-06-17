import Button from '@material-ui/core/Button';
import styledSelectButton from './StyledSelectButton';

function onClickButton(
  i,
  userSelectList,
  setUserSelectList,
  disabled,
  setDisaled,
  result
) {
  const isdisabled = disabled.map((item, idx) => {
    console.log(idx);
    if (idx === i - 1) {
      return true;
    } else {
      return false;
    }
  });
  setDisaled(isdisabled);
  let temp = { ...userSelectList };
  temp[result[0]] = result[i];
  setUserSelectList(temp);
  console.log('선택');
}

function SelectButton({
  i,
  userSelectList,
  setUserSelectList,
  disabled,
  setDisaled,
  result
}) {
  return (
    <Button
      variant="outlined"
      color="primary"
      style={styledSelectButton}
      onClick={() => {
        onClickButton(
          i,
          userSelectList,
          setUserSelectList,
          disabled,
          setDisaled,
          result
        );
      }}
      disabled={disabled[i - 1]}
    >
      {result[i]}
    </Button>
  );
}

export default SelectButton;
