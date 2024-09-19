import { formatDistanceToNow, formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";

interface CommentItemProps {
  data?: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      const url = `/users/${data?.user.id}`;

      router.push(url);
    },
    [router, data?.user.id]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-500 transition">
      <div className="flex flex-row gap-3 items-start">
        <Avatar userId={data?.user.id} />
        <div className="flex flex-col">
          {" "}
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold hover:underline cursor-pointer"
            >
              {data?.user.name}
            </p>
            <span className="cursor-pointer hover:underline text-neutral-500 hidden md:block">
              {" "}
              @{data?.user.username}
            </span>
            <span className="text-sm text-neutral-500">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data?.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
