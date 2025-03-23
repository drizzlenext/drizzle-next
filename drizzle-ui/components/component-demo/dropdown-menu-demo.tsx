"use client";

import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuList,
} from "@/src/components/ui/dropdown-menu";
import { LogOutIcon, MenuSquareIcon } from "lucide-react";
import Link from "next/link";

export function DropdownMenuDemo() {
  return (
    <div className="flex gap-5">
      <DropdownMenu
        buttonEl={<MenuSquareIcon />}
        buttonSizeVariant="icon"
        buttonVariant="ghost"
      >
        <DropdownMenuList
          items={[
            {
              text: "A label",
              items: [
                { text: "Link 1", link: "/" },
                { text: "Link 2", link: "/" },
              ],
            },
            { text: "Link 3", link: "/" },
            { text: "Log out", link: "/", icon: LogOutIcon },
          ]}
        />
      </DropdownMenu>
      <DropdownMenu
        buttonEl="Manual Example"
        buttonSizeVariant="default"
        buttonVariant="outline"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>A label</DropdownMenuLabel>
          <Link href="/">
            <DropdownMenuItem>A link</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
      </DropdownMenu>
    </div>
  );
}
