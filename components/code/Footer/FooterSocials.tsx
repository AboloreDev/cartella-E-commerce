import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { cn } from "@/lib/utils";
import { TooltipContent } from "@radix-ui/react-tooltip";

interface SocialsProps {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const Socials = [
  {
    title: "Github",
    href: "https://www.github.com/aboloredev",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/alabifathiu",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Twitter",
    href: "https://www.twitter.com/abolorreeeee",
    icon: <Twitter className="w-5 h-5" />,
  },
];

const FooterSocials = ({
  className,
  iconClassName,
  tooltipClassName,
}: SocialsProps) => {
  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex items-center gap-4 text-black dark:text-white",
          className
        )}
      >
        {Socials.map((links) => (
          <Tooltip key={links.title}>
            <TooltipTrigger asChild>
              <a
                key={links.title}
                target="_blank"
                rel="noopener noreferrer"
                href={links.href}
                className={cn(
                  "p-1 border-2 border-slate-900 dark:border-slate-400 rounded-full hoverEffect text-slate-900 dark:text-slate-400",
                  iconClassName
                )}
              >
                {links.icon}
              </a>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "font-semibold text-sm text-slate-900 dark:text-slate-400",
                tooltipClassName
              )}
            >
              {links.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default FooterSocials;
