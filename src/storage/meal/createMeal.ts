import AsyncStorage from '@react-native-async-storage/async-storage';

import { MEAL_COLLECTION } from '../storageConfig';

import { MealStorageDTO } from './types/MealStorageDTO';

import { getMealsByDate } from './getMealsByDate';

import { AppError } from '@utils/AppError';

function orderMeals(a: MealStorageDTO, b: MealStorageDTO) {
	const [previousHour, previousMinute] = a.time.split(':').map(Number);
	const [nextHour, nextMinute] = b.time.split(':').map(Number);

	const previousTimeInMinutes = previousHour * 60 + previousMinute;
	const nextTimeInMinutes = nextHour * 60 + nextMinute;

	if (previousTimeInMinutes < nextTimeInMinutes) {

		return 1;
	}

	if (previousTimeInMinutes > nextTimeInMinutes) {

		return -1;
	}

	return 0;
}

export async function createMeal(newMeal: MealStorageDTO) {

	try {
		const { date } = newMeal;
		const dailyMeals = await getMealsByDate(date);

		const timeAlreadyRegistered = dailyMeals.find(
			meal => meal.time === newMeal.time
		);

		if (timeAlreadyRegistered) {
			throw new AppError('Você já cadastrou uma refeição neste período.');
		}

		const newDailyMeals = [...dailyMeals, newMeal];
		newDailyMeals.sort(orderMeals);
        
		await AsyncStorage.setItem(`${ MEAL_COLLECTION }-${ date }`, JSON.stringify(newDailyMeals));

	} catch (error) {

		throw error;
	}
}