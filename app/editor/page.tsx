import EditorNotAvailable from "@/components/shared/NotAvailable"
import MockupEditor from "@/components/shared/Editor.v2"
import { siteConfig } from "@/config/config"

export default function EditorPage() {
  return siteConfig.isEditorActive ? <MockupEditor /> : <EditorNotAvailable />
}