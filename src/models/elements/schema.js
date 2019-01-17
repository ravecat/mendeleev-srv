import mongoose from 'mongoose'

export default new mongoose.Schema({
  name: String,
  classification: {
    group: {
      type: Map,
      of: String
    },
    period: {
      type: Map,
      of: String
    },
    type: {
      type: Map,
      of: String
    }
  },
  atomic_number: Number,
  symbol: String
})
