import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Dimensions, Animated, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
import styled from 'styled-components/native';
import ExerciseCard from '../../components/ExerciseCard';
import ExerciseButton from '../../components/ExerciseButton';
import CurrentExplainLine from '../../components/CurrentExplainLine';
import NextSet from '../../components/NextSet';
import CurrentSet from '../../components/CurrentSet';
import COMMENTDATA from './commentData';
import { colors } from '../../colors';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { FlatList } from 'react-native-gesture-handler';
import { it } from 'date-fns/locale';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

const ExerciseCircle = styled.View`
	width: 307px;
	height: 307px;
	border-radius: 291px;
	background: #f3f3f3;
	margin-bottom: 24px;
	justify-content: center;
	align-items: center;
`;

const FirstRec = styled.View`
	width: 92px;
	height: 6px;
	background-color: ${colors.grey_7};
	border-radius: 10px;
`;

const LastRec = styled.View`
	width: 20px;
	height: 6px;
	border-radius: 0px 10px 10px 0px;
	background-color: ${colors.grey_4};
	margin-left: 4px;
`;

const SetBarLine = styled.View`
	flex-direction: row;
	justify-content: space-around;
	margin-bottom: 36px;
`;

const TextBox = styled.View`
	width: 327px;
	height: 24px;
	margin: 23px 0px 5px 0px;
`;

const JustText = styled.Text`
	color: #9747ff;
	text-align: center;
	font-size: 15px;
	font-weight: 400;
	line-height: 22.5px;
`;

const BoxList = styled.View`
	height: 120px;
`;

const Container = styled.View`
	width: 327px;
	height: 56px;
	border-radius: 12px;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	margin-bottom: 8px;
`;

const CurrentText = styled.Text`
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: 32px;
`;

const CurrentUnit = styled.Text`
	font-size: 15px;
	font-style: normal;
	font-weight: 600;
`;

const TextLine = styled.View`
	flex-direction: row;
	height: 20px;
	align-items: flex-end;
`;

const Box1 = styled.View`
	width: 94px;
`;

const Box2 = styled.View`
	width: 42px;
`;

export default function exerciseCourse_1({ navigation }) {
	//운동 중 페이지. 나중에 운동 과정 페이지 하나에 다 넣을 예정

	const adviceData = [
		{ id: 1, content: '허리를 과도하게 안으로 넣지 마세요' },
		{ id: 2, content: '적절한 무게로 승모근에 무리가 가지 않도록 하세요.' },
		{ id: 3, content: '안장과 바의 위치점을 올바르게 맞춰주세요.' },
	];

	const timeData = [
		// { id: 1, duration: '2' },
		// { id: 2, duration: '5' },
		// { id: 3, duration: '4' },
		// { id: 4, duration: '2' },
		// { id: 5, duration: '5' },
		// { id: 6, duration: '2' },
		// { id: 7, duration: '2' },
	];

	const setData = [
		{ id: 1, kg: '2', num: '1' },
		{ id: 2, kg: '5', num: '1' },
		{ id: 3, kg: '4', num: '1' },
		{ id: 4, kg: '2', num: '1' },
		{ id: 5, kg: '5', num: '1' },
	];

	const goToCompleteExercise = () => navigation.navigate('exerciseCourse_2');
	const [isPlaying, setIsPlaying] = useState(true);
	const [advice, setAdvice] = useState('');
	const [currentId, setCurrentId] = useState(1);
	const [oneDuration, setOneDuration] = useState(timeData[0]?.duration);
	const [i, setI] = useState(1);
	const [key, setKey] = useState(0);
	const [exerciseName, setExerciseName] = useState('사이드 레터럴 레이즈');
	const flatListRef = useRef();
	const [boxNumber, setBoxNumber] = useState(1);

	useEffect(() => {
		// 타이머가 종료될 때마다 key 값을 변경하여 CountdownCircleTimer 컴포넌트 리셋
		setKey((prevKey) => prevKey + 1);
	}, [oneDuration]);

	const handleComplete = () => {
		//i 업데이트
		const nextId = i + 1 > timeData.length ? setIsPlaying(false) : i + 1;
		setI(nextId);

		// 해당 id에 해당하는 데이터를 가져와 새로운 duration을 업데이트
		const nextData = timeData.find((item) => item.id === nextId);
		const newDuration = nextData?.duration || 0;
		//const newDuration = timeData[nextId]?.duration || 0;

		//delay 동안 쉬도록
		setIsPlaying(false);
		setKey((prevKey) => prevKey + 1); //타이머 리셋
		setTimeout(() => {
			setIsPlaying(true);
			setOneDuration(newDuration);
		}, 2000);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			// 다음에 나올 Id를 currentId로 업데이트
			const nextId = currentId + 1 > adviceData.length ? 1 : currentId + 1;
			setCurrentId(nextId);

			// 해당 id에 해당하는 데이터를 가져와 advice를 업데이트
			const data = adviceData.find((item) => item.id === nextId);
			setAdvice(data.content);
		}, 3500); // 3.5초마다 데이터를 가져오도록 설정

		return () => clearInterval(interval);
	}, [currentId]);

	const renderItem = ({ item }) => {
		let backgroundColor = '';
		let textColor = '';

		if (item.id === setData.length) {
			backgroundColor = 'rgba(0, 0, 0, 0)';
			textColor = 'rgba(0, 0, 0, 0)';
		} else {
			backgroundColor =
				item.id === boxNumber ? '#f3f3f3' : 'rgba(243, 243, 243, 0.5)';
			textColor = item.id === boxNumber ? '#000' : 'rgba(0, 0, 0, 0.5)';
		}

		return (
			<Container style={{ backgroundColor: backgroundColor }}>
				<CurrentText style={{ color: textColor }}>{item.id}</CurrentText>
				<TextLine>
					<CurrentUnit style={{ color: textColor }}>세트</CurrentUnit>
				</TextLine>

				<Box1 />

				<CurrentText style={{ color: textColor }}>{item.kg}</CurrentText>
				<TextLine>
					<CurrentUnit style={{ color: textColor }}>kg</CurrentUnit>
				</TextLine>

				<Box2 />

				<CurrentText style={{ color: textColor }}>{item.num}</CurrentText>
				<TextLine>
					<CurrentUnit style={{ color: textColor }}>회</CurrentUnit>
				</TextLine>
			</Container>
		);
	};

	const scrollBox = () => {
		const next = boxNumber - 1 > setData.length ? boxNumber : boxNumber + 1;
		setBoxNumber(next);

		// const nextId = i + 1 > timeData.length ? setIsPlaying(false) : i + 1;
		// setI(nextId);

		// // 해당 id에 해당하는 데이터를 가져와 새로운 duration을 업데이트
		// const nextData = timeData.find((item) => item.id === nextId);
		// const newDuration = nextData?.duration || 0;
		// //const newDuration = timeData[nextId]?.duration || 0;

		// //delay 동안 쉬도록
		// setIsPlaying(false);
		// setKey((prevKey) => prevKey + 1); //타이머 리셋
		// setTimeout(() => {
		// 	setIsPlaying(true);
		// 	setOneDuration(newDuration);
		// }, 100);

		this.flatListRef.scrollToIndex({ animated: true, index: boxNumber });
	};

	const miniBar = ({ num }) => {
		const Width = Math.ceil(92 / (num - 1)); // 랜덤 너비 설정
		const backgroundColor = getRandomColor(); // 랜덤 배경색 설정

		return (
			<View
				style={{
					width: Width,
					height: 6,
					borderRadius: 10,
					backgroundColor,
					marginVertical: 5,
				}}
			/>
		);
	};

	const seperateBar = () => {
		const num = 4;

		const boxes = Array.from({ length: num }, (_, index) => index);

		return (
			<View>
				{boxes.map((boxIndex) => (
					<FirstRec key={boxIndex} />
				))}
			</View>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#DDD' }}>
			<ExerciseCard exerciseName={exerciseName}>
				<ExerciseCircle>
					<CountdownCircleTimer
						key={key}
						isPlaying={isPlaying}
						duration={oneDuration}
						colors={'#757575'}
						size={315}
						strokeWidth={8}
						trailColor={'#BFBFBF'}
						onComplete={handleComplete}
						//onComplete={() => ({ shouldRepeat: false, delay: 1 })}
						updateInterval={0.001}>
						{({ remainingTime }) => <Text>{remainingTime}</Text>}
					</CountdownCircleTimer>
				</ExerciseCircle>

				<SetBarLine>
					<FirstRec style={{ background: colors.grey_6 }} />
					{/* <LastRec style={{ background: colors.grey_3 }} /> */}
				</SetBarLine>

				<BoxList>
					<FlatList
						style={{}}
						initialScrollIndex={0}
						data={setData}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						showsVerticalScrollIndicator={false}
						ref={(ref) => {
							this.flatListRef = ref;
						}}
						onEndReached={goToCompleteExercise}
						scrollEnabled={false}
					/>
				</BoxList>

				<TextBox>
					<JustText>{advice}</JustText>
				</TextBox>

				<ExerciseButton //세트 완료 버튼
					text='세트 완료'
					disabled={false}
					//onPress={timeToRest}
					onPress={scrollBox}
				/>
			</ExerciseCard>
		</SafeAreaView>
	);
}
