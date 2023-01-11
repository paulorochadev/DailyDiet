import AsyncStorage from '@react-native-async-storage/async-storage';

import { MEAL_COLLECTION } from '../storageConfig';

import { getMealsByDate } from './getMealsByDate';

import { AppError } from '@utils/AppError';

export async function removeMeal(dateTime: string) {

	try {
		if (dateTime.length !== 16 || dateTime.charAt(10) !== '-') {

			throw new AppError('Não foi possível remover a refeição: indentificar inválido.');
		}

		const [date, time] = dateTime.split('-');
		const allMealsByDate = await getMealsByDate(date);

		if (allMealsByDate.length > 1) {
			const newMealsByDate = allMealsByDate.filter(meal => meal.time !== time);

			await AsyncStorage.setItem(`${ MEAL_COLLECTION }-${ date }`, JSON.stringify(newMealsByDate));

			return;
		}

		await AsyncStorage.removeItem(`${ MEAL_COLLECTION }-${ date }`);

	} catch (error) {
        
		throw error;
	}
}