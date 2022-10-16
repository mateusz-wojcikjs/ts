import {User} from "./User";
import {ThreadPoint} from "./ThreadPoints";
import {dataSource} from "../index";
import {ThreadItem} from "./ThreadItem";
import {ThreadItemPoint} from "./ThreadItemPoint";

export const updateThreadItemPoint = async (
    userId: string,
    threadItemId: string,
    increment: boolean
): Promise<string> => {
    // TODO: Check if user is logged in
    let message = "Nie udało się inkrementować liczby punktów wątku.";
    const threadItem = await ThreadItem.findOne({
        where: { id: threadItemId },
        relations: ["user"],
    });

    if (threadItem!.user!.id === userId) {
        message = "Błąd: użytkownik nie może oceniać swojego wątku.";
        console.log("incThreadItemPoints", message);
        return message;
    }

    const user = await User.findOne({
        where: { id: userId }
    });

    const existingPoint = await ThreadItemPoint.findOne({
        where: {
            threadItem: { id: threadItemId },
            user: { id: userId },
        },
        relations: ["threadItem"],
    });

    const Manager = dataSource.manager;
    await Manager.transaction( async (transactionEntityManger) => {
        if (existingPoint) {
            if (increment) {
                if (existingPoint.isDecrement) {
                    await ThreadItemPoint.remove(existingPoint);
                    threadItem!.points = Number(threadItem!.points) + 1;
                    threadItem!.lastModifiedOn = new Date();
                    await threadItem?.save();
                }
            } else {
                if (!existingPoint.isDecrement) {
                    await ThreadItemPoint.remove(existingPoint);
                    threadItem!.points = Number(threadItem!.points) -1;
                    threadItem!.lastModifiedOn = new Date();
                    await threadItem!.save();
                }
            }
        } else {
            console.log("nowy punkt");
            await ThreadItemPoint.create({
                //@ts-ignore
                threadItem: threadItemId,
                isDecrement: !increment,
                user,
                //@ts-ignore
            }).save();
            if (increment) {
                threadItem!.points = Number(threadItem!.points) + 1;
            } else {
                threadItem!.points = Number(threadItem!.points) - 1;
            }
            threadItem!.lastModifiedOn = new Date();
        }

        message = `Pomyślnie ${increment ? "dodano" : "odjęto"} punkt.`;
    });

    return message;
}