import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useCart } from '../context/Cart/CartContext';

interface Props {
    _id: string, 
    title: string,
    image: string,
    price: string, 
    stock: string
}

export default function ProductCard({ _id, title, image, price, stock }: Props) {
  const { addItemToCart } = useCart();
  return (
    <Card>
      <CardMedia
        sx={{ height: 300}}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', display: "flex", justifyContent: "space-between" }}>
            <Box>{price.toLocaleString()} IQD</Box>
            <Box>{stock}</Box>
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" size="small" onClick={() => addItemToCart(_id)}>Add to Cart</Button>
      </CardActions>
    </Card>
  );
}
