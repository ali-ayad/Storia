# Fantasy Story Website - Design System Documentation

## Overview
This design system documentation provides all the specifications needed to recreate the fantasy story website design in Figma or any other design tool.

## Color Palette

### Primary Colors
- **Background**: `#0D0D0D` (True Black - oklch(0.05 0 0))
- **Foreground**: `#FAFAFA` (Near White - oklch(0.98 0 0))
- **Primary**: `#DC7633` (Warm Orange - oklch(0.7 0.15 25))
- **Accent**: `#F1C40F` (Golden Yellow - oklch(0.75 0.15 65))

### Surface Colors
- **Card Background**: `#141414` (Dark Gray - oklch(0.08 0 0))
- **Secondary**: `#262626` (Medium Dark Gray - oklch(0.15 0 0))
- **Muted**: `#1F1F1F` (Subtle Dark Gray - oklch(0.12 0 0))
- **Border**: `#333333` (Border Gray - oklch(0.2 0 0))

### Text Colors
- **Primary Text**: `#FAFAFA` (Near White)
- **Secondary Text**: `#999999` (Muted Gray - oklch(0.6 0 0))
- **On Primary**: `#0D0D0D` (Black text on orange buttons)

### Status Colors
- **Destructive**: `#E74C3C` (Red - oklch(0.6 0.22 25))

## Typography

### Font Family
- **Primary**: DM Sans (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif
- **Monospace**: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas

### Font Sizes & Weights
- **Heading 1**: 48px, Font Weight 700 (Bold)
- **Heading 2**: 36px, Font Weight 600 (Semi-Bold)
- **Heading 3**: 24px, Font Weight 600 (Semi-Bold)
- **Body Large**: 18px, Font Weight 400 (Regular)
- **Body**: 16px, Font Weight 400 (Regular)
- **Body Small**: 14px, Font Weight 400 (Regular)
- **Caption**: 12px, Font Weight 400 (Regular)

### Line Heights
- **Headings**: 1.2
- **Body Text**: 1.6
- **Captions**: 1.4

## Spacing System

### Base Unit: 4px

### Spacing Scale
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px
- **3xl**: 64px
- **4xl**: 96px

### Component Spacing
- **Card Padding**: 24px
- **Button Padding**: 12px 24px
- **Section Margins**: 64px (vertical), 24px (horizontal)
- **Grid Gaps**: 24px

## Border Radius

### Radius Scale
- **Small**: 8px
- **Medium**: 10px
- **Large**: 12px
- **Extra Large**: 16px
- **Default**: 12px

## Component Specifications

### Navigation Bar
- **Height**: 80px
- **Background**: `#0D0D0D` (True Black)
- **Border Bottom**: 1px solid `#333333`
- **Logo Font Size**: 24px, Weight 700
- **Menu Items**: 16px, Weight 500
- **Padding**: 0 24px

### Story Cards
- **Dimensions**: 300px × 400px
- **Background**: `#141414`
- **Border Radius**: 12px
- **Padding**: 0 (image fills card)
- **Text Overlay**: Bottom 60px, Padding 20px
- **Hover Effect**: Scale 1.05, Transition 0.3s

### Buttons
- **Primary Button**: 
  - Background: `#DC7633`
  - Text: `#0D0D0D`
  - Padding: 12px 24px
  - Border Radius: 8px
  - Font Weight: 500
- **Secondary Button**:
  - Background: `#262626`
  - Text: `#FAFAFA`
  - Border: 1px solid `#333333`

### Author Cards
- **Profile Image**: 80px × 80px, Border Radius 50%
- **Card Background**: `#141414`
- **Padding**: 24px
- **Border Radius**: 12px

### Form Elements
- **Input Fields**:
  - Background: `#1F1F1F`
  - Border: 1px solid `#333333`
  - Border Radius: 8px
  - Padding: 12px 16px
  - Focus Border: `#DC7633`

## Layout Grid

### Container
- **Max Width**: 1200px
- **Padding**: 0 24px
- **Margin**: 0 auto

### Grid System
- **Columns**: 12-column grid
- **Gutter**: 24px
- **Breakpoints**:
  - Mobile: 0-768px
  - Tablet: 768px-1024px
  - Desktop: 1024px+

### Story Grid
- **Desktop**: 4 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column

## Shadows & Effects

### Box Shadows
- **Card Hover**: `0 8px 32px rgba(0, 0, 0, 0.3)`
- **Button Hover**: `0 4px 16px rgba(220, 118, 51, 0.2)`
- **Modal**: `0 16px 64px rgba(0, 0, 0, 0.5)`

### Transitions
- **Default**: 0.3s ease-in-out
- **Hover Effects**: 0.2s ease-out
- **Page Transitions**: 0.5s ease-in-out

## Icons

### Icon Library
- Lucide React icons
- **Size**: 20px (default), 24px (large)
- **Stroke Width**: 2px
- **Color**: Inherits from parent

### Common Icons
- Search: `Search`
- User: `User`
- Menu: `Menu`
- Star: `Star`
- Heart: `Heart`
- Book: `Book`

## Images & Media

### Image Specifications
- **Story Cover Images**: 300px × 200px (3:2 ratio)
- **Author Avatars**: 80px × 80px (1:1 ratio)
- **Hero Images**: 1200px × 600px (2:1 ratio)
- **Format**: WebP preferred, PNG/JPG fallback

### Image Treatment
- **Border Radius**: 8px for story covers
- **Overlay**: Dark gradient for text readability
- **Hover Effect**: Slight zoom (1.05x scale)

## Accessibility

### Contrast Ratios
- **Normal Text**: 4.5:1 minimum
- **Large Text**: 3:1 minimum
- **UI Elements**: 3:1 minimum

### Focus States
- **Focus Ring**: 2px solid `#DC7633` with 2px offset
- **Focus Visible**: Only on keyboard navigation

## Animation Guidelines

### Micro-interactions
- **Button Hover**: Scale 1.02, Color transition
- **Card Hover**: Scale 1.05, Shadow increase
- **Loading States**: Subtle pulse animation

### Page Transitions
- **Fade In**: 0.3s ease-out
- **Slide Up**: 0.4s ease-out with 20px offset

## Usage Notes

### Figma Implementation Tips
1. Create color styles for all color tokens
2. Set up text styles for each typography scale
3. Create component variants for different button states
4. Use auto-layout for responsive components
5. Set up grid styles for consistent spacing

### Design Tokens
All colors are defined using OKLCH color space for better perceptual uniformity and future-proofing. Convert to hex values as needed for Figma compatibility.
