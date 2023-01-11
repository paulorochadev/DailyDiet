
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MealStorageDTO } from './types/MealStorageDTO';

export async function getMeals() {
	
	try {
		const knownKeys = await AsyncStorage.getAllKeys();

		const keys = knownKeys.slice(0, knownKeys.length);
		keys.reverse();

		const storage = await AsyncStorage.multiGet(keys);

		let allMeals: MealStorageDTO[] = [];

		storage.map((value) => {
			const mealsByKey: MealStorageDTO[] = value[1] ? JSON.parse(value[1]) : [];

			allMeals = [...allMeals, ...mealsByKey];
		});

		return allMeals;

	} catch (error) {
        
		throw error;
	}
}