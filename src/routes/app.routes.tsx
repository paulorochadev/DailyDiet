import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { CreationOrEdition } from '@screens/CreationOrEdition';
import { Feedback } from '@screens/Feedback';
import { MealInfo } from '@screens/MealInfo';
import { Statistics } from '@screens/Statistics';

export type RootStackParamList = {
	home: undefined;
	statistics: {
		percentage: number;
	};
	creationOrEdition: {
		screenAction: 'CREATION' | 'EDITION';
		dateTime?: string;
	};
	feedback: {
		isInsideTheDiet: boolean;
	};
	meal: {
		dateTime: string;
	};
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
	
	return (
		<Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Screen name='home' component={ Home } />
			<Screen name='creationOrEdition' component={ CreationOrEdition } />
			<Screen name='feedback' component={ Feedback } />
			<Screen name='meal' component={ MealInfo } />
			<Screen name='statistics' component={ Statistics } />
		</Navigator>
	);
}