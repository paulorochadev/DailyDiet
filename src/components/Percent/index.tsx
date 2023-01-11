import { TouchableOpacityProps } from 'react-native';

import { Button, Container, Description, OpenIcon, Percentage, ReturnIcon } from './styles';

type Props = TouchableOpacityProps & {
	percentage: number | null;
	asHeader?: boolean;
}

export function Percent({ percentage, asHeader = false, ...rest } : Props) {

	if (percentage !== null) {
		const x = (percentage * 2) % 2;
		const percentageInText = x !== 0 ? percentage.toFixed(2) : percentage.toString();
		const adjustedPercentage = percentageInText.replace('.', ',');

		return (
			<Container
                percentage={ percentage }
                asHeader={ asHeader }
            >
				<Button
					asHeader={ asHeader }
					{ ...rest }
				>
					{
						asHeader
							? <ReturnIcon percentage={ percentage } />
							: <OpenIcon percentage={ percentage } />
					}
				</Button>

				<Percentage>
                    { adjustedPercentage }%
                </Percentage>
                
				<Description>
                    das refeições dentro da dieta
                </Description>
			</Container>
		);
	} else {
		return (
			<Container
                percentage={ percentage }
                asHeader={ asHeader }
            >
				<Percentage>
                    0,00%
                </Percentage>

				<Description>
                    Não há dados ainda.
                </Description>
			</Container>
		);
	}
}