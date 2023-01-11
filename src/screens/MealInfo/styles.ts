import { SafeAreaView } from 'react-native-safe-area-context';

import { Circle, IconProps } from 'phosphor-react-native';

import styled, { css } from 'styled-components/native';

type Props = {
	isInsideTheDiet: boolean | null;
}

export const Container = styled(SafeAreaView) <Props>`
	flex: 1;
	background-color: ${({ theme, isInsideTheDiet }) =>
		isInsideTheDiet === null
			? theme.COLORS.GRAY_300
			: isInsideTheDiet === true
				? theme.COLORS.GREEN_LIGHT
				: theme.COLORS.RED_LIGHT
	};
`;

export const InfoContainer = styled.View`
	flex: 1;
	align-items: flex-start;
`;

export const Name = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.XL}px;
		color: ${theme.COLORS.GRAY_700};
	`};

	margin-bottom: 8px;
`;

export const Description = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.MD}px;
		color: ${theme.COLORS.GRAY_600};
	`};

	margin-bottom: 20px;
`;

export const Title = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.SM}px;
		color: ${theme.COLORS.GRAY_700};
	`};

	margin-bottom: 8px;
`;

export const DateAndTime = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.MD}px;
		color: ${theme.COLORS.GRAY_600};
	`};

	margin-bottom: 20px;
`;

export const Status = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px 16px;
	background-color: ${({ theme }) => theme.COLORS.GRAY_200};
	border-radius: 1000px;
`;

export const Icon = styled(Circle).attrs<Props>(({ theme, isInsideTheDiet }) => ({
	size: theme.FONT_SIZE.BODY.SM / 1.75,
	color: isInsideTheDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK,
	weight: 'fill'
} as IconProps)) <Props>`
	margin-right: 8px;
`;

export const StatusInfo = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.SM}px;
		color: ${theme.COLORS.GRAY_700};	
	`};
    
	align-items: center;
	text-align: center;
`;