import React from 'react';
import {TouchableOpacity} from 'react-native';
import {withTheme} from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

type PrimaryButtonProps = {
  onPress: Function;
  btnText: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({onPress, btnText}) => {
  return (
    <TouchableOpacity onPress={() => onPress({})}>
      <SecondaryButton__Wrapper>
        <SecondaryButton__Wrapper__Text>
          {btnText}
        </SecondaryButton__Wrapper__Text>
      </SecondaryButton__Wrapper>
    </TouchableOpacity>
  );
};

// @ts-ignore
export default withTheme(PrimaryButton);

const SecondaryButton__Wrapper = styled.View`
  width: 200px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}: any) => theme.colors.themeColor};
  height: 50px;
  border-radius: 30px;
  padding: 0 6px 0 6px;
`;
const SecondaryButton__Wrapper__Text = styled.Text`
  color: ${({theme}: any) => theme.colors.primary};
  font-size: 16px;
`;
