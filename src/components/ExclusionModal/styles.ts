import styled, { css } from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
	padding: 24px;
	background-color: rgba(0, 0, 0, 0.25);
`;

export const Content = styled.View`
	padding: 30px 20px 20px;
	width: 100%;
	background-color: ${({ theme }) => theme.COLORS.GRAY_100};
	border-radius: 8px;
`;

export const Question = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.LG}px;
		color: ${theme.COLORS.GRAY_600};
	`};
    
	align-items: center;
	text-align: center;
	margin-bottom: 30px;
`;

export const Actions = styled.View`
	flex-direction: row;
`;