import {dataSource} from "../index";
import {Thread} from "./Thread";
import {User} from "./User";
import {ThreadPoint} from "./ThreadPoints";

export const updateThreadPoint = async (
    userId: string,
    threadId: string,
    increment: boolean
): Promise<string> => {
    // TODO: Check if user is logged in
    let message = "Nie udało się inkrementować liczby punktów wątku.";
    const thread = await Thread.findOne({
        where: { id: threadId },
        relations: ["user"],
    });

    if (thread!.user!.id === userId) {
        message = "Błąd: użytkownik nie może oceniać swojego wątku.";
        console.log("incThreadPoints", message);
        return message;
    }

    const user = await User.findOne({
        where: { id: userId }
    });

    const existingPoint = await ThreadPoint.findOne({
        where: {
            thread: { id: threadId },
            user: { id: userId },
        },
        relations: ["thread"],
    });

    const Manager = dataSource.manager;
    await Manager.transaction( async (transactionEntityManger) => {
        if (existingPoint) {
            if (increment) {
                if (existingPoint.isDecrement) {
                    await ThreadPoint.remove(existingPoint);
                    thread!.points = Number(thread!.points) + 1;
                    thread!.lastModifiedOn = new Date();
                    await thread?.save();
                }
            } else {
                if (!existingPoint.isDecrement) {
                    await ThreadPoint.remove(existingPoint);
                    thread!.points = Number(thread!.points) -1;
                    thread!.lastModifiedOn = new Date();
                    await thread!.save();
                }
            }
        } else {
            console.log("nowy punkt");
            await ThreadPoint.create({
                //@ts-ignore
                thread: threadId,
                isDecrement: !increment,
                user,
                //@ts-ignore
            }).save();
            if (increment) {
                thread!.points = Number(thread!.points) + 1;
            } else {
                thread!.points = Number(thread!.points) - 1;
            }
            thread!.lastModifiedOn = new Date();
        }

        message = `Pomyślnie ${increment ? "dodano" : "odjęto"} punkt.`;
    });

    return message;
}