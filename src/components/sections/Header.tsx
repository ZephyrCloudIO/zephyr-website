import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Type, Package, Github, FileText, History, Newspaper, Calendar, Users, ChevronDown, Cloud, Zap } from "lucide-react";
import ZephyrWordmark from "@/images/zephyr-wordmark.svg";
import ZephyrLogo from "@/images/zephyr-logo.svg";

export const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const handleCopyLogo = async () => {
    try {
      const response = await fetch(ZephyrLogo);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
    } catch (err) {
      console.error("Failed to copy logo:", err);
    }
  };

  const handleCopyWordmark = async () => {
    try {
      const response = await fetch(ZephyrWordmark);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
    } catch (err) {
      console.error("Failed to copy wordmark:", err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="relative">
          <Link
            to="/"
            className="flex items-center gap-2"
            onContextMenu={(e) => {
              e.preventDefault();
              setDropdownOpen(true);
            }}
          >
            <img src={ZephyrWordmark} alt="Zephyr Logo" width={128} />
          </Link>
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <span className="sr-only">Logo menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 border-neutral-700"
              align="start"
              alignOffset={-5}
              sideOffset={5}
            >
            <DropdownMenuLabel>Platform</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleCopyLogo}
              className="flex items-center gap-2 hover:bg-neutral-700"
            >
              <img src={ZephyrLogo} alt="Logo" className="h-4 w-4" />
              <span className="flex-1">Copy Logo Icon SVG</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleCopyWordmark}
              className="flex items-center gap-2 hover:bg-neutral-700"
            >
              <Type className="h-4 w-4" />
              <span className="flex-1">Copy Wordmark SVG</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <DropdownMenu open={productsOpen} onOpenChange={setProductsOpen}>
            <DropdownMenuTrigger className="hover:text-white cursor-pointer flex items-center gap-1">
              Products
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 border-neutral-700"
              align="start"
            >
              <DropdownMenuItem asChild className="hover:bg-neutral-700">
                <Link to="/" className="w-full cursor-pointer flex items-center gap-2">
                  <Cloud className="h-4 w-4" />
                  Zephyr Cloud
                </Link>
              </DropdownMenuItem>
              {/*TODO: Add this back when we're ready*/}
              {/*<DropdownMenuItem asChild className="hover:bg-neutral-700">*/}
              {/*  <Link to="/products/code-elimination-performance" className="w-full cursor-pointer flex items-center gap-2">*/}
              {/*    <Zap className="h-4 w-4" />*/}
              {/*    Code Elimination & Performance*/}
              {/*  </Link>*/}
              {/*</DropdownMenuItem>*/}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu open={resourcesOpen} onOpenChange={setResourcesOpen}>
            <DropdownMenuTrigger className="hover:text-white cursor-pointer flex items-center gap-1">
              Resources
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 border-neutral-700"
              align="start"
            >
              <DropdownMenuItem asChild className="hover:bg-neutral-700">
                <Link to="/blog" className="w-full cursor-pointer flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Blog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-neutral-700">
                <Link to="/changelog" className="w-full cursor-pointer flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Changelog
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-neutral-700">
                <Link to="/press" className="w-full cursor-pointer flex items-center gap-2">
                  <Newspaper className="h-4 w-4" />
                  Press
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-neutral-700">
                <Link to="/events" className="w-full cursor-pointer flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Events
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="hover:bg-neutral-700">
                <Link to="/partners" className="w-full cursor-pointer flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Partners
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <a
            href="https://docs.zephyr-cloud.io/"
            target="_blank"
            className="text-neutral-400 hover:text-white"
          >
            Docs
          </a>
          <Link
            to="/pricing"
            className="text-neutral-400 hover:text-white"
          >
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ZephyrCloudIO"
            target="_blank"
            className="hidden sm:flex items-center gap-2 text-sm border border-neutral-700 px-3 py-1.5 rounded-md hover:border-neutral-500"
          >
            <Github size={16} className="text-white" />
            <span className="text-white">GitHub</span>
          </a>
          <a
            href="https://www.npmjs.com/org/zephyrcloud"
            target="_blank"
            className="hidden sm:flex items-center gap-2 text-sm border border-neutral-700 px-3 py-1.5 rounded-md hover:border-neutral-500"
          >
            <Package size={16} className="text-white" />
            <span className="text-white">npm</span>
          </a>
          <Button
            variant="outline"
            className="text-sm h-9"
          >
            <a href="https://app.zephyr-cloud.io/" target="_blank">
              Get Started
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};
