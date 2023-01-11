import { Circle, IconProps } from 'phosphor-react-native';

import styled, { css } from 'styled-components/native';

type StatusProps = {
	isInsideTheDiet: boolean;
}

type ContainerProps = {
	pressed: boolean
}

export const Container = styled.View<ContainerProps>`
	flex-direction: row;
	align-items: center;
	padding: 14px 16px 14px 12px;

	${({ theme, pressed }) => css`
		background-color: ${ pressed ? theme.COLORS.GRAY_300 : 'transparent' };
		border: 1px solid ${ theme.COLORS.GRAY_300 };
	`};

	border-radius: 6px;
	margin-bottom: 8px;
`;

export const Hour = styled.Text`
	${({ theme }) => css`
		font-family: ${ theme.FONT_FAMILY.BOLD };
		font-size: ${ theme.FONT_SIZE.BODY.SX }px;
		color: ${ theme.COLORS.GRAY_700 };
	`}
`;

export const Divider = styled.View`
	${({ theme }) => css`
		height: ${theme.FONT_SIZE.BODY.SM}px;
		border: 1px solid ${ theme.COLORS.GRAY_400 };
	`};

	margin: 0 6px;
`;

export const MealName = styled.Text`
	${({ theme }) => css`
		font-family: ${ theme.FONT_FAMILY.REGULAR };
		font-size: ${ theme.FONT_SIZE.BODY.MD }px;
		color: ${ theme.COLORS.GRAY_600 };
	`};
    
	flex: 1;
`;

export const Status = styled(Circle).attrs<StatusProps>(({ theme, isInsideTheDiet }) => ({
	size: theme.FONT_SIZE.BODY.SM,
	weight: 'fill',
	color: isInsideTheDiet ? theme.COLORS.GREEN_MID : theme.COLORS.RED_MID
} as IconProps)) <StatusProps>`
	margin-left: 20px;
	color: ${({ theme, isInsideTheDiet }) => isInsideTheDiet ? theme.COLORS.GREEN_MID : theme.COLORS.RED_MID}
`;