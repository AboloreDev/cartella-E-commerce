import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Link } from "lucide-react";
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
    icon: <FaGithub className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/alabifathiu",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    title: "Twitter",
    href: "https://www.twitter.com/abolorreeeee",
    icon: <FaTwitter className="w-5 h-5" />,
  },
];

const SocialLinks = ({
  className,
  iconClassName,
  tooltipClassName,
}: SocialsProps) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-4", className)}>
        {Socials.map((links) => (
          <Tooltip key={links.title}>
            <TooltipTrigger asChild>
              <Link
                key={links.title}
                target="_blank"
                // rel="noopener noreferrer"
                href={links.href}
                className={cn(
                  "p-2 border-2 rounded-full hoverEffect",
                  iconClassName
                )}
              >
                {links.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent className={cn("font-semibold", tooltipClassName)}>
              {links.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialLinks;
