import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { formatDistanceToNowStrict } from "date-fns/formatDistanceToNowStrict";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import useLikes from "@/hooks/useLikes";
interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { hasLiked, toggleLike } = useLikes({ postId: data.id, userId });
  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();
      router.push(`/posts/${data.id}`);
    },
    [router, data.id]
  );
  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }
      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );
  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      className="
    border-b-[1px]
    border-neutral-800
    p-5
    hover:bg-neutral-900
    flex 
    flex-row 
    items-start 
    gap-3
    cursor-pointer
  "
      onClick={goToPost}
    >
      <div className="flex flex-row items-start gap-1">
        <Avatar userId={data.user.id} />
      </div>
      <div className="flex flex-col gap-1 justify-between">
        <div
          className="
            flex flex-row items-center gap-2
            "
        >
          <p
            onClick={goToUser}
            className="
                text-white
                font-semibold
                cursor-pointer
                hover:underline
                "
          >
            {data.user.name}
          </p>
          <span
            onClick={goToUser}
            className="
            text-neutral-500
            cursor-pointer
            hover:underline
            hidden
            md:block
            "
          >
            @{data.user.username}
          </span>
          <span className="text-neutral-500 text-sm">{createdAt}</span>
        </div>
        <div className="text-white mt-1">{data.body}</div>
        <div className="flex flex-row items-center mt-3 gap-10">
          <div
            className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-sky-500

          "
          >
            <AiOutlineMessage size={20} />
            <p>{data.comments?.length || 0}</p>
          </div>
          <div
            onClick={onLike}
            className="
                flex
                flex-row
                items-center
                text-neutral-500
                gap-2
                cursor-pointer
                transition
                hover:text-red-500

          "
          >
            <LikeIcon size={20} color={hasLiked ? "red" : ""} />
            <p>{data?.likedIds?.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
