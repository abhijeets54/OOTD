// Utility script to fix style scores in existing outfits
// This script can be run to update any existing outfits that have string style_score values

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for admin operations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function processStyleScore(styleScore) {
  if (styleScore === null || styleScore === undefined || styleScore === "N/A") {
    return null;
  }
  
  if (typeof styleScore === 'number') {
    return Math.max(0, Math.min(10, styleScore));
  }
  
  if (typeof styleScore === 'string') {
    const parsed = parseFloat(styleScore);
    if (!isNaN(parsed)) {
      return Math.max(0, Math.min(10, parsed));
    }
  }
  
  return null;
}

async function fixStyleScores() {
  try {
    console.log('Fetching outfits with AI analysis...');
    
    // Get all outfits that have ai_analysis data
    const { data: outfits, error } = await supabase
      .from('outfits')
      .select('id, ai_analysis')
      .not('ai_analysis', 'is', null);

    if (error) {
      throw error;
    }

    console.log(`Found ${outfits.length} outfits with AI analysis`);

    let updatedCount = 0;

    for (const outfit of outfits) {
      const aiAnalysis = outfit.ai_analysis;
      
      if (aiAnalysis && aiAnalysis.style_score !== undefined) {
        const currentScore = aiAnalysis.style_score;
        const processedScore = processStyleScore(currentScore);
        
        // Only update if the score changed
        if (currentScore !== processedScore) {
          console.log(`Updating outfit ${outfit.id}: ${currentScore} -> ${processedScore}`);
          
          const updatedAnalysis = {
            ...aiAnalysis,
            style_score: processedScore
          };

          const { error: updateError } = await supabase
            .from('outfits')
            .update({ ai_analysis: updatedAnalysis })
            .eq('id', outfit.id);

          if (updateError) {
            console.error(`Error updating outfit ${outfit.id}:`, updateError);
          } else {
            updatedCount++;
          }
        }
      }
    }

    console.log(`Successfully updated ${updatedCount} outfits`);
  } catch (error) {
    console.error('Error fixing style scores:', error);
  }
}

// Run the script
if (require.main === module) {
  fixStyleScores();
}

module.exports = { fixStyleScores, processStyleScore };
