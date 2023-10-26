export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		try {
			console.log("[Instrumentation]: Starting");
			const mongoose = await import("mongoose");
			const { Schema } = mongoose;
			const { dbConnect } = await import("./lib");
			const { User, Conversation, Message } = await import("./models");

			const { seedDev, seedProd } = await import("./seed");

			await dbConnect();

			const seedSchema = new Schema(
				{},
				{ strict: false, timestamps: true },
			);
			const Seed = mongoose.model("Seed", seedSchema);

			const seed = await Seed.findOne();

			console.log("[Instrumentation]: Checking seed in the database...");
			if (seed) {
				console.log("[Instrumentation]: Finished");
				return;
			}

			console.log("[Instrumentation]: Running seed...");

			await User.deleteMany();
			await Conversation.deleteMany();
			await Message.deleteMany();

			const env = process.env.NODE_ENV;

			if (env === "development") {
				await seedDev();
			} else if (env === "production") {
				await seedProd();
			}

			console.log("[Instrumentation]: Seed finished");

			await Seed.create({});

			console.log("[Instrumentation]: Finished");
		} catch (e) {
			console.log(e);
		}
	}
}
