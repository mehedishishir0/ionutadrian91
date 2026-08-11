# Node Description Batch 3 of 4

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

- "app_page_page": "page()" | kind=code-symbol | source=app/page.tsx:L7 | neighbors=[page.tsx]
- "calendar_page_page": "page()" | kind=code-symbol | source=app/calendar/page.tsx:L4 | neighbors=[page.tsx]
- "components_adddepartmentmodal_adddepartmentmodalprops": "AddDepartmentModalProps" | kind=code-symbol | source=app/hr/_components/AddDepartmentModal.tsx:L17 | neighbors=[AddDepartmentModal.tsx]
- "components_adddepartmentmodal_createdepartmentpayload": "CreateDepartmentPayload" | kind=code-symbol | source=app/hr/_components/AddDepartmentModal.tsx:L22 | neighbors=[AddDepartmentModal.tsx]
- "components_addteammembersheet_addteammembersheetprops": "AddTeamMemberSheetProps" | kind=code-symbol | source=app/hr/_components/AddTeamMemberSheet.tsx:L19 | neighbors=[AddTeamMemberSheet.tsx]
- "components_addteammembersheet_department": "Department" | kind=code-symbol | source=app/hr/_components/AddTeamMemberSheet.tsx:L24 | neighbors=[AddTeamMemberSheet.tsx]
- "components_calendardashboard_calendardashboard": "CalendarDashboard()" | kind=code-symbol | source=app/calendar/_components/CalendarDashboard.tsx:L16 | neighbors=[CalendarDashboard.tsx]
- "components_calendardashboard_statcards": "statCards" | kind=code-symbol | source=app/calendar/_components/CalendarDashboard.tsx:L9 | neighbors=[CalendarDashboard.tsx]
- "components_createfoldermodal_allmembers": "allMembers" | kind=code-symbol | source=app/files/_components/CreateFolderModal.tsx:L23 | neighbors=[CreateFolderModal.tsx]
- "components_createfoldermodal_createfoldermodalprops": "CreateFolderModalProps" | kind=code-symbol | source=app/files/_components/CreateFolderModal.tsx:L56 | neighbors=[CreateFolderModal.tsx]
- "components_dashboardheader_dashboardheader": "DashboardHeader()" | kind=code-symbol | source=components/DashboardHeader.tsx:L8 | neighbors=[DashboardHeader.tsx]
- "components_deleteconfirmationmodal_deleteconfirmationmodalprops": "DeleteConfirmationModalProps" | kind=code-symbol | source=app/hr/_components/DeleteConfirmationModal.tsx:L15 | neighbors=[DeleteConfirmationModal.tsx]
- "components_editemployeesheet_department": "Department" | kind=code-symbol | source=app/hr/_components/EditEmployeeSheet.tsx:L25 | neighbors=[EditEmployeeSheet.tsx]
- "components_editemployeesheet_editemployeesheetprops": "EditEmployeeSheetProps" | kind=code-symbol | source=app/hr/_components/EditEmployeeSheet.tsx:L19 | neighbors=[EditEmployeeSheet.tsx]
- "components_filesdashboard_filedata": "FileData" | kind=code-symbol | source=app/files/_components/FilesDashboard.tsx:L9 | neighbors=[FilesDashboard.tsx]
- "components_filesdashboard_fileiconcomponent": "FileIconComponent()" | kind=code-symbol | source=app/files/_components/FilesDashboard.tsx:L121 | neighbors=[FilesDashboard.tsx]
- "components_filesdashboard_filesdashboard": "FilesDashboard()" | kind=code-symbol | source=app/files/_components/FilesDashboard.tsx:L160 | neighbors=[FilesDashboard.tsx]
- "components_filesdashboard_folderdata": "FolderData" | kind=code-symbol | source=app/files/_components/FilesDashboard.tsx:L17 | neighbors=[FilesDashboard.tsx]
- "components_filesdashboard_initialfolders": "initialFolders" | kind=code-symbol | source=app/files/_components/FilesDashboard.tsx:L72 | neighbors=[FilesDashboard.tsx]
- "components_filesdashboard_mockfiles": "mockFiles" | kind=code-symbol | source=app/files/_components/FilesDashboard.tsx:L27 | neighbors=[FilesDashboard.tsx]
- "components_hrpage_hrpage": "HRPage()" | kind=code-symbol | source=app/hr/_components/HRPage.tsx:L24 | neighbors=[HRPage.tsx]
- "components_newassignmentmodal_initialmembers": "initialMembers" | kind=code-symbol | source=app/calendar/_components/NewAssignmentModal.tsx:L35 | neighbors=[NewAssignmentModal.tsx]
- "components_newassignmentmodal_member": "Member" | kind=code-symbol | source=app/calendar/_components/NewAssignmentModal.tsx:L27 | neighbors=[NewAssignmentModal.tsx]
- "components_newassignmentmodal_newassignmentmodalprops": "NewAssignmentModalProps" | kind=code-symbol | source=app/calendar/_components/NewAssignmentModal.tsx:L43 | neighbors=[NewAssignmentModal.tsx]
- "components_redirect_redirect": "Redirect()" | kind=code-symbol | source=components/redirect.tsx:L8 | neighbors=[redirect.tsx]
- "components_sidebar_navigationsections": "navigationSections" | kind=code-symbol | source=components/Sidebar.tsx:L20 | neighbors=[Sidebar.tsx]
- "components_viewemployeesheet_documentitem": "DocumentItem" | kind=code-symbol | source=app/hr/_components/ViewEmployeeSheet.tsx:L18 | neighbors=[ViewEmployeeSheet.tsx]
- "components_viewemployeesheet_viewemployeesheetprops": "ViewEmployeeSheetProps" | kind=code-symbol | source=app/hr/_components/ViewEmployeeSheet.tsx:L55 | neighbors=[ViewEmployeeSheet.tsx]
- "files_page_page": "page()" | kind=code-symbol | source=app/files/page.tsx:L4 | neighbors=[page.tsx]
- "home_appsataglance_appsataglance": "AppsAtAGlance()" | kind=code-symbol | source=components/home/AppsAtAGlance.tsx:L70 | neighbors=[AppsAtAGlance.tsx]
- "home_appsataglance_appsdata": "appsData" | kind=code-symbol | source=components/home/AppsAtAGlance.tsx:L11 | neighbors=[AppsAtAGlance.tsx]
- "home_enterpriseprojectoverview_enterpriseprojectoverview": "EnterpriseProjectOverview()" | kind=code-symbol | source=components/home/EnterpriseProjectOverview.tsx:L70 | neighbors=[EnterpriseProjectOverview.tsx]
- "home_enterpriseprojectoverview_getstatusbadgestyle": "getStatusBadgeStyle()" | kind=code-symbol | source=components/home/EnterpriseProjectOverview.tsx:L57 | neighbors=[EnterpriseProjectOverview.tsx]
- "home_enterpriseprojectoverview_projectitem": "ProjectItem" | kind=code-symbol | source=components/home/EnterpriseProjectOverview.tsx:L6 | neighbors=[EnterpriseProjectOverview.tsx]
- "home_enterpriseprojectoverview_projectsdata": "projectsData" | kind=code-symbol | source=components/home/EnterpriseProjectOverview.tsx:L17 | neighbors=[EnterpriseProjectOverview.tsx]
- "home_home_status_statcardsgroup": "StatCardsGroup()" | kind=code-symbol | source=components/home/Home-status.tsx:L35 | neighbors=[Home-status.tsx]
- "home_home_status_statsdata": "statsData" | kind=code-symbol | source=components/home/Home-status.tsx:L4 | neighbors=[Home-status.tsx]
- "home_recentactivity_activities": "activities" | kind=code-symbol | source=components/home/RecentActivity.tsx:L22 | neighbors=[RecentActivity.tsx]
- "home_recentactivity_activityitem": "ActivityItem" | kind=code-symbol | source=components/home/RecentActivity.tsx:L13 | neighbors=[RecentActivity.tsx]
- "home_recentactivity_recentactivity": "RecentActivity()" | kind=code-symbol | source=components/home/RecentActivity.tsx:L73 | neighbors=[RecentActivity.tsx]

## Instructions

Write a single JSON object mapping each node id to a one-sentence description
to: /home/shishir/Desktop/office/ionutadrian/dashboard/.graphify/description-instructions/batch-002.json

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
