import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 48,
    marginTop: 8,
  },
  input: {
    width: '100%',
    marginBottom: 18,
    borderRadius: 12,
  },
  linksWrapper: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  link: {
    color: '#9e9e9e',
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  forgot: {
    fontSize: 13,
  }
});
