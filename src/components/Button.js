import { Pressable, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

// Enum 역할
const ButtonTypes = {
  NUMBER: 'NUMBER',
  OPERATOR: 'OPERATOR',
};

const Button = ({ title, onPress, buttonStyle, buttonType }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor:
            buttonType === ButtonTypes.NUMBER ? '#71717a' : '#f59e0b',
        },
        pressed && {
          backgroundColor:
            buttonType === ButtonTypes.NUMBER ? '#3f3f46' : '#b45309',
        },
        buttonStyle,
        // { backgroundColor: 'red', padding: 20 },
        // pressed && { backgroundColor: 'blue' },
      ]}
      // onPressIn={() => console.log('In')}
      // onPressOut={() => console.log('Out')}
      // onPress={() => console.log('Press')}
      // onLongPress={() => console.log('Long')}
      // delayLongPress={2000}
      onPressOut={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

Button.defaultProps = {
  // title: 'button title',
  buttonType: ButtonTypes.NUMBER,
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  buttonStyle: PropTypes.object,
  buttonType: PropTypes.oneOf(Object.values(ButtonTypes)),
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#71717a',
    // borderWidth: 1,
  },
  title: {
    color: '#ffffff',
    fontSize: 50,
  },
});

export { ButtonTypes };
export default Button;
