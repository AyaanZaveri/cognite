"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { sidebarWidthState } from "@/atoms/sidebar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import Card from "./Cogs/Card";

const Sidebar = () => {
  const [cogs, setCogs] = useState<any>([
    {
      id: 1,
      title: "The Woodlands",
      emoji: "🏫",
      urls: [
        "https://sites.google.com/pdsb.net/twsstudentservices/woodlands-club-hub",
        "https://sites.google.com/pdsb.net/twsstudentservices/student-services",
        "https://en.wikipedia.org/wiki/The_Woodlands_School_(Mississauga)",
      ],
    },
  ]);

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
    if (window.innerWidth > 768) {
      if (num < 220) {
        setSidebarWidth(220);
      }

      if (num > 280) {
        setSidebarWidth(280);
      }
    }

    return num;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      constrainSidebarWidth(sidebarWidth);
    }
  }, [sidebarWidth]);

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (window.innerWidth < 768) {
        setSidebarWidth(0);
      } else {
        setSidebarWidth(240);
      }
    };

    updateSidebarWidth();
    window.addEventListener("resize", updateSidebarWidth);

    return () => {
      window.removeEventListener("resize", updateSidebarWidth);
    };
  }, []);

  return (
    <div
      className={`flex items-center h-full z-20 fixed select-none bg-zinc-50`}
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
        className="border-r border-zinc-200 dark:border-zinc-800 to-orange-500/20 h-full flex flex-col justify-start items-start"
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
        onMouseDown={(e) => e.preventDefault()}
      ></div>
      <div
        className={`absolute top-0 h-full w-[3px] transition-colors duration-300 cursor-col-resize hover:bg-orange-500 active:bg-orange-600`}
        onMouseDown={startResizing}
        onDoubleClick={() => setSidebarWidth(240)}
        style={{ left: sidebarWidth }}
      ></div>
    </div>
  );
};

export default Sidebar;
