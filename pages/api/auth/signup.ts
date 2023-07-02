import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { IUser } from "../../../types";
import mongoose from "mongoose";
import { connectToMongoDB } from "@/lib/mongodb";
import User from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToMongoDB().catch((err: Error) => res.json(err));

  if (req.method === "POST") {
    if (!req.body) return res.status(400).json({ error: "Data is missing" });

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: "User Already exists" });
    } else {
      if (password.length < 6)
        return res
          .status(409)
          .json({ error: "Password should be 6 characters long" });

      const hashedPassword = await hash(password, 12);

      User.create({
        name,
        email,
        password: hashedPassword,
      })
        .then((data: IUser) => {
          const user = {
            email: data.email,
            name: data.name,
            _id: data._id,
          };

          return res.status(201).json({
            success: true,
            user,
          });
        })
        .catch((error: Error) => {
          if (error && error instanceof mongoose.Error.ValidationError) {
            //mongo db will return array
            // but we only want to show one error at a time

            for (let field in error.errors) {
              const msg = error.errors[field].message;
              return res.status(409).json({ error: msg });
            }
          }
        });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
