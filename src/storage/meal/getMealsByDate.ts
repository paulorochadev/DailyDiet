import AsyncStorage from '@react-native-async-storage/async-storage';

import { MEAL_COLLECTION } from '../storageConfig';

import { MealStorageDTO } from './types/MealStorageDTO';

export async function getMealsByDate(date: string) {

	try {
		const storage = await AsyncStorage.getItem(`${ MEAL_COLLECTION }-${ date }`);

		const meals: MealStorageDTO[] = storage ? JSON.parse(storage) : [];

		return meals;

	} catch (error) {
        
		throw error;
	}
}