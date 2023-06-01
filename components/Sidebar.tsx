"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { sidebarWidthState } from "@/atoms/sidebar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

const Sidebar = () => {
  const sidebarRef = useRef<any>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useRecoilState(sidebarWidthState);

  const startResizing = useCallback((mouseDownEvent: any) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: any) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResizing);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("mousemove", resize);
        window.removeEventListener("mouseup", stopResizing);
      }
    };
  }, [resize, stopResizing]);

  // console.log(sidebarWidth);

  const constrainSidebarWidth = (num: number) => {
    if (num < 240) {
      setSidebarWidth(240);
    }

    if (num > 320) {
      setSidebarWidth(320);
    }

    return num;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      constrainSidebarWidth(sidebarWidth);
    }
  }, [sidebarWidth]);

  return (
    <div
      className={`flex items-center h-full z-20 fixed select-none bg-stone-50/50`}
    >
      {/* <img
        draggable="false"
        onClick={() => router.push("/")}
        src={`${
          resolvedTheme == "dark"
            ? "/FinodyLogoDark.svg"
            : resolvedTheme == "light"
            ? "/FinodyLogoLight.svg"
            : "/FinodyLogoDark.svg"
        }`}
        className="absolute left-3 top-0 block h-16 select-none py-4 mt-1 pl-2 hover:cursor-pointer"
        alt=""
      /> */}
      <div
        className="border-r border-stone-100 dark:border-stone-800 to-orange-500/20 h-full flex flex-col justify-start items-start"
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()}
      ></div>
      <div
        className={`absolute top-0 h-full w-1 transition-colors duration-300 cursor-col-resize hover:bg-orange-500 active:bg-orange-600`}
        onMouseDown={startResizing}
        style={{ left: sidebarWidth }}
      ></div>
    </div>
  );
};

export default Sidebar;
