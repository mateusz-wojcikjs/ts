import bcrypt from "bcryptjs";
import {User} from "./User";
import {isPasswordValid} from "../common/passwordValidator";
import {isEmailValid} from "../common/emailValidator";
import {incorrectCredentials} from "../common/incorrectCredentials";

const saltRounds = 10;
const userNotFound = (userName: string) => {
    return `Nie udało się znaleźć użytkownika o nazwie "${userName}".`;
}

export class UserResult {
    constructor(public messages?: Array<string>, public user?: User) {}
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
    };
}

export const login = async (userName: string, password: string):Promise<UserResult> => {

    const user = await User.findOne({
        where: { userName },
    });

    if (!user) {
        return {
            messages: [incorrectCredentials()],
        };
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);
    if (!passwordMatch) {
        return {
            messages: [incorrectCredentials()],
        };
    }

    if (!user.confirmed) {
        return {
            messages: ["Konto użytkownika nie zostało jeszcze aktywowane."],
        };
    }

    return {
        user,
    }
}

export const logout = async (userName: string): Promise<string> => {
    const user = await User.findOne({
        where: { userName },
    });

    if (!user) {
        return userNotFound(userName);
    }

    return "Użytkownik został wylogowany.";
};

export const me = async (id: string): Promise<UserResult> => {
    const user = await User.findOne({
        where: { id },
        relations: [ "threads", "threads.threadItems" ]
    });

    if (!user) {
        return {
            messages: ["Nie znaleziono użytkownika."],
        }
    }

    if (!user.confirmed) {
        return {
            messages: ["Użytkownik nie potwierdził jeszcze swojego adersu e-mail."],
        }
    }
    user.password = "";
    return {
        user: user
    };
}