import AsyncStorage from '@react-native-async-storage/async-storage';

import { MEAL_COLLECTION } from '../storageConfig';

import { MealStorageDTO } from './types/MealStorageDTO';

import { getMeal } from './getMeal';
import { getMeals } from './getMeals';
import { getMealsByDate } from './getMealsByDate';
import { createMeal } from './createMeal';
import { removeMeal } from './removeMeal';

import { AppError } from '@utils/AppError';

export async function updateMeal(dateTime: string, updatedMeal: MealStorageDTO) {

	try {
		if (dateTime.length !== 16 || dateTime.charAt(10) !== '-') {

			throw new AppError('Não foi possível atualizar a refeição: indentificar inválido.');
		}

		const previousMeal = await getMeal(dateTime);

		const mealIsEqual = JSON.stringify(previousMeal) === JSON.stringify(updatedMeal);

		if (mealIsEqual) {

			throw new AppError('Por favor, faça alguma alteração para salvar ou volte à tela anterior.');
		}

		const allMeals = await getMeals();

		const otherMeals = allMeals.filter(meal => JSON.stringify(meal) !== JSON.stringify(previousMeal));

		const { date, time } = updatedMeal;

		const mealAlreadyExists = otherMeals.find(meal =>
			meal.date === date && meal.time === time
		);

		if (mealAlreadyExists) {

			throw new AppError('Você já cadastrou uma refeição neste período.');
		}

		const dailyMeals = await getMealsByDate(date);
		const mealIndex = dailyMeals.findIndex((value) => value.time === time);

		if (mealIndex === -1) {
			await createMeal(updatedMeal);
			await removeMeal(dateTime);

			return;
		}

		dailyMeals[mealIndex] = updatedMeal;

		AsyncStorage.setItem(`${ MEAL_COLLECTION }-${ date }`, JSON.stringify(dailyMeals));

	} catch (error) {
        
		throw error;
	}
}