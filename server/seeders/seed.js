const db = require('../config/connection');
const { Profile, Product , Category } = require('../models');
const profileSeeds = require('./profileSeeds.json');

db.once('open', async () => {
  try {
    await Category.deleteMany({});
    const categories = await Category.insertMany([
    { name: 'Food' },
    { name: 'Household Supplies' },
    { name: 'Electronics' },
    { name: 'Books' },
    { name: 'Toys' }
    ]);
  
    console.log('categories- seeded');
  
    await Product.deleteMany();
  
    const products = await Product.insertMany([
      {
        name: 'Cookies',
        price: 2.99,
        description:
          'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
        image: 'cookie-tin.jpg',
        quantity: 500,
        category: categories[0]._id,
        
      },
     
      {
        name: 'Handmade Soap',
        category: categories[1]._id,
        description:
          'Praesent placerat, odio vel euismod venenatis, lectus arcu laoreet felis, et fringilla sapien turpis vestibulum nisl.',
        image: 'soap.jpg',
        price: 3.99,
        quantity: 50
      },
     
      {
        name: 'Camera',
        category: categories[2]._id,
        description:
          'Vestibulum risus metus, luctus non tortor quis, tincidunt consectetur ex. Nullam vitae lobortis ligula, ut sagittis massa. Curabitur consectetur, tellus at pulvinar venenatis, erat augue cursus erat, eu ullamcorper eros lectus ultrices ipsum. Integer rutrum, augue vitae auctor venenatis, turpis turpis elementum orci, at sagittis risus mi a leo.',
        image: 'camera.jpg',
        price: 399.99,
        quantity: 30
      },
    
      {
        name: 'Tales at Bedtime',
        category: categories[3]._id,
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ornare diam quis eleifend rutrum. Aliquam nulla est, volutpat non enim nec, pharetra gravida augue. Donec vitae dictum neque. Pellentesque arcu lorem, fringilla non ligula ac, tristique bibendum erat. Ut a semper nibh. Quisque a mi et mi tempor ultricies. Maecenas eu ipsum eu enim hendrerit accumsan at euismod urna.',
        image: 'bedtime-book.jpg',
        price: 9.99,
        quantity: 100
      },
     
    ]);
  
    console.log('products- seeded');
    await Profile.deleteMany({});

    await Profile.create({
      firstName: 'Radhika',
      lastName: 'test',
      email: 'Radhika.test@testmail.com',
      password: 'password12345',
      orders: [
        {
          products: [products[0]._id, products[0]._id, products[1]._id]
        }
      ]
    });

  
    console.log('users seeded');

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
