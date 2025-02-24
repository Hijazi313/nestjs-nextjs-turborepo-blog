"use client";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { cn } from "../../lib/utils";
import { useOnClickOutside } from "usehooks-ts";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName?: string;
  onOpenChange?: (isOpen: boolean) => void;
}>;
const Sidebar = (props: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useOnClickOutside(ref, () => {
    setShow(false);
    props.onOpenChange?.(false);
  });

  const handleToggle = () => {
    const newState = !show;
    setShow(newState);
    props.onOpenChange?.(newState);
  };

  return (
    <>
      <button className={props.triggerClassName} onClick={handleToggle}>
        {props.triggerIcon}
      </button>
      <div
        ref={ref}
        className={cn(
          "fixed w-60 top-0 z-[60] transition-all bg-white rounded-r-md min-h-screen shadow-lg",
          { "-left-full": !show, "left-0": show }
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export default Sidebar;
