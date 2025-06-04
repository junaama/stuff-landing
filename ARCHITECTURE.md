# Application Architecture

## Pages

### Privacy Policy (`app/privacy/page.tsx`)
A client-side page that displays the privacy policy.

#### Features
- Responsive layout with max-width container
- Back button navigation
- Structured content with proper typography
- Tailwind Typography (prose) for content styling
- Semantic HTML structure

#### Dependencies
- Next.js Link component
- Tailwind CSS
- @tailwindcss/typography plugin

### Claim Username Page (`app/claim/[id]/page.tsx`)
A page for users to claim their username after joining the waitlist.

#### Features
- Displays a thank-you message to the user.
- Provides an input field for the user to choose a username.
- Shows the unique claim ID from the URL.
- Uses dynamic routing based on the `claim_id`.
- Redirects to the home screen if the `claim_id` is invalid.
- `handleClaim` function:
  - Checks if a username is already claimed before allowing a new claim.
  - Validates the `claim_id` against existing records in the `waitlist` table.
  - Updates the `claimed_username` field in the `waitlist` table for the corresponding `claim_id`.

#### Dependencies
- React
- Next.js dynamic routing (`params`)
- Next.js `useRouter` for redirection

#### Styling
- Responsive layout with a centered content area.
- Dark mode support.
- Uses Inter and Horizons fonts for consistent typography.

### Unsubscribe Page (`app/unsubscribe/page.tsx`)
A client-side page that allows users to unsubscribe from email updates.

#### Features
- Extracts `claimId` from URL parameters.
- Displays a confirmation message and an unsubscribe button.
- Handles unsubscribe action by making a `POST` request to `/api/unsubscribe`.
- Shows loading state and success/error messages.
- Handles cases for invalid `claimId`.

#### Dependencies
- `next/navigation` (`useSearchParams`)
- `react` (`useState`)
- Fetch API for API calls

#### Styling
- Centered layout with a clear call to action.
- Responsive design using Tailwind CSS.

## Components

### WaitlistForm (`components/waitlist-form.tsx`)
A form component for collecting waitlist signups.

#### Features
- Form validation for email and phone
- Toast notifications for success/error states
- Loading state handling
- Form reset after successful submission
- Privacy policy consent checkbox

#### State
- `formData`: Object containing form fields (firstName, lastName, email, phone, consent)
- `isSubmitting`: boolean - Tracks form submission state

#### Dependencies
- Supabase client for database operations
- Toast component for notifications
- Checkbox and Label components from UI library

#### Validation
- Email validation using regex
- Phone number validation using regex
- Required field validation
- Consent checkbox validation

### StampCanvas (`components/stamp-canvas.tsx`)
A client-side component that provides an interactive canvas for placing stickers.

#### Props
None

#### State
- `cursorPosition`: { x: number, y: number } - Current mouse position
- `placedStickers`: Sticker[] - Array of placed stickers
- `currentStickerIndex`: number - Index of current sticker type
- `isOverForm`: boolean - Whether cursor is over form elements
- `cursorScale`: number - Current scale of the cursor for animation
- `isFirstClick`: boolean - Whether this is the first click (for sticker0)

#### Types
```typescript
type Sticker = {
  id: number
  x: number
  y: number
  stickerType: keyof typeof stickerAssets
}
```

#### Dependencies
- `CursorSticker` component
- SVG assets from `stickers/stuff.nyc/` directory:
  - sticker0.svg (shown only on first click)
  - sticker1.svg through sticker8.svg (cycled through after first click)

#### Functionality
- Tracks mouse position and updates cursor sticker
- Places stickers on click
- Shows sticker0 on first click only
- Cycles through other stickers (sticker1-sticker8) after first click
- Animates cursor scale on click
- Disables sticker placement over form elements
- Uses SVG stickers as custom cursor and placed elements

### CursorSticker (`components/cursor-sticker.tsx`)
A component that renders a single sticker at a specific position.

#### Props
- `position`: { x: number, y: number } - The position of the sticker
- `stickerType`: keyof typeof stickerAssets - The type of sticker to display

#### State
- `isVisible`: boolean - Controls the visibility and animation of the sticker

#### Dependencies
- SVG assets from `stickers/stuff.nyc/` directory 

# Architecture Documentation

## SEO and Metadata
- **Base Configuration**:
  - Title: "getstuff.city - The marketplace built for New York"
  - Description: "Join the waitlist for getstuff.city - Connecting buyers and sellers to get sh*t sold."
  - Keywords: marketplace, New York, NYC, buying, selling, local commerce, community marketplace, waitlist
  - Author and Publisher information
  - Format detection settings for email, address, and telephone

- **Open Graph Protocol**:
  - Type: website
  - Locale: en_US
  - URL: https://getstuff.city
  - Title and description
  - Site name
  - OG Image configuration (1200x630)

- **Twitter Cards**:
  - Card type: summary_large_image
  - Title and description
  - Twitter image
  - Twitter handles for creator and site

- **Search Engine Optimization**:
  - Robots meta tags for indexing and following
  - Google bot specific configurations
  - Google site verification
  - Canonical URL
  - Category specification

- **Metadata Base**:
  - Base URL configuration for absolute URL resolution
  - Alternate canonical URL support

## Theme Support
- **Theme Provider**: Uses `next-themes` for theme management
- **Default Theme**: Light mode
- **Theme Options**: Light, Dark, System
- **Theme Persistence**: Theme preference is stored in localStorage
- **Theme Transition**: Smooth transitions between themes
- **System Theme**: Automatically matches system preferences

## Components

### Toast System
- **Location**: 
  - `components/ui/toast.tsx` (Toast component)
  - `components/ui/toaster.tsx` (Toaster provider)
  - `components/ui/use-toast.ts` (Toast hook)
- **Type**: Client Component
- **Description**: A toast notification system for displaying temporary messages
- **Features**:
  - Multiple toast types (default, destructive)
  - Customizable duration
  - Accessible notifications
  - Dark mode support
  - Automatic stacking
- **Usage**:
  ```typescript
  const { toast } = useToast()
  toast({
    title: "Title",
    description: "Description",
    variant: "default" | "destructive"
  })
  ```
- **Dependencies**:
  - Radix UI Toast primitive
  - Tailwind CSS for styling
  - next-themes for dark mode support

### WaitlistForm
- **Location**: `components/waitlist-form.tsx`
- **Type**: Client Component
- **Description**: A form component for collecting user information for the waitlist
- **Features**:
  - Form validation for email and phone number
  - Toast notifications for success/error states
  - Loading state management
  - Privacy policy consent checkbox
  - Responsive design
  - Dark mode support with appropriate color schemes
  - Pre-submit validation for existing users
- **State Management**:
  - Uses React useState for form data and submission state
  - Form data includes: firstName, lastName, email, phone, consent
- **Dependencies**:
  - @supabase/supabase-js for database operations
  - react-phone-number-input for phone number input
  - @/components/ui/use-toast for notifications
  - @/components/ui/checkbox for consent checkbox
  - @/components/ui/label for form labels
- **Validation**:
  - Email validation using regex
  - Phone number validation through react-phone-number-input
  - Required field validation
  - Consent checkbox validation
  - Pre-submit validation for existing email/phone
- **Error Handling**:
  - Specific error messages for RLS errors (code 42501)
  - General error handling with user-friendly messages
  - Console logging for debugging
  - Duplicate entry detection
- **Database Integration**:
  - Inserts user data into Supabase 'waitlist' table
  - Requires RLS policies to be set up in Supabase
  - Returns user's position in waitlist on success
  - Checks for existing email/phone before submission
- **Styling**:
  - Dark mode compatible input fields with appropriate contrast
  - Dark mode compatible buttons with hover states
  - Dark mode compatible text colors
  - Consistent border colors in both themes

### Privacy Policy Page
- **Location**: `app/privacy/page.tsx`
- **Type**: Server Component
- **Description**: Displays the privacy policy with a back button
- **Features**:
  - Responsive layout
  - Back button navigation
  - Semantic HTML structure
  - Tailwind Typography for content styling
  - Dark mode support with appropriate color schemes
- **Dependencies**:
  - @/components/ui/button for back button
  - tailwindcss/typography for content styling
- **Styling**:
  - Dark mode compatible prose styles
  - Dark mode compatible headings and text
  - Dark mode compatible background colors
  - Consistent spacing and typography

### StampCanvas
- **Location**: `components/stamp-canvas.tsx`
- **Type**: Client Component
- **Description**: An interactive canvas for placing stickers with a custom cursor
- **Features**:
  - Custom cursor with sticker preview
  - Click to place stickers
  - Sticker cycling on placement
  - Form element detection
  - Mobile device detection and disabling
  - Responsive design considerations
- **State Management**:
  - Cursor position tracking
  - Placed stickers array
  - Current sticker index
  - Form hover state
  - Cursor scale for animation
  - Mobile device detection
- **Mobile Detection**:
  - User agent detection
  - Screen size detection (max-width: 768px)
  - Touch capability detection
  - Responsive behavior
  - Automatic disabling on mobile devices
- **Dependencies**:
  - SVG assets from stickers directory
  - CursorSticker component
- **Performance Optimizations**:
  - Conditional event listeners
  - Mobile-specific rendering
  - Cleanup on unmount
- **Accessibility**:
  - Disabled on touch devices
  - Form element interaction handling
  - Proper cursor management

## Database Schema

### Waitlist Table
- **Table Name**: `waitlist`
- **Columns**:
  - id (auto-incrementing primary key)
  - first_name (text)
  - last_name (text)
  - email (text)
  - phone_number (text)
  - created_at (timestamp with time zone)
- **Security**:
  - Row Level Security (RLS) enabled
  - Insert policy for all users
  - Optional read access policy

## Environment Variables
- NEXT_PUBLIC_SUPABASE_URL: Supabase project URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY: Supabase anonymous key

## Styling
- Uses Tailwind CSS for styling
- Custom rounded corners and padding
- Responsive design with max-width containers
- Consistent font usage (Inter)
- Hover and focus states for interactive elements
- Dark mode support throughout the application
- Color scheme:
  - Light mode:
    - Background: white
    - Text: stone-900
    - Borders: stone-300
    - Hover states: stone-200
  - Dark mode:
    - Background: stone-950
    - Text: stone-100
    - Borders: stone-700
    - Hover states: stone-800

## Error Handling
- Toast notifications for user feedback
- Specific error messages for different scenarios
- Console logging for debugging
- Graceful fallbacks for failed operations

## Security
- Row Level Security (RLS) for database access
- Environment variables for sensitive data
- Client-side validation
- Privacy policy consent requirement

## Font Configuration
- **Primary Fonts**:
  - Inter: Main sans-serif font for general text
  - Horizons: Custom font for headings and emphasis (local font file)
  - Newsreader: Serif font for specific content sections
- **Font Loading**:
  - All fonts use `display: "swap"` for optimal loading performance
  - Horizons font is loaded locally from `/horizon-updated/new_version/horizon.otf`
  - Font variables are applied through CSS variables:
    - `--font-inter`
    - `--font-horizons`
    - `--font-newsreader`

## API Routes

### Unsubscribe API (`app/api/unsubscribe/route.ts`)
A Next.js API route to handle unsubscription requests.

#### Features
- Accepts `POST` requests with a `claimId`.
- Validates the presence of `claimId`.
- Connects to Supabase using environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- Updates the `opted_out` column to `true` in the `waitlist` table for the given `claim_id`.
- Returns appropriate JSON responses for success (200), bad request (400), not found (404), and server errors (500).

#### Dependencies
- `@supabase/supabase-js`
- `next/server` (`NextResponse`)

#### Error Handling
- Logs Supabase errors and server errors.
- Provides descriptive error messages to the client.