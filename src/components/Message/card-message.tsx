import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CardMessage() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Employee 1</CardTitle>
        <CardDescription>Online</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea className="bg-muted/50 h-full w-full rounded-xl"></ScrollArea>
      </CardContent>
      <CardFooter className="gap-2">
        <Input placeholder="Type your message here..." className="flex-1" />
        <Button variant="outline">Send</Button>
      </CardFooter>
    </Card>
  );
}
