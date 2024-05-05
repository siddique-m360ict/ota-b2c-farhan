import { Session } from "next-auth";
import { UserDocument } from ".";

declare module "next-auth" {
    interface Session {
        user: UserDocument;
    }
}