const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/productModel');
const User = require('./models/userModel');

dotenv.config();

const sampleProducts = [
    {
        name: 'Apple AirPods Pro',
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
        description: 'Active noise cancellation, transparency mode, adaptive audio. Up to 6 hours of listening time.',
        category: 'Electronics',
        price: 249.99,
        countInStock: 15,
    },
    {
        name: 'Sony WH-1000XM5 Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
        description: 'Industry-leading noise cancellation with 30-hour battery life and crystal-clear calling.',
        category: 'Electronics',
        price: 349.99,
        countInStock: 8,
    },
    {
        name: 'Samsung 4K Smart TV 55"',
        image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
        description: 'Crystal UHD 4K display with HDR, built-in Alexa, and a sleek bezel-less design.',
        category: 'Electronics',
        price: 699.99,
        countInStock: 5,
    },
    {
        name: 'Nike Air Max 270',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        description: "Nike's largest-ever Air unit delivers unparalleled, all-day comfort. Lightweight and breathable.",
        category: 'Footwear',
        price: 149.99,
        countInStock: 20,
    },
    {
        name: 'Levi\'s Classic 501 Jeans',
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500',
        description: 'The original straight-leg jean. Made with 100% cotton denim with a button fly.',
        category: 'Clothing',
        price: 59.99,
        countInStock: 30,
    },
    {
        name: 'Canon EOS Rebel T8i Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
        description: '24.1 MP CMOS sensor, 4K video, dual pixel autofocus. Ideal for beginners and enthusiasts.',
        category: 'Electronics',
        price: 749.99,
        countInStock: 7,
    },
    {
        name: 'Instant Pot Duo 7-in-1',
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=500',
        description: '7-in-1 multi-use pressure cooker. Pressure cook, slow cook, rice cooker, yogurt maker and more.',
        category: 'Kitchen',
        price: 89.99,
        countInStock: 25,
    },
    {
        name: 'Adidas Ultraboost 22 Running Shoes',
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=500',
        description: 'Responsive BOOST midsole and a Primeknit+ upper for the ultimate running experience.',
        category: 'Footwear',
        price: 179.99,
        countInStock: 12,
    },
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        // Get the first user to associate products with
        const user = await User.findOne({});

        if (!user) {
            console.error('❌ No user found. Please register an account first via the app, then run this seeder.');
            process.exit(1);
        }

        console.log(`✅ Using user: ${user.email} (${user._id})`);

        // Delete existing products
        await Product.deleteMany();
        console.log('🗑️  Existing products cleared.');

        // Add user reference to each product
        const productsWithUser = sampleProducts.map((p) => ({ ...p, user: user._id }));

        // Insert products
        const created = await Product.insertMany(productsWithUser);
        console.log(`✅ ${created.length} products seeded successfully!`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeder error:', error.message);
        process.exit(1);
    }
};

seedData();
