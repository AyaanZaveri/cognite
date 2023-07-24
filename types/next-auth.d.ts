import "next-auth";
import { User as UserModel, Account as AccountModel } from "@prisma/client";

declare module "next-auth" {
  interface User extends Pick<UserModel, "id" | "email"> {
    username: string;
    bio: string;
    createdDate: string;
  }
  interface Account extends AccountModel {}

  interface Session {
    user: User;
    expires: string;
  }
}
