"use client";
import { PropsWithChildren, useState } from "react";
import Sidebar from "./ui/Sidebar";
import { Bars3Icon } from "@heroicons/react/16/solid";

// TODO: Make this compone to be rendered on server by removing "useState
type Props = PropsWithChildren;
const MobileNavbar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sidebar
        triggerIcon={<Bars3Icon className="w-4" />}
        triggerClassName={`fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden transition-opacity ${isOpen ? "opacity-0" : "opacity-100"}`}
        onOpenChange={setIsOpen}
      >
        {props.children}
      </Sidebar>
    </div>
  );
};

export default MobileNavbar;
