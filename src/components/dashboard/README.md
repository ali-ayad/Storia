# Dashboard Components

This directory contains all the dashboard-related components for the Storia platform.

## Structure

### Layout Components
- **DashboardLayout.tsx** - Main dashboard layout with sidebar navigation and responsive design
- **MainContent.tsx** - Dashboard overview/home page content

### Form Components (`/forms/`)
- **StoryForm.tsx** - Reusable form for creating/editing stories
- **AuthorForm.tsx** - Reusable form for creating/editing authors

### Table Components (`/tables/`)
- **DataTable.tsx** - Generic, reusable data table component with sorting, actions, and customizable columns

### Utility Components
- **StatsCards.tsx** - Reusable stats cards component for displaying metrics with trends

## Features

### Dashboard Layout
- ✅ Responsive sidebar navigation
- ✅ Mobile-friendly with collapsible sidebar
- ✅ Organized navigation with categories and sub-pages
- ✅ Quick actions in header
- ✅ Clean, modern design

### Navigation Structure
- **Overview** - Dashboard home with stats and recent activity
- **Stories** - Manage stories with sub-pages:
  - All Stories (list view with data table)
  - Add Story (form for creating new stories)
  - Categories (story categorization)
- **Authors** - Manage authors with sub-pages:
  - All Authors (list view with data table)
  - Add Author (form for creating new authors)
- **Analytics** - Platform performance metrics
- **Settings** - System configuration

### Reusable Components
- **DataTable**: Generic table with sorting, actions, custom column rendering
- **StoryForm**: Complete story creation/editing form with validation
- **AuthorForm**: Complete author creation/editing form with validation
- **StatsCards**: Metrics display with trend indicators

### Key Features
- 🎨 Modern, clean UI with consistent design
- 📱 Fully responsive design
- 🔄 Reusable components for scalability
- 📊 Data visualization with stats and trends
- ⚡ Fast, efficient data tables
- 🎯 Intuitive navigation structure
- 🛠️ Easy to extend and customize

## Usage

### Adding New Pages
1. Create new page in `/pages/dashboard/[section]/`
2. Use `DashboardLayout` as wrapper
3. Follow existing patterns for consistency

### Adding New Forms
1. Create form component in `/forms/`
2. Follow existing form patterns
3. Use shared UI components from `/ui/`

### Adding New Data Tables
1. Use the generic `DataTable` component
2. Define columns with custom renderers
3. Add action handlers as needed

## Future Enhancements
- [ ] Add search and filtering to data tables
- [ ] Implement pagination for large datasets
- [ ] Add bulk actions for data management
- [ ] Create more specialized form components
- [ ] Add data export functionality
- [ ] Implement real-time updates
- [ ] Add keyboard shortcuts for power users
