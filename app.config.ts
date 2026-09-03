import appJson from "./app.json";

const appConfig = appJson.expo as typeof appJson.expo & {
  extra?: Record<string, unknown>;
};

export default {
  ...appConfig,
  extra: {
    ...appConfig.extra,
    posthogProjectToken: process.env.POSTHOG_PROJECT_TOKEN,
    posthogHost: process.env.POSTHOG_HOST,
  },
};
