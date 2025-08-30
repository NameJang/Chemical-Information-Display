import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Headerfuntion from './components/Header'; // หรือไฟล์อื่นๆ ที่นำเข้า

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Headerfuntion />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
