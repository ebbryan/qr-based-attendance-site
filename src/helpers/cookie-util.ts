import { cookies } from "next/headers";

export const CookieUtil = async (token: string) => {
  const cookie = await cookies();
  const tokenGrabber = cookie.get(token)?.value as string;
  return tokenGrabber;
};
