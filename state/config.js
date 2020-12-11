import { atom, selector, DefaultValue } from "recoil";
import mbxTokens from "@mapbox/mapbox-sdk/services/tokens";

const localStorageEffect = (key) => ({ setSelf, onSet }) => {
  if (process.browser) {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  }
};

export const mapboxAccessToken = atom({
  key: "mapboxAccessToken",
  default: "",
  effects_UNSTABLE: [localStorageEffect("mapboxAccessToken")],
});

export const validToken = selector({
  key: "mapboxAccessTokenValid",
  get: async ({ get }) => {
    const accessToken = get(mapboxAccessToken);
    try {
      const tokensService = mbxTokens({ accessToken });
      const response = await tokensService.getToken().send();
      return response.body.code === "TokenValid";
    } catch {
      return false;
    }
  },
});

export const eventData = atom({
  key: "eventData",
  default: [],
  effects_UNSTABLE: [localStorageEffect("eventData")],
});

export const validEventData = selector({
  key: "validEventData",
  get: ({ get }) => get(eventData).filter((e) => e.lngLat),
});

export const mapHeight = atom({
  key: "mapHeight",
  default: "800px",
  effects_UNSTABLE: [localStorageEffect("mapHeight")],
});

export const mapWidth = atom({
  key: "mapWidth",
  default: "100%",
  effects_UNSTABLE: [localStorageEffect("mapWidth")],
});

export const mapStyle = atom({
  key: "mapStyle",
  default: "mapbox://styles/mapbox/light-v10",
  effects_UNSTABLE: [localStorageEffect("mapStyle")],
});
