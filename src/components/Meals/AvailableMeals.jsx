import styles from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "../Meals/MealItem/MealItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //true because this component fetchs when rendered so initially loads data
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const result = await fetch(
        "https://react-http-535e9-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!result.ok) {
        throw new Error("Something went wrong!");
      }
      const resultData = await result.json();
      const loadedMeals = [];
      for (const key in resultData) {
        loadedMeals.push({
          id: key,
          description: resultData[key].description,
          name: resultData[key].name,
          price: resultData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return (
      <section className={styles.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={styles.meals}>
      <Card>
        <ul> {mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
