import { useState } from 'react';

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    productList: [{ name: '', quantity: 1, price: 0 }], // Initial product list with one empty product
    shippingDetails: '',
    payment: {
      amount: '',
      paymentMethod: '',
    },
  });

  // Update shipping and payment details
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  // Update product details
  const handleProductChange = (index: number, field: string, value: string | number) => {
    const updatedProducts = orderData.productList.map((product, idx) =>
      idx === index ? { ...product, [field]: value } : product
    );
    setOrderData({ ...orderData, productList: updatedProducts });
  };

  // Add new product to the list
  const addProduct = () => {
    setOrderData({
      ...orderData,
      productList: [...orderData.productList, { name: '', quantity: 1, price: 0 }],
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Call the backend API to submit the order
    const response = await fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      alert('Order placed successfully!');
      setOrderData({
        productList: [{ name: '', quantity: 1, price: 0 }],
        shippingDetails: '',
        payment: {
          amount: '',
          paymentMethod: '',
        },
      });
    } else {
      alert('Failed to place order.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Shipping Details</h2>
      <div>
        <label>Shipping Details:</label>
        <input
          type="text"
          name="shippingDetails"
          value={orderData.shippingDetails}
          onChange={handleInputChange}
        />
      </div>

      <h2>Products</h2>
      {orderData.productList.map((product, index) => (
        <div key={index}>
          <label>Product Name:</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleProductChange(index, 'name', e.target.value)}
          />
          <label>Quantity:</label>
          <input
            type="number"
            value={product.quantity}
            onChange={(e) => handleProductChange(index, 'quantity', Number(e.target.value))}
          />
          <label>Price:</label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => handleProductChange(index, 'price', Number(e.target.value))}
          />
        </div>
      ))}
      <button type="button" onClick={addProduct}>
        Add Another Product
      </button>

      <h2>Payment Details</h2>
      <div>
        <label>Payment Amount:</label>
        <input
          type="number"
          name="amount"
          value={orderData.payment.amount}
          onChange={(e) =>
            setOrderData({ ...orderData, payment: { ...orderData.payment, amount: e.target.value } })
          }
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <input
          type="text"
          name="paymentMethod"
          value={orderData.payment.paymentMethod}
          onChange={(e) =>
            setOrderData({
              ...orderData,
              payment: { ...orderData.payment, paymentMethod: e.target.value },
            })
          }
        />
      </div>

      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
