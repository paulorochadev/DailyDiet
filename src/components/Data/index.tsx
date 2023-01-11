import { Container, DataType, Info, Number } from './styles';

type Props = {
	number: number;
	info: string;
	type?: DataType;
}

export function Data({ type = 'DEFAULT', number, info, } : Props) {
	
	return (
		<Container type={ type }>
			<Number>
                { number }
            </Number>

			<Info>
                { info }
            </Info>
		</Container>
	);
}