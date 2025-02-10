import { Text, TextProps } from './Themed';
import { StyleSheet } from 'react-native';

export default function GenreTag(props: TextProps) {
  return <Text {...props} style={[props.style, styles.genreTag]} />;
}

const styles = StyleSheet.create({
  genreTag: {
    fontFamily: 'SpaceMono',
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#333747',
    color: '#fff',
    textAlign: 'center',
    overflow: 'hidden',
  },
});