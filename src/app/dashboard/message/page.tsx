import { CardMessage } from "@/components/Message/card-message";
import { UserItem } from "@/components/Message/user-item";

export default function Message() {
  return (
    <div className="flex gap-4 p-4 pt-0">
      <UserItem />
      <CardMessage />
    </div>
  );
}
