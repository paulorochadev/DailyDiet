import { getMeals } from './getMeals';

type Statistics = {
	bestSequence: number;
	mealsInsideTheDiet: number;
	mealsOffTheDiet: number;
}

export async function getStatistics() {

	try {
		const allMeals = await getMeals();

		const mealsInsideTheDiet = allMeals.filter((meal) => meal.isInsideTheDiet === true).length;

		let best = 0;
		let count = 0;

		allMeals.map((value) => {
			if (value.isInsideTheDiet === true) {
				count++;

				if (count > best) {
					best = count;
				}

			} else {
				
				count = 0;
			}
		});

		const statistics: Statistics = {
			bestSequence: best,
			mealsInsideTheDiet,
			mealsOffTheDiet: (allMeals.length - mealsInsideTheDiet)
		};

		return statistics;

	} catch (error) {
        
		throw error;
	}
}