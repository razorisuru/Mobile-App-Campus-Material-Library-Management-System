import * as SecureStore from "expo-secure-store";

let token = null;

export async function setToken(newToken) {
  token = newToken;

  if (newToken !== null) {
    await SecureStore.setItemAsync("token", newToken);
    // console.log("Token set:", newToken);
  } else {
    await SecureStore.deleteItemAsync("token");
    // console.log("Token deleted");
  }
}

export async function getToken() {
  if (token !== null) {
    // console.log("Token retrieved from memory:", token);
    return token;
  }

  token = await SecureStore.getItemAsync("token");
//   console.log("Token retrieved from storage:", token);
  return token;
}
