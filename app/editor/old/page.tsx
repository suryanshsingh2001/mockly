import EditorNotAvailable from "@/components/shared/NotAvailable"
import MockupEditor from "@/components/shared/Editor"
import { siteConfig } from "@/config/config"

export default function EditorPage() {
  return siteConfig.isEditorActive ? <MockupEditor /> : <EditorNotAvailable />
}