import React, {useState} from 'react';
import {withTheme} from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

type TextFieldProps = {
  onChangeText: Function;
  placeholder?: string;
  value?: string;
  accessibilityLabel?: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
  autoCapitalize?: string;
  error?: string | null;
  multiline?: boolean;
  style?: any;
  editable?: any;
  defaultValue?: any;
};

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  accessibilityLabel,
  secureTextEntry = false,
  keyboardType = 'default',
  onChangeText,
  autoCapitalize = 'sentences',
  error = null,
  multiline = false,
  editable = true,
  defaultValue = '',
  style = {},
  ...rest
}) => {
  const [showSecureEntry] = useState(false);

  return (
    <TextFieldWrapper>
      {accessibilityLabel !== undefined && (
        <TextInputLabelWrapper>
          <TextInputLabelWrapper__Content>
            {accessibilityLabel}
          </TextInputLabelWrapper__Content>
        </TextInputLabelWrapper>
      )}

      <Horizontal>
        <TextInputField
          onChangeText={onChangeText}
          secureTextEntry={showSecureEntry ? false : secureTextEntry}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          underlineColorAndroid="rgba(0,0,0,0)"
          multiline={multiline}
          style={style}
          editable={editable}
          defaultValue={defaultValue}
          {...rest}
        />
      </Horizontal>
      {error !== null && (
        <ErrorWrapper>
          <ErrorWrapper__Text>{error}</ErrorWrapper__Text>
        </ErrorWrapper>
      )}
    </TextFieldWrapper>
  );
};

// @ts-ignore
export default withTheme(TextField);

type FontSizeProps = {
  fontSize: number;
};

const ErrorWrapper = styled.View`
  margin-top: 3px;
  padding-left: 2px;
`;
const ErrorWrapper__Text = styled.Text`
  color: red;
`;

const TextInputField = styled.TextInput<FontSizeProps>`
  flex: 1;
  color: ${({theme}: any) => theme.colors.textBlack};
  font-size: ${({theme}: any) => theme.fontSize.title}px;
  padding-left: 8px;
`;

const Horizontal = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 10px;
  border: gray;
  padding-top: 10px;
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}: any) => theme.colors.primary};
  border-radius: 30px;
`;

const TextInputLabelWrapper__Content = styled.Text<FontSizeProps>`
  color: ${({theme}: any) => theme.colors.textBlack};
  font-size: ${({theme}: any) => theme.fontSize.subTitle}px;
  font-weight: 600;
`;

const TextInputLabelWrapper = styled.View``;

const TextFieldWrapper = styled.View`
  width: 40%;
  margin-top: 15px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;
