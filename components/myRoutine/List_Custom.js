import React from 'react'
import styled from 'styled-components/native'
import { days } from './data'
import { colors } from '../../colors'
import { ComponentTitle, SetCount } from '../Shared/MyRoutine_Shared'
import { ScheduleChanger } from '../ScheduleChanger'

import { ContentContainer, NoRoutineText } from '../Shared/MyRoutine_Shared'
import Trash from '../../assets/SVGs/Trash.svg'
import { SetsText } from '../Shared/MyRoutine_Shared'
import { ScreenWidth } from '../../Shared'

const SetContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-top: 12px;
    padding: 12px 16px;
    width: 100%;
    border-radius: 8px;
    margin-top: 4px;
`
const ExerciseTitle = styled.Text`
    font-size: 15px;
    margin: 8px;
    font-family: Pretendard-Medium;
`

const BottomContainer = styled.View`
    width: 100%;
`
const Blank = styled.View`
    width: 100%;
    height: 40px;
`
const ScrollPressable = styled.Pressable`
    width: ${ScreenWidth - 48}px;
    flex: 1;
    margin-left: 24px;
`
const TextContainer = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
`
const ExerciseContainer = styled.Pressable`
    padding: 8px;
    flex-direction: column;
    border-radius: 12px;
    width: ${ScreenWidth - 48}px;
    margin-top: 16px;
`
const DeleteButton = styled.TouchableOpacity`
    height: 24px;
    width: 24px;
    margin-left: 20px;
`
const AddButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 8px;
    margin-top: 4px;
    height: 48px;
    border: 1px dashed ${colors.l_main};
`
const AddText = styled.Text`
    font-size: 17px;
    color: ${colors.l_main};
    font-family: Pretendard-SemiBold;
`

const ExerciseItem_Custom = ({ id, content, title, popMessage, editRoutine, isDark }) => {
    return (
        <ExerciseContainer
            style={{ backgroundColor: isDark ? colors.grey_8 : colors.white }}
            onLongPress={() => popMessage()}
        >
            <ExerciseTitle style={{ color: isDark ? colors.white : colors.black }}>{title}</ExerciseTitle>
            <BottomContainer key={id}>
                {content.map((item, contentId) => (
                    <SetContainer
                        style={{
                            backgroundColor: isDark ? colors.grey_9 : colors.grey_1,
                        }}
                        key={contentId}
                    >
                        <TextContainer>
                            <SetsText
                                style={{
                                    color: isDark ? colors.grey_4 : colors.grey_8,
                                    fontSize: 17,
                                }}
                            >
                                {contentId + 1}
                            </SetsText>
                        </TextContainer>
                        <TextContainer>
                            <SetCount
                                style={{
                                    color: isDark ? colors.white : colors.black,
                                    textAlign: 'center',
                                }}
                            >
                                {item.weight ? item.weight : '-'}
                            </SetCount>
                            <SetsText
                                style={{
                                    color: isDark ? colors.grey_4 : colors.grey_8,
                                    marginRight: 20,
                                }}
                            >
                                kg
                            </SetsText>
                        </TextContainer>
                        <TextContainer style={{}}>
                            <SetCount
                                style={{
                                    color: isDark ? colors.white : colors.black,
                                    textAlign: 'center',
                                    marginLeft: 20,
                                }}
                            >
                                {item.rep}
                            </SetCount>
                            <SetsText style={{ color: isDark ? colors.grey_4 : colors.grey_8 }}>회</SetsText>
                        </TextContainer>
                        <DeleteButton onPress={() => editRoutine(id, 'deleteSet', contentId)}>
                            <Trash width={24} height={24} />
                        </DeleteButton>
                    </SetContainer>
                ))}
                <AddButton
                    style={{ backgroundColor: isDark ? colors.d_sub_2 : colors.l_sub_2 }}
                    onPress={() => editRoutine(id, 'addSet', 0)}
                >
                    <AddText>세트 추가</AddText>
                </AddButton>
            </BottomContainer>
        </ExerciseContainer>
    )
}

export const List_Custom = ({ isDark, SCHEDULE, setNewSCHE, newRoutine, editRoutine, popMessage }) => {
    // console.log('newRoutine', newRoutine)
    return (
        <ScrollPressable>
            <ComponentTitle title="요일 변경" subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요" isDark={isDark} />
            <ScheduleChanger setNewSCHE={setNewSCHE} SCHEDULE={SCHEDULE} days={days} isDark={isDark} />
            <ComponentTitle title="운동 편집" subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요" isDark={isDark} />
            {newRoutine ? (
                <>
                    {newRoutine?.map((item, id) => (
                        <ExerciseItem_Custom
                            key={id}
                            id={id}
                            content={item.content}
                            title={item.exerciseName}
                            editRoutine={editRoutine}
                            isDark={isDark}
                            popMessage={() => popMessage(id)}
                        />
                    ))}
                    <Blank />
                </>
            ) : (
                <ContentContainer>
                    <NoRoutineText style={{ marginTop: 160, color: colors.grey_5 }}>
                        해당 요일에는 루틴이 없어요
                    </NoRoutineText>
                </ContentContainer>
            )}
        </ScrollPressable>
    )
}
