import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Button, { ButtonTypes } from './components/Button';
import { useState } from 'react';

const Operators = {
  CLEAR: 'C',
  PLUS: '+',
  MINUS: '-',
  EQUAL: '=',
};

const App = () => {
  const [result, setResult] = useState(0);
  // console.log('rendering : ', result);
  const [formula, setFormula] = useState([]);

  const onPressNumber = (number) => {
    // setResult(number);
    const last = formula[formula.length - 1];
    // isNaN은 'is Not a Number'의 줄임말로 파라미터로 전달된 값이 숫자가 아니면 true를 반환하는 함수
    if (isNaN(last)) {
      setResult(result);
      setFormula((prev) => [...prev, number]);
    } else {
      const newNumber = (last ?? 0) * 10 + number;
      setResult(newNumber);
      setFormula((prev) => {
        prev.pop();
        return [...prev, newNumber];
      });
    }
  };

  const calculate = () => {
    let calculatedNumber = 0;
    let operator = '';

    formula.forEach((value) => {
      if ([Operators.PLUS, Operators.MINUS].includes(value)) {
        operator = value;
      } else {
        if (operator === Operators.PLUS) {
          calculatedNumber += value;
        } else if (operator === Operators.MINUS) {
          calculatedNumber -= value;
        } else {
          calculatedNumber = value;
        }
      }
    });
    setResult(calculatedNumber);
    setFormula([]);
  };

  const onPressOperator = (operator) => {
    switch (operator) {
      case Operators.CLEAR:
        setFormula([]);
        setResult(0);
        return;
      case Operators.EQUAL:
        calculate();
        return;
      default: {
        const last = formula[formula.length - 1];
        if ([Operators.PLUS, Operators.MINUS].includes(last)) {
          setFormula((prev) => {
            prev.pop();
            return [...prev, operator];
          });
        } else {
          setFormula((prev) => [...prev, operator]);
        }
        return;
      }
    }
  };

  // 화면의 크기가 필요할 때 useWindowDimensions 함수를 사용함
  // useWindowDimensions는 리액트 네이티브에서 제공하는 Hook으로 화면의 너비와 높이가 포함된 객체를 반환
  const windowWidth = useWindowDimensions().width;
  // console.log(windowWidth);
  const width = (windowWidth - 5) / 4;

  return (
    <View style={styles.container}>
      {/* barstyle을 dark-content로 설정하면 상태 바가 어두운색으로 나타남 */}
      <StatusBar style="light" />

      <View style={styles.resultContainer}>
        <Text style={styles.text}>
          {/* 정규 표현식과 replace 함수를 사용해서 세 자리마다 콤마(,) 추가 */}
          {result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.leftPad}>
          <View style={styles.number}>
            {/* 숫자 버튼 */}
            {/* map 함수는 배열에 내장된 함수로 배열을 순환하면서 원본 배열과 같은 크기의 새로운 배열을 만들어 반환하는 함수이다.
            map 함수에는 값을 반환하는 함수를 전달해야 하고 전달된 함수의 파라미터로 현재 배열의 값, 현재 값의 배열 인덱스. 배열 원본이 전달됨.
            만약 함수에서 값을 반환하지 않으면 해당 인덱스엔 undefined가 들어간 배열이 만들어짐 */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                title={num.toString()}
                // onPress는 터치가 해제(onPressOut)된 후에 호출됨
                onPress={() => onPressNumber(num)}
                buttonStyle={{ width, height: width, marginBottom: 1 }}
              />
            ))}
          </View>

          <View style={styles.bottom}>
            {/* 0, = 버튼*/}
            <Button
              title="0"
              onPress={() => onPressNumber(0)}
              buttonType={ButtonTypes.NUMBER}
              buttonStyle={{
                width: width * 2,
                height: width,
                marginTop: 1,
              }}
            />
            <Button
              title={Operators.EQUAL}
              onPress={() => onPressOperator(Operators.EQUAL)}
              buttonType={ButtonTypes.OPERATOR}
              buttonStyle={{ width, height: width, marginTop: 1 }}
            />
          </View>
        </View>

        <View>
          <Button
            title={Operators.CLEAR}
            onPress={() => onPressOperator(Operators.CLEAR)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width, marginTop: 1 }}
          />
          <Button
            title={Operators.MINUS}
            onPress={() => onPressOperator(Operators.MINUS)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width, marginTop: 1 }}
          />
          <Button
            title={Operators.PLUS}
            onPress={() => onPressOperator(Operators.PLUS)}
            buttonType={ButtonTypes.OPERATOR}
            buttonStyle={{ width, height: width * 2 + 1, marginTop: 1 }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // felx를 사용하면 컴포넌트가 공간을 차지함
    flex: 1,
    // height: 400,
    flexDirection: 'column',
    backgroundColor: '#fff',
    // alignItems: 'center',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: '700',
    // color: 'green',
    color: '#ffffff',
    paddingBottom: 30,
    paddingRight: 30,
  },
  resultContainer: {
    flex: 1,
    // height: 100,
    backgroundColor: '#000000',
    // backgroundColor: '#ffffff',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonContainer: {
    // flex: 1,
    // height: 100,
    // backgroundColor: '#A5B4FC',
    backgroundColor: '#000000',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftPad: {
    // backgroundColor: 'green',
    width: '75%',
  },
  number: {
    // flexWrap은 자식 컴포넌트를 flexdirection에 설정된 방향으로 추가하다가 범위를 벗어나면 다음 줄로 내려서 렌더링하는 스타일 속성
    flexWrap: 'wrap-reverse',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;
