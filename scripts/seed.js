import { sequelize } from "../config/db.js";
import User from "../models/User.js";
import Site from "../models/Site.js";

const seedData = async () => {
  try {
    console.log("Starting database seeding...");

    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection established.");

    // Sample sites data
    const sampleSites = [
      {
        siteUrl: "https://github.com",
        title: "GitHub",
        coverImage:
          "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
        description:
          "GitHub is a platform for version control and collaboration. It lets you and others work together on projects from anywhere.",
        category: "Development",
      },
      {
        siteUrl: "https://stackoverflow.com",
        title: "Stack Overflow",
        coverImage:
          "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png",
        description:
          "Stack Overflow is the largest, most trusted online community for developers to learn and share their programming knowledge.",
        category: "Development",
      },
      {
        siteUrl: "https://dribbble.com",
        title: "Dribbble",
        coverImage:
          "https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg",
        description:
          "Dribbble is the leading destination to find & showcase creative work and home to the worlds best design professionals.",
        category: "Design",
      },
      {
        siteUrl: "https://behance.net",
        title: "Behance",
        coverImage:
          "https://a5.behance.net/2cb59eec130324a4e786283e97ce4d3de4c2a9bb/img/site/apple-touch-icon.png",
        description:
          "Behance is Adobes creative platform that showcases and discovers creative work from artists and designers worldwide.",
        category: "Design",
      },
      {
        siteUrl: "https://medium.com",
        title: "Medium",
        coverImage: "https://miro.medium.com/1*m-R_BkNf1Qjr1YbyOIJY2w.png",
        description:
          "Medium is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing.",
        category: "Blog",
      },
      {
        siteUrl: "https://dev.to",
        title: "DEV Community",
        coverImage:
          "https://dev-to-uploads.s3.amazonaws.com/uploads/logos/original_logo_0DliJcfsTcciZen38gX9.png",
        description:
          "DEV Community is a community of amazing developers. We are a place where coders share, stay up-to-date and grow their careers.",
        category: "Blog",
      },
      {
        siteUrl: "https://unsplash.com",
        title: "Unsplash",
        coverImage: "https://unsplash.com/apple-touch-icon.png",
        description:
          "Unsplash provides beautiful, free images and photos that you can download and use for any project without attribution.",
        category: "Photography",
      },
      {
        siteUrl: "https://pexels.com",
        title: "Pexels",
        coverImage: "https://images.pexels.com/lib/api/pexels-white.png",
        description:
          "Pexels provides high-quality and completely free stock photos licensed under Creative Commons Zero (CC0).",
        category: "Photography",
      },
      {
        siteUrl: "https://coursera.org",
        title: "Coursera",
        coverImage:
          "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/fb/20c8a0c56011e8b395bb41c5c6cb91/coursera-logo-square.png",
        description:
          "Coursera offers online courses, specializations, and degrees from world-class universities and companies.",
        category: "Education",
      },
      {
        siteUrl: "https://udemy.com",
        title: "Udemy",
        coverImage:
          "https://www.udemy.com/staticx/udemy/images/v7/apple-touch-icon.png",
        description:
          "Udemy is an online learning platform with thousands of courses taught by expert instructors.",
        category: "Education",
      },
    ];

    const existingSitesCount = await Site.count();

    if (existingSitesCount === 0) {
      console.log("No existing sites found. Seeding sample data...");

      for (const siteData of sampleSites) {
        await Site.create(siteData);
        console.log(`✓ Created site: ${siteData.title}`);
      }

      console.log(`Successfully seeded ${sampleSites.length} sites!`);
    } else {
      console.log(
        `Database already contains ${existingSitesCount} sites. Skipping seeding.`
      );
    }

    const testUserExists = await User.findOne({
      where: { email: "user@test.com" },
    });

    if (!testUserExists) {
      const testUser = await User.create({
        username: "testuser",
        email: "user@test.com",
        password: "TestUser123!",
        role: "user",
      });
      console.log("✓ Created test user:", testUser.username);
    }

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
