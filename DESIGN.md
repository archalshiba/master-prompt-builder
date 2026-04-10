# Master Prompt Builder Dashboard - Design Specification

## Overview
A professional, AI-powered prompt engineering dashboard with a 4-panel layout for the complete prompt building workflow: ideation → critique → refinement → output → execution.

## Color Palette

### Dark Mode (Primary)
| Role | Color | Hex |
|------|-------|-----|
| Background Primary | Deep Space | `#0a0a0f` |
| Background Secondary | Dark Slate | `#12121a` |
| Background Tertiary | Card Dark | `#1a1a24` |
| Background Elevated | Elevated | `#22222e` |
| Border Default | Border | `#2a2a3a` |
| Border Hover | Border Hover | `#3a3a4a` |
| Text Primary | White | `#ffffff` |
| Text Secondary | Gray 400 | `#a1a1aa` |
| Text Muted | Gray 500 | `#71717a` |

### Accent Colors (AI/Vibe Coding Theme)
| Role | Color | Hex |
|------|-------|-----|
| Primary Gradient Start | Electric Purple | `#8b5cf6` |
| Primary Gradient End | Cyan Blue | `#06b6d4` |
| Secondary Purple | Violet | `#a78bfa` |
| Accent Cyan | Bright Cyan | `#22d3ee` |
| Success | Emerald | `#10b981` |
| Warning | Amber | `#f59e0b` |
| Error | Red | `#ef4444` |
| Info | Blue | `#3b82f6` |

### Light Mode
| Role | Color | Hex |
|------|-------|-----|
| Background Primary | White | `#ffffff` |
| Background Secondary | Gray 50 | `#fafafa` |
| Background Tertiary | Gray 100 | `#f4f4f5` |
| Card | White | `#ffffff` |
| Border | Gray 200 | `#e4e4e7` |
| Text Primary | Gray 900 | `#18181b` |
| Text Secondary | Gray 600 | `#52525b` |

## Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Display/H1 | Inter | 32px | 700 |
| H2 | Inter | 24px | 600 |
| H3 | Inter | 18px | 600 |
| Body | Inter | 14px | 400 |
| Small | Inter | 12px | 400 |
| Code/Mono | JetBrains Mono | 13px | 400 |

## Layout Structure

### 4-Panel Dashboard Layout
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  HEADER (56px height)                                                       │
│  [Logo] [Nav: Dashboard | Templates | History | Settings]    [Theme] [User]   │
├───────────────┬──────────────────────┬──────────────────────────────────────┤
│  LEFT PANEL   │    CENTER PANEL      │         RIGHT PANEL                  │
│  (320px)      │    (flex: 1)         │         (400px)                     │
│               │                      │                                     │
│  Idea Input   │  Refinement Options   │  Output Previews                    │
│  + AI Critique│  - Tech Stack        │  - Master Prompt (tab)              │
│               │  - Complexity        │  - PRD (tab)                        │
│               │  - Audience          │  - Plan (tab)                       │
│               │  - Tone              │  - Tasks (tab)                       │
│               │  - Format            │                                     │
│               │                      │  [Export] [Copy] [Share]            │
├───────────────┴──────────────────────┴──────────────────────────────────────┤
│  BOTTOM PANEL - Execution Trace Viewer (280px height, collapsible)           │
│  [Trace Timeline] [Step Details] [Token Usage] [Cost Estimate]             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints
| Breakpoint | Layout |
|------------|--------|
| ≥1440px | Full 4-panel layout |
| 1024-1439px | Left + Center panels, Right panel as drawer |
| 768-1023px | Single column, panels as tabs |
| <768px | Mobile stack, bottom sheet panels |

## Component Specifications

### 1. Header Component
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🎯 PromptForge    Dashboard   Templates   History   Settings     🌙   👤   │
└─────────────────────────────────────────────────────────────────────────────┘

- Logo: 32px icon + "PromptForge" text
- Navigation: Horizontal tabs, 14px, active state with gradient underline
- Theme toggle: Sun/Moon icon button with smooth transition
- User avatar: 36px circle with gradient border
```

### 2. Idea Input Card (Left Panel)
```
┌────────────────────────────────────────┐
│  💡 Your Idea                    0/500 │
│  ┌──────────────────────────────────┐  │
│  │                                  │  │
│  │  [Textarea - min 120px height]   │  │
│  │                                  │  │
│  │                                  │  │
│  └──────────────────────────────────┘  │
│  [✨ Generate Critique]                │
│                                        │
│  ──────── AI Critique ────────        │
│  ┌──────────────────────────────────┐  │
│  │ ⚠️ Risk: Consider edge cases...  │  │
│  │ ✓ Strength: Clear goal stated   │  │
│  │ 🎯 Competitor: Similar to X...  │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘

- Character counter: Right-aligned, turns red at 450+
- Generate button: Gradient background, hover lift effect
- Critique cards: Color-coded borders (amber/red/green)
```

### 3. Refinement Options (Center Panel)
```
┌──────────────────────────────────────────────────────────────┐
│  ⚙️ Refinements                                               │
│                                                               │
│  Tech Stack                    Audience                       │
│  ┌──────────────────────┐      ┌──────────────────────┐      │
│  │ React + TypeScript ▼ │      │ Developers ▼          │      │
│  └──────────────────────┘      └──────────────────────┘      │
│                                                               │
│  Complexity                  Tone                           │
│  ┌──────────────────────┐      ┌──────────────────────┐      │
│  │ ○ Beginner            │      │ ○ Professional      │      │
│  │ ● Intermediate       │      │ ○ Casual             │      │
│  │ ○ Advanced            │      │ ○ Technical          │      │
│  └──────────────────────┘      └──────────────────────┘      │
│                                                               │
│  Format                        Include                        │
│  ┌──────────────────────┐      ┌──────────────────────────┐  │
│  │ [x] Markdown         │      │ [x] Code Examples        │  │
│  │ [x] JSON             │      │ [x] Step-by-step        │  │
│  │ [ ] XML              │      │ [ ] Edge cases          │  │
│  └──────────────────────┘      │ [ ] Security notes      │  │
│                                └──────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘

- Dropdowns: Custom styled with gradient focus ring
- Radio groups: Custom circles with gradient fill when selected
- Checkboxes: Rounded squares with gradient checkmark
```

### 4. Output Preview Panel (Right Panel)
```
┌──────────────────────────────────────────────────────────────┐
│  📄 Output Preview                                           │
│  ┌────────┬────────┬────────┬────────┐                       │
│  │Master  │  PRD   │  Plan  │ Tasks  │   [📋 Copy] [⬇ Export]│
│  │Prompt  │        │        │        │                       │
│  ├────────┴────────┴────────┴────────┤                       │
│  │                                    │                       │
│  │  [Syntax-highlighted code view]    │                       │
│  │                                    │                       │
│  │  # Master Prompt                   │                       │
│  │                                    │                       │
│  │  You are an expert...              │                       │
│  │                                    │                       │
│  └────────────────────────────────────┘                       │
│                                                               │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │ 📊 Stats: 1,234 tokens | ~$0.002 | 12 sections        │ │
│  └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘

- Tab bar: Underline style, gradient on active tab
- Code preview: JetBrains Mono, dark theme with syntax colors
- Stats bar: Subtle background, monospace numbers
```

### 5. Execution Trace Panel (Bottom Panel)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  🔍 Execution Trace                                            [−] [□] [×] │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │ ●───●───●───○───○───○                                              │ │ │
│  │ Parse │Critique│Refine│Generate│Format│Done                            │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────┬─────────────────────────────────────────────────┐ │
│  │ Step: Generate        │  Processing: "Analyzing prompt structure..."    │ │
│  │ Time: 2.3s            │  Tokens: 234/1,234 (19%)                        │ │
│  │ Model: gpt-4o         │  ████████████░░░░░░░░░░░░░░░░░░                │ │
│  └───────────────────────┴─────────────────────────────────────────────────┘ │
│  [Token: $0.00234]  [Total Cost: $0.00891]                    [Clear Trace] │
└─────────────────────────────────────────────────────────────────────────────┘

- Timeline: Horizontal dots with connecting lines
- Progress: Animated gradient bar
- Collapsible: Smooth height animation
```

## Component States

### Buttons
| State | Style |
|-------|-------|
| Default | `bg-gradient-to-r from-violet-500 to-cyan-500` |
| Hover | Scale 1.02, shadow-lg, brightness 110% |
| Active | Scale 0.98 |
| Disabled | Opacity 50%, cursor not-allowed |
| Loading | Spinner icon, opacity 75% |

### Input Fields
| State | Style |
|-------|-------|
| Default | Border `#2a2a3a`, bg `#1a1a24` |
| Focus | Border gradient, ring glow |
| Error | Border red, error message below |
| Disabled | Opacity 50%, bg `#12121a` |

### Cards
| State | Style |
|-------|-------|
| Default | Border `#2a2a3a`, bg `#1a1a24` |
| Hover | Border `#3a3a4a`, translate-y -1px |
| Active | Gradient left border |

## Animation Specifications
| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Panel resize | Width/height change | 300ms | ease-out |
| Tab switch | Opacity + translate | 200ms | ease-in-out |
| Button hover | Scale + shadow | 150ms | ease-out |
| Critique appear | Fade in + slide up | 400ms | ease-out |
| Trace progress | Width increase | Linear | - |
| Modal open | Scale + fade | 250ms | ease-out |

## Icon Library
Using Lucide React icons with 20px default size:
- `Sparkles` - AI/generate actions
- `Lightbulb` - Ideas
- `AlertTriangle` - Risks
- `CheckCircle` - Strengths
- `Target` - Competitor analysis
- `Settings` - Configuration
- `FileText` - Documents
- `Code` - Code output
- `List` - Tasks
- `GitBranch` - Trace/execution
- `Copy` - Clipboard
- `Download` - Export
- `Share` - Share
- `Moon/Sun` - Theme toggle

## Accessibility
- All interactive elements have focus-visible states
- Minimum contrast ratio 4.5:1 for text
- All icons have aria-labels
- Keyboard navigation for all controls
- Screen reader announcements for state changes
- Reduced motion support via `prefers-reduced-motion`

## Tailwind CSS Classes Reference

```javascript
// Layout
'flex', 'grid', 'flex-col', 'flex-row', 'gap-4', 'p-4', 'm-4'
'h-screen', 'w-full', 'h-full', 'overflow-hidden'

// Panels
'border-r', 'border-b', 'bg-[#1a1a24]', 'border-[#2a2a3a]'

// Typography
'text-2xl', 'text-lg', 'text-sm', 'text-xs'
'font-bold', 'font-semibold', 'font-mono'
'text-white', 'text-zinc-400', 'text-zinc-500'

// Gradient
'bg-gradient-to-r', 'from-violet-500', 'to-cyan-500'
'bg-clip-text', 'text-transparent'

// Interactive
'hover:scale-[1.02]', 'hover:shadow-lg', 'transition-all'
'focus:outline-none', 'focus:ring-2', 'focus:ring-violet-500'

// Shadows
'shadow-lg', 'shadow-xl', 'shadow-violet-500/20'
```

## File Structure
```
/src
  /components
    /dashboard
      DashboardLayout.tsx
      Header.tsx
      LeftPanel.tsx
      CenterPanel.tsx
      RightPanel.tsx
      BottomPanel.tsx
    /ui
      Button.tsx
      Input.tsx
      Textarea.tsx
      Select.tsx
      Tabs.tsx
      Card.tsx
      Badge.tsx
      Switch.tsx
  /hooks
    useTheme.ts
    useDashboard.ts
  /styles
    globals.css
```
