import { colors } from '../../colors'
import _1 from '../../assets/Imgs/ExerciseThumb/1.png'
import _2 from '../../assets/Imgs/ExerciseThumb/2.png'
import _3 from '../../assets/Imgs/ExerciseThumb/3.png'
import _4 from '../../assets/Imgs/ExerciseThumb/4.png'
import _5 from '../../assets/Imgs/ExerciseThumb/5.png'
import _6 from '../../assets/Imgs/ExerciseThumb/6.png'
import _7 from '../../assets/Imgs/ExerciseThumb/7.png'
import _8 from '../../assets/Imgs/ExerciseThumb/8.png'
import _9 from '../../assets/Imgs/ExerciseThumb/9.png'
import _10 from '../../assets/Imgs/ExerciseThumb/10.png'
import _11 from '../../assets/Imgs/ExerciseThumb/11.png'
import _12 from '../../assets/Imgs/ExerciseThumb/12.png'
import _13 from '../../assets/Imgs/ExerciseThumb/13.png'
import _14 from '../../assets/Imgs/ExerciseThumb/14.png'
import _15 from '../../assets/Imgs/ExerciseThumb/15.png'
import _16 from '../../assets/Imgs/ExerciseThumb/16.png'
import _17 from '../../assets/Imgs/ExerciseThumb/17.png'
import _18 from '../../assets/Imgs/ExerciseThumb/18.png'
import _19 from '../../assets/Imgs/ExerciseThumb/19.png'
import _20 from '../../assets/Imgs/ExerciseThumb/20.png'
import _21 from '../../assets/Imgs/ExerciseThumb/21.png'
import _22 from '../../assets/Imgs/ExerciseThumb/22.png'
import _23 from '../../assets/Imgs/ExerciseThumb/23.png'
import _24 from '../../assets/Imgs/ExerciseThumb/24.png'
import _25 from '../../assets/Imgs/ExerciseThumb/25.png'
import { styled } from 'styled-components/native'

const ExerciseImg = styled.Image`
  width: 60px;
  margin-right: 16px;
  height: 60px;
  border-radius: 30px;
`

export default ExerciseThumb = ({ healthCategoryIdx, isDark }) => {
  return (
    <ExerciseImg
      style={{ backgroundColor: isDark ? colors.black : colors.grey_1 }}
      source={{ uri: `_${healthCategoryIdx}` }}
    ></ExerciseImg>
  )
}
