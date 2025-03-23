"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, ButtonSizeVariant, ButtonVariant } from "./button";
import { JSX } from "react";
import Link from "next/link";

type DropdownMenuProps = {
  buttonEl: JSX.Element | string;
  buttonVariant?: ButtonVariant;
  buttonSizeVariant?: ButtonSizeVariant;
};

type DropdownMenuItemType = {
  text: string;
  link?: string;
  target?: React.HTMLAttributeAnchorTarget;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  items?: DropdownMenuItemType[];
};

const DropdownMenu = ({
  buttonEl,
  buttonVariant = "ghost",
  buttonSizeVariant = "icon",
  children,
}: React.PropsWithChildren<DropdownMenuProps>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={cn("relative inline-block text-left")}>
      <Button
        onClick={toggleDropdown}
        variant={buttonVariant}
        size={buttonSizeVariant}
      >
        {buttonEl}
      </Button>
      {isOpen && (
        <div className="bg-background border-border absolute right-4 z-50 mt-0 w-48 border shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "hover:bg-muted flex cursor-pointer items-center gap-2 px-3 py-1",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
DropdownMenuItem.displayName = "DropdownMenuItem";

const DropdownMenuGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
DropdownMenuGroup.displayName = "DropdownMenuGroup";

const DropdownMenuLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "border-border flex items-center gap-2 border-b px-3 py-1 font-semibold",
      className,
    )}
    {...props}
  />
));
DropdownMenuLabel.displayName = "DropdownMenuLabel";

const DropdownMenuList = (props: { items?: DropdownMenuItemType[] }) => {
  const { items } = props;
  if (!items) return null;

  return (
    <DropdownMenuGroup>
      {items.map((item) => {
        if (item.link) {
          return (
            <div key={item.text + item.link}>
              <Link href={item.link} target={item.target}>
                <DropdownMenuItem>
                  {item.icon ? <item.icon size={16} /> : null}
                  {item.text}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuList items={item.items} />
            </div>
          );
        } else {
          return (
            <div key={item.text}>
              <DropdownMenuLabel>
                {item.icon ? <item.icon size={16} /> : null}
                {item.text}
              </DropdownMenuLabel>
              <DropdownMenuList items={item.items} />
            </div>
          );
        }
      })}
    </DropdownMenuGroup>
  );
};

export {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuList,
  type DropdownMenuItemType,
};
