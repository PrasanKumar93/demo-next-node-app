import app from "./app.js";
import { ENV } from "./config/env.js";
import { connectDB, closeDB } from "./utils/db.js";

async function startServer(): Promise<void> {
  try {
    // Connect to MongoDB (optional - won't fail if MongoDB is not running)
    try {
      await connectDB();
    } catch (error) {
      console.warn("⚠️  MongoDB not connected. Running without database.");
      console.warn("   Start MongoDB or set MONGODB_URI to enable database features.");
    }

    // Start HTTP server
    const server = app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running on http://localhost:${ENV.PORT}`);
      console.log(`📝 Environment: ${ENV.NODE_ENV}`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);
      
      server.close(async () => {
        console.log("HTTP server closed.");
        await closeDB();
        process.exit(0);
      });

      // Force close after 10 seconds
      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));

  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
}

startServer();

