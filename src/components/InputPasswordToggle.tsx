import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';


export default function InputPasswordToggle({ style, inputStyle, icon, iconColor, iconSize, ...rest }, ref) {
  const [visible, setVisible] = useState(true);
  const refContainer = useRef(ref);
  
  return (
    <View style={[style, styles.container]}>
      {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
      <TextInput style={[styles.input, inputStyle]} secureTextEntry={visible} {...rest} ref={refContainer}/>
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
        }}>
        <MaterialCommunityIcons
          name={visible ? 'eye-off' : 'eye'}
          size={iconSize}
          color={iconColor}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    alignItems:'center',
  },
  input : {
    flex:1
  }
})

InputPasswordToggle.propTypes = {
  icon: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

InputPasswordToggle.defaultProps = {
  icon: null,
  style: {},
  iconColor: '#222',
  iconSize: 20,
  inputStyle:{}
};