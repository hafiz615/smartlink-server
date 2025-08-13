import { sequelize } from "../config/db.js";
import User from "../models/User.js";

const migrate = async () => {
  try {
    console.log("Starting database migration...");
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
    await sequelize.sync({ force: false, alter: true });
    console.log("Database tables created/updated successfully.");
    const adminExists = await User.findOne({ where: { role: "admin" } });

    if (!adminExists) {
      console.log("No admin user found. Creating default admin...");

      const defaultAdmin = await User.create({
        username: "admin",
        email: "admin@smartlink.com",
        password: "AdminPassword123!",
        role: "admin",
      });

      console.log("Default admin user created:", defaultAdmin.username);
      console.log("Email: admin@smartlink.com");
      console.log("Password: AdminPassword123!");
      console.log(
        "⚠️  Please change the default admin password after first login!"
      );
    }

    console.log("Migration completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

migrate();
