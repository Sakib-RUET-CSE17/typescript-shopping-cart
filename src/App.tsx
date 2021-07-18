
import { Badge } from '@material-ui/core';
import { Drawer, Grid } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { useEffect, useState } from 'react';
//Styles
import { Wrapper, StyledButton } from './App.styles'
import Cart from './components/Cart/Cart';
import Item from './components/Item/Item';

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

function App() {
  const [products, setProducts] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([] as CartItemType[])

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        setIsLoading(false)
        setProducts(data)
      })
  }, [])

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((accumulator: number, item) => accumulator + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      //Is the item already in the cart?
      const isInCart = prev.find(item => item.id === clickedItem.id)

      if (isInCart) {
        return prev.map(item => (item.id === clickedItem.id
          ? { ...item, amount: item.amount + 1 }
          : item))
      }
      //not in cart
      return [...prev, { ...clickedItem, amount: 1 }]
    })
  };

  const handleRemoveFromCart = (id: number) => {
    // let updatedItems: CartItemType[] = [];


    // cartItems.map(item => {
    //   if (item.id !== id) {
    //     // console.log('unchanged', item)
    //     updatedItems.push(item)
    //   }
    //   else if (item.amount !== 1) {
    //     updatedItems.push({ ...item, amount: item.amount - 1 })
    //     // console.log('changed', updatedItems)
    //   }
    // }
    // )
    // setCartItems(updatedItems)

    setCartItems(prev => prev.reduce((accumulator, item) => {
      if (item.id === id) {
        if (item.amount === 1) {
          return accumulator;
        }
        return [...accumulator, { ...item, amount: item.amount - 1 }]
      } else {
        return [...accumulator, item]
      }
    }, [] as CartItemType[]))

  }

  if (isLoading) return <LinearProgress></LinearProgress>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        ></Cart>
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon></AddShoppingCartIcon>
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {
          products.map(item =>
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart}></Item>
            </Grid>
          )
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
