import styled from 'styled-components/native';
import { colors } from '../../colors';

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.black};
`;

export const Input = styled.TextInput`
  padding: 15px 7px;
  border-radius: 4px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`;

export const StatusText = styled.Text`
  position: absolute;
  right: 0;
  top: -50%;
  font-size: 12px;
  margin-bottom: 12px;
  margin-right: 8px;
  font-weight: 300;
  color: ${colors.grey_4};
`;
