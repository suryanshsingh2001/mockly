import EditorNotAvailable from "@/components/shared/NotAvailable"
import MockupEditor from "@/components/shared/Editor.v2"
import { siteConfig } from "@/config/config"




export async function generateMetadata() {
  return {
    title: "Editor",
    description: "Design and customize mockups for your projects.",
    openGraph: {
      title: "Mockly Editor",
      description: "Design and customize mockups for your projects.",
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
        },
      ],
    },
  }
}

export default function EditorPage() {
  return siteConfig.isEditorActive ? <MockupEditor /> : <EditorNotAvailable />
}