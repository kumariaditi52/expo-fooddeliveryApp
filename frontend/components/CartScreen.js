import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Delicious Pizza',
      price: 12.99,
      quantity: 2,
      image: 'https://via.placeholder.com/80x80/6200EE/FFFFFF?text=Pizza',
      size: 'Medium'
    },
    {
      id: 2,
      name: 'Burger Combo',
      price: 8.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80/6200EE/FFFFFF?text=Burger',
      size: 'Large'
    },
    {
      id: 3,
      name: 'Chicken Wings',
      price: 15.99,
      quantity: 1,
      image: 'https://via.placeholder.com/80x80/6200EE/FFFFFF?text=Wings',
      size: 'Regular'
    }
  ]);

  const deliveryFee = 2.99;
  const tax = 0.08; // 8% tax

  const updateQuantity = (id, type) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          if (type === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (type === 'decrease' && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxAmount = subtotal * tax;
  const total = subtotal + deliveryFee + taxAmount;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart before checkout.');
      return;
    }
    
    Alert.alert(
      'Checkout',
      `Total: $${total.toFixed(2)}\n\nProceed to payment?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Proceed',
          onPress: () => {
            Alert.alert('Success', 'Order placed successfully!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Home'),
              },
            ]);
          },
        },
      ]
    );
  };

  const renderCartItem = (item) => (
    <View key={item.id} style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemSize}>Size: {item.size}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 'decrease')}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 'increase')}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <Text style={styles.removeButtonText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <View style={styles.placeholder} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubText}>Add some delicious items to get started!</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.cartContainer}>
            <View style={styles.itemsContainer}>
              <Text style={styles.sectionTitle}>Items ({cartItems.length})</Text>
              {cartItems.map(renderCartItem)}
            </View>

            <View style={styles.promoContainer}>
              <Text style={styles.promoText}>🎉 Free delivery on orders over $25!</Text>
            </View>
          </ScrollView>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal:</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery Fee:</Text>
              <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax:</Text>
              <Text style={styles.summaryValue}>${taxAmount.toFixed(2)}</Text>
            </View>
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6200EE',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  cartContainer: {
    flex: 1,
  },
  itemsContainer: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  itemSize: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  promoContainer: {
    backgroundColor: '#E8F5E8',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  promoText: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  checkoutButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
