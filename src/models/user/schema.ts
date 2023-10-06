import { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcrypt";
import { z } from "zod";
import {
	IUser,
	IUserClient,
	IUserDocument,
	IUserMethods,
	IUserModel,
} from "..";

const SALT_WORK_FACTOR = 10;

export const UserSchema = new Schema<IUser, IUserModel, IUserMethods>(
	{
		username: {
			type: String,
			required: [true, "Username is required"],
			unique: true,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			validate: {
				validator: (v: any) => {
					const emailSchema = z.string().email();
					const validationResults = emailSchema.safeParse(v);

					return validationResults.success;
				},
				message:
					"Invalid email format, please use a valid email address (e.g., example@email.com)",
			},
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must have at least 8 characters"],
			select: false,
		},
		picture: {
			type: String,
			required: [true, "Profile picture is required"],
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
);

UserSchema.plugin(uniqueValidator, {
	message: "The {PATH} provided is already in use",
});

UserSchema.virtual("conversations", {
	ref: "Conversation",
	localField: "_id",
	foreignField: "participants",
});

UserSchema.pre("save", function (next) {
	const user = this;

	if (!user.isModified("password")) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.authPassword = async function (candidatePassword: string) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password);

	return isMatch;
};

UserSchema.methods.toClient = function (this: IUserDocument) {
	const obj = this;

	const out: IUserClient = {
		id: obj.id,
		email: obj.email,
		username: obj.username,
		picture: obj.picture,
	};

	return out;
};
