import { useRouter } from "next/router";
import usePost from "@/hooks/usePost";
import { ClipLoader } from "react-spinners";
import Header from "@/components/Header";
import PostItem from "@/components/Posts/PostItem";
import Form from "@/components/Form/Form";
import CommentFeed from "@/components/Posts/CommentFeed";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchedPost, isLoading } = usePost(postId as string);

  if (isLoading || !fetchedPost) {
    return (
      <div className="flex h-full justify-center items-center">
        <ClipLoader size={90} color="lightblue" />
      </div>
    );
  }

  return (
    <>
      <Header label="Tweet" backArrow />
      <PostItem data={fetchedPost} />
      <Form
        postId={postId as string}
        placeholder="Tweet your reply"
        isComment
      />
      <CommentFeed comments={fetchedPost?.comments} />
    </>
  );
};

export default PostView;
