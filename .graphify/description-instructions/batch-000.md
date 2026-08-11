# Node Description Batch 1 of 4

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

- "commit:repo:github.com/mehedishishir0/ionutadrian91@891ca79164990f9a7f19f56df18aca0c06d12fff": "891ca79 make hr and others pages" | kind=Commit | source=git | neighbors=[layout.tsx, page.tsx, main, page.tsx, a901de0 done hr management functionality, AddDepartmentModal.tsx]
- "components_hrpage": "HRPage.tsx" | kind=code-symbol | source=app/hr/_components/HRPage.tsx:L1 | neighbors=[891ca79 make hr and others pages, a901de0 done hr management functionality, AddDepartmentModal.tsx, AddDepartmentModal(), AddTeamMemberSheet.tsx, AddTeamMemberSheet()]
- "components_newassignmentmodal": "NewAssignmentModal.tsx" | kind=code-symbol | source=app/calendar/_components/NewAssignmentModal.tsx:L1 | neighbors=[891ca79 make hr and others pages, CalendarDashboard.tsx, initialMembers, Member, NewAssignmentModal(), NewAssignmentModalProps]
- "components_viewemployeesheet": "ViewEmployeeSheet.tsx" | kind=code-symbol | source=app/hr/_components/ViewEmployeeSheet.tsx:L1 | neighbors=[6671644 solve, 891ca79 make hr and others pages, a901de0 done hr management functionality, HRPage.tsx, DocumentItem, EmployeeDetails]
- "components_createfoldermodal": "CreateFolderModal.tsx" | kind=code-symbol | source=app/files/_components/CreateFolderModal.tsx:L1 | neighbors=[891ca79 make hr and others pages, allMembers, CreateFolderModal(), CreateFolderModalProps, Member, avatar.tsx]
- "components_addteammembersheet": "AddTeamMemberSheet.tsx" | kind=code-symbol | source=app/hr/_components/AddTeamMemberSheet.tsx:L1 | neighbors=[6671644 solve, 891ca79 make hr and others pages, a901de0 done hr management functionality, AddTeamMemberSheet(), AddTeamMemberSheetProps, Department]
- "ui_dialog": "dialog.tsx" | kind=code-symbol | source=components/ui/dialog.tsx:L1 | neighbors=[891ca79 make hr and others pages, f53db76 solve, AddDepartmentModal.tsx, CreateFolderModal.tsx, DeleteConfirmationModal.tsx, NewAssignmentModal.tsx]
- "components_adddepartmentmodal": "AddDepartmentModal.tsx" | kind=code-symbol | source=app/hr/_components/AddDepartmentModal.tsx:L1 | neighbors=[891ca79 make hr and others pages, a901de0 done hr management functionality, AddDepartmentModal(), AddDepartmentModalProps, CreateDepartmentPayload, button.tsx]
- "components_editemployeesheet": "EditEmployeeSheet.tsx" | kind=code-symbol | source=app/hr/_components/EditEmployeeSheet.tsx:L1 | neighbors=[6671644 solve, a901de0 done hr management functionality, Department, EditEmployeeSheet(), EditEmployeeSheetProps, button.tsx]
- "ui_button": "button.tsx" | kind=code-symbol | source=components/ui/button.tsx:L1 | neighbors=[f53db76 solve, AddDepartmentModal.tsx, AddTeamMemberSheet.tsx, CalendarDashboard.tsx, CreateFolderModal.tsx, DashboardHeader.tsx]
- "ui_sheet": "sheet.tsx" | kind=code-symbol | source=components/ui/sheet.tsx:L1 | neighbors=[891ca79 make hr and others pages, AddTeamMemberSheet.tsx, EditEmployeeSheet.tsx, ViewEmployeeSheet.tsx, utils.ts, cn()]
- "ui_card": "card.tsx" | kind=code-symbol | source=components/ui/card.tsx:L1 | neighbors=[891ca79 make hr and others pages, CalendarDashboard.tsx, FilesDashboard.tsx, HRPage.tsx, AppsAtAGlance.tsx, EnterpriseProjectOverview.tsx]
- "components_filesdashboard": "FilesDashboard.tsx" | kind=code-symbol | source=app/files/_components/FilesDashboard.tsx:L1 | neighbors=[891ca79 make hr and others pages, CreateFolderModal.tsx, CreateFolderModal(), Member, FileData, FileIconComponent()]
- "commit:repo:github.com/mehedishishir0/ionutadrian91@f53db76821bc3c2973e3e246a6a51db6645ef613": "f53db76 solve" | kind=Commit | source=git | neighbors=[ed55b7f first commit, layout.tsx, page.tsx, main, 891ca79 make hr and others pages, DashboardHeader.tsx]
- "ui_button_button": "Button()" | kind=code-symbol | source=components/ui/button.tsx:L43 | neighbors=[AddDepartmentModal.tsx, AddTeamMemberSheet.tsx, CalendarDashboard.tsx, CreateFolderModal.tsx, DashboardHeader.tsx, DeleteConfirmationModal.tsx]
- "lib_utils": "utils.ts" | kind=code-symbol | source=lib/utils.ts:L1 | neighbors=[layout.tsx, f53db76 solve, Sidebar.tsx, cn(), avatar.tsx, badge.tsx]
- "ui_avatar": "avatar.tsx" | kind=code-symbol | source=components/ui/avatar.tsx:L1 | neighbors=[891ca79 make hr and others pages, CreateFolderModal.tsx, DashboardHeader.tsx, HRPage.tsx, NewAssignmentModal.tsx, ViewEmployeeSheet.tsx]
- "commit:repo:github.com/mehedishishir0/ionutadrian91@a901de0452161ad6ca48da9215f958a5f595c04c": "a901de0 done hr management functionality" | kind=Commit | source=git | neighbors=[891ca79 make hr and others pages, layout.tsx, main, 6671644 solve, AddDepartmentModal.tsx, AddTeamMemberSheet.tsx]
- "lib_utils_cn": "cn()" | kind=code-symbol | source=lib/utils.ts:L4 | neighbors=[layout.tsx, Sidebar.tsx, utils.ts, avatar.tsx, badge.tsx, button.tsx]
- "components_deleteconfirmationmodal": "DeleteConfirmationModal.tsx" | kind=code-symbol | source=app/hr/_components/DeleteConfirmationModal.tsx:L1 | neighbors=[a901de0 done hr management functionality, DeleteConfirmationModal(), DeleteConfirmationModalProps, button.tsx, Button(), dialog.tsx]
- "app_layout": "layout.tsx" | kind=code-symbol | source=app/layout.tsx:L1 | neighbors=[metadata, RootLayout(), DashboardHeader.tsx, Sidebar.tsx, DashboardSidebar(), utils.ts]
- "components_calendardashboard": "CalendarDashboard.tsx" | kind=code-symbol | source=app/calendar/_components/CalendarDashboard.tsx:L1 | neighbors=[page.tsx, 891ca79 make hr and others pages, CalendarDashboard(), statCards, NewAssignmentModal.tsx, NewAssignmentModal()]
- "home_enterpriseprojectoverview": "EnterpriseProjectOverview.tsx" | kind=code-symbol | source=components/home/EnterpriseProjectOverview.tsx:L1 | neighbors=[page.tsx, 891ca79 make hr and others pages, EnterpriseProjectOverview(), getStatusBadgeStyle(), ProjectItem, projectsData]
- "components_dashboardheader": "DashboardHeader.tsx" | kind=code-symbol | source=components/DashboardHeader.tsx:L1 | neighbors=[layout.tsx, 891ca79 make hr and others pages, f53db76 solve, DashboardHeader(), avatar.tsx, Avatar()]
- "home_recentactivity": "RecentActivity.tsx" | kind=code-symbol | source=components/home/RecentActivity.tsx:L1 | neighbors=[page.tsx, 891ca79 make hr and others pages, activities, ActivityItem, RecentActivity(), card.tsx]
- "ui_input": "input.tsx" | kind=code-symbol | source=components/ui/input.tsx:L1 | neighbors=[891ca79 make hr and others pages, AddDepartmentModal.tsx, AddTeamMemberSheet.tsx, CreateFolderModal.tsx, EditEmployeeSheet.tsx, HRPage.tsx]
- "ui_label": "label.tsx" | kind=code-symbol | source=components/ui/label.tsx:L1 | neighbors=[891ca79 make hr and others pages, AddDepartmentModal.tsx, AddTeamMemberSheet.tsx, CreateFolderModal.tsx, EditEmployeeSheet.tsx, NewAssignmentModal.tsx]
- "ui_card_card": "Card()" | kind=code-symbol | source=components/ui/card.tsx:L5 | neighbors=[CalendarDashboard.tsx, FilesDashboard.tsx, HRPage.tsx, AppsAtAGlance.tsx, EnterpriseProjectOverview.tsx, Home-status.tsx]
- "ui_card_cardcontent": "CardContent()" | kind=code-symbol | source=components/ui/card.tsx:L72 | neighbors=[CalendarDashboard.tsx, FilesDashboard.tsx, HRPage.tsx, AppsAtAGlance.tsx, EnterpriseProjectOverview.tsx, Home-status.tsx]
- "ui_textarea": "textarea.tsx" | kind=code-symbol | source=components/ui/textarea.tsx:L1 | neighbors=[891ca79 make hr and others pages, AddDepartmentModal.tsx, AddTeamMemberSheet.tsx, EditEmployeeSheet.tsx, NewAssignmentModal.tsx, utils.ts]
- "app_page": "page.tsx" | kind=code-symbol | source=app/page.tsx:L1 | neighbors=[page(), AppsAtAGlance.tsx, EnterpriseProjectOverview.tsx, Home-status.tsx, RecentActivity.tsx, 891ca79 make hr and others pages]
- "components_sidebar": "Sidebar.tsx" | kind=code-symbol | source=components/Sidebar.tsx:L1 | neighbors=[layout.tsx, 891ca79 make hr and others pages, f53db76 solve, DashboardSidebar(), navigationSections, utils.ts]
- "home_appsataglance": "AppsAtAGlance.tsx" | kind=code-symbol | source=components/home/AppsAtAGlance.tsx:L1 | neighbors=[page.tsx, 891ca79 make hr and others pages, AppsAtAGlance(), appsData, card.tsx, Card()]
- "home_home_status": "Home-status.tsx" | kind=code-symbol | source=components/home/Home-status.tsx:L1 | neighbors=[page.tsx, 891ca79 make hr and others pages, StatCardsGroup(), statsData, card.tsx, Card()]
- "ui_badge": "badge.tsx" | kind=code-symbol | source=components/ui/badge.tsx:L1 | neighbors=[891ca79 make hr and others pages, ViewEmployeeSheet.tsx, EnterpriseProjectOverview.tsx, utils.ts, cn(), Badge()]
- "ui_input_input": "Input()" | kind=code-symbol | source=components/ui/input.tsx:L6 | neighbors=[AddDepartmentModal.tsx, AddTeamMemberSheet.tsx, CreateFolderModal.tsx, EditEmployeeSheet.tsx, HRPage.tsx, NewAssignmentModal.tsx]
- "ui_avatar_avatar": "Avatar()" | kind=code-symbol | source=components/ui/avatar.tsx:L8 | neighbors=[CreateFolderModal.tsx, DashboardHeader.tsx, HRPage.tsx, NewAssignmentModal.tsx, ViewEmployeeSheet.tsx, avatar.tsx]
- "ui_avatar_avatarfallback": "AvatarFallback()" | kind=code-symbol | source=components/ui/avatar.tsx:L41 | neighbors=[CreateFolderModal.tsx, DashboardHeader.tsx, HRPage.tsx, NewAssignmentModal.tsx, ViewEmployeeSheet.tsx, avatar.tsx]
- "ui_avatar_avatarimage": "AvatarImage()" | kind=code-symbol | source=components/ui/avatar.tsx:L28 | neighbors=[CreateFolderModal.tsx, DashboardHeader.tsx, HRPage.tsx, NewAssignmentModal.tsx, ViewEmployeeSheet.tsx, avatar.tsx]
- "ui_label_label": "Label()" | kind=code-symbol | source=components/ui/label.tsx:L7 | neighbors=[AddDepartmentModal.tsx, AddTeamMemberSheet.tsx, CreateFolderModal.tsx, EditEmployeeSheet.tsx, NewAssignmentModal.tsx, label.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /home/shishir/Desktop/office/ionutadrian/dashboard/.graphify/description-instructions/batch-000.json

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
