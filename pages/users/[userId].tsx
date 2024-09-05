import Header from "@/components/Header";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";
import React from "react";
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/Users/UserHero";
import UserBio from "@/components/Users/UserBio";
import PostFeed from "@/components/Posts/PostFeed";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;
  const { data: fetchedUser, isLoading } = useUser(userId as string);
  if (isLoading || !fetchedUser) {
    return (
      <div className="flex h-full justify-center items-center">
        <ClipLoader size={90} color="lightblue" />
      </div>
    );
  }
  return (
    <>
      <Header label={fetchedUser?.name} backArrow />
      <UserHero userId={userId as string} />
      <UserBio userId={userId as string} />
      <PostFeed userId={userId as string} />
    </>
  );
};

export default UserView;
