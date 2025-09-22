const recipes = [
  {
    id: 1,
    title: "Avocado Toast",
    category: "breakfast",
    description: "A quick, healthy breakfast with creamy avocado.",
    image: "images/avocado-toast.jpg",
    ingredients: [
      "2 slices whole-grain bread",
      "1 ripe avocado",
      "Salt & pepper to taste",
      "Chili flakes (optional)"
    ],
    steps: [
      "Toast the bread slices.",
      "Mash the avocado with salt and pepper.",
      "Spread avocado on toast and sprinkle chili flakes."
    ],
    nutrition: {
      Calories: "250",
      Protein: "6g",
      Carbs: "28g",
      Fat: "12g"
    }
  },
  {
    id: 2,
    title: "Quinoa Salad",
    category: "lunch",
    description: "A refreshing salad with quinoa and fresh veggies.",
    image: "images/quinoa-salad.jpg",
    ingredients: [
      "1 cup cooked quinoa",
      "1 cucumber (diced)",
      "1 tomato (diced)",
      "1 tbsp olive oil",
      "Salt & lemon juice"
    ],
    steps: [
      "Cook quinoa and let it cool.",
      "Mix quinoa with cucumber and tomato.",
      "Add olive oil, salt, and lemon juice. Toss well."
    ],
    nutrition: {
      Calories: "320",
      Protein: "9g",
      Carbs: "45g",
      Fat: "10g"
    }
  },
  {
    id: 3,
    title: "Grilled Salmon",
    category: "dinner",
    description: "Nutritious salmon fillet grilled to perfection.",
    image: "images/grilled-salmon.jpg",
    ingredients: [
      "1 salmon fillet",
      "1 tbsp olive oil",
      "Lemon slices",
      "Salt & pepper"
    ],
    steps: [
      "Preheat grill and brush salmon with olive oil.",
      "Season with salt and pepper.",
      "Grill for 4–5 minutes each side.",
      "Serve with lemon slices."
    ],
    nutrition: {
      Calories: "400",
      Protein: "35g",
      Carbs: "0g",
      Fat: "28g"
    }
  },
  {
    id: 4,
    title: "Berry Smoothie",
    category: "breakfast",
    description: "A refreshing blend of berries and yogurt.",
    image: "images/berry-smoothie.jpg",
    ingredients: [
      "1 cup mixed berries",
      "1 banana",
      "1/2 cup Greek yogurt",
      "1/2 cup almond milk"
    ],
    steps: [
      "Add all ingredients into a blender.",
      "Blend until smooth.",
      "Serve chilled."
    ],
    nutrition: {
      Calories: "220",
      Protein: "8g",
      Carbs: "42g",
      Fat: "3g"
    }
  },
  {
    id: 5,
    title: "Veggie Stir-Fry",
    category: "dinner",
    description: "Colorful stir-fry with fresh vegetables and soy sauce.",
    image: "images/veggie-stirfry.jpg",
    ingredients: [
      "1 cup broccoli florets",
      "1 bell pepper (sliced)",
      "1 carrot (sliced)",
      "2 tbsp soy sauce",
      "1 tbsp olive oil"
    ],
    steps: [
      "Heat oil in a pan.",
      "Add vegetables and stir-fry for 5–7 minutes.",
      "Add soy sauce and toss before serving."
    ],
    nutrition: {
      Calories: "180",
      Protein: "5g",
      Carbs: "20g",
      Fat: "8g"
    }
  },
  {
    id: 6,
    title: "Chia Pudding",
    category: "snack",
    description: "Creamy chia pudding with almond milk and honey.",
    image: "images/chia-pudding.jpg",
    ingredients: [
      "3 tbsp chia seeds",
      "1 cup almond milk",
      "1 tsp honey",
      "Fresh fruits for topping"
    ],
    steps: [
      "Mix chia seeds with almond milk and honey.",
      "Refrigerate overnight.",
      "Top with fresh fruits before serving."
    ],
    nutrition: {
      Calories: "200",
      Protein: "6g",
      Carbs: "24g",
      Fat: "8g"
    }
  },
  {
    id: 7,
    title: "Lentil Soup",
    category: "lunch",
    description: "A hearty soup with lentils and vegetables.",
    image: "images/lentil-soup.jpg",
    ingredients: [
      "1 cup lentils",
      "1 onion (chopped)",
      "2 carrots (chopped)",
      "4 cups vegetable broth",
      "1 tbsp olive oil"
    ],
    steps: [
      "Heat oil in a pot and sauté onion and carrots.",
      "Add lentils and vegetable broth.",
      "Simmer for 25–30 minutes until lentils are tender."
    ],
    nutrition: {
      Calories: "300",
      Protein: "15g",
      Carbs: "50g",
      Fat: "6g"
    }
  },
  {
    id: 8,
    title: "Chicken Wrap",
    category: "lunch",
    description: "Grilled chicken wrapped with fresh veggies.",
    image: "images/chicken-wrap.jpg",
    ingredients: [
      "1 whole wheat tortilla",
      "100g grilled chicken",
      "Lettuce & tomato",
      "1 tbsp hummus"
    ],
    steps: [
      "Lay tortilla flat and spread hummus.",
      "Add grilled chicken and vegetables.",
      "Wrap tightly and cut in half."
    ],
    nutrition: {
      Calories: "350",
      Protein: "25g",
      Carbs: "35g",
      Fat: "10g"
    }
  },
  {
    id: 9,
    title: "Fruit Salad",
    category: "snack",
    description: "A mix of seasonal fruits with a drizzle of honey.",
    image: "images/fruit-salad.jpg",
    ingredients: [
      "1 cup mixed fruits",
      "1 tsp honey",
      "Mint leaves for garnish"
    ],
    steps: [
      "Chop fruits into bite-size pieces.",
      "Mix in a bowl and drizzle with honey.",
      "Garnish with mint leaves."
    ],
    nutrition: {
      Calories: "150",
      Protein: "2g",
      Carbs: "38g",
      Fat: "1g"
    }
  }
];

// Render recipes
function displayRecipes(list) {
  const container = document.getElementById("recipe-list");
  container.innerHTML = "";
  list.forEach(recipe => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" onerror="this.src='images/healthy recipe pic.png'">
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
    `;
    card.onclick = () => openModal(recipe);
    container.appendChild(card);
  });
}

// Filter recipes
function filterRecipes() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const filtered = recipes.filter(r => {
    const matchesCategory = category === "all" || r.category === category;
    const matchesSearch = r.title.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });
  displayRecipes(filtered);
}

// Open modal
function openModal(recipe) {
  document.getElementById("modal-title").textContent = recipe.title;
  const modalImage = document.getElementById("modal-image");
  modalImage.src = recipe.image;
  modalImage.onerror = function() { this.src = 'images/healthy recipe pic.png'; };

  const ingList = document.getElementById("modal-ingredients");
  ingList.innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join("");

  const stepsList = document.getElementById("modal-steps");
  stepsList.innerHTML = recipe.steps.map(s => `<li>${s}</li>`).join("");

  const nutritionTable = document.getElementById("modal-nutrition");
  nutritionTable.innerHTML = `
    <tr><th>Nutrient</th><th>Amount</th></tr>
    ${Object.entries(recipe.nutrition)
      .map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`)
      .join("")}
  `;

  document.getElementById("recipe-modal").style.display = "flex";
}

// Close modal
function closeModal() {
  document.getElementById("recipe-modal").style.display = "none";
}

// Close modal if clicking outside content
window.onclick = function(e) {
  const modal = document.getElementById("recipe-modal");
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Initialize
window.onload = () => {
  displayRecipes(recipes);
};
