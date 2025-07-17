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

export default function ProductDetail({ navigation, route }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Medium');
  
  // Mock product data - in real app this would come from route.params or API
  const product = route?.params?.product || {
    id: 1,
    name: 'Delicious Pizza',
    price: 12.99,
    description: 'A mouth-watering pizza with fresh ingredients, perfect cheese blend, and crispy crust that will satisfy your cravings.',
    image: 'https://via.placeholder.com/300x200/6200EE/FFFFFF?text=Pizza',
    rating: 4.5,
    reviews: 128,
    category: 'Italian Food'
  };

  const sizes = ['Small', 'Medium', 'Large'];
  const addOns = [
    { id: 1, name: 'Extra Cheese', price: 2.50 },
    { id: 2, name: 'Pepperoni', price: 3.00 },
    { id: 3, name: 'Mushrooms', price: 1.50 },
  ];

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    Alert.alert(
      'Added to Cart',
      `${product.name} (${quantity}x) has been added to your cart!`,
      [
        {
          text: 'Continue Shopping',
          style: 'cancel',
        },
        {
          text: 'View Cart',
          onPress: () => navigation.navigate('CartScreen'),
        },
      ]
    );
  };

  const totalPrice = (product.price * quantity).toFixed(2);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.category}>{product.category}</Text>
          
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {product.rating}</Text>
            <Text style={styles.reviews}>({product.reviews} reviews)</Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.priceLabel}>per item</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeButtonText,
                  selectedSize === size && styles.selectedSizeButtonText
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add-ons</Text>
          {addOns.map((addon) => (
            <View key={addon.id} style={styles.addonItem}>
              <Text style={styles.addonName}>{addon.name}</Text>
              <Text style={styles.addonPrice}>+${addon.price}</Text>
            </View>
          ))}
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.sectionTitle}>Quantity</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange('decrease')}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange('increase')}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>${totalPrice}</Text>
        </View>
        
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  header: {
    marginBottom: 15,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#6200EE',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  reviews: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200EE',
    marginRight: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  sizeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  selectedSizeButton: {
    borderColor: '#6200EE',
    backgroundColor: '#6200EE',
  },
  sizeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  selectedSizeButtonText: {
    color: '#fff',
  },
  addonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  addonName: {
    fontSize: 16,
    color: '#333',
  },
  addonPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6200EE',
  },
  quantityContainer: {
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6200EE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200EE',
  },
  addToCartButton: {
    backgroundColor: '#6200EE',
    padding: 15,
    borderRadius: 8,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
