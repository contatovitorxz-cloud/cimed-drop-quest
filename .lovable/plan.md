

## Problem

The "SCAN QR" button on the Drops page navigates to `/scan`, but there is no `/scan` route defined in `App.tsx`. The `QRScanner` component exists at `src/components/qr/QRScanner.tsx` but is a modal component, not a page.

## Plan

Instead of navigating to a non-existent route, open the QR Scanner as a modal overlay directly on the Drops page:

1. **`src/pages/Drops.tsx`**: Import `QRScanner`, add a `showScanner` state, wire the SCAN QR button to `setShowScanner(true)`, and render `<QRScanner open={showScanner} onClose={() => setShowScanner(false)} />`.

2. Remove the `useNavigate` and `/scan` navigation — no new route needed.

