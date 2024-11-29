import { useRouter } from 'next/router';

const CartButton = () => {
    const router = useRouter();

    const navigateToCart = () => {
        router.push('/cart');
    };

    return (
        <button onClick={navigateToCart} className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
            View Cart
        </button>
    );
};

export default CartButton;
