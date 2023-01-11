import { TouchableOpacity } from 'react-native';

import { ArrowLeft, ArrowUpRight, IconProps } from 'phosphor-react-native';

import styled, { css } from 'styled-components/native';

type ContainerProps = {
	percentage: number | null;
	asHeader?: boolean;
}

type ButtonProps = {
	asHeader?: boolean;
}

type MyIconProps = {
	percentage: number;
}

export const Container = styled.View<ContainerProps>`
	align-items: center;
	justify-content: center;
	${({ asHeader }) => asHeader
		? css`
			padding: 28px 16px;
		`
		: css`
			padding: 20px 16px;
			border-radius: 8px;
	`};

	background-color: ${({ theme, percentage }) =>
		percentage === null
			? theme.COLORS.GRAY_300
			: percentage > 50
				? theme.COLORS.GREEN_LIGHT
				: theme.COLORS.RED_LIGHT
	};
`;

export const Button = styled(TouchableOpacity) <ButtonProps>`
	align-self: ${({ asHeader }) => asHeader ? 'flex-start' : 'flex-end'};
	top: -8px;
	right: -4px;
	margin-bottom: -24px;
`;

export const OpenIcon = styled(ArrowUpRight).attrs<MyIconProps>(({ theme, percentage }) => ({
	size: theme.FONT_SIZE.TITLE.SM + theme.FONT_SIZE.TITLE.SM / 3,
	color: percentage > 50
		? theme.COLORS.GREEN_DARK
		: theme.COLORS.RED_DARK
} as IconProps)) <MyIconProps>``;

export const ReturnIcon = styled(ArrowLeft).attrs<MyIconProps>(({ theme, percentage }) => ({
	size: theme.FONT_SIZE.TITLE.SM + theme.FONT_SIZE.TITLE.SM / 3,
	color: percentage > 50
		? theme.COLORS.GREEN_DARK
		: theme.COLORS.RED_DARK
} as IconProps)) <MyIconProps>``;

export const Percentage = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${({ theme }) => theme.FONT_SIZE.TITLE.XXL}px;
		color: ${theme.COLORS.GRAY_700};
	`};

	text-align: center;
`;

export const Description = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.SM}px;
		color: ${theme.COLORS.GRAY_600};
	`};
    
	text-align: center;
`;