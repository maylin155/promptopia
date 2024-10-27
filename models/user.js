import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required']
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists']
        // match: [/^(?![_.])[a-zA-Z0-9._]{3,30}(?<![_.])$/, "Username invalid! It should not start or end with '_' or '.' and must be between 3-30 characters."]
    },

    image: {
        type: String
    }
});

const User = models.User || model("User", UserSchema);

export default User;