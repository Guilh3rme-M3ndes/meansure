"use client";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { useSettingsStore } from "../store/useSettingsStore";

type Provider = {
  label: string;
  value: string;
};

const providers: Provider[] = [
  { label: "Gemini", value: "gemini" },
  { label: "OpenAI", value: "openai" },
];

export function AppSidebar() {
  const { apiKey, provider, setApiKey, setProvider } = useSettingsStore();

  const { setOpen } = useSidebar();

  return (
    <Sidebar side="right">
      <SidebarHeader className="font-bold p-4 flex flex-row items-center justify-between">
        <span>API Configuration</span>
        <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="flex flex-col gap-y-4 p-4">
          <div className="flex flex-col gap-y-2">
            <p className="text-sm text-muted-foreground">
              Select your provider:
            </p>
            <Select
              name={"provider"}
              value={provider}
              onValueChange={(val) => setProvider(val || "")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose LLM" />
              </SelectTrigger>
              <SelectContent
                side="bottom"
                sideOffset={4}
                className="bg-white dark:bg-zinc-950 border border-border"
              >
                <SelectGroup>
                  {providers.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-y-2">
            <p className="text-sm text-muted-foreground">
              Insert your API key:
            </p>
            <Input
              name="providerKey"
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
