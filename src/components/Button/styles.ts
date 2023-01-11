import styled, { css } from 'styled-components/native';

export type ButtonStyleType = 'PRIMARY' | 'SECONDARY';

type TitleProps = {
	type: ButtonStyleType;
}

type ContainerProps = TitleProps & {
	pressed: boolean;
}

export const Container = styled.View <ContainerProps>`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 16px 24px;
	border-radius: 6px;
	${({ theme, type, pressed }) => type === 'SECONDARY'
		? css`
			background-color: ${ pressed ? theme.COLORS.GRAY_300 : theme.COLORS.GRAY_100 };
			border: 1px solid ${ theme.COLORS.GRAY_700};
		`
		: css`
			background-color: ${ pressed ? theme.COLORS.GRAY_700 : theme.COLORS.GRAY_600 };
		`
	};
`;

export const Title = styled.Text<TitleProps>`
	${({ theme, type }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.SM}px;
		color: ${type === 'SECONDARY' ? theme.COLORS.GRAY_700 : theme.COLORS.WHITE};
	`};
    
	align-items: center
`;