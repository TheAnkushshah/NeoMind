import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const BotAvatar = () => {
  return (
    <Avatar className="h-14 w-14">
      <AvatarImage className="p-1" src="/logo.png" alt="NeoMind logo" />
    </Avatar>
  );
};