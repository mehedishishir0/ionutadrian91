# Node Description Batch 2 of 4

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
For an entity node (any other kind — e.g. a person, place, event, object),
describe what the entity is and its role, grounded in its type, its
relations (neighbors) and the provided citations/evidence — e.g.
"Lady Carfax, a wealthy heiress who disappears en route to Lausanne.".
Ground entity descriptions in the citations/evidence when present; do not
speculate beyond the context, so a node with no supporting context may be
left out of the reply.
Write every description in English (en). Do not switch languages.
No marketing language.
Respond ONLY with a JSON object mapping each node id (as a string) to its
one-sentence description — no prose, no markdown fences.

- "ui_skeleton": "skeleton.tsx" | kind=code-symbol | source=components/ui/skeleton.tsx:L1 | neighbors=[a901de0 done hr management functionality, HRPage.tsx, ViewEmployeeSheet.tsx, utils.ts, cn(), Skeleton()]
- "branch:repo:github.com/mehedishishir0/ionutadrian91#main": "main" | kind=Branch | source=git | neighbors=[6671644 solve, 891ca79 make hr and others pages, a901de0 done hr management functionality, ed55b7f first commit, f53db76 solve]
- "commit:repo:github.com/mehedishishir0/ionutadrian91@6671644387509e09a26b92c0905abc6db9a1b9b1": "6671644 solve" | kind=Commit | source=git | neighbors=[main, AddTeamMemberSheet.tsx, EditEmployeeSheet.tsx, ViewEmployeeSheet.tsx, a901de0 done hr management functionality]
- "ui_dialog_dialog": "Dialog()" | kind=code-symbol | source=components/ui/dialog.tsx:L10 | neighbors=[AddDepartmentModal.tsx, CreateFolderModal.tsx, DeleteConfirmationModal.tsx, NewAssignmentModal.tsx, dialog.tsx]
- "ui_dialog_dialogcontent": "DialogContent()" | kind=code-symbol | source=components/ui/dialog.tsx:L42 | neighbors=[AddDepartmentModal.tsx, CreateFolderModal.tsx, DeleteConfirmationModal.tsx, NewAssignmentModal.tsx, dialog.tsx]
- "ui_dialog_dialogheader": "DialogHeader()" | kind=code-symbol | source=components/ui/dialog.tsx:L83 | neighbors=[AddDepartmentModal.tsx, CreateFolderModal.tsx, DeleteConfirmationModal.tsx, NewAssignmentModal.tsx, dialog.tsx]
- "ui_dialog_dialogtitle": "DialogTitle()" | kind=code-symbol | source=components/ui/dialog.tsx:L120 | neighbors=[AddDepartmentModal.tsx, CreateFolderModal.tsx, DeleteConfirmationModal.tsx, NewAssignmentModal.tsx, dialog.tsx]
- "ui_textarea_textarea": "Textarea()" | kind=code-symbol | source=components/ui/textarea.tsx:L5 | neighbors=[AddDepartmentModal.tsx, AddTeamMemberSheet.tsx, EditEmployeeSheet.tsx, NewAssignmentModal.tsx, textarea.tsx]
- "provider_appprovider": "AppProvider.tsx" | kind=code-symbol | source=provider/AppProvider.tsx:L1 | neighbors=[layout.tsx, f53db76 solve, AppProvider(), Props]
- "ui_badge_badge": "Badge()" | kind=code-symbol | source=components/ui/badge.tsx:L30 | neighbors=[ViewEmployeeSheet.tsx, EnterpriseProjectOverview.tsx, badge.tsx, badgeVariants]
- "ui_sheet_sheet": "Sheet()" | kind=code-symbol | source=components/ui/sheet.tsx:L10 | neighbors=[AddTeamMemberSheet.tsx, EditEmployeeSheet.tsx, ViewEmployeeSheet.tsx, sheet.tsx]
- "ui_sheet_sheetcontent": "SheetContent()" | kind=code-symbol | source=components/ui/sheet.tsx:L39 | neighbors=[AddTeamMemberSheet.tsx, EditEmployeeSheet.tsx, ViewEmployeeSheet.tsx, sheet.tsx]
- "ui_sheet_sheetheader": "SheetHeader()" | kind=code-symbol | source=components/ui/sheet.tsx:L82 | neighbors=[AddTeamMemberSheet.tsx, EditEmployeeSheet.tsx, ViewEmployeeSheet.tsx, sheet.tsx]
- "ui_sheet_sheettitle": "SheetTitle()" | kind=code-symbol | source=components/ui/sheet.tsx:L102 | neighbors=[AddTeamMemberSheet.tsx, EditEmployeeSheet.tsx, ViewEmployeeSheet.tsx, sheet.tsx]
- "calendar_page": "page.tsx" | kind=code-symbol | source=app/calendar/page.tsx:L1 | neighbors=[page(), CalendarDashboard.tsx, 891ca79 make hr and others pages]
- "files_page": "page.tsx" | kind=code-symbol | source=app/files/page.tsx:L1 | neighbors=[891ca79 make hr and others pages, FilesDashboard.tsx, page()]
- "hr_page": "page.tsx" | kind=code-symbol | source=app/hr/page.tsx:L1 | neighbors=[891ca79 make hr and others pages, HRPage.tsx, page()]
- "next_config": "next.config.mjs" | kind=code-symbol | source=next.config.mjs:L1 | neighbors=[a901de0 done hr management functionality, f53db76 solve, nextConfig]
- "tailwind_config": "tailwind.config.ts" | kind=code-symbol | source=tailwind.config.ts:L1 | neighbors=[a901de0 done hr management functionality, f53db76 solve, config]
- "ui_dialog_dialogdescription": "DialogDescription()" | kind=code-symbol | source=components/ui/dialog.tsx:L133 | neighbors=[DeleteConfirmationModal.tsx, NewAssignmentModal.tsx, dialog.tsx]
- "ui_skeleton_skeleton": "Skeleton()" | kind=code-symbol | source=components/ui/skeleton.tsx:L3 | neighbors=[HRPage.tsx, ViewEmployeeSheet.tsx, skeleton.tsx]
- "commit:repo:github.com/mehedishishir0/ionutadrian91@ed55b7f4185f0d70a957962f3ae1de4233e581b9": "ed55b7f first commit" | kind=Commit | source=git | neighbors=[main, f53db76 solve]
- "components_adddepartmentmodal_adddepartmentmodal": "AddDepartmentModal()" | kind=code-symbol | source=app/hr/_components/AddDepartmentModal.tsx:L27 | neighbors=[AddDepartmentModal.tsx, HRPage.tsx]
- "components_addteammembersheet_addteammembersheet": "AddTeamMemberSheet()" | kind=code-symbol | source=app/hr/_components/AddTeamMemberSheet.tsx:L33 | neighbors=[AddTeamMemberSheet.tsx, HRPage.tsx]
- "components_createfoldermodal_createfoldermodal": "CreateFolderModal()" | kind=code-symbol | source=app/files/_components/CreateFolderModal.tsx:L62 | neighbors=[CreateFolderModal.tsx, FilesDashboard.tsx]
- "components_createfoldermodal_member": "Member" | kind=code-symbol | source=app/files/_components/CreateFolderModal.tsx:L16 | neighbors=[CreateFolderModal.tsx, FilesDashboard.tsx]
- "components_deleteconfirmationmodal_deleteconfirmationmodal": "DeleteConfirmationModal()" | kind=code-symbol | source=app/hr/_components/DeleteConfirmationModal.tsx:L22 | neighbors=[DeleteConfirmationModal.tsx, HRPage.tsx]
- "components_editemployeesheet_editemployeesheet": "EditEmployeeSheet()" | kind=code-symbol | source=app/hr/_components/EditEmployeeSheet.tsx:L34 | neighbors=[EditEmployeeSheet.tsx, HRPage.tsx]
- "components_newassignmentmodal_newassignmentmodal": "NewAssignmentModal()" | kind=code-symbol | source=app/calendar/_components/NewAssignmentModal.tsx:L48 | neighbors=[CalendarDashboard.tsx, NewAssignmentModal.tsx]
- "components_redirect": "redirect.tsx" | kind=code-symbol | source=components/redirect.tsx:L1 | neighbors=[f53db76 solve, Redirect()]
- "components_sidebar_dashboardsidebar": "DashboardSidebar()" | kind=code-symbol | source=components/Sidebar.tsx:L54 | neighbors=[layout.tsx, Sidebar.tsx]
- "components_viewemployeesheet_employeedetails": "EmployeeDetails" | kind=code-symbol | source=app/hr/_components/ViewEmployeeSheet.tsx:L28 | neighbors=[HRPage.tsx, ViewEmployeeSheet.tsx]
- "components_viewemployeesheet_viewemployeesheet": "ViewEmployeeSheet()" | kind=code-symbol | source=app/hr/_components/ViewEmployeeSheet.tsx:L62 | neighbors=[HRPage.tsx, ViewEmployeeSheet.tsx]
- "postcss_config": "postcss.config.mjs" | kind=code-symbol | source=postcss.config.mjs:L1 | neighbors=[f53db76 solve, config]
- "ui_badge_badgevariants": "badgeVariants" | kind=code-symbol | source=components/ui/badge.tsx:L7 | neighbors=[badge.tsx, Badge()]
- "ui_button_buttonvariants": "buttonVariants" | kind=code-symbol | source=components/ui/button.tsx:L6 | neighbors=[button.tsx, Button()]
- "ui_card_cardheader": "CardHeader()" | kind=code-symbol | source=components/ui/card.tsx:L23 | neighbors=[RecentActivity.tsx, card.tsx]
- "ui_card_cardtitle": "CardTitle()" | kind=code-symbol | source=components/ui/card.tsx:L36 | neighbors=[RecentActivity.tsx, card.tsx]
- "app_layout_metadata": "metadata" | kind=code-symbol | source=app/layout.tsx:L8 | neighbors=[layout.tsx]
- "app_layout_rootlayout": "RootLayout()" | kind=code-symbol | source=app/layout.tsx:L13 | neighbors=[layout.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /home/shishir/Desktop/office/ionutadrian/dashboard/.graphify/description-instructions/batch-001.json

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
