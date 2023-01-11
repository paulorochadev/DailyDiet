
import { TouchableOpacityProps, View } from 'react-native';

import { Button, Container, HeaderType, Icon, Title, } from './styles';

type Props = TouchableOpacityProps & {
	title: string;
	type?: HeaderType;
}

export function Header({ type = 'DEFAULT', title, ...rest } : Props) {

	return (
		<Container type={ type }>
			<Button { ...rest }>
				<Icon />
			</Button>

			<Title>
                { title }
            </Title>

			<View style={{ width: 24 }} />
		</Container>
	);
}