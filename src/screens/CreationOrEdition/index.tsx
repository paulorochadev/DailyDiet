import { useEffect, useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useTheme } from 'styled-components/native';

import { RootStackParamList } from '@routes/app.routes';

import { createMeal, getMeal, MealStorageDTO, updateMeal } from '@storage/meal';

import { Button } from '@components/Button';
import { Content } from '@components/Content';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Loading } from '@components/Loading';
import { Select } from '@components/Select';

import { AppError } from '@utils/AppError';

import { Container, DateTimeContainer, SelectContainer, SelectTitle } from './styles';

type Params = {
	screenAction: 'CREATION' | 'EDITION';
	dateTime?: string;
}

type ScreenProp = NativeStackNavigationProp<RootStackParamList, 'creationOrEdition'>;

export function CreationOrEdition() {

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [selectedOption, setSelectedOption] = useState<boolean | null>(null);
	const [loadingInfo, setLoadingInfo] = useState(true);

	const { COLORS } = useTheme();
	const navigation = useNavigation<ScreenProp>();
	
	const route = useRoute();
	const { screenAction, dateTime } = route.params as Params;

	function handleGoBackToPreviousScreen() {
		navigation.goBack();
	}

	function verifyData() {
		if (name.trim().length === 0 || description.trim().length === 0 || date.trim().length === 0
			|| time.trim().length === 0 || selectedOption === null
		) {
			return (Alert.alert(
				'Atenção!',
				'Por favor, informe todos os dados para prosseguir.'
			));
		}

		const dateVerification = verifyDate(date);

		if (dateVerification !== true) {
			return (Alert.alert(
				'Atenção!',
				dateVerification
			));

			// return false;
		}

		const timeVerification = verifyTime(time);

		if (timeVerification !== true) {
			return (Alert.alert(
				'Atenção!',
				timeVerification
			));

			// return false;
		}

		return true;
	}

	async function handleNewMeal() {
		const verificationStatus = verifyData();

		if (verificationStatus) {
			try {
				const newMeal: MealStorageDTO = {
					name: name,
					description: description,
					date: date,
					time: time.length === 5
						? time
						: '' + time.padStart(2, '0') + ':00',
					isInsideTheDiet: selectedOption === null ? true : selectedOption
				};

				await createMeal(newMeal);

				if (selectedOption !== null)
					navigation.replace('feedback', {
						isInsideTheDiet: selectedOption
					});

			} catch (error) {

				console.log(error);

				if (error instanceof AppError) {
					return Alert.alert(
						'Atenção!',
						error.message
					);
				}

				return Alert.alert(
					'Atenção!',
					'Ocorreu um erro ao cadastrar a refeição.'
				);
			}
		}
	}

	async function handleSaveMeal() {
		const verificationStatus = verifyData();

		if (verificationStatus) {
			try {
				const updatedMeal: MealStorageDTO = {
					name,
					description,
					date,
					time: time.length === 5
						? time
						: '' + time.padStart(2, '0') + ':00',
					isInsideTheDiet: selectedOption === null ? true : selectedOption
				}

				await updateMeal(dateTime ? dateTime : '', updatedMeal);

				navigation.navigate('home');

			} catch (error) {

				console.log(error);

				if (error instanceof AppError) {
					return Alert.alert(
						'Atenção!',
						error.message
					);
				}

				return Alert.alert(
					'Atenção!',
					'Ocorreu um erro ao salvar as alterações.'
				);
			}
		}
	}

	function verifyDate(text: string) { // 06/01/2023		
		const dateFormat = '([0-9][0-9])' + '/' + '([0-9][0-9])' + '/' + '([0-9][0-9])([0-9][0-9])';

		const reg = new RegExp('^' + dateFormat + '$');

		if (text.match(reg) === null) {
			const getFullDate = new Date(Date.now());
			const currentDay = getFullDate.getDate();
			const currentMonth = getFullDate.getMonth() + 1;
			const currentYear = getFullDate.getFullYear();

			return 'Por favor, informe a data no seguinte formato:\n\ndd/mm/aaaa\n\n' +
				'Ex: ' +
				`${currentDay.toString().padStart(2, '0')
				}/${currentMonth.toString().padStart(2, '0')
				}/${currentYear
				}`;
		}

		const [day, month, year] = text.split('/').map(Number);

		if (year.toString().length !== 4) {
			return 'Por favor, informe um ano válido.';
		}

		if (month === 0 || month > 12) {
			return 'Por favor, informe um mês válido.';
		}

		if (month === 2) {
			if (day === 0 || day > 29) {
				return 'Por favor, informe um dia válido.';
            }

			if (day === 29) {
				const rest = year % 4;

				console.log(rest);

				if (rest !== 0)
					return 'O mês de Fevereiro tem 28 dias neste ano, informe um valor válido.';
			}
		}

		if (month === 4 || month === 6 || month === 9 || month === 11) {
			if (day === 0 || day > 31) {
				return 'Por favor, informe um dia válido.';
            }

			if (day === 31) {
				return 'Este mês tem 30 dias, informe um valor válido.';
            }
		}

		else {
			if (day === 0 || day > 31) {
				return 'Por favor, informe um dia válido.';
            }
		}

		return true;
	}

	function verifyTime(text: string) {
		const timeFormat = '([0-1][0-9]|2[0-3])' + ':' + '([0-5][0-9])';

		const reg = new RegExp('^' + timeFormat + '$');

		if (text.charAt(2) === ':') {
			if (text.match(reg) === null && text.length !== 5) {
				const getFullDate = new Date(Date.now());
				const currentHours = getFullDate.getHours();
				const currentMinutes = getFullDate.getMinutes();

				return 'Por favor, informe a hora no seguinte formato:\n\nhh:mm\n\n' +
					'Ex: ' +
					`${currentHours.toString().padStart(2, '0')
					}:${currentMinutes.toString().padStart(2, '0')
					}`;
			}

			const [hours, minutes] = text.split(':').map(Number);

			if (hours > 23) {
				return 'Por favor, informe uma hora válida de 0 a 23.';
            }

			if (minutes > 59) {
				return 'Por favor, informe um minuto válido de 0 a 59.';
            }

		}

		const hours = parseInt(text);

		if (hours > 23) {
			return 'Por favor, informe uma hora válida de 0 a 23.';
        }

		return true;
	}

	async function fetchMeal() {
		try {
			if (dateTime) {
				const specificMeal = await getMeal(dateTime);
				// console.log('refeição =>', specificMeal);

				const { name, description, date, time, isInsideTheDiet } = specificMeal;

				setName(name);
				setDescription(description);
				setDate(date);
				setTime(time);
				setSelectedOption(isInsideTheDiet);
				setLoadingInfo(false);
			}

		} catch (error) {
			console.log(error);

			if (error instanceof AppError) {
				return Alert.alert(
					'Erro',
					error.message,
					[
						{
							text: 'Ok',
							onPress: () => navigation.goBack()
						}
					]
				);
			}

			return Alert.alert(
				'Erro',
				'Ocorreu um erro ao buscar as informações sobre a refeição, volte e tente novamente.',
				[
					{
						text: 'Ok',
						onPress: () => navigation.goBack()
					}
				]
			);
		}
	}

	useEffect(() => {
		if (screenAction === 'EDITION') {
			fetchMeal();
		}
	}, []);

	return (
		<Container>
			<Header
				title={ screenAction === 'CREATION' ? 'Nova refeição' : 'Editar refeição' }
				onPress={ handleGoBackToPreviousScreen }
			/>

			<Content>
				{
					loadingInfo
						&& screenAction === 'EDITION'
						?
						<Loading color={ COLORS.GRAY_700 } />
						:
						<>
							<ScrollView
								showsVerticalScrollIndicator={ false }
								keyboardShouldPersistTaps='handled'
							>
								<Input
									title='Nome'
									value={ name }
									onChangeText={ setName }
									isFilled={ name.trim().length > 0 }
								/>
								<Input
									title='Descrição'
									value={ description }
									onChangeText={ setDescription }
									multiline
									numberOfLines={4}
									style={{ height: 120 }}
									textAlignVertical={ 'top' }
									isFilled={ description.trim().length > 0 }
								/>

								<DateTimeContainer>
									<Input
										title='Data'
										style={{ flex: 1 }}
										inputAlign={ 'LEFT' }
										value={ date }
										onChangeText={(text) => {
											if (text.length > date.length) {

												let changedIndex = 0;

												for (let x = 0; x < text.length; x++) {
													if (text[x] !== date[x]) {
														changedIndex = x;

														break;
													}
												}

												if (changedIndex === date.length) {
													for (let x = 0; x < text.length; x++) {
														if (text[x] !== '0' && text[x] !== '1' && text[x] !== '2' &&
															text[x] !== '3' && text[x] !== '4' && text[x] !== '5' &&
															text[x] !== '6' && text[x] !== '7' && text[x] !== '8' &&
															text[x] !== '9' && text[x] !== '/'
														) {
															text = text.replace(text[x], '');
															x--;
														}
														else {
															if (x === 1 || x == 4) {
																if (text[x] === '/') {
																	const part1 = text.substring(0, (x - 1));
																	const part2 = text.substring((x - 1), text.length);

																	text = part1 + '0' + part2;
																	x++;
																}
															}
															else if (x === 2 || x == 5) {
																if (text[x] !== '/') {
																	const part1 = text.substring(0, (x));
																	const part2 = text.substring((x), text.length);

																	text = part1 + '/' + part2;
																	x++;
																}
															}
															else { // x === 3 || x === 6  || x == 0
																if (text[x] === '/') {
																	const part1 = text.substring(0, (x));
																	const part2 = text.substring((x + 1), text.length);
																	
																	text = part1 + part2;
																	x--;
																}
															}
														}
													}

													text = text.substring(0, 10);
												}
											}

											setDate(text);
										}}
										maxLength={10}
										isFilled={ date.trim().length > 0 }
									/>
									<Input
										title='Hora'
										style={{ flex: 1 }}
										inputAlign={ 'RIGHT' }
										value={ time }
										maxLength={5}
										onChangeText={(text) => {
											if (text.length > time.length) {

												let changedIndex = 0;

												for (let x = 0; x < text.length; x++) {
													if (text[x] !== time[x]) {
														changedIndex = x;

														break;
													}
												}

												if (changedIndex === time.length) {
													for (let x = 0; x < text.length; x++) {
														if (text[x] !== '0' && text[x] !== '1' && text[x] !== '2' &&
															text[x] !== '3' && text[x] !== '4' && text[x] !== '5' &&
															text[x] !== '6' && text[x] !== '7' && text[x] !== '8' &&
															text[x] !== '9' && text[x] !== ':'
														) {
															text = text.replace(text[x], '');
															x--;
														}
														if (x === 1) {
															if (text[x] === ':') {
																const part1 = text.substring(0, (x - 1));
																const part2 = text.substring((x - 1), text.length);

																text = part1 + '0' + part2;
																x++;
															}
														}
														else if (x === 2) {
															if (text[x] !== ':') {
																const part1 = text.substring(0, (x));
																const part2 = text.substring((x), text.length);

																text = part1 + ':' + part2;
																x++;
															}
														}
														else { // x === 3 x === 4 x === 0
															if (text[x] === ':') {
																const part1 = text.substring(0, (x));
																const part2 = text.substring((x + 1), text.length);

																text = part1 + part2;
																x--;
															}
														}
													}

													text = text.substring(0, 5);
												}
											}

											setTime(text);
										}}
										onSubmitEditing={(event) => {
											// autocompleta com os minutos em '00'
											const { text } = event.nativeEvent;

											if (text.charAt(2) === ':') {
												setTime(text + '00');
											}

											else if (text.length > 0 && text.length < 3) {
												const hours = text.padStart(2, '0');

												setTime(hours + ':00');
											}
										}}

										isFilled={time.trim().length > 0}
									/>
								</DateTimeContainer >

								<SelectTitle>
                                    Está dentro da dieta?
                                </SelectTitle>

								<SelectContainer>
									<Select
										onPress={ () => setSelectedOption(true) }
										selected={ selectedOption || false }
									/>
									<Select
										insideTheDiet={ false }
										onPress={ () => setSelectedOption(false) }
										selected={ !selectedOption && selectedOption !== null }
									/>
								</SelectContainer>
							</ScrollView>
                            
							<Button
								style={{ marginTop: 6 }}
								title={ screenAction === 'CREATION' ? 'Cadastrar refeição' : 'Salvar alterações' }
								onPress={ screenAction === 'CREATION' ? handleNewMeal : handleSaveMeal }
							/>
						</>
				}
			</Content>
		</Container>
	);
}