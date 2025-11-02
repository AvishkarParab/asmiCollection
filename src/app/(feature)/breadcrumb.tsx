"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function BreadCrumbComponent() {
  const pathnames: string[] = usePathname()
    .split("/")
    .filter((path) => path);

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          {pathnames.map((link, index) => {
            const href = `/${pathnames.slice(0, index + 1).join("/")}`;
            const linkname = link[0].toUpperCase() + link.slice(1, link.length);
            const isLastPath = pathnames.length === index + 1;

            return (
              <Fragment key={index}>
                {!isLastPath ? (
                  <BreadcrumbItem>
                    <BreadcrumbLink href={href}>{linkname}</BreadcrumbLink>
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{linkname}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
                {!isLastPath ? <BreadcrumbSeparator /> : null}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
