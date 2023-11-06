import { supa } from "/supabase.js";

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@1.29.0';

const supabaseUrl = 'https://unpkg.com/@supabase/supabase-js@2';
const supabaseKey = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@1.29.0/dist/umd/supabase.min.js';

const supabase = createClient(supabaseUrl, supabaseKey);


async function fetchUserData() {
  const user = supabase.auth.user();
  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select('deine_punkte')
      .eq('id', user.id);

    if (error) {
      console.error('Error fetching user data:', error);
      return null;
    }

    return data[0];
  }

  return null;
}

async function fetchLevelData() {
  const user = await fetchUserData();

  if (user) {
    const { data: levelData, error } = await supabase
      .from('Level')
      .select('punkte-von, punkte-bis')
      .order('punkte-von');

    if (error) {
      console.error('Error fetching level data:', error);
      return null;
    }

    return { user, levels: levelData };
  }

  return null;
}

export async function updateInnerBarWidth() {
  const { user, levels } = await fetchLevelData();
  if (user && levels) {
    const { deine_punkte } = user;
    const currentLevel = levels.find(
      (level) => deine_punkte >= level['punkte-von'] && deine_punkte <= level['punkte-bis']
    );

    if (currentLevel) {
      const innerBar = document.getElementById('inner-bar');
      const { 'punkte-von': startPoints, 'punkte-bis': endPoints } = currentLevel;
      const widthPercentage = ((deine_punkte - startPoints) / (endPoints - startPoints)) * 100;
      innerBar.style.width = `${widthPercentage}%`;
    }
  }
}

// Call the function to update the inner-bar width when the page loads.
window.addEventListener('load', updateInnerBarWidth);
