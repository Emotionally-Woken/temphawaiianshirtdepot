const Chance = require('chance')
const chance = new Chance()
const db = require('./server/db/')
const { User, Product, Order, OrderDetail, Review, Category, Tag } = require('./server/db/models/index.js')

const statuses = [ 'Active', 'Created', 'Processing', 'Canceled', 'Completed']
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
const hawaiianWords = ['Island Dreamin in ', 'Paradise of ', 'The Aloha in ', 'Wave Catchin on ', 'Hangin ten with ', 'Volcano of ', 'Sunshine on ']
const locationWords = ['the Long Beach', 'my Many Dreams', 'the Lovely Sunshine', 'a Cool Breeze', 'a Nice Wave', 'a Quart of Friendly Lava', 'Some Grains of Cool Sand']

//mad libs for fake reviews.
const madLibNouns = ['shirt', 'masterpiece', 'shawl', 'tropical garb', 'armour', 'cool shirt', 'awesome shirt']
const madLibAdjectives = ['beautiful', 'awesome', 'amazing', 'confident', 'super tropical', 'unstoppable', 'taller', 'smarter']
const madLibPronoun = ['my son', 'my wife', 'my mom', 'my dad', 'my dog', 'me', 'my neighbor']
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
      id: i + 1,
      title: `${hawaiianWords[chance.integer({ min: 0, max: 6 })]}${locationWords[chance.integer({ min: 0, max: 6 })]}`,
      description: chance.paragraph({ sentences: 4 }),
      price: chance.floating({ min: 15, max: 50, fixed: 2 }),
      quantity: chance.integer({ min: 5, max: 15 }),
      image: images[chance.integer({ min: 0, max: imageLength })]
    })

  }
  fakeProducts.forEach(product => {
    fakeCategoryJoinTable.push({
      productId: product.id,
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
      status: statuses[chance.integer({ num: 0, max: 3 })],
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
  const users = makeFakeUsers(10)
  const [products, joinTable] = makeFakeProducts(10)
  const reviews = makeFakeReviews(20)
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
