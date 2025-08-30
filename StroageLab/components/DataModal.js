import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { supabase } from './supabaseClient'; // นำเข้า Supabase client

export default function DataModal() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('DataWan').select('*'); // ตรวจสอบชื่อ Table ที่นี่

      if (error) {
        console.log('Error fetching data:', error.message);
      } else {
        console.log('Data fetched:', data); // แสดงข้อมูลที่ถูกดึง
        setItems(data);
      }
    };

    fetchData();
  }, []);

  // ฟังก์ชันเพื่อแสดง Molecular Formula
  const formatMolecularFormula = (formula) => {
    // ใช้ regex เพื่อค้นหาตัวเลขและแสดงใน subscript
    return formula.split(/(?<=[A-Z])(?=\d)/g).map((part, index) => {
      const isNumber = /\d/.test(part);
      return isNumber ? (
        <Text key={index} style={styles.subscript}>{part}</Text>
      ) : (
        <Text key={index}>{part}</Text>
      );
    });
  };

  return (
    
    <View style={styles.cardWrapper}>
      {items.length > 0 ? (
        items.map((item) => (
          <Card style={styles.card} key={item.id}>
            <View style={styles.container}>
              <Image style={styles.logo} source={{ uri: item.imageUrl }} />
              <View style={styles.textContainer}>
                <Text style={styles.paragraph}>{item.NameEng}</Text>
                <Text style={styles.Molecular_formula}>
                  {item.Molecular_formula ? formatMolecularFormula(item.Molecular_formula) : 'No description available'}
                </Text>
                <Text style={styles.Molecular_formula}>{item.state_matter}</Text>
              </View>
            </View>
          </Card>
        ))
      ) : (
        <Text>No data available</Text> // แสดงข้อความถ้าไม่มีข้อมูล
      )}
    </View>
  );
  
}

const styles = StyleSheet.create({
  cardWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  card: {
    width: '45%',
    height: 120,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    elevation: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logo: {
    borderRadius: 8,
    height: 64,
    width: 64,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  paragraph: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  Molecular_formula: {
    fontSize: 14,
    // อาจเพิ่ม style อื่น ๆ ที่ต้องการ
  },
  subscript: {
    fontSize: 10,  // ขนาดตัวอักษรที่เล็กลง
    lineHeight: 12, // สูงกว่าเล็กน้อยเพื่อให้อยู่ในระดับที่เหมาะสม
    marginBottom: 3, // ให้ยกขึ้นเล็กน้อย
  },
});
