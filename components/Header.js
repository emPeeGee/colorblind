import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export function Header({ fontSize }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={[styles.header, { fontSize, color: '#E64C3C' }]}>c</Text>
      <Text style={[styles.header, { fontSize, color: '#E57E31' }]}>o</Text>
      <Text style={[styles.header, { fontSize, color: '#F1C431' }]}>l</Text>
      <Text style={[styles.header, { fontSize, color: '#68CC73' }]}>o</Text>
      <Text style={[styles.header, { fontSize, color: '#3998DB' }]}>r</Text>
      <Text style={[styles.header, { fontSize }]}>blinder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: '#ecf0f1',
    fontFamily: 'dogbyte'
  }
});

Header.defaultProps = {
  fontSize: 55
};
