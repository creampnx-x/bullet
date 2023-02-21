import s from "./App.module.css";
import { createEffect, createMemo, createSignal, onCleanup } from "solid-js";
import { render } from "solid-js/web";

const data = new Array(100).map((item) =>
  (item * Math.random() * 100).toFixed(0).toString()
);

/**
 * todo: 使用 dom / canvas
 */

class Bullet {
  constructor(data, element) {
    this.data = data;
    const Bullets = this.getRender;
    this.dispose = render(() => <Bullets />, element);
  }

  getRender() {
    const [right, setRight] = createSignal(0);
    const [display, setDisplay] = createSignal("block");
    const style = createMemo(() => ({
      display: display(),
      position: "absolute",
      top: 0,
    }));

    function move() {
      setRight((value) => value + 1);

      if (right() + 1 < 600) requestAnimationFrame(move);
      else setDisplay("none");
    }

    createEffect(() => {
      requestAnimationFrame(move);
    });

    return (
      <>
        <div
          style={{
            ...style(),
            right: `${right()}px`,
          }}
        >
          1233
        </div>
      </>
    );
  }
}

function App() {
  createEffect(() => {
    const bullet = new Bullet(data, document.getElementById("v_id"));

    onCleanup(() => bullet.dispose());
  });

  return (
    <div style={{ position: "absolute" }}>
      <div class={s.App} />
      <div id="v_id" />
    </div>
  );
}

export default App;
