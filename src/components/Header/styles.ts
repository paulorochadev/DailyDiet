import { TouchableOpacity } from 'react-native';

import { ArrowLeft, IconProps } from 'phosphor-react-native';

import styled, { css } from 'styled-components/native';

export type HeaderType = 'DEFAULT' | 'PRIMARY' | 'SECONDARY';

type Props = {
	type: HeaderType;
}

export const Container = styled.View<Props>`
	flex-direction: row;
	background-color: ${({ theme, type }) => type === 'PRIMARY'
		? theme.COLORS.GREEN_LIGHT
		: type === 'SECONDARY'
			? theme.COLORS.RED_LIGHT
			: theme.COLORS.GRAY_300
	};

	align-items: flex-start;
	padding: 18px 24px;
	justify-content: space-between;
`;

export const Button = styled(TouchableOpacity)`

`;

export const Icon = styled(ArrowLeft).attrs(({ theme }) => ({
	size: theme.FONT_SIZE.TITLE.LG + theme.FONT_SIZE.TITLE.LG / 3,
	color: theme.COLORS.GRAY_600
} as IconProps))``;

export const Title = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.LG}px;
		color: ${theme.COLORS.GRAY_700};
	`};
    
	text-align: center;
`;