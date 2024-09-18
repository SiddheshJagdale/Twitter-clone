import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Image from "next/image";
import Img1 from "@/public/Images/user_placeholder.png";
import useConnectionsModal from "@/hooks/useConnectionsModal";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
  const { data: fetchedUser } = useUser(userId);
  const router = useRouter();
  const connectionsModal = useConnectionsModal();

  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${userId}`;
      router.push(url);
      connectionsModal.onClose();
    },
    [router, userId]
  );

  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "h-32" : "h-12"}
       ${isLarge ? "w-32" : "w-12"}
       hover:opacity-90
       rounded-full
       cursor-pointer
       relative
       transition`}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        src={fetchedUser?.profileImage || Img1}
        alt="Avatar"
        onClick={onClick}
      />
    </div>
  );
};

export default Avatar;
