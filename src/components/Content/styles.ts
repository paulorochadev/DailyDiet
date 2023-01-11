import styled from 'styled-components/native';

export const Container = styled.View`
	flex: 1;
	padding: 30px 24px 6px;

	border-top-left-radius: 20px;
	border-top-right-radius: 20px;

	background-color: ${({ theme }) => theme.COLORS.GRAY_100};
`;