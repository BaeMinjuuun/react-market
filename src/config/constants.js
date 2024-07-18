export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://react-market-server.fly.dev"
    : "http://loaclhost:8080";
