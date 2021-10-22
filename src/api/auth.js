import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { Person } from "@stacks/profile";

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export async function authenticate({ onFinish }) {
  showConnect({
    appDetails: {
      name: "Stacks eCom",
      icon: "/logo.svg",
    },
    redirectTo: "/",
    finished: onFinish,
    onCancel: onFinish,
    onFinish,
    userSession: userSession,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export function getPerson() {
  return new Person(getUserData().profile);
}
