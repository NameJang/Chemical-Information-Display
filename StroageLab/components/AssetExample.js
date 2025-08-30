import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'; // นำเข้าไอคอน
import { supabase } from './supabaseClient'; // Import Supabase client

export default function AssetExample({ searchQuery }) { // รับ searchQuery ผ่าน props
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null); // State to track the selected item

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('DataWan').select('*'); // Check table name here

      if (error) {
        console.log('Error fetching data:', error.message);
      } else {
        console.log('Data fetched:', data); 
        setItems(data);
      }
    };

    fetchData();
  }, []);

  // Function to display Molecular Formula
  const formatMolecularFormula = (formula) => {
    return formula.split(/(?<=[A-Z])(?=\d)/g).map((part, index) => {
      const isNumber = /\d/.test(part);
      return isNumber ? (
        <Text key={index} style={styles.subscript}>{part}</Text>
      ) : (
        <Text key={index}>{part}</Text>
      );
    });
  };

  
  const sortedItems = items.sort((a, b) => {
    if (a.Name < b.Name) return -1; 
    if (a.Name > b.Name) return 1;
    return 0;
  });

  
  const filteredItems = sortedItems.filter(item =>
    item.NameEng.toLowerCase().includes(searchQuery.toLowerCase())
  );



  return (
    <View style={styles.container}>
      {/* Details Section */}
      <View style={styles.detailsContainer}>
        {selectedItem ? (
          <View style={styles.detailCard}>
            <Image style={styles.detailImage} source={{ uri: selectedItem.imageUrl }} />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.navButton}>
                <Icon name="search" size={23} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton}>
                <Icon name="share" size={23} color="black" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.ButtonText2}>
                <Text style={styles.navButtonText2}>Reduce</Text>
              </TouchableOpacity>                                        
              <TouchableOpacity style={styles.ButtonText}>
                <Text style={styles.navButtonText}>Increase</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.detailHeader}>{selectedItem.NameEng}</Text>
            <Text style={styles.detailMolecular}>
              {selectedItem.Molecular_formula ? formatMolecularFormula(selectedItem.Molecular_formula) : 'No description available'}
            </Text>
            <Text style={styles.detailState}>{selectedItem.state_matter}</Text>
            <Text style={styles.detailTukebsan}>
              {selectedItem.Tukebsan ? `Tukebsan: ${selectedItem.Tukebsan}` : 'No Tukebsan available'}
            </Text>
            <Text style={styles.detailTotalData}>
              {selectedItem.total_Data ? `Total Data: ${selectedItem.total_Data}` : 'No total data available'}
            </Text>
            <Text style={styles.detailChemicalStock}>
              {selectedItem.Chemical_Stock ? `Chemical Stock: ${selectedItem.Chemical_Stock}` : 'No chemical stock available'}
            </Text>
          </View>
        ) : (
          <Text style={styles.selectMessage}>Select a card to see details</Text>
        )}
      </View>

      {/* Cards Section */}
      <ScrollView style={styles.cardWrapper} showsVerticalScrollIndicator={false}>
        {filteredItems.length > 0 ? ( // เปลี่ยนจาก sortedItems เป็น filteredItems
          filteredItems.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => setSelectedItem(item)}>
              <Card style={[styles.card, selectedItem && selectedItem.id === item.id ? styles.selectedCard : null]}>
                <View style={styles.cardContent}>
                  <Image style={styles.logo} source={{ uri: item.imageUrl }} />
                  <View style={styles.textContainer}>
                    <Text style={styles.paragraph}>{item.NameEng}</Text>
                    <Text style={styles.Molecular_formula}>
                      {item.Molecular_formula ? formatMolecularFormula(item.Molecular_formula) : 'No description available'}
                    </Text>
                    <Text style={styles.stateMatter}>{item.state_matter}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No data available</Text> // Show message if no data
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', // เพิ่มเพื่อแบ่งพื้นที่เท่ากันระหว่างส่วนต่าง ๆ
  },
  detailsContainer: {
    flex: 1, // ใช้ flex แทนการกำหนด width
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    backgroundColor: '#e3f2fd',
    alignItems: 'center', // จัดเนื้อหาให้อยู่ตรงกลาง
  },
  detailCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    elevation: 5,
    marginBottom: 5,
    alignItems: 'left', // Center items within the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  detailImage: {
    width: 300,
    height: 250,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  detailHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a237e', // Dark blue for header
  },
  detailMolecular: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#424242', // Darker gray for text
  },
  detailState: {
    fontSize: 16,
    marginTop: 8,
    color: '#424242',
  },
  detailTukebsan: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    color: '#00796b', // Teal color for Tukebsan
  },
  detailTotalData: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
    color: '#00796b', // Teal color for total data
  },
  detailChemicalStock: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
    color: '#00796b', // Teal color for chemical stock
  },
  selectMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#777',
  },
  cardWrapper: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
  },
  card: {
    width: '100%',
    height: 120,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    elevation: 2,
  },
  selectedCard: {
    borderColor: '#007BFF', // Highlight border color for the selected card
    borderWidth: 2, // Thicker border for visibility
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center', // จัดไอคอนและข้อความในแนวขวางให้อยู่กลาง
    padding: 10,
  },
  logo: {
    borderRadius: 8,
    height: 64,
    width: 64,
    marginRight: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a237e',
  },
  Molecular_formula: {
    fontSize: 14,
    color: '#424242',
  },
  subscript: {
    fontSize: 10,
    lineHeight: 12,
    marginBottom: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly', // เว้นระยะห่างปุ่มเท่ากัน
    alignItems: 'center', // จัดปุ่มในแนวขวางให้อยู่ตรงกลาง
    marginBottom: 10,
  },
  navButton: {
    flexDirection: 'row',
    padding: 5, // ลดขนาด padding
    margin: 5,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5, // ลด flex เพื่อให้ปุ่มเล็กลง
  },
  ButtonText: {
    flexDirection: 'row',
    padding: 15, // เพิ่มขนาด padding เพื่อให้ปุ่มยาวขึ้น
    margin: 5,
    backgroundColor: '#1249FF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // ให้ปุ่มเติบโตเต็มพื้นที่
  },  
  ButtonText2: {
    flexDirection: 'row',
    padding: 15, // สามารถเพิ่มขนาด padding ของ ButtonText2 ได้เช่นกัน
    margin: 5,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, // ให้ปุ่มเติบโตเต็มพื้นที่
  },  
  navButtonText: {
    color: 'white',
    fontSize: 14,
  },
  navButtonText2: {
    color: 'black',
    fontSize: 14,
  },
});
