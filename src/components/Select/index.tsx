import { PressableProps } from 'react-native';

import { Container, Icon, PressableArea, Status } from './styles';

type Props = PressableProps & {
	insideTheDiet?: boolean;
	selected?: boolean;
}

export function Select({ insideTheDiet = true, selected = false, ...rest } : Props) {

	return (
		<PressableArea
            insideTheDiet={ insideTheDiet }
            { ...rest }
        >
			{({ pressed }) => (
				<Container
					insideTheDiet={ insideTheDiet }
					pressed={ pressed }
					selected={ selected }
				>
					<Icon insideTheDiet={ insideTheDiet } />
                    
					<Status>
                        { insideTheDiet ? 'Sim' : 'Não' }
                    </Status>
				</Container>
			)}
		</PressableArea>
	);
}