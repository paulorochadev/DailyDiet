import styled, { css } from 'styled-components/native';

export type DataType = 'DEFAULT' | 'INSIDE_THE_DIET' | 'OUT_OF_DIET';

type Props = {
	type: DataType;
}

export const Container = styled.View<Props>`
	padding: 16px;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	${({ theme, type }) => type === 'DEFAULT'
		? css`
		    background-color: ${theme.COLORS.GRAY_200};
		`
		: type === 'INSIDE_THE_DIET'
			? css`
                flex: 1;
                background-color: ${theme.COLORS.GREEN_LIGHT};
                margin-right: 10px;
		    `
			: css`
                flex: 1;
                background-color: ${theme.COLORS.RED_LIGHT};
	        `
	};

	margin-bottom: 12px;
`;

export const Number = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.BOLD};
		font-size: ${theme.FONT_SIZE.TITLE.XL}px;
		color: ${theme.COLORS.GRAY_700};
	`};
`;

export const Info = styled.Text`
	${({ theme }) => css`
		font-family: ${theme.FONT_FAMILY.REGULAR};
		font-size: ${theme.FONT_SIZE.BODY.SM}px;
		color: ${theme.COLORS.GRAY_600};
	`};
    
	text-align: center
`;