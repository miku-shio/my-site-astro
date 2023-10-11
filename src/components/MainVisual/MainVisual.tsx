import styles from "./MainVisual.module.scss";
import { useEffect, useRef } from "react";
import { Heading } from "../Heading/Heading";
import { useWindowSize } from "../../hooks/useWindowSize";
import { init } from "ityped/dist/index";
import gsap from "gsap";

export const MainVisual = () => {
  const circleCanvas = useRef<HTMLCanvasElement>(null);
  const loadingCanvas = useRef<HTMLCanvasElement>(null);
  const loading = useRef<HTMLDivElement>(null);
  const [width, height] = useWindowSize();
  const space = 100;
  let y = 100;
  const keyName = "visit";
  const keyValue = true;

  // loading用のcanvas描画
  const writeCanvas = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, height - space);
    ctx.quadraticCurveTo(width / 2, height + y, width, height - space);
    ctx.lineTo(width, height - space);
    ctx.lineTo(width, 0);
    ctx.fill();
  };

  useEffect(() => {
    const color = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-accent",
    );
    // MVのcanvas
    if (!circleCanvas.current) return;
    circleCanvas.current.setAttribute("width", `${width}px`);
    circleCanvas.current.setAttribute("height", `${height}px`);
    const circleCtx = circleCanvas.current.getContext("2d")!;

    let circ = (4 * (Math.sqrt(2) - 1)) / 3;
    let c = circ;
    let count = Math.PI;
    const drawBezierCircle = (cx: number, cy: number, r: number) => {
      let c;
      let offsetX = 20 * Math.sin(count);
      let offsetY = 15 * Math.cos(count * 2);
      r = r / 2;

      //アニメーションスピード
      count += 0.01;
      //カラー
      circleCtx.fillStyle = color;
      circleCtx.translate(cx, cy);
      circleCtx.beginPath();

      // top right
      c = circ + 0.2 * Math.sin(count);
      circleCtx.moveTo(offsetX + 0, offsetY + -r);
      circleCtx.bezierCurveTo(
        offsetX + c * r,
        offsetY + -r,
        offsetX + r,
        offsetY + -c * r,
        offsetX + r,
        offsetY + 0,
      );

      // bottom right
      c = circ + 0.2 * Math.cos(count);
      circleCtx.bezierCurveTo(
        offsetX + r,
        offsetY + c * r,
        offsetX + c * r,
        offsetY + r,
        offsetX + 0,
        offsetY + r,
      );

      // bottom left
      c = circ + 0.2 * Math.sin(count * 2);
      circleCtx.bezierCurveTo(
        offsetX + -c * r,
        offsetY + r,
        offsetX + -r,
        offsetY + c * r,
        offsetX + -r,
        offsetY + 0,
      );

      // top left
      c = circ + 0.2 * Math.cos(count + 1);
      circleCtx.bezierCurveTo(
        offsetX + -r,
        offsetY + -c * r,
        offsetX + -c * r,
        offsetY + -r,
        offsetX + 0,
        offsetY + -r,
      );

      circleCtx.fill();
    };
    const render = () => {
      requestAnimationFrame(render);
      circleCtx.setTransform(1, 0, 0, 1, 0, 0);
      circleCtx.clearRect(0, 0, width, height);
      drawBezierCircle(width / 1.2, height / 1.4, 250);
    };
    render();

    // loadingのcanvas
    if (!loadingCanvas.current) return;
    loadingCanvas.current.setAttribute("width", `${width}px`);
    loadingCanvas.current.setAttribute("height", `${height}px`);
    const loadingCtx = loadingCanvas.current.getContext("2d")!;
    loadingCtx.fillStyle = color;

    writeCanvas(loadingCtx);
    const animate = () => {
      y -= 2;
      writeCanvas(loadingCtx);
      requestAnimationFrame(animate);
    };
    setTimeout(() => {
      animate();
    }, 1500);
  }, [width, height]);

  const handleComplete = () => {
    loadingCanvas.current?.remove();
    document.body.style.position = "";

    // MainVisualのテキスト
    init("#first", {
      strings: [`Hi,I'm Miku.`],
      loop: false,
      onFinished() {
        document.querySelector(".ityped-cursor")?.remove();
        init("#second", {
          strings: [`I love freedom!`],
          loop: false,
          onFinished() {
            document.querySelector(".ityped-cursor")?.remove();
          },
        });
      },
    });
  };

  useEffect(() => {
    const tl = gsap.timeline();

    gsap.set(".header", {
      opacity: 0,
    });

    gsap.set("body", {
      position: "fixed",
    });

    tl.to(loading.current, {
      yPercent: -100,
      duration: 1.6,
      delay: 2,
      ease: "Expo.easeOut",
      onComplete: handleComplete,
    })

      .to(
        ".header",
        {
          opacity: 1,
          delay: 4.2,
          duration: 0.6,
          ease: "Power1.easeOut",
        },
        "same",
      )
      .to(
        circleCanvas.current,
        {
          delay: 4.2,
          duration: 0.6,
          opacity: 1,
        },
        "same",
      );

    //初回のみローディング
    if (!sessionStorage.getItem(keyName)) {
      sessionStorage.setItem(keyName, String(keyValue));
    } else {
      tl.seek(tl.endTime());
      handleComplete();
    }
  }, []);

  return (
    <>
      <div ref={loading} className={styles.loading}>
        <span className={styles.loader}>
          <span className={styles.loader__inner}></span>
        </span>
        <canvas ref={loadingCanvas} className={styles.curtain}></canvas>
      </div>
      <div className={styles.root}>
        <Heading>
          <span id="first"></span>
          <br />
          <span id="second"></span>
        </Heading>
        <canvas ref={circleCanvas} className={styles.circle}></canvas>
      </div>
    </>
  );
};
