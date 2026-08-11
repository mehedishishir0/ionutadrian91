# Graph Report - .  (2026-08-11)

## Corpus Check
- Corpus is ~23,124 words - fits in a single context window. You may not need a graph.

## Summary
- 143 nodes · 358 edges · 8 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output
- Edge kinds: imports: 115 · contains: 100 · imports_from: 80 · MODIFIES: 52 · ON_BRANCH: 5 · PARENT_OF: 4 · calls: 2


## Input Scope
- Requested: auto
- Resolved: committed (source: default-auto)
- Included files: 40 · Candidates: 48
- Excluded: 75 untracked · 36152 ignored · 0 sensitive · 0 missing committed
- Recommendation: Use --scope all or graphify.yaml inputs.corpus for a knowledge-base folder.

## Graph Freshness
- Built from Git commit: `6671644`
- Compare this hash to `git rev-parse HEAD` before trusting freshness-sensitive graph output.
## God Nodes (most connected - your core abstractions)
1. `Button()` - 15 edges
2. `cn()` - 13 edges
3. `Card()` - 8 edges
4. `CardContent()` - 8 edges
5. `Input()` - 7 edges
6. `Avatar()` - 6 edges
7. `AvatarImage()` - 6 edges
8. `AvatarFallback()` - 6 edges
9. `Label()` - 6 edges
10. `Dialog()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `6671644 solve` --ON_BRANCH--> `main`  [EXTRACTED]
  git → git  _Bridges community 3 → community 0_

## Communities

### Community 1 - "Dashboard Calendar and Overview"
Cohesion: 0.10
Nodes (12): statCards, NewAssignmentModal(), appsData, ProjectItem, projectsData, statsData, ActivityItem, activities (+4 more)

### Community 2 - "Shared UI Modals and Forms"
Cohesion: 0.14
Nodes (19): Member, initialMembers, NewAssignmentModalProps, allMembers, CreateFolderModalProps, AddDepartmentModalProps, CreateDepartmentPayload, DeleteConfirmationModalProps (+11 more)

### Community 4 - "Files and Folders Dashboard"
Cohesion: 0.18
Nodes (6): Member, CreateFolderModal(), FileData, FolderData, mockFiles, initialFolders

### Community 7 - "HR Page and Skeleton UI"
Cohesion: 0.33
Nodes (4): AddDepartmentModal(), AddTeamMemberSheet(), ViewEmployeeSheet(), Skeleton()

### Community 3 - "HR Team Member Management"
Cohesion: 0.25
Nodes (9): AddTeamMemberSheetProps, Department, EditEmployeeSheetProps, Department, EditEmployeeSheet(), SheetContent(), SheetHeader(), 6671644 solve (+1 more)

### Community 5 - "Header and Employee Details"
Cohesion: 0.24
Nodes (7): DocumentItem, EmployeeDetails, ViewEmployeeSheetProps, Avatar(), AvatarImage(), AvatarFallback(), SheetTitle()

### Community 0 - "Root Layout and Sidebar"
Cohesion: 0.09
Nodes (14): metadata, navigationSections, DashboardSidebar(), badgeVariants, Badge(), cn(), nextConfig, config (+6 more)

### Community 6 - "Shadcn Sheet Component Core"
Cohesion: 0.25
Nodes (1): Sheet()

## Knowledge Gaps
- **31 isolated node(s):** `statCards`, `Member`, `initialMembers`, `NewAssignmentModalProps`, `allMembers` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Shadcn Sheet Component Core`** (1 nodes): `Sheet()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button()` connect `Shared UI Modals and Forms` to `HR Team Member Management`, `Dashboard Calendar and Overview`, `Header and Employee Details`, `Files and Folders Dashboard`, `HR Page and Skeleton UI`, `Shadcn Sheet Component Core`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `cn()` connect `Root Layout and Sidebar` to `Shared UI Modals and Forms`, `Dashboard Calendar and Overview`, `Shadcn Sheet Component Core`, `HR Page and Skeleton UI`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **Why does `Card()` connect `Dashboard Calendar and Overview` to `Files and Folders Dashboard`, `HR Page and Skeleton UI`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `statCards`, `Member`, `initialMembers` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dashboard Calendar and Overview` be split into smaller, more focused modules?**
  _Cohesion score 0.0967741935483871 - nodes in this community are weakly interconnected._
- **Should `Shared UI Modals and Forms` be split into smaller, more focused modules?**
  _Cohesion score 0.14193548387096774 - nodes in this community are weakly interconnected._
- **Should `Root Layout and Sidebar` be split into smaller, more focused modules?**
  _Cohesion score 0.0944741532976827 - nodes in this community are weakly interconnected._