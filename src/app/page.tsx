import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Main() {
  return (
    <>
      <div className="flex justify-center p-5">
        <Card className="w-1/2 my-5">
          <CardHeader className="text-center text-primary text-2xl font-semibold">
            <div className="flex justify-center">
              <div>
                <Image
                  src="/asmicollection_logo.png"
                  alt="My Logo"
                  width={600}
                  height={200}
                  className="size-80"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <a href="/login">
              <Button className="bg-primary">Go to Login</Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
