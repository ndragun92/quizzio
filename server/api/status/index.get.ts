import type { TStatusResponse } from "#shared/types/api.type";

export default defineEventHandler((_event): TStatusResponse => {
  const rooms = getRooms();
  const userPeers = Array.from(getUserPeers());
  const deploymentId = process.env.DENO_DEPLOYMENT_ID || "local";

  return {
    timestamp: new Date().toISOString(),
    deploymentId,
    total: {
      users: userPeers.length,
      rooms: rooms.length,
    },
    rooms,
    userPeers: userPeers.map(([userId, data]) => ({ userId, data })),
  };
});
