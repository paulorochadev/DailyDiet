import { Container, Logo, UserIcon } from './styles';

import ellipseImg from '@assets/ellipse.png';
import logoImg from '@assets/logo.png';

export function TopCard() {
    
	return (
		<Container>
			<Logo source={ logoImg } />

			<UserIcon source={ ellipseImg } />
		</Container>
	);
}