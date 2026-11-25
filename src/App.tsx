import { useEffect, useState, type ReactNode } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@ui-sdk/react/accordion";
import { Avatar, AvatarFallback } from "@ui-sdk/react/avatar";
import { Button } from "@ui-sdk/react/button";
import { Checkbox, CheckboxIndicator } from "@ui-sdk/react/checkbox";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk/react/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@ui-sdk/react/field";
import { Input } from "@ui-sdk/react/input";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@ui-sdk/react/menu";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-sdk/react/popover";
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@ui-sdk/react/progress";
import { Radio, RadioGroup, RadioIndicator } from "@ui-sdk/react/radio";
import {
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlItem,
} from "@ui-sdk/react/segmented-control";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk/react/select";
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@ui-sdk/react/slider";
import { Switch, SwitchThumb } from "@ui-sdk/react/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@ui-sdk/react/tabs";
import {
  Toast,
  ToastDescription,
  ToastRegion,
  ToastTitle,
  toast,
} from "@ui-sdk/react/toast";
import { Toggle } from "@ui-sdk/react/toggle";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-sdk/react/tooltip";

type Scheme = "light" | "system" | "dark";

function useColorScheme() {
  const [scheme, setScheme] = useState<Scheme>(() => {
    try {
      return (localStorage.getItem("scheme") as Scheme) ?? "system";
    } catch {
      return "system";
    }
  });
  useEffect(() => {
    const root = document.documentElement;
    if (scheme === "system") root.removeAttribute("data-color-scheme");
    else root.setAttribute("data-color-scheme", scheme);
    try {
      localStorage.setItem("scheme", scheme);
    } catch {
      // Private windows can refuse storage; the choice just won't persist.
    }
  }, [scheme]);
  return [scheme, setScheme] as const;
}

const TOKENS = [
  ["--kit-canvas", "page"],
  ["--ui-background", "surface"],
  ["--ui-foreground", "ink"],
  ["--ui-muted", "muted"],
  ["--ui-muted-foreground", "muted text"],
  ["--ui-border", "hairline"],
  ["--kit-frame", "panel outline"],
  ["--ui-input", "control stroke"],
  ["--ui-primary", "primary"],
  ["--kit-accent-solid", "accent"],
  ["--kit-selection", "selection"],
  ["--ui-destructive", "destructive"],
  ["--kit-destructive-tint", "destructive tint"],
  ["--kit-success", "success"],
  ["--kit-success-tint", "success tint"],
] as const;

export function App() {
  const [scheme, setScheme] = useColorScheme();

  return (
    <div className="page">
      <header className="site-header">
        <span className="wordmark">
          <span className="wordmark-mark" aria-hidden="true" />
          UI SDK kit
        </span>
        <nav className="site-nav" aria-label="Sections">
          <a href="#tokens">Tokens</a>
          <a href="#type">Type</a>
          <a href="#components">Components</a>
        </nav>
        <SegmentedControl
          aria-label="Colour scheme"
          value={scheme}
          onValueChange={(value) => setScheme(value as Scheme)}
        >
          <SegmentedControlIndicator />
          <SegmentedControlItem value="light">Light</SegmentedControlItem>
          <SegmentedControlItem value="system">System</SegmentedControlItem>
          <SegmentedControlItem value="dark">Dark</SegmentedControlItem>
        </SegmentedControl>
      </header>

      <section className="hero">
        <h1>
          UI SDK in its own default style, set the way ui-sdk.dev sets it.
        </h1>
        <p className="kit-lede">
          The components come from <code>@ui-sdk/react</code> and are drawn by
          its <code>web.css</code>. This kit re-points that stylesheet's tokens
          at the website: Geist, square corners, ink strokes and one blue.
        </p>
        <div className="cta-row">
          <Button data-variant="solid" data-size="lg">
            Read the docs
          </Button>
          <Button data-variant="accent" data-size="lg">
            Copy the import
          </Button>
        </div>
      </section>

      <section className="section" id="tokens">
        <div className="section-head">
          <p className="kit-eyebrow">Tokens</p>
          <h2>Colour</h2>
        </div>
        <div className="swatches">
          {TOKENS.map(([token, name]) => (
            <div className="kit-panel swatch" key={token}>
              <div
                className="swatch-chip"
                style={{ background: `var(${token})` }}
              />
              <div>
                <div>{name}</div>
                <div className="swatch-name" data-case="keep">
                  {token}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="type">
        <div className="section-head">
          <p className="kit-eyebrow">Type</p>
          <h2>Geist and Geist Mono</h2>
        </div>
        <div className="kit-panel type-scale">
          <h1>Display, 72</h1>
          <h2>Heading two, 40</h2>
          <h3>Heading three, 24</h3>
          <p className="kit-lede">Lede, 20. The paragraph under a heading.</p>
          <p>
            Body, 16. Components set themselves at 14 through{" "}
            <code>--ui-font-size</code>, and links take a{" "}
            <a href="#type">pale underline</a> that darkens on hover.
          </p>
          <p className="kit-eyebrow">Eyebrow, mono 11</p>
        </div>
      </section>

      <section className="section" id="components">
        <div className="section-head">
          <p className="kit-eyebrow">Components</p>
          <h2>Every part from UI SDK, untouched</h2>
        </div>
        <div className="specimens">
          <Specimen label="Button">
            <Button>Default</Button>
            <Button data-variant="solid">Solid</Button>
            <Button data-variant="accent">Accent</Button>
            <Button data-variant="destructive">Delete</Button>
            <Button disabled>Disabled</Button>
          </Specimen>

          <Specimen label="Toggle">
            <Toggle>Bold</Toggle>
            <Toggle defaultPressed>Italic</Toggle>
          </Specimen>

          <Specimen label="Field">
            <div className="stack">
              <Field name="username">
                <FieldLabel>Username</FieldLabel>
                <Input autoComplete="username" placeholder="ada" required />
                <FieldDescription>This is your public name.</FieldDescription>
                <FieldError />
              </Field>
            </div>
          </Specimen>

          <Specimen label="Select">
            <div className="stack">
              <Select placeholder="Select an environment">
                <SelectLabel>Environment</SelectLabel>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Specimen>

          <Specimen label="Checkbox and switch">
            <div className="stack">
              <label>
                <Checkbox defaultChecked>
                  <CheckboxIndicator />
                </Checkbox>
                Email me when it ships
              </label>
              <label>
                <Switch>
                  <SwitchThumb />
                </Switch>
                Airplane mode
              </label>
            </div>
          </Specimen>

          <Specimen label="Radio">
            <div className="stack">
              <Field>
                <FieldLabel>Shipping speed</FieldLabel>
                <RadioGroup defaultValue="standard">
                  <label>
                    <Radio value="standard">
                      <RadioIndicator />
                    </Radio>
                    Standard
                  </label>
                  <label>
                    <Radio value="express">
                      <RadioIndicator />
                    </Radio>
                    Express
                  </label>
                </RadioGroup>
              </Field>
            </div>
          </Specimen>

          <Specimen label="Tabs">
            <div className="stack">
              <Tabs defaultValue="account">
                <TabsList aria-label="Settings">
                  <TabsTab value="account">Account</TabsTab>
                  <TabsTab value="password">Password</TabsTab>
                  <TabsTab value="billing">Billing</TabsTab>
                </TabsList>
                <TabsPanel value="account">Manage your profile.</TabsPanel>
                <TabsPanel value="password">Choose a new password.</TabsPanel>
                <TabsPanel value="billing">Update your card.</TabsPanel>
              </Tabs>
            </div>
          </Specimen>

          <Specimen label="Accordion">
            <div className="stack">
              <Accordion>
                <AccordionItem value="shipping">
                  <AccordionHeader>
                    <AccordionTrigger>Shipping</AccordionTrigger>
                  </AccordionHeader>
                  <AccordionPanel>
                    Orders arrive in five to seven days.
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem value="returns">
                  <AccordionHeader>
                    <AccordionTrigger>Returns</AccordionTrigger>
                  </AccordionHeader>
                  <AccordionPanel>
                    Send it back within thirty days.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          </Specimen>

          <Specimen label="Dialog">
            <Dialog>
              <DialogTrigger>Open dialog</DialogTrigger>
              <DialogBackdrop />
              <DialogContent>
                <DialogTitle>Project details</DialogTitle>
                <DialogDescription>
                  Review the details before continuing.
                </DialogDescription>
                <DialogClose>Close</DialogClose>
              </DialogContent>
            </Dialog>
          </Specimen>

          <Specimen label="Popover and tooltip">
            <Popover>
              <PopoverTrigger>Share</PopoverTrigger>
              <PopoverContent>
                <PopoverTitle>Share this document</PopoverTitle>
                <PopoverDescription>
                  Anyone with the link can view it.
                </PopoverDescription>
                <PopoverClose>Done</PopoverClose>
              </PopoverContent>
            </Popover>
            <Tooltip>
              <TooltipTrigger>Hover me</TooltipTrigger>
              <TooltipContent>Anyone with the link can view</TooltipContent>
            </Tooltip>
          </Specimen>

          <Specimen label="Menu">
            <Menu>
              <MenuTrigger>Actions</MenuTrigger>
              <MenuContent>
                <MenuItem value="rename">Rename</MenuItem>
                <MenuItem value="duplicate">Duplicate</MenuItem>
                <MenuItem value="archive">Archive</MenuItem>
              </MenuContent>
            </Menu>
          </Specimen>

          <Specimen label="Slider and progress">
            <div className="stack">
              <Slider defaultValue={50}>
                <SliderValue />
                <SliderControl>
                  <SliderTrack>
                    <SliderIndicator />
                    <SliderThumb aria-label="Volume" />
                  </SliderTrack>
                </SliderControl>
              </Slider>
              <Progress value={40}>
                <ProgressLabel>Uploading</ProgressLabel>
                <ProgressValue />
                <ProgressTrack>
                  <ProgressIndicator />
                </ProgressTrack>
              </Progress>
            </div>
          </Specimen>

          <Specimen label="Segmented control">
            <SegmentedControl aria-label="View" defaultValue="list">
              <SegmentedControlIndicator />
              <SegmentedControlItem value="list">List</SegmentedControlItem>
              <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
              <SegmentedControlItem value="board">Board</SegmentedControlItem>
            </SegmentedControl>
          </Specimen>

          <Specimen label="Avatar and toast">
            <Avatar>
              <AvatarFallback>AL</AvatarFallback>
            </Avatar>
            <Button
              onClick={() =>
                toast("Event created", { description: "Friday at 10:00" })
              }
            >
              Create event
            </Button>
          </Specimen>
        </div>
      </section>

      <ToastRegion>
        {() => (
          <Toast>
            <ToastTitle />
            <ToastDescription />
          </Toast>
        )}
      </ToastRegion>
    </div>
  );
}

function Specimen({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="kit-panel specimen">
      <p className="kit-eyebrow specimen-label">{label}</p>
      <div className="stage kit-grid">{children}</div>
    </div>
  );
}
