# Database Utility Scripts

## fix-style-scores.js

This script fixes style scores in existing outfits that may have been stored as strings instead of numbers.

### Usage

1. Make sure you have the required environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`

2. Install dependencies if running standalone:
   ```bash
   npm install @supabase/supabase-js
   ```

3. Run the script:
   ```bash
   node scripts/fix-style-scores.js
   ```

### What it does

- Fetches all outfits with AI analysis data
- Checks if `style_score` is a string that can be converted to a number
- Converts string values like "8.5" to numeric 8.5
- Sets invalid values like "N/A" to null
- Clamps values to be between 0 and 10
- Updates the database with the corrected values

### Safety

- Only updates records that actually need fixing
- Uses the service role key for admin access
- Logs all changes for transparency
- Does not modify other AI analysis data
