import { rooms as apiRooms } from "@/lib/api";
import { rooms as staticRooms } from "@/data/rooms";
import { normalizeRoomName } from "@/lib/utils";
import { RoomDetailView } from "@/components/RoomDetailView";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const staticRoom = staticRooms.find((r) => r.id === id) ?? null;

  if (!staticRoom) {
    return <RoomDetailView idParam={id} staticRoom={null} liveRoom={null} error="The requested room does not exist." />;
  }

  try {
    const list = await apiRooms.list();
    const liveRoom = list.find((r) => normalizeRoomName(r.name) === normalizeRoomName(staticRoom.name)) ?? null;
    return <RoomDetailView idParam={id} staticRoom={staticRoom} liveRoom={liveRoom} />;
  } catch {
    return <RoomDetailView idParam={id} staticRoom={staticRoom} liveRoom={null} />;
  }
}
