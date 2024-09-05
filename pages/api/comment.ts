import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { body } = req.body;
    const currentUser = await serverAuth(req, res);
    const { postId } = req.query;

    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid ID");
    }

    const comment = await prisma?.comment.create({
      data: {
        body: body,
        userId: currentUser.id,
        postId: postId,
      },
    });

    return res.status(200).json(comment);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
