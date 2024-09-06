import MockupEditor from "@/components/shared/NewMockupEditor"
import EditorNotAvailable from "@/components/shared/NotAvailable"
import { siteConfig } from "@/config/config"

export default function EditorPage() {
  return siteConfig.isEditorActive ? <MockupEditor /> : <EditorNotAvailable />
}