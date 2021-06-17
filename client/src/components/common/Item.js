import { Paper } from '@material-ui/core';

function Item(props) {
  return (
    <Paper>
      <img
        style={{
          width: '100%',
          height: '764px'
        }}
        src={props.item.imgPath}
        alt="item images"
      />
    </Paper>
  );
}

export default Item;
