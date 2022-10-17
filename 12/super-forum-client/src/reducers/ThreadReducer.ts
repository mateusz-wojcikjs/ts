export const threadReducer = (state: any, action: any) => {
    switch (action.type) {
        case "userId":
            return { ...state, userId: action.payload };
        case "category":
            return { ...state, category: action.payload };
        case "title":
            return { ...state, title: action.payload };
        case "body":
            return { ...state, body: action.payload };
        case "bodyNode":
            return { ...state, bodyNode: action.payload };
        default:
            throw new Error("Nieznany typ akcji");
    }
};
