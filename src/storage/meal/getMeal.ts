
import { getMealsByDate } from './getMealsByDate';

import { AppError } from '@utils/AppError';

export async function getMeal(dateTime: string) {

	try {
		const [date, time] = dateTime.split('-');
		const allMealsByDate = await getMealsByDate(date);

		const specificMeal = allMealsByDate.find(meal => meal.date === date && meal.time === time);

		if (typeof specificMeal === 'undefined') {
			
			throw new AppError('A refeição desejada não foi encontrada, tente novamente.');
		}

		return specificMeal;

	} catch (error) {
        
		throw error;
	}
}