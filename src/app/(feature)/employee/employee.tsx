import { UserCog, UserPlus, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription } from "@/components/ui/card";

export default function EmployeeComponent() {
  const items = [
    {
      title: "Add Employee",
      url: "employee/add-employee",
      icon: <UserPlus size={40} strokeWidth={2} />,
    },
    {
      title: "View Reportee",
      url: "employee/view-reportee",
      icon: <UserRoundSearch size={40} strokeWidth={2} />,
    },
    {
      title: "Manage Employee",
      url: "employee/manage-employee",
      icon: <UserCog size={40} strokeWidth={2} />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {items.map((item, index) => (
          <Link key={index} href={item.url}>
            <Card className="text-center transition-transform duration-300 hover:scale-102 rounded-2xl border border-gray-200 bg-white shadow-[4px_4px_0px_#999] hover:shadow-[6px_6px_0px_#777]">
              <CardContent className="flex flex-col items-center justify-center py-4">
                <div className="text-primary mb-2">{item.icon}</div>
                <CardDescription className="font-semibold text-gray-600 text-md">
                  {item.title}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
