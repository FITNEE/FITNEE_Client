import React, { useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { TextInput, Dimensions, Animated, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');
import styled from 'styled-components/native';
import ExerciseCard from '../../components/ExerciseCard';
import ExerciseButton from '../../components/ExerciseButton';
import CurrentExplainLine from '../../components/CurrentExplainLine';
import CurrentSet from '../../components/CurrentSet';
import COMMENTDATA from './commentData';
import { colors } from '../../colors';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import NextSet from '../../components/NextSet';

const ExerciseCircle = styled.View`
	width: 307px;
	height: 307px;
	border-radius: 291px;
	background: #f3f3f3;
	margin-bottom: 24px;
	justify-content: center;
	align-items: center;
`;

const ReplaceButton = styled.TouchableOpacity`
	padding: 8px 12px;
	justify-content: center;
	align-items: center;
	gap: 8px;
	border-radius: 100px;
	background: #bfbfbf;
	margin-top: 18px;
	margin-bottom: 12px;
	margin-right: 242.5px;
`;

const ReplaceButtonText = styled.Text`
	color: #363636;
	text-align: center;
	font-size: 13px;
	font-style: normal;
	font-weight: 600;
	line-height: 19.5px;
`;

const UnderLine = styled.View`
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 36px;
	width: 375px;
	height: 100px;
	background-color: ${colors.grey_4};
	position: absolute;
	bottom: 0;
`;

export default function exerciseCourse_2({ navigation }) {
	//휴식페이지. 나중에 운동 과정 페이지 하나에 다 넣을 예정

	const data = [
		{ id: 0, exercise: 0, time: 30, setsNum: 15 },
		{ id: 1, exercise: 0, time: 30, setsNum: 15 },
		{ id: 2, exercise: 0, time: 30, setsNum: 15 },
		30,
	];

	const goToCompleteExercise = () => {
		setIsPlaying(false);
		navigation.navigate('completeExercise');
	};

	const [isPlaying, setIsPlaying] = React.useState(true);
	const [duration, setDuration] = React.useState(10);

	const children = ({ remainingTime }) => {
		const minutes = Math.floor(remainingTime / 60);
		min = minutes < 10 ? '0' + minutes : minutes;
		const seconds = remainingTime % 60;
		sec = seconds < 10 ? '0' + seconds : seconds;

		return `${min}:${sec}`;
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#DDD' }}>
			<ExerciseCard exerciseName='휴식 시간'>
				<ExerciseCircle>
					<CountdownCircleTimer
						isPlaying={isPlaying}
						duration={duration}
						colors={'#757575'}
						size={315}
						strokeWidth={8}
						trailColor={'#BFBFBF'}
						onComplete={() => ({ shouldRepeat: false, delay: 1 })}
						updateInterval={0.001}
					>
						{({ remainingTime }) => (
							<Text style={{ color: colors.black, fontSize: 56 }}>
								{children({ remainingTime })}
							</Text>
						)}
					</CountdownCircleTimer>
				</ExerciseCircle>

				<ReplaceButton>
					<ReplaceButtonText>운동 대체하기</ReplaceButtonText>
				</ReplaceButton>

				<NextSet set='1' kg='20' num='15' />

				<ReplaceButton onPress={goToCompleteExercise}>
					<ReplaceButtonText>바로 시작하기</ReplaceButtonText>
				</ReplaceButton>
			</ExerciseCard>
		</SafeAreaView>
	);
}
