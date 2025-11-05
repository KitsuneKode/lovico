'use client'

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@lovico/ui/components/resizable'
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from '@lovico/ui/components/sidebar'
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  PromptInputSubmit,
  PromptInputActionMenu,
  PromptInputActionMenuTrigger,
  PromptInputActionMenuContent,
} from '@/components/ai-elements/prompt-input'

export default function ChatPage() {
  return (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader />
        <SidebarContent />
        <SidebarSeparator />
        <SidebarFooter />
      </Sidebar>
      <SidebarInset className="bg-background/50">
        <div className="container mx-auto flex h-[calc(100svh-0px)] max-w-[1400px] flex-col px-4 pt-4 pb-0 md:px-6">
          <div className="border-border/60 bg-background relative z-0 flex min-h-0 flex-1 overflow-hidden rounded-xl border shadow-sm">
            <ResizablePanelGroup direction="horizontal" className="min-h-0">
              <ResizablePanel defaultSize={50} minSize={30} className="min-w-0">
                <div className="flex h-full flex-col">
                  <div className="border-b p-3 font-medium">Chat</div>
                  <div className="flex-1 overflow-auto p-4">
                    {/* Messages list */}
                  </div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50} minSize={30} className="min-w-0">
                <div className="flex h-full flex-col">
                  <div className="border-b p-3 font-medium">Preview</div>
                  <div className="flex-1 overflow-hidden">
                    <iframe
                      title="Preview"
                      className="h-full w-full"
                      src="about:blank"
                    />
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* Bottom composer (not floating) */}
          <div className="sticky bottom-0 z-10 mt-3 w-full">
            <div className="bg-background rounded-xl border p-2 shadow-sm">
              <PromptInput
                onSubmit={() => {}}
                className="border-0 bg-transparent"
              >
                <PromptInputBody>
                  <PromptInputTextarea placeholder="Message your AI to build…" />
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputTools>
                    <PromptInputActionMenu>
                      <PromptInputActionMenuTrigger />
                      <PromptInputActionMenuContent />
                    </PromptInputActionMenu>
                  </PromptInputTools>
                  <PromptInputSubmit />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
