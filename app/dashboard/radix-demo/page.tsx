"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { ChevronDown, Download, Mail, Settings, User } from "lucide-react";
import { useState } from "react";

export default function RadixDemoPage() {
  const [progress, setProgress] = useState(13);
  const [sliderValue, setSliderValue] = useState([50]);
  const [toastOpen, setToastOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState<
    boolean | "indeterminate"
  >(false);
  const [switchChecked, setSwitchChecked] = useState(false);

  return (
    <div className="container mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Radix UI Components Demo
        </h1>
        <p className="text-muted-foreground">
          A showcase of accessible and customizable UI components built with
          Radix UI
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dialog */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Dialog</h3>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Enter your name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="Enter your email" type="email" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Card>

        {/* Dropdown Menu */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Dropdown Menu</h3>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Actions <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Messages
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>

        {/* Tabs */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Tabs</h3>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Make changes to your account here.
              </p>
            </TabsContent>
            <TabsContent value="password" className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Change your password here.
              </p>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Checkbox */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Checkbox</h3>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={checkboxChecked}
              onCheckedChange={setCheckboxChecked}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
        </Card>

        {/* Switch */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Switch</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="airplane-mode"
              checked={switchChecked}
              onCheckedChange={setSwitchChecked}
            />
            <label
              htmlFor="airplane-mode"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Airplane mode
            </label>
          </div>
        </Card>

        {/* Toast */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Toast</h3>
          <ToastProvider>
            <Button onClick={() => setToastOpen(true)} variant="outline">
              Show Toast
            </Button>
            {toastOpen && (
              <Toast>
                <div className="grid gap-1">
                  <ToastTitle>Scheduled: Catch up</ToastTitle>
                  <ToastDescription>
                    Friday, February 10, 2023 at 3:00 PM
                  </ToastDescription>
                </div>
                <ToastAction asChild altText="Goto schedule to undo">
                  <Button variant="outline" size="sm">
                    Undo
                  </Button>
                </ToastAction>
              </Toast>
            )}
            <ToastViewport />
          </ToastProvider>
        </Card>

        {/* Tooltip */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Tooltip</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline">Hover me</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>This is a tooltip</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Card>

        {/* Popover */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Popover</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Open Popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Dimensions</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="width">Width</label>
                    <Input
                      id="width"
                      defaultValue="100%"
                      className="col-span-2 h-8"
                    />
                  </div>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <label htmlFor="maxWidth">Max. width</label>
                    <Input
                      id="maxWidth"
                      defaultValue="300px"
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </Card>

        {/* Accordion */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Accordion</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Progress */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Progress</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
            <Button
              onClick={() => setProgress(Math.min(100, progress + 10))}
              size="sm"
            >
              Increase
            </Button>
          </div>
        </Card>

        {/* Slider */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Slider</h3>
          <div className="space-y-4">
            <div className="text-sm">Value: {sliderValue[0]}</div>
            <Slider
              value={sliderValue}
              onValueChange={setSliderValue}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </Card>

        {/* Select */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Select</h3>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="grape">Grape</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Separator */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold">Separator</h3>
          <div className="space-y-4">
            <div className="text-sm">Above separator</div>
            <Separator />
            <div className="text-sm">Below separator</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
