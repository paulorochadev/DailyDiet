import { PressableProps, Pressable } from 'react-native';

import { Icon } from 'phosphor-react-native';

import { useTheme } from 'styled-components/native';

import { Container, ButtonStyleType, Title } from './styles';

type Props = PressableProps & {
	type?: ButtonStyleType;
	title: string;
	MyIcon?: Icon;
}

export function Button({ type = 'PRIMARY', title, MyIcon, ...rest } : Props) {

	const { COLORS, FONT_SIZE } = useTheme();

	return (
		<Pressable {...rest}>
			{({ pressed }) => (
				<Container
					type={ type }
					pressed={ pressed }
				>
					{
						MyIcon
							? <MyIcon
								size={ FONT_SIZE.TITLE.LG }
								color={ type === 'SECONDARY' ? COLORS.GRAY_700 : COLORS.WHITE }
								style={{ marginRight: 8 }}
							/>
							: null
					}

					<Title type={ type }>
                        { title }
                    </Title>
				</Container>
			)}
		</Pressable>
	);
}