document.getElementById('calculator-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const activityFactor = parseFloat(document.getElementById('activity').value);

    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const tdee = bmr * activityFactor;

    const carbs = (tdee * 0.50) / 4;
    const protein = (tdee * 0.20) / 4;
    const fat = (tdee * 0.30) / 9;

    document.getElementById('bmr').textContent = `BMR: ${bmr.toFixed(2)} kcal/day`;
    document.getElementById('tdee').textContent = `TDEE: ${tdee.toFixed(2)} kcal/day`;
    document.getElementById('macros').textContent = `Macros: ${carbs.toFixed(2)}g Carbs, ${protein.toFixed(2)}g Protein, ${fat.toFixed(2)}g Fat`;

    // You can implement animations or progress bars to show the results in a dynamic way
});
