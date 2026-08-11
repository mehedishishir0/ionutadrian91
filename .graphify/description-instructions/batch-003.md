# Node Description Batch 4 of 4

Graphify is running in assistant/skill mode (no API key). You are the host
assistant (Claude Code / Codex / Gemini CLI). Read the prompt below and write
your JSON answer to the answer file.

## Prompt

You are documenting nodes in a knowledge graph.
For each entry below, write ONE concise factual plain-language sentence
describing what it is or does. Use only the provided context.
For a code symbol (kind=code-symbol — a function, class, or constant),
describe what the function/symbol does based on its name, source location
and neighbors — e.g. "Resolves the configured ontology profile from graphify.yaml.".
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "hr_page_page": "page()" | kind=code-symbol | source=app/hr/page.tsx:L4 | neighbors=[page.tsx]
- "next_config_nextconfig": "nextConfig" | kind=code-symbol | source=next.config.mjs:L2 | neighbors=[next.config.mjs]
- "postcss_config_config": "config" | kind=code-symbol | source=postcss.config.mjs:L2 | neighbors=[postcss.config.mjs]
- "provider_appprovider_appprovider": "AppProvider()" | kind=code-symbol | source=provider/AppProvider.tsx:L11 | neighbors=[AppProvider.tsx]
- "provider_appprovider_props": "Props" | kind=code-symbol | source=provider/AppProvider.tsx:L7 | neighbors=[AppProvider.tsx]
- "tailwind_config_config": "config" | kind=code-symbol | source=tailwind.config.ts:L3 | neighbors=[tailwind.config.ts]
- "ui_avatar_avatarbadge": "AvatarBadge()" | kind=code-symbol | source=components/ui/avatar.tsx:L57 | neighbors=[avatar.tsx]
- "ui_avatar_avatargroup": "AvatarGroup()" | kind=code-symbol | source=components/ui/avatar.tsx:L73 | neighbors=[avatar.tsx]
- "ui_avatar_avatargroupcount": "AvatarGroupCount()" | kind=code-symbol | source=components/ui/avatar.tsx:L86 | neighbors=[avatar.tsx]
- "ui_card_cardaction": "CardAction()" | kind=code-symbol | source=components/ui/card.tsx:L59 | neighbors=[card.tsx]
- "ui_card_carddescription": "CardDescription()" | kind=code-symbol | source=components/ui/card.tsx:L49 | neighbors=[card.tsx]
- "ui_card_cardfooter": "CardFooter()" | kind=code-symbol | source=components/ui/card.tsx:L82 | neighbors=[card.tsx]
- "ui_dialog_dialogclose": "DialogClose()" | kind=code-symbol | source=components/ui/dialog.tsx:L22 | neighbors=[dialog.tsx]
- "ui_dialog_dialogfooter": "DialogFooter()" | kind=code-symbol | source=components/ui/dialog.tsx:L93 | neighbors=[dialog.tsx]
- "ui_dialog_dialogoverlay": "DialogOverlay()" | kind=code-symbol | source=components/ui/dialog.tsx:L26 | neighbors=[dialog.tsx]
- "ui_dialog_dialogportal": "DialogPortal()" | kind=code-symbol | source=components/ui/dialog.tsx:L18 | neighbors=[dialog.tsx]
- "ui_dialog_dialogtrigger": "DialogTrigger()" | kind=code-symbol | source=components/ui/dialog.tsx:L14 | neighbors=[dialog.tsx]
- "ui_sheet_sheetclose": "SheetClose()" | kind=code-symbol | source=components/ui/sheet.tsx:L18 | neighbors=[sheet.tsx]
- "ui_sheet_sheetdescription": "SheetDescription()" | kind=code-symbol | source=components/ui/sheet.tsx:L112 | neighbors=[sheet.tsx]
- "ui_sheet_sheetfooter": "SheetFooter()" | kind=code-symbol | source=components/ui/sheet.tsx:L92 | neighbors=[sheet.tsx]
- "ui_sheet_sheetoverlay": "SheetOverlay()" | kind=code-symbol | source=components/ui/sheet.tsx:L26 | neighbors=[sheet.tsx]
- "ui_sheet_sheetportal": "SheetPortal()" | kind=code-symbol | source=components/ui/sheet.tsx:L22 | neighbors=[sheet.tsx]
- "ui_sheet_sheettrigger": "SheetTrigger()" | kind=code-symbol | source=components/ui/sheet.tsx:L14 | neighbors=[sheet.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /home/shishir/Desktop/office/ionutadrian/dashboard/.graphify/description-instructions/batch-003.json

Keep each description factual and concise (one sentence). No markdown, no prose
outside the JSON object. It is acceptable to omit a node if context is
insufficient — but include every node you can ground confidently.

Example answer format:
```json
{
  "node_id_1": "Resolves the configured ontology profile from graphify.yaml.",
  "node_id_2": "Colonel James Barclay, an antagonist in The Crooked Man."
}
```
