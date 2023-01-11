import AsyncStorage from '@react-native-async-storage/async-storage';

import { MealStorageDTO } from './types/MealStorageDTO';
import { MealsSectionDTO } from './types/MealsSectionDTO';

function orderKeys(a: string, b: string) {
	const previousDate = a.substring(a.length - 10, a.length);
	const nextDate = b.substring(b.length - 10, b.length);

	const [previousDay, previousMonth, previousYear] = previousDate.split('/').map(Number);
	const [nextDay, nextMonth, nextYear] = nextDate.split('/').map(Number);

	const previousDateInDays = previousYear * 365 + (previousMonth * 30) + previousDay;
	const nextDateInDays = nextYear * 365 + (nextMonth * 30) + nextDay;

	if (previousDateInDays < nextDateInDays) {

		return 1;
	}

	if (previousDateInDays > nextDateInDays) {

		return -1;
	}

	return 0;
}

export async function getMealsInSection() {
	
	try {
		const knownKeys = await AsyncStorage.getAllKeys();

		const keys = knownKeys.slice(0, knownKeys.length);

		keys.sort(orderKeys);

		const storage = await AsyncStorage.multiGet(keys);

		let allMealsByDay: MealsSectionDTO[] = [];

		storage.map((value) => {
			const mealsByKey: MealStorageDTO[] = value[1] ? JSON.parse(value[1]) : [];
			const key = mealsByKey[0].date;

			allMealsByDay = [...allMealsByDay, {
				title: key,
				data: mealsByKey
			}]
		});

		return allMealsByDay;
        
	} catch (error) {

		throw error;
	}
}