import mongoose from "mongoose";
import bcrypt from "bcrypt"
import User from "../database/schema/userSchema.js";
import dotenv from "dotenv"



dotenv.config()
const {MONGODB_URI} = process.env
async function seedAdmin() {
    await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })

     // Check if admin already exists
  const existingAdmin = await User.findOne({ isAdmin: true }); 

    if (!existingAdmin) {
    // Create admin credentials
    const adminCredentials = {
      username: "defaultworkoutadmin",
      password: "adminpassword",
      isAdmin: true,
    };

    // Hash the admin password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminCredentials.password, salt);
    adminCredentials.password = hashedPassword;

    // Create admin user
    await User.create(adminCredentials);

    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }

  // Close the database connection
  await mongoose.disconnect();

}

// Execute the admin seeder
seedAdmin().then(() => {
  console.log("Admin seeding completed");
  process.exit(0);
}).catch((err) => {
  console.error("Error seeding admin:", err);
  process.exit(1);
});