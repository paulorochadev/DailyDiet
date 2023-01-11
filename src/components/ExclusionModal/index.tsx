import { Modal, ModalProps } from 'react-native';

import { Actions, Container, Content, Question } from './styles';

import { Button } from '@components/Button';

type Props = ModalProps & {
	onClose: () => void;
	onDelete: () => void;
}

export function ExclusionModal({ onClose, onDelete, ...rest } : Props) {

	return (
		<Modal { ...rest }>
			<Container>
				<Content>
					<Question>
                        Deseja realmente excluir o registro da refeição?
                    </Question>

					<Actions>
						<Button
							title='Cancelar'
							type='SECONDARY'
							style={{ flex: 1, marginRight: 10 }}
							onPress={ onClose }
						/>
						<Button
							title='Sim, excluir'
							style={{ flex: 1 }}
							onPress={ onDelete }
						/>
					</Actions>
				</Content>
			</Container>
		</Modal>
	);
}