const Chance = require('chance')
const chance = new Chance()
const db = require('./server/db/')
const { User, Product, Order, OrderDetail, Review, Category, Tag } = require('./server/db/models/index.js')

const statuses = [ 'Active Cart', 'Created', 'Processing', 'Completed']
const categories = ['classic', 'for him', 'for pets', 'performance', 'active wear', 'business', 'casual', 'sleepwear', 'formal', 'weddings']
const numbersForPop = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const images = [
  'https://hawaiishirtcompany.com/wp-content/uploads/102c_98_black.jpg',
  'https://hawaiishirtcompany.com/wp-content/uploads/w412o_yd_black.jpg',
  'https://hawaiishirtcompany.com/wp-content/uploads/102c_018_blue.jpg',
  'https://hawaiishirtcompany.com/wp-content/uploads/w415s_275_pink.jpg',
  'https://hawaiishirtcompany.com/wp-content/uploads/w415s_275_blue.jpg',
  'https://hawaiishirtcompany.com/wp-content/uploads/w415s_un_blue.jpg', 'https://hawaiishirtcompany.com/wp-content/uploads/w415s_un_coral.jpg'
]

//Words to create fake shirts
const hawaiianWords = ['Dreamin in ', 'Paradise of ', 'Aloha in ', 'Surf ', 'Sip ', 'Volcano of ', 'Sunshine on ']
const locationWords = ['the Beach', 'Dreams', 'the Sunshine', 'Salty Breezes', 'a Nice Wave', 'some Lava', 'Wet Sand']

//mad libs for fake reviews.
const madLibNouns = ['shirt', 'masterpiece', 'shawl', 'tropical garb', 'armour', 'cool shirt', 'awesome shirt', 'lifestyle']
const madLibAdjectives = ['beautiful', 'awesome', 'amazing', 'confident', 'super tropical', 'unstoppable', 'taller', 'smarter', 'unafraid', 'no longer ashamed']
const madLibPronoun = ['my son', 'my wife', 'my mom', 'my dad', 'my dog', 'me', 'my neighbor']
const setUsers = [{
      firstName: 'John',
      lastName: 'Pepino',
      email: 'john@pepino.com',
      isAdmin: true,
      password: '1',
      shippingAddress: '123 hut avenue',
      state: 'Hawaii',
      city: 'Aloha',
      zip: 17080
},
  {
      firstName: 'Claire',
      lastName: 'Liu',
      email: 'claire@Liu.com',
      isAdmin: true,
      password: '1',
      shippingAddress: '123 hawaii avenue',
      state: 'Pennsylvania',
      city: 'Aloha',
      zip: 17090
},
  {
      firstName: 'Brian',
      lastName: 'Mac',
      email: 'brian@mac.com',
      isAdmin: true,
      password: '1',
      shippingAddress: '156 hut avenue',
      state: 'Illinois',
      city: 'Aloha',
      zip: 17078
},
  {
      firstName: 'Andrew',
      lastName: 'Z',
      email: 'andrew@z.com',
      isAdmin: false,
      password: '1',
      shippingAddress: '156 hut street',
      state: 'Wisconsin',
      city: 'Aloha',
      zip: 17073
},
  {
      firstName: 'Ro',
      lastName: 'Boy',
      email: 'ro@boy.com',
      isAdmin: false,
      password: '1',
      shippingAddress: '156 hut avenue',
      state: 'Maine',
      city: 'Aloha',
      zip: 17778
}]
//Make Fake Users
const makeFakeUsers = (num) => {
  let fakeUsers = []
  for (let i = 0; i < num; i++) {
    fakeUsers.push({
      firstName: chance.first(),
      lastName: chance.last(),
      email: chance.email(),
      isAdmin: chance.bool(),
      password: '1',
      shippingAddress: chance.address(),
      state: chance.state(),
      city: chance.city(),
      zip: chance.zip()

    })
  }
  return fakeUsers;
}
//Make fake products
const makeFakeProducts = (num) => {
  let fakeProducts = []
  let fakeCategoryJoinTable = []
  let imageLength = images.length - 1
  for (let i = 0; i < num; i++) {
    fakeProducts.push({
      title: `${hawaiianWords[chance.integer({ min: 0, max: 6 })]}${locationWords[chance.integer({ min: 0, max: 6 })]}`,
      description: chance.paragraph({ sentences: 4 }),
      price: chance.floating({ min: 15, max: 50, fixed: 2 }),
      quantity: chance.integer({ min: 5, max: 15 }),
      image: images[chance.integer({ min: 0, max: imageLength })]
    })

  }
  fakeProducts.forEach((product, i) => {
    fakeCategoryJoinTable.push({
      productId: i + 1,
      categoryId: chance.integer({ min: 1, max: categories.length })
    })

  })
  return [fakeProducts, fakeCategoryJoinTable]
}

const makeFakeCategories = () => {
  let fakeCategories = []
  for (let i = 0; i < categories.length; i++) {
    fakeCategories.push({
      title: categories[i]
    })
  }
    return fakeCategories
}

const makeFakeReviews = (num) => {
  let fakeReviews = []
  for (let i = 0; i < num; i++) {
    fakeReviews.push({
      userId: chance.integer({ min: 1, max: 10 }),
      productId: chance.integer({ min: 1, max: 10 }),
      stars: chance.integer({ min: 1, max: 5 }),
      reviewContent: `This ${madLibNouns[chance.integer({ min: 0, max: 6 })]} made ${madLibPronoun[chance.integer({ min: 0, max: 6 })]} feel ${madLibAdjectives[chance.integer({ min: 0, max: 7 })]}!`
    })
  }
  return fakeReviews;
}

const makeFakeOrders = (num) => {
  let orderIdNumber = numbersForPop.slice(0)
  let orderDetailNumbers = numbersForPop.slice(0)
  let fakeOrders = []
  let fakeOrdersDetails = []
  for (let i = 1; i <= num; i++) {
    fakeOrders.push({
      userId: chance.integer({ min: 1, max: 5 }),
      status: statuses[chance.natural({ num: 0, max: statuses.length - 1 })],
      orderDetailId: orderIdNumber.shift()
    })
  }
  fakeOrders.forEach((order, i) => {
    let orderDetail = {
      orderId: orderDetailNumbers.shift(),
      quantity: chance.integer({ min: 1, max: 3 }),
      productId: chance.integer({ min: 1, max: 10 }),
      price: chance.floating({ min: 15, max: 50, fixed: 2 })
    }
    fakeOrdersDetails.push(orderDetail)
  })
  return [fakeOrders, fakeOrdersDetails];
}

  const [orders, orderDetails] = makeFakeOrders(10)
  const users = makeFakeUsers(10).concat(setUsers)
  const [products, joinTable] = makeFakeProducts(100)
  const reviews = makeFakeReviews(200)
  const genCategories = makeFakeCategories()

  const seed = () => {
    return Promise.all(users.map(user => User.create(user)))
      .then(() => {
        return Promise.all(products.map(product => Product.create(product)))
      })
      .then(() => {
        return Promise.all(reviews.map(review => Review.create(review)))
      })
      .then(() => {
        return Promise.all(orders.map(order => Order.create(order)))
      })
      .then(() => {
        return Promise.all(orderDetails.map(orderDetail => OrderDetail.create(orderDetail)))
      })
      .then(() => {
        return Promise.all(genCategories.map(category => Category.create(category)))
      })
      .then(() => {
        return Promise.all(joinTable.map(tag => Tag.create(tag)))
      })
  }

  const populate = () => {
    console.log('Running db for seeding...')
    db.sync({ force: true })
      .then(() => {
        console.log('...data-ing... data-ing... data.')
        return seed()
      })
      .catch(err => {
        console.log('...error while data-ing.')
        console.log(err.stack)
      })
      .then(() => {
        db.close()
        return null;
      })

  }

  populate();
