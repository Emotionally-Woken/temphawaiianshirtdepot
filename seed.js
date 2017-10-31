const Chance = require('chance')
const chance = new Chance()
const db = require('./server/db/')
const {User, Product, Order, Review} = require('./server/db/models/')

const statuses = ['created', 'processing', 'canceled', 'completed']
const categories = ['classic', 'for him', 'for pets', 'performance', 'active wear', 'business', 'casual', 'sleepwear', 'formal', 'weddings']
const numbersForPop = [1, 2, 3, 4, 5, 6, 7, 7, 8, 9, 10]

//Words to create fake shirts
const hawaiianWords = ['Island Dreamin in ', 'Paradise of ', 'The Aloha in ', 'Wave Catchin on ', 'Hangin ten with ', 'Volcano of ', 'Sunshine on ']
const locationWords = ['the Long Beach', 'my Many Dreams', 'the Lovely Sunshine', 'a Cool Breeze', 'a Nice Wave', 'a Quart of Friendly Lava', 'Some Grains of Cool Sand']
const category = ["Casual", "Performance", "Business", "Sleepwear", "Pets"]

//mad libs for fake reviews.
const madLibNouns = ['shirt', 'masterpiece', 'shawl', 'tropical garb', 'armour', 'cool shirt', 'awesome shirt']
const madLibAdjectives = ['beautiful', 'awesome', 'amazing', 'confident', 'super tropical', 'unstoppable', 'taller', 'smarter']
const madLibPronoun = ['my son', 'my wife', 'my mom', 'my dad', 'my dog', 'me', 'my neighbor']
//Make Fake Users
const makeFakeUsers = ( num ) => {
  let fakeUsers = []
  for (let i = 0; i < num; i++) {
    fakeUsers.push({
      name: chance.name(),
      email: chance.email()
    })  
  }
  return fakeUsers;
}
//Make fake products
const makeFakeProducts = ( num ) => {
  let fakeProducts = []
  for (let i = 0; i < num; i++) {
    fakeProducts.push({
      title: `${hawaiianWords[chance.integer({min: 0, max: 6})]}${locationWords[chance.integer({min: 0, max: 6})]}`,
      description: chance.paragraph({sentences: 4}),
      price: chance.dollar({max: 50}),
      category: [category[chance.integer({min: 0, max: 4})]],
      quantity: chance.integer({min: 1, max: 10}),
    })
  }
  return fakeProducts
}

//fake review maker.
const makeFakeReviews = ( num ) => {
  let fakeReviews = []
  for (let i = 0; i < num; i++) {
    fakeReviews.push({
      userId: chance.integer({min: 1, max: 5}),
      productId: chance.integer({min: 1, max: 5}),
      stars: chance.integer({min: 0, max: 5}),
      review: `This ${madLibNouns[chance.integer({min: 0, max: 6})]} made ${madLibPronoun[chance.integer({min: 0, max: 6})]} feel ${madLibAdjectives[chance.integer({min: 0, max: 7})]}!`
    })
  }
  return fakeReviews;
}

const makeFakeOrders = ( num ) => {
  let orderDetailNumbers = numbersForPop.slice(0)
  let fakeOrders = []
  for (let i = 1; i <= num; i++){
    fakeOrders.push({
      userId: chance.integer({min: 1, max: 5}),
      status: statuses[chance.integer({num: 0, max: 3})],
      quantity: chance.integer({ min: 1, max: 3 }),
      productId: chance.integer({ min: 1, max: 5 }),
      price: chance.dollar()
    })
  }
  return fakeOrders;
}

const orders = makeFakeOrders( 2 )
const users = makeFakeUsers(5)
const products = makeFakeProducts(5)
const reviews = makeFakeReviews(20)

console.log(users)
console.log(reviews)
console.log(products)

const seed = () => {
  Promise.all(users.map(user=> User.create(user)))
  .then(() => {
    Promise.all(products.map(product => Product.create(product)))
  })
  .then(() => {
    Promise.all(reviews.map(review => Review.create(review)))
  })
  .then(() => {
    Promise.all(orders.map(order => Order.create(order)))
  })
}


const populate = () => {
  console.log('Running db for seeding...')
  db.sync({force: true})
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
      return null
    })

}

populate();