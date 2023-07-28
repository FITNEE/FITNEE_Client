import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
	flex: 1;
	align-items: center;
	padding: 0px 24px;
	background: #ddd;
`;

const ExerciseName = styled.Text`
	color: #000;
	text-align: center;
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: 32px;
	width: 327px;
	margin: 16px 24px 32px 24px;
`;

export default function ExerciseCard({ exerciseName, children }) {
	return (
		<Container>
			<ExerciseName>{exerciseName}</ExerciseName>
			{children}
		</Container>
	);
}
