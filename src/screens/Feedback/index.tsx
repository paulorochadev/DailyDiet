import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '@components/Button';

import alertImg from '@assets/alert.png';
import sucessImg from '@assets/sucess.png';

import { Bold, Container, Description, Illustration, Title } from './styles';

type Params = {
	isInsideTheDiet: boolean;
}

export function Feedback() {

	const navigation = useNavigation();

	const route = useRoute();
	const { isInsideTheDiet } = route.params as Params;    

	function handleGoBackHome() {
		navigation.navigate('home');
	}

	return (
		<Container>
			<Title isInsideTheDiet={isInsideTheDiet}>
				{
					isInsideTheDiet
						? 'Continue assim!'
						: 'Que pena!'
				}
			</Title>

			{
				isInsideTheDiet
					? <Description>Você continua <Bold>dentro da dieta.</Bold> Muito bem!</Description>
					: <Description>Você <Bold>saiu da dieta</Bold> dessa vez, mas continue se esforçando e não desista!</Description>
			}

			<Illustration
				source={ isInsideTheDiet ? sucessImg : alertImg }
			/>
            
			<Button
				title='Ir para a página inicial'
				onPress={ handleGoBackHome }
			/>
		</Container>
	);
}