import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    res.status(405).end();
  }

  try {
    const { id,name, username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { id,name, username, email, hashedPassword },
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).end();
  }
}
