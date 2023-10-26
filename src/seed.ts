import {
	Conversation,
	IConversationDocument,
	IMessageDocument,
	IUser,
	IUserDocument,
	Message,
	User,
} from "./models";

export async function seedDev() {
	const users: IUserDocument[] = [];

	for (let i = 1; i <= 9; i++) {
		const user: IUser = {
			email: `test0${i}@email.com`,
			password: "12345678",
			username: `test0${i}`,
			picture: `https://ui-avatars.com/api/?name=test+${i}`,
		};

		const newUser = await new User(user).save();

		users.push(newUser);
	}

	const conversations: IConversationDocument[] = [];

	const conv1 = await Conversation.create({
		participants: [users[0]._id, users[1]._id],
	});
	const conv2 = await Conversation.create({
		participants: [users[0]._id, users[2]._id],
	});
	const conv3 = await Conversation.create({
		participants: [users[0]._id, users[3]._id],
	});

	conversations.push(conv1, conv2, conv3);

	const messages: IMessageDocument[][] = [];

	const messages1 = await Message.insertMany([
		{
			author: users[0]._id,
			content: "Hi! How are you?",
			conversation: conv1._id,
		},
		{
			author: users[1]._id,
			content: "Hello, I'm good, and you?",
			conversation: conv1._id,
		},
		{
			author: users[0]._id,
			content: "I'm great, what have you been up to lately?",
			conversation: conv1._id,
		},
	]);
	const messages2 = await Message.insertMany([
		{
			author: users[0]._id,
			content: "Hey, have you seen that new movie?",
			conversation: conv2._id,
		},
		{
			author: users[1]._id,
			content: "Yes, I watched it last night. It was amazing.",
			conversation: conv2._id,
		},
		{
			author: users[0]._id,
			content: "Really? I need to see it soon. What's it about?",
			conversation: conv2._id,
		},
	]);
	const messages3 = await Message.insertMany([
		{
			author: users[0]._id,
			content: "Good morning, what are your plans for today?",
			conversation: conv3._id,
		},
		{
			author: users[1]._id,
			content: "Hi, nothing in particular. How about you?",
			conversation: conv3._id,
		},
		{
			author: users[0]._id,
			content: "I'm going shopping, and then maybe I'll go for a walk.",
			conversation: conv3._id,
		},
	]);

	messages.push(messages1, messages2, messages3);

	return { users, conversations, messages };
}

export async function seedProd() {
	const users: IUserDocument[] = [];

	for (let i = 1; i <= 9; i++) {
		const user: IUser = {
			email: `user0${i}@email.com`,
			password: "12345678",
			username: `user0${i}`,
			picture: `https://ui-avatars.com/api/?name=user+${i}`,
		};

		const newUser = await new User(user).save();

		users.push(newUser);
	}

	const conversations: IConversationDocument[] = [];

	const conv1 = await Conversation.create({
		participants: [users[0]._id, users[1]._id],
	});
	const conv2 = await Conversation.create({
		participants: [users[0]._id, users[2]._id],
	});
	const conv3 = await Conversation.create({
		participants: [users[0]._id, users[3]._id],
	});

	conversations.push(conv1, conv2, conv3);

	const messages: IMessageDocument[][] = [];

	const messages1 = await Message.insertMany([
		{
			author: users[0]._id,
			content: "Hi! How are you?",
			conversation: conv1._id,
		},
		{
			author: users[1]._id,
			content: "Hello, I'm good, and you?",
			conversation: conv1._id,
		},
		{
			author: users[0]._id,
			content: "I'm great, what have you been up to lately?",
			conversation: conv1._id,
		},
	]);
	const messages2 = await Message.insertMany([
		{
			author: users[0]._id,
			content: "Hey, have you seen that new movie?",
			conversation: conv2._id,
		},
		{
			author: users[1]._id,
			content: "Yes, I watched it last night. It was amazing.",
			conversation: conv2._id,
		},
		{
			author: users[0]._id,
			content: "Really? I need to see it soon. What's it about?",
			conversation: conv2._id,
		},
	]);
	const messages3 = await Message.insertMany([
		{
			author: users[0]._id,
			content: "Good morning, what are your plans for today?",
			conversation: conv3._id,
		},
		{
			author: users[1]._id,
			content: "Hi, nothing in particular. How about you?",
			conversation: conv3._id,
		},
		{
			author: users[0]._id,
			content: "I'm going shopping, and then maybe I'll go for a walk.",
			conversation: conv3._id,
		},
	]);

	messages.push(messages1, messages2, messages3);

	return { users, conversations, messages };
}
