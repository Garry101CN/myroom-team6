import Square from "../square";
import Knight from "../knight";
import Context from "../../../redux/store";
import { useContext } from "react";
import { canMoveKnight } from "../utils";
import { setPosition } from "../../../redux/func";
import { useDrop } from "react-dnd";
export default function Board({ knightPosition }) {
  let square = [];

  for (let i = 0; i < 64; i++) {
    square[i] = i;
  }

  return (
    <div>
      <div
        style={{
          width: "400px",
          height: "400px",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {square.map((item) => (
          <RenderSquare key={item} i={item} />
        ))}
      </div>
    </div>
  );
}

function RenderSquare({ i }) {
  const { dispatch, state } = useContext(Context);
  const x = i % 8;
  const y = Math.floor(i / 8);
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "knight",
      drop: () => {
        dispatch(setPosition(x, y));
        console.log(state.position);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [x, y]
  );

  const isKnightHere = x === state.position[0] && y === state.position[1];
  const black = (x + y) % 2 === 1;
  const piece = isKnightHere ? <Knight /> : null;
  function changePosition() {
    if (canMoveKnight(x, y, state.position[0], state.position[1])) {
      dispatch(setPosition([x, y]));
    }
  }

  return (
    <div
      ref={drop}
      onClick={changePosition}
      style={{ width: "12.5%", height: "12.5%" }}
    >
      <Square black={black}>{piece}</Square>
      {isOver &&
        canMoveKnight(
          x,
          y,
          state.position[0],
          state.position[1]
        )(
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              zIndex: 1,
              opacity: 0.5,
              backgroundColor: "yellow",
            }}
          />
        )}
    </div>
  );
}
