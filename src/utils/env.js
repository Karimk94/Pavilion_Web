
const liveHost = "https://192.168.2.5:7215/api/";
const localHost = "https://multiply-prompt-sparrow.ngrok-free.app/api/";

//ngrok http --domain=multiply-prompt-sparrow.ngrok-free.app https://localhost:7215 --host-header=rewrite

export const isDevelopment = process.env.NODE_ENV === "development";
export const isMock = true;
export const host = !isDevelopment ? liveHost : localHost;
