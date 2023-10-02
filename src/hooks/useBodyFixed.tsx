import { useEffect, useRef, useState } from "react";

const isIOSUserAgent = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  const isIOS =
    ua.indexOf("iphone") > -1 ||
    ua.indexOf("ipad") > -1 ||
    (ua.indexOf("macintosh") > -1 && "ontouchend" in document);
  return isIOS;
};

export const useBodyFixed = () => {
  const [bodyFixed, setBodyFixed] = useState<boolean>(false);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const isFirstRender = useRef(false);

  useEffect(() => {
    // 初回レンダリング時は発火しないようにする
    if (!isFirstRender.current) {
      isFirstRender.current = true;
      return;
    }

    //スクロールバー分
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    const body = document.querySelector("body");
    if (!body) return;

    const isIOS = isIOSUserAgent();

    if (bodyFixed) {
      (document.querySelector(".header") as HTMLElement).style.paddingRight =
        scrollBarWidth + "px";
      body.style.paddingRight = scrollBarWidth + "px";
      if (isIOS) {
        setScrollPosition(window.scrollY);
        body.style.position = "fixed";
        body.style.top = `-${scrollPosition}px`;
      } else {
        body.style.overflow = "hidden";
      }
    } else {
      (document.querySelector(".header") as HTMLElement).style.paddingRight =
        "";
      body.style.paddingRight = "";
      if (isIOS) {
        body.style.removeProperty("position");
        body.style.removeProperty("top");
        window.scrollTo(0, scrollPosition);
      } else {
        body.style.removeProperty("overflow");
      }
    }
  }, [bodyFixed]);

  return { bodyFixed, setBodyFixed };
};
