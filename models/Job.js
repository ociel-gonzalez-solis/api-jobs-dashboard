const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  company: {
    type: String,
    required: [true, "Pls provide a company"],
    maxlength: 50,
  },
  position: {
    type: String,
    required: [true, "Pls provide a position"],
    maxlength: 100,
  },
  status: {
    type: String,
    enum: ["interview", "declined", "pending"],
    default: "pending",
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Pls provide a user"],
  },
}, {timestamps: true});

// UserSchema.methods.comparePassword = async function (pass) {
//   const isEqual = await bcrypt.compare(pass, this.password);
//   return isEqual;
// };

module.exports = mongoose.model("Job", JobSchema);
