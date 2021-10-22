import { userSession } from "api/auth";

export function useUser() {
  if (userSession.isUserSignedIn()) return userSession.loadUserData();

  return {};
}
