import mongoose from 'mongoose'

/* PetSchema will correspond to a collection in your MongoDB database. */
const WinnerSchema = new mongoose.Schema({
  winner: {
    /* The name of this pet */

    type: String,
    required: [true, 'Please provide a name for this pet.'],
    maxlength: [20, 'Name cannot be more than 60 characters'],
  },
  date: {
    type: Date,
    required: true
  } 
})

export default mongoose.models.Winner || mongoose.model('Winner', WinnerSchema)
