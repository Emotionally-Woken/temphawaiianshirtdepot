import axios from 'axios'
const Bluebird = require('bluebird')
import history from '../history'

const sendEmail = email => ({
    type: send, email
})

export const send = (order, items) => dispatch => {
    axios.post('/api/sendConfirmation', order)
    .then(res => {
      axios.post('/api/orders', res.data)
      Bluebird.map(items, (item) => {
        item.orderId = res.data.id
        axios.post(`/api/orders:${this.userId}`, item)
      }).then(() => {
        dispatch(sendEmail(res.data))
        history.push('/home')
      })
    }).catch(err => console.error(`Creating order: ${order} unsuccesful`, err))
  }