export type Macro = { protein: number; carbs: number; fat: number };
export type Food = {
  id: string;
  name: string;
  category: string;
  calories: number;
  serving: string;
  macros: Macro;
  emoji: string;
};

export const foods: Food[] = [
  { id: "f1", name: "Grilled Chicken Breast", category: "Protein", calories: 165, serving: "100g", macros: { protein: 31, carbs: 0, fat: 3.6 }, emoji: "🍗" },
  { id: "f2", name: "Avocado", category: "Fats", calories: 160, serving: "1 medium", macros: { protein: 2, carbs: 9, fat: 15 }, emoji: "🥑" },
  { id: "f3", name: "Quinoa", category: "Grains", calories: 222, serving: "1 cup", macros: { protein: 8, carbs: 39, fat: 4 }, emoji: "🌾" },
  { id: "f4", name: "Greek Yogurt", category: "Dairy", calories: 100, serving: "170g", macros: { protein: 17, carbs: 6, fat: 0 }, emoji: "🥛" },
  { id: "f5", name: "Salmon Fillet", category: "Protein", calories: 208, serving: "100g", macros: { protein: 20, carbs: 0, fat: 13 }, emoji: "🐟" },
  { id: "f6", name: "Blueberries", category: "Fruits", calories: 84, serving: "1 cup", macros: { protein: 1, carbs: 21, fat: 0.5 }, emoji: "🫐" },
  { id: "f7", name: "Sweet Potato", category: "Vegetables", calories: 112, serving: "1 medium", macros: { protein: 2, carbs: 26, fat: 0.1 }, emoji: "🍠" },
  { id: "f8", name: "Almonds", category: "Nuts", calories: 164, serving: "28g", macros: { protein: 6, carbs: 6, fat: 14 }, emoji: "🥜" },
  { id: "f9", name: "Spinach", category: "Vegetables", calories: 23, serving: "100g", macros: { protein: 2.9, carbs: 3.6, fat: 0.4 }, emoji: "🥬" },
  { id: "f10", name: "Brown Rice", category: "Grains", calories: 216, serving: "1 cup", macros: { protein: 5, carbs: 45, fat: 1.8 }, emoji: "🍚" },
  { id: "f11", name: "Eggs", category: "Protein", calories: 78, serving: "1 large", macros: { protein: 6, carbs: 0.6, fat: 5 }, emoji: "🥚" },
  { id: "f12", name: "Banana", category: "Fruits", calories: 105, serving: "1 medium", macros: { protein: 1.3, carbs: 27, fat: 0.4 }, emoji: "🍌" },
];

export type Recipe = {
  id: string;
  name: string;
  description: string;
  time: number;
  servings: number;
  calories: number;
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
  emoji: string;
  ingredients: { food: string; amount: string }[];
  steps: string[];
  macros: Macro;
};

export const recipes: Recipe[] = [
  {
    id: "r1", name: "Mediterranean Salmon Bowl", description: "Flaky salmon with quinoa, cherry tomatoes, and lemon-tahini dressing.",
    time: 25, servings: 2, calories: 520, difficulty: "Easy", tags: ["High Protein", "Gluten Free"], emoji: "🥗",
    ingredients: [
      { food: "Salmon Fillet", amount: "200g" },
      { food: "Quinoa", amount: "1 cup" },
      { food: "Cherry tomatoes", amount: "1 cup" },
      { food: "Cucumber", amount: "1/2" },
      { food: "Tahini", amount: "2 tbsp" },
    ],
    steps: [
      "Cook quinoa according to package directions.",
      "Season salmon with salt, pepper, and olive oil. Pan-sear 4 min per side.",
      "Chop vegetables and arrange in bowls over quinoa.",
      "Whisk tahini with lemon juice and water. Drizzle and serve.",
    ],
    macros: { protein: 42, carbs: 38, fat: 22 },
  },
  {
    id: "r2", name: "Avocado Toast with Egg", description: "Sourdough toast topped with smashed avocado and a poached egg.",
    time: 10, servings: 1, calories: 380, difficulty: "Easy", tags: ["Vegetarian", "Quick"], emoji: "🥑",
    ingredients: [
      { food: "Sourdough bread", amount: "2 slices" },
      { food: "Avocado", amount: "1/2" },
      { food: "Eggs", amount: "1" },
      { food: "Chili flakes", amount: "pinch" },
    ],
    steps: ["Toast bread.", "Smash avocado with salt and lemon.", "Poach egg.", "Assemble and top with chili flakes."],
    macros: { protein: 16, carbs: 32, fat: 22 },
  },
  {
    id: "r3", name: "Berry Protein Smoothie", description: "Creamy berry smoothie packed with protein and antioxidants.",
    time: 5, servings: 1, calories: 290, difficulty: "Easy", tags: ["Vegetarian", "Quick"], emoji: "🥤",
    ingredients: [
      { food: "Greek Yogurt", amount: "1 cup" },
      { food: "Blueberries", amount: "1/2 cup" },
      { food: "Banana", amount: "1" },
      { food: "Almonds", amount: "1 tbsp" },
    ],
    steps: ["Add all ingredients to a blender.", "Blend until smooth.", "Pour and enjoy."],
    macros: { protein: 22, carbs: 38, fat: 6 },
  },
  {
    id: "r4", name: "Chicken Sweet Potato Bowl", description: "Roasted chicken with sweet potato and spinach.",
    time: 35, servings: 2, calories: 480, difficulty: "Medium", tags: ["High Protein"], emoji: "🍲",
    ingredients: [
      { food: "Grilled Chicken Breast", amount: "300g" },
      { food: "Sweet Potato", amount: "2 medium" },
      { food: "Spinach", amount: "2 cups" },
    ],
    steps: ["Roast sweet potato cubes 20 min.", "Grill chicken 6 min per side.", "Wilt spinach.", "Combine in bowls."],
    macros: { protein: 45, carbs: 42, fat: 12 },
  },
  {
    id: "r5", name: "Overnight Oats", description: "No-cook breakfast with oats, yogurt and berries.",
    time: 5, servings: 1, calories: 340, difficulty: "Easy", tags: ["Vegetarian", "Meal Prep"], emoji: "🥣",
    ingredients: [
      { food: "Rolled oats", amount: "1/2 cup" },
      { food: "Greek Yogurt", amount: "1/2 cup" },
      { food: "Blueberries", amount: "1/4 cup" },
      { food: "Almonds", amount: "1 tbsp" },
    ],
    steps: ["Combine oats, yogurt, milk in jar.", "Refrigerate overnight.", "Top with berries and almonds."],
    macros: { protein: 18, carbs: 48, fat: 8 },
  },
  {
    id: "r6", name: "Veggie Stir Fry", description: "Quick weeknight stir fry with brown rice.",
    time: 20, servings: 2, calories: 410, difficulty: "Easy", tags: ["Vegan"], emoji: "🥦",
    ingredients: [
      { food: "Brown Rice", amount: "1 cup" },
      { food: "Mixed vegetables", amount: "3 cups" },
      { food: "Soy sauce", amount: "2 tbsp" },
      { food: "Sesame oil", amount: "1 tbsp" },
    ],
    steps: ["Cook rice.", "Stir-fry veggies on high heat.", "Toss with sauce.", "Serve over rice."],
    macros: { protein: 12, carbs: 68, fat: 10 },
  },
];

export const weeklyProgress = [
  { day: "Mon", calories: 1850, target: 2000 },
  { day: "Tue", calories: 2100, target: 2000 },
  { day: "Wed", calories: 1920, target: 2000 },
  { day: "Thu", calories: 1750, target: 2000 },
  { day: "Fri", calories: 2050, target: 2000 },
  { day: "Sat", calories: 2200, target: 2000 },
  { day: "Sun", calories: 1880, target: 2000 },
];

export const weightProgress = [
  { week: "W1", weight: 78.5 },
  { week: "W2", weight: 78.0 },
  { week: "W3", weight: 77.4 },
  { week: "W4", weight: 76.8 },
  { week: "W5", weight: 76.5 },
  { week: "W6", weight: 75.9 },
  { week: "W7", weight: 75.3 },
  { week: "W8", weight: 74.8 },
];

export const macroSplit = [
  { name: "Protein", value: 35, color: "var(--chart-1)" },
  { name: "Carbs", value: 45, color: "var(--chart-2)" },
  { name: "Fat", value: 20, color: "var(--chart-4)" },
];

export const achievements = [
  { id: "a1", title: "7-Day Streak", description: "Logged meals 7 days in a row", icon: "🔥", unlocked: true },
  { id: "a2", title: "Hydration Hero", description: "Hit water goal 5 days", icon: "💧", unlocked: true },
  { id: "a3", title: "Protein Power", description: "Met protein goal 10 times", icon: "💪", unlocked: true },
  { id: "a4", title: "Meal Planner", description: "Plan a full week", icon: "📅", unlocked: false },
  { id: "a5", title: "Recipe Explorer", description: "Try 20 new recipes", icon: "👨‍🍳", unlocked: false },
  { id: "a6", title: "Goal Crusher", description: "Hit weight goal", icon: "🏆", unlocked: false },
];

export const habits = [
  { id: "h1", name: "Drink 8 glasses water", streak: 12, today: true },
  { id: "h2", name: "Eat 5 servings veggies", streak: 8, today: true },
  { id: "h3", name: "30 min exercise", streak: 5, today: false },
  { id: "h4", name: "Sleep 7+ hours", streak: 15, today: true },
];

export const testimonials = [
  { name: "Sarah Chen", role: "Lost 18 lbs in 3 months", avatar: "👩", quote: "Finally a nutrition app that adapts to my busy schedule. The meal planner is a game-changer." },
  { name: "Marcus Rivera", role: "Marathon runner", avatar: "🏃‍♂️", quote: "The macro tracking is incredibly precise. My recovery has never been better." },
  { name: "Priya Patel", role: "Plant-based for 2 years", avatar: "👩‍🦱", quote: "Best app for vegans. Recipe database is huge and grocery lists save me hours every week." },
];

export const pricingTiers = [
  { name: "Starter", price: 0, period: "forever", features: ["Calorie & macro tracking", "Basic food database", "Weekly meal planner", "Community support"], cta: "Get Started", popular: false },
  { name: "Plus", price: 9, period: "month", features: ["Everything in Starter", "Personalized meal plans", "Full recipe library", "Grocery list generator", "Progress analytics", "Priority support"], cta: "Start Free Trial", popular: true },
  { name: "Pro", price: 19, period: "month", features: ["Everything in Plus", "1-on-1 nutrition coaching", "Custom macro targets", "Advanced biometrics", "Lab result tracking", "Family accounts (up to 5)"], cta: "Go Pro", popular: false },
];

export const faqs = [
  { q: "How is my meal plan personalized?", a: "We tailor every plan to your goals, dietary preferences, allergies, activity level, and food likes. You can adjust anytime." },
  { q: "Can I cancel anytime?", a: "Yes. Cancel from your account settings — no fees, no questions asked." },
  { q: "Does it support vegetarian, vegan, keto, and other diets?", a: "Yes — we support 20+ diets including paleo, Mediterranean, low-FODMAP, and more." },
  { q: "Will it sync with my fitness tracker?", a: "We integrate with Apple Health, Google Fit, Fitbit, Garmin and Whoop." },
  { q: "Is my data private?", a: "Always. Your data is encrypted and never sold. You own it." },
];
