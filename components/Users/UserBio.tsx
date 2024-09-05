// import React, { useMemo } from "react";
// import { format } from "date-fns";
// import useCurrentUser from "@/hooks/useCurrentUser";
// import useUser from "@/hooks/useUser";
// import Button from "../Button";
// import { BiCalendar } from "react-icons/bi";
// import useEditModal from "@/hooks/useEditModal";
// import useConnectionsModal from "@/hooks/useConnectionsModal";

// interface UserBioProps {
//   userId: string;
// }

// const UserBio: React.FC<UserBioProps> = ({ userId }) => {
//   const { data: currentUser } = useCurrentUser();
//   const { data: fetchedUser } = useUser(userId);

//   const editModal = useEditModal();
//   const connectionsModal = useConnectionsModal();
//   const createdAt = useMemo(() => {
//     if (!fetchedUser?.createdAt) {
//       return null;
//     }
//     return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
//   }, [fetchedUser?.createdAt]);
//   return (
//     <div className="border-b-[1px] border-neutral-800 pb-4">
//       <div className="flex justify-end p-2">
//         {currentUser?.id === userId ? (
//           <div className="flex flex-row gap-2">
//             <Button secondary label="Edit" onClick={editModal.onOpen} />
//             <Button
//               secondary
//               label="Connections"
//               onClick={connectionsModal.onOpen}
//             />
//           </div>
//         ) : (
//           <Button secondary label="Follow" onClick={() => {}} />
//         )}
//       </div>
//       <div className="mt-8 px-4">
//         <div className="flex flex-col">
//           <p className="text-2xl font-semibold text-white">
//             {fetchedUser?.name}
//           </p>
//           <p className="text-semibold text-md text-neutral-500">
//             @{fetchedUser?.username}
//           </p>
//         </div>

//         <div className="flex flex-col mt-4">
//           <p className="text-white">{fetchedUser?.bio}</p>
//           <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
//             <BiCalendar />
//             <p>Joined {createdAt}</p>
//           </div>
//         </div>
//         <div className="flex flex-row mt-4 gap-6 items-center">
//           <div className="flex flex-row">
//             <p className="text-white text-medium font-semibold">
//               {fetchedUser?.followingIds.length}
//             </p>
//             <p className="text-md text-neutral-500 ml-1">Following</p>
//           </div>
//           <div className="flex flex-row">
//             <p className="text-white text-medium font-semibold">
//               {fetchedUser?.followingIds.length}
//             </p>
//             <p className="text-md text-neutral-500 ml-1">Followers</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserBio;
import React, { useMemo } from "react";
import { format } from "date-fns";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import Button from "../Button";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";
import useConnectionsModal from "@/hooks/useConnectionsModal";
import useFollow from "@/hooks/useFollow";

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);

  const editModal = useEditModal();
  const { isFollowing, toggleFollow } = useFollow(userId);

  const createdAt = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), "MMMM yyyy");
  }, [fetchedUser?.createdAt]);

  const followingCount = fetchedUser?.followingIds?.length || 0;
  const followersCount = fetchedUser?.followersCount || 0;

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <div className="flex flex-row gap-2">
            <Button secondary label="Edit" onClick={editModal.onOpen} />
          </div>
        ) : (
          <Button
            secondary={!isFollowing}
            outline={isFollowing}
            label={isFollowing ? "Unfollow" : "Follow"}
            onClick={toggleFollow}
          />
        )}
      </div>
      <div className="mt-8 px-4">
        <div className="flex flex-col">
          <p className="text-2xl font-semibold text-white">
            {fetchedUser?.name}
          </p>
          <p className="text-semibold text-md text-neutral-500">
            @{fetchedUser?.username}
          </p>
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-white">{fetchedUser?.bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar />
            <p>Joined {createdAt}</p>
          </div>
        </div>
        <div className="flex flex-row mt-4 gap-6 items-center">
          <div className="flex flex-row">
            <p className="text-white text-medium font-semibold">
              {followingCount}
            </p>
            <p className="text-md text-neutral-500 ml-1">Following</p>
          </div>
          <div className="flex flex-row">
            <p className="text-white text-medium font-semibold">
              {followersCount}
            </p>
            <p className="text-md text-neutral-500 ml-1">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;
