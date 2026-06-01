function escapeCsv(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function mealPlanToCsvRows(mealPlan, recipesById = {}) {
  // rows: Day, MealType, RecipeId, RecipeName, Portion, Calories, Servings
  const rows = [];
  for (const dayObj of mealPlan.days || []) {
    const day = dayObj.day;
    for (const mealType of ['breakfast', 'lunch', 'dinner']) {
      const items = (dayObj.meals && dayObj.meals[mealType]) || [];
      if (!items.length) {
        rows.push([day, mealType, '', '', '', '', '']);
        continue;
      }
      for (const item of items) {
        const recipeId = item.recipeId || '';
        const portion = item.portion || '';
        const recipe = recipesById[recipeId] || {};
        const name = recipe.name || '';
        const calories = recipe.calories || '';
        const servings = recipe.servings || '';
        rows.push([day, mealType, recipeId, name, portion, calories, servings]);
      }
    }
  }
  return rows;
}

function buildCsv(mealPlan, recipesById) {
  const header = ['Day', 'MealType', 'RecipeId', 'RecipeName', 'Portion', 'Calories', 'Servings'];
  const rows = mealPlanToCsvRows(mealPlan, recipesById);
  const lines = [header.map(escapeCsv).join(',')];
  for (const row of rows) lines.push(row.map(escapeCsv).join(','));
  return lines.join('\n');
}

module.exports = { buildCsv };
