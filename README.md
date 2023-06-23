
“Grocery Pro: Your Ultimate Grocery Companion"


GroceryPro is a versatile and user-friendly web application designed to revolutionize your grocery shopping and cooking experience. With an extensive collection of recipes spanning various cuisines, our app is tailored to cater to your dietary preferences, allergies, and health goals. Say goodbye to the hassle of planning meals and grocery shopping blindly!


Key Features:

Grocery Planning Made Easy: Each recipe includes a comprehensive list of ingredients required, making it effortless to plan your grocery shopping. GroceryPro also offers the option to create personalized shopping lists, ensuring you never miss a vital item during your next store visit.
Comprehensive Recipe Library: Explore a vast repository of recipes from around the world, featuring diverse cuisines such as Italian, Mexican, Indian, Chinese, and more. Whether you're a seasoned chef or a novice in the kitchen, GroceryPro has something for everyone.
Customized Dietary Options: Specify your dietary requirements, including vegetarian, vegan, gluten-free, dairy-free, and more. GroceryPro intelligently filters recipes based on your preferences, ensuring you find dishes that align with your lifestyle.
Allergy-Friendly Alternatives: Inform GroceryPro about your food allergies or sensitivities, and the web app will automatically suggest suitable ingredient substitutions for each recipe. Enjoy peace of mind knowing that your health and well-being are prioritized.
Calorie and Nutrient Tracking: Stay on track with your health and fitness goals by accessing detailed nutritional information for every recipe. GroceryPro provides calorie counts, empowering you to make informed decisions about your meal choices.
 User-Friendly Interface: GroceryPro boasts an intuitive and visually appealing interface, making it a breeze to navigate through recipes, ingredients, and dietary preferences. Enjoy a seamless and enjoyable experience.

Experience the joy of cooking with GroceryPro, your ultimate kitchen companion. From discovering new flavors to planning your grocery shopping efficiently, our app empowers you to create delicious meals while adhering to your dietary restrictions and health goals. Visit GroceryPro today and unlock a world of culinary possibilities!  https://recipe-pro.vercel.app/

- Hosted on vercel

How to Run on Local:

Clone the repository.
Navigate to the repository and run "npm install"
Run "npm start"
The website will run on "localhost:3000"


Development:

To simplify your grocery shopping experience while ensuring your meals align with your dietary restrictions and health goals. With GroceryPro, planning your shopping list becomes a breeze, thanks to its seamless integration with a vast recipe database and customizable dietary options. Say goodbye to the frustration of aimlessly wandering through aisles and hello to an organized and efficient grocery shopping journey.

Main Library: @mui/material, axios
Title page: Title along with a little description of what the app is for, with a get started button that acts as an entry point to the website.
Main page: Search for recipes by keywords, for example, chicken pasta, etc. 
It calls to the public API: https://developer.edamam.com/edamam-docs-recipe-api
Which gives the available recipes, the website shows only 10 recipes, to not overwhelm the user with the data.

Each recipe is shown in card view, showing the image, along with allergy and diet restrictions to give a preview. Each card has an info button that shows ingredients and recipes.

Filters like allergies, diets, calories, and nutrients are added to get recipes with added constraints. 

Testing:

Manual Testing: Ran manual tests to check for the functionality of each feature. And made changes accordingly.
Added errors to handle edge cases like no recipe, and failed API calls.

Automated Testing: Unit testing using jest. Please note that, because this is a trial project, didn’t perform unit testing.

Future Ideas:

To add more features, better UI to handle more functionality.


Website:

Website Link: https://recipe-pro.vercel.app/


