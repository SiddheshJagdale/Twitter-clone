import {
  FaHome,
  FaCompass,
  FaBell,
  FaEnvelope,
  FaBrain,
  FaUsers,
  FaCrown,
  FaUser,
} from "react-icons/fa";
import SideBarItem from "./SideBarItem";
import SideBarLogo from "./SideBarLogo";
import { BiLogOut } from "react-icons/bi";
import SideBarTweetButton from "./SideBarTweetButton";
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const { data, status } = useSession();
  const username = data?.user?.name;

  const { data: currentUser } = useCurrentUser();

  const Items = [
    {
      label: "Home",
      href: "/",
      icon: FaHome,
    },

    {
      label: "Notifications",
      href: "/notifications",
      icon: FaBell,
      auth: true,
      alert: currentUser?.hasNotification,
    },
    {
      label: "Profile",
      href: `/users/${currentUser?.id}`,
      icon: FaUser,
      auth: true,
    },
  ];

  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className=" space-y-2 lg:w-[230]"></div>
        <SideBarLogo />
        {Items.map((item) => {
          return (
            <SideBarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              auth={item.auth}
              alert={item.alert}
            />
          );
        })}
        {currentUser && (
          <SideBarItem
            onClick={() => signOut()}
            icon={BiLogOut}
            label="Logout"
          />
        )}
        <SideBarItem
          onClick={() => signOut()}
          icon={BiLogOut}
          label={username as string}
        />
        {!currentUser && <SideBarTweetButton />}
      </div>
    </div>
  );
};

export default Sidebar;
