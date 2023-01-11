import { SafeAreaView } from 'react-native-safe-area-context';

import styled, { css } from 'styled-components/native';

type Props = {
	isInsideTheDiet: boolean;
}

export const Container = styled(SafeAreaView)`
	flex: 1;
	padding: 24px;
	background-color: ${({ theme }) => theme.COLORS.GRAY_100};
	align-items: center;
	justify-content: center;
`;

export const Title = styled.Text<Props>`
	${({ theme, isInsideTheDiet }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.XL}px;
		color: ${isInsideTheDiet ? theme.COLORS.GREEN_DARK : theme.COLORS.RED_DARK};
	`};

	text-align: center;
`;

export const Description = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.MD}px;
		color: ${theme.COLORS.GRAY_700};
	`};
    
	text-align: center;
`;

export const Bold = styled.Text`
	font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;

export const Illustration = styled.Image`
	margin: 24px 0;
`;