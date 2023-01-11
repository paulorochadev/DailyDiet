import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
	flex: 1;
	padding: 24px;
	padding-bottom: 0px;
	background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`;

export const Title = styled.Text`
	${({ theme }) => css`
        font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.MD}px;
		color: ${theme.COLORS.GRAY_700};
	`};

	margin-top: 24px;
	margin-bottom: 6px;
`;

export const ListDate = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.LG}px;
		color: ${theme.COLORS.GRAY_700};
	`};

	margin-top: 20px;
	margin-bottom: 6px;
`;

export const NoMealsMessage = styled.Text`
	text-align: center;
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.SM}px;
		color: ${theme.COLORS.GRAY_700};
	`};
`;

export const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
	colors: [theme.COLORS.GRAY_700, 'rgba(250, 250, 250, 0)'],
	locations: [0.6, 1]
} as LinearGradientProps))`
	flex: 1;
`;