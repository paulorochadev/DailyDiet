import { SafeAreaView } from 'react-native-safe-area-context';

import styled, { css } from 'styled-components/native';

export const Container = styled(SafeAreaView)`
	flex: 1;

	background-color: ${({ theme }) => theme.COLORS.GRAY_300};
`;

export const SelectTitle = styled.Text`
	${({ theme }) => css`
		font-family: ${ theme.FONT_FAMILY.BOLD };
		font-size: ${ theme.FONT_SIZE.TITLE.SM }px;
		color: ${ theme.COLORS.GRAY_600 };
	`}
`;

export const SelectContainer = styled.View`
	flex-direction: row;
	margin-top: 6px;
	margin-bottom: 6px;
`;

export const DateTimeContainer = styled.View`
	flex-direction: row;
`;