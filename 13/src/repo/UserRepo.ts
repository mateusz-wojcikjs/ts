import bcrypt from "bcryptjs";
import {User} from "./User";
import {isPasswordValid} from "../common/PasswordValidator";
import {isEmailValid} from "../common/EmailValidator";

const saltRounds = 10;

export class UserResult {
    constructor(public messages?: Array<string>, public user?: User) {
    }
}

export const register = async (
    email: string,
    userName: string,
    password: string
): Promise<UserResult> => {
    const result = isPasswordValid(password);
    if (!result.isValid) {
        return {
            messages: ["Hasło musi mieć co najmniej 8 znaków i zawierać jedną dużą literę, 1 cyfrę i 1 symbol"],
        };
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailErrorMsg = isEmailValid(email);
    if (emailErrorMsg) {
        return {messages: [emailErrorMsg],};
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userEntity = await User.create({
        email: trimmedEmail,
        userName,
        password: hashedPassword,
    }).save();

    userEntity.password = "";
    return {
        user: userEntity,
    }

}