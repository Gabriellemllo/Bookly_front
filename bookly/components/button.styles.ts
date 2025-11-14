import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    backgroundColor: '#24B4B6',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
