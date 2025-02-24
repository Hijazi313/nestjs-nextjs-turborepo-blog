import Link from "next/link";

// type Props = {};
const Navbar = () => {
  return (
    <>
      <h1 className="text-2xl font-bold p-2">My Mod Blog</h1>
      <div className="flex flex-col md:flex-row ml-auto gap-2 [&>a]:py-2 [&>a]:px-4 [&>a]:transition [&>a]:rounded-md [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500">
        <Link href="/">Blog</Link>
        <Link href="#about">About</Link>
        <Link href="#contact">Contact</Link>
      </div>
    </>
  );
};

export default Navbar;
