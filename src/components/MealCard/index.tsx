import { Pressable, PressableProps } from 'react-native';

import { Container, Divider, Hour, MealName, Status } from './styles';

type Props = PressableProps & {
	hour: string;
	name: string;
	isInsideTheDiet: boolean;
}

export function MealCard({ hour, name, isInsideTheDiet, ...rest } : Props) {

	return (
		<Pressable { ...rest }>
			{({ pressed }) => (
				<Container pressed={ pressed }>
					<Hour>
                        { hour }
                    </Hour>

					<Divider />

					<MealName numberOfLines={1}>
                        { name }
                    </MealName>

					<Status isInsideTheDiet={ isInsideTheDiet } />
				</Container>
			)}
		</Pressable>
	);
}