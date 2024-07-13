import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string | null;
    role: string;
    schedules:  Array<any> | null
  }
  interface Session {
    user: User & {
      name: string;
      role: string;
      schedules: Array<any>;
    };
    token: {
      name: string;
      role: string;
      schedules: Array<any>;
    };
  }
}
