import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';

import { Container } from './styles';

export function Loading({ ...rest } : ActivityIndicatorProps) {
	
	return (
		<Container>
			<ActivityIndicator {...rest} />
		</Container>
	);
}