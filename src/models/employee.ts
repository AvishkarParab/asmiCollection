import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema(
  {
    name: String,
    age: String,
    phone: String,
    referredFrom: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    referralCode: String,
    isCommissionPaid: {
      type: String,
      enum: ["yes", "no"],
      default: "no",
    },
  },
  {
    timestamps: true,
  }
);

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
