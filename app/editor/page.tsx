"use client";

import EditorNotAvailable from "@/components/shared/NotAvailable";
import MockupEditor from "@/components/shared/Editor";
import { siteConfig } from "@/config/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/layout/Header";

export default function EditorPage() {
  // return siteConfig.isEditorActive ? <MockupEditor /> : <EditorNotAvailable />;
  return (
    <div className="min-h-screen flex flex-col w-full max-w-screen-sm lg:max-w-screen-lg mx-auto">
      <Header />

      <Tabs defaultValue="screenshot">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="screenshot">Screenshot</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>

        <TabsContent value="screenshot" className="space-y-4 pt-3">
          {siteConfig.isEditorActive ? (
            <MockupEditor />
          ) : (
            <EditorNotAvailable />
          )}
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          <EditorNotAvailable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
