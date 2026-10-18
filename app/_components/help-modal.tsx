import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";

export function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
        <HelpCircle className="h-5 w-5" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>How to use it</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 text-sm text-foreground">
          <p>
            Welcome! This app does not store your data, but needs a valid API
            key in order to analyze your texts.
          </p>

          <div className="space-y-2">
            <h4 className="font-medium text-base">Step by step:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
              <li>
                <strong className="text-foreground">
                  Select your provider:
                </strong>{" "}
                <br />
                On the sidebar, select one of the available providers.
              </li>
              <li>
                <strong className="text-foreground">Set the key:</strong>
                <br />
                Insert your API Key on the API Key field. This information is
                stored ONLY on the browser.
              </li>
              <li>
                <strong className="text-foreground">Pick your mode:</strong>{" "}
                <br />
                Switch beetween <em>Rude</em> or <em>Polite</em> at the emoji
                button. You will notice that the colors and the button itself
                will change. It also affects the output: Politer sentences on
                the polite mode and meaner sentences on the rude mode.
              </li>
              <li>
                <strong className="text-foreground">Analyzing:</strong>
                <br />
                Write or paste your text at the text area near the center. It
                might take a few minutes, but the selected provider should
                analyze and return both original and suggested sentences and the
                result blocks should appear.
              </li>
              <li>
                <strong className="text-foreground">Results:</strong>
                <br />
                If everything went right untill now, you should be able to
                interact with the sentence blocks by either clicking or taping
                them if you are on a mobile device. By interacting, the current
                text may switch between the original and the suggested sentence.
                That&apos;s all and have fun!
              </li>
            </ol>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
