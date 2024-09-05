import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).end();
  }
  console.log(req.body.profileImage);
  try {
    const currentUser = await serverAuth(req, res);
    const { name, username, profileImage, coverImage, bio } = req.body;

    if (!name || !username) {
      throw new Error("Missing Fields");
    }

    const upatedUser = await prisma?.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        name,
        username,
        profileImage,
        coverImage,
        bio,
      },
    });
    return res.status(200).json(upatedUser);
  } catch (err) {
    console.log(err);
    return res.status(413).json(err);
  }
}
