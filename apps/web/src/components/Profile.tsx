import { Popover } from "@radix-ui/react-popover";
import { SessionUser } from "../lib/session";
import { PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  ArrowRightStartOnRectangleIcon,
  ListBulletIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { AppNavigation } from "../constants/app";

type Props = {
  user: SessionUser;
};

const Profile = ({ user }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={user.avatar}
            className="rounded-full w-14 border-white border-2"
          />
          <AvatarFallback>
            <UserIcon className="w-8 text-slate-500" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex justify-center items-center gap-2">
          <UserIcon className="w-4 " />
          <p>{user.name}</p>
        </div>
        <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2 [&>*>span]:col-span-4  [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:rounded-md  ">
          <a href="/api/auth/signout">
            <ArrowRightStartOnRectangleIcon className="w-4 justify-self-end" />{" "}
            <span>Sign out</span>
          </a>
          <Link href={AppNavigation.createPost}>
            <PencilSquareIcon className="w-4 justify-self-end" />{" "}
            <span>Create Post</span>
          </Link>
          <Link href={AppNavigation.createPost}>
            <ListBulletIcon className="w-4 justify-self-end" />{" "}
            <span>Posts</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
